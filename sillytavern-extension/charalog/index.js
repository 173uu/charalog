(function () {
    'use strict';

    const EXTENSION_NAME = 'CharaLog';
    const EXTENSION_DIR = 'charalog';
    const BUTTON_ID = 'charalog_extension_button';
    const SETTINGS_ID = 'charalog_extension_settings';
    const ROOT_ID = 'charalog_extension_root';
    const BUTTON_MOUNT_RETRY_LIMIT = 20;
    const BUTTON_MOUNT_RETRY_MS = 500;

    const currentScriptSrc = String(document.currentScript?.src || '');
    const scriptBaseMatch = currentScriptSrc.match(/(\/scripts\/extensions\/third-party\/[^/]+)/);
    const EXTENSION_BASE_PATH = scriptBaseMatch?.[1] || `/scripts/extensions/third-party/${EXTENSION_DIR}`;
    const ASSET_VERSION = '0.2.23';
    const APP_MODULE_URL = `${EXTENSION_BASE_PATH}/dist/charalog-extension.js?v=${ASSET_VERSION}`;
    const APP_STYLES_URL = `${EXTENSION_BASE_PATH}/dist/assets/charalog-extension.css?v=${ASSET_VERSION}`;

    let charaLogModulePromise = null;
    let sillyTavernScriptApiPromise = null;
    let sillyTavernOpenAiApiPromise = null;

    function getContext() {
        return SillyTavern.getContext();
    }

    function loadSillyTavernScriptApi() {
        sillyTavernScriptApiPromise ??= import('/script.js');
        return sillyTavernScriptApiPromise;
    }

    function loadSillyTavernOpenAiApi() {
        sillyTavernOpenAiApiPromise ??= import('/scripts/openai.js');
        return sillyTavernOpenAiApiPromise;
    }

    async function fetchWithTimeout(url, options, timeoutMs = 12000) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
            return await fetch(url, { ...options, signal: controller.signal });
        } finally {
            clearTimeout(timeout);
        }
    }

    function parseDateLike(value) {
        if (!value) {
            return undefined;
        }
        if (typeof value === 'number') {
            const numericDate = new Date(value > 100000000000 ? value : value * 1000);
            return Number.isNaN(numericDate.getTime()) ? undefined : numericDate;
        }
        const date = new Date(value);
        if (!Number.isNaN(date.getTime())) {
            return date;
        }
        const text = String(value);
        const stDateMatch = text.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s*@\s*(\d{1,2})h\s*(\d{1,2})m/i);
        if (stDateMatch) {
            const [, year, month, day, hour, minute] = stDateMatch;
            const parsed = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
            return Number.isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return undefined;
    }

    function extractMessageDate(message) {
        if (!message || typeof message !== 'object') {
            return undefined;
        }
        return parseDateLike(
            message.send_date ||
            message.sent_date ||
            message.gen_started ||
            message.gen_finished ||
            message.createdAt ||
            message.create_date ||
            message.date ||
            message.timestamp ||
            message.time ||
            message.extra?.send_date ||
            message.extra?.createdAt ||
            message.extra?.timestamp,
        );
    }

    function extractChatFileDate(chatFile) {
        if (!chatFile || typeof chatFile !== 'object') {
            return undefined;
        }
        return parseDateLike(
            chatFile.last_mes ||
            chatFile.lastMessageDate ||
            chatFile.updatedAt ||
            chatFile.modified ||
            chatFile.create_date ||
            chatFile.file_name,
        );
    }

    function summarizeChatActivity(chatFile, bodyMessages, userName) {
        const dates = bodyMessages.map(extractMessageDate).filter(Boolean);
        const fallbackDate = extractChatFileDate(chatFile);
        const firstDate = dates.length ? new Date(Math.min(...dates.map(date => date.getTime()))) : fallbackDate;
        const lastDate = dates.length ? new Date(Math.max(...dates.map(date => date.getTime()))) : fallbackDate;
        const activeDateKeys = Array.from(new Set(dates.map(date => date.toISOString().slice(0, 10))));
        const activeHourBuckets = Array.from({ length: 24 }, () => 0);
        dates.forEach(date => {
            activeHourBuckets[date.getHours()] += 1;
        });
        if (!activeDateKeys.length && fallbackDate) {
            activeDateKeys.push(fallbackDate.toISOString().slice(0, 10));
            activeHourBuckets[fallbackDate.getHours()] += 1;
        }
        return {
            totalMessages: bodyMessages.length,
            userMessages: bodyMessages.filter((message) => message?.is_user === true || message?.name === userName).length,
            firstActiveAt: firstDate?.toISOString(),
            lastActiveAt: lastDate?.toISOString(),
            activeDateKeys,
            activeHourBuckets,
        };
    }

    function summarizeChatFileActivity(chatFile) {
        const fallbackDate = extractChatFileDate(chatFile);
        const activeHourBuckets = Array.from({ length: 24 }, () => 0);
        if (fallbackDate) {
            activeHourBuckets[fallbackDate.getHours()] += 1;
        }
        const guessedMessageCount = Number(
            chatFile?.message_count ??
            chatFile?.messageCount ??
            chatFile?.mes_count ??
            chatFile?.mesCount ??
            chatFile?.count ??
            1,
        );
        return {
            totalMessages: Number.isFinite(guessedMessageCount) && guessedMessageCount > 0 ? guessedMessageCount : 1,
            userMessages: 0,
            firstActiveAt: fallbackDate?.toISOString(),
            lastActiveAt: fallbackDate?.toISOString(),
            activeDateKeys: fallbackDate ? [fallbackDate.toISOString().slice(0, 10)] : [],
            activeHourBuckets,
            messages: [],
        };
    }

    async function mapWithConcurrency(items, limit, mapper) {
        const results = new Array(items.length);
        let nextIndex = 0;
        const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
            while (nextIndex < items.length) {
                const index = nextIndex;
                nextIndex += 1;
                results[index] = await mapper(items[index], index);
            }
        });
        await Promise.all(workers);
        return results;
    }

    function exposeSillyTavernContext() {
        const context = getContext();
        globalThis.__CHARALOG_GET_SILLYTAVERN_CONTEXT__ = () => getContext();
        globalThis.__CHARALOG_LOAD_CARD_USAGE__ = async (input) => {
            const currentContext = getContext();
            const headers = typeof currentContext.getRequestHeaders === 'function'
                ? currentContext.getRequestHeaders()
                : { 'Content-Type': 'application/json' };
            const avatar = input?.avatar;
            const name = input?.name;
            if (!avatar || !name) {
                return { chats: [] };
            }
            const listResponse = await fetchWithTimeout('/api/characters/chats', {
                method: 'POST',
                headers,
                body: JSON.stringify({ avatar_url: avatar }),
            }, 8000);
            if (!listResponse.ok) {
                throw new Error(`读取聊天列表失败：HTTP ${listResponse.status}`);
            }
            const listPayload = await listResponse.json();
            const chatFiles = Object.values(listPayload || {});
            const loadedChats = await mapWithConcurrency(chatFiles, 2, async (chatFile) => {
                const fileName = String(chatFile?.file_name || '');
                if (!fileName) {
                    return undefined;
                }
                try {
                    const chatResponse = await fetchWithTimeout('/api/chats/get', {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({
                            ch_name: name,
                            file_name: fileName.replace(/\.jsonl$/i, ''),
                            avatar_url: avatar,
                        }),
                        cache: 'no-cache',
                    }, 8000);
                    if (!chatResponse.ok) {
                        return { ...chatFile, ...summarizeChatFileActivity(chatFile) };
                    }
                    const messages = await chatResponse.json();
                    if (!Array.isArray(messages)) {
                        return { ...chatFile, ...summarizeChatFileActivity(chatFile) };
                    }
                    const bodyMessages = messages.slice(1);
                    return {
                        ...chatFile,
                        ...summarizeChatActivity(chatFile, bodyMessages, currentContext.name1),
                        messages: bodyMessages.slice(0, 6),
                    };
                } catch (error) {
                    console.warn(`[${EXTENSION_NAME}] Failed to refine chat usage`, name, fileName, error);
                    return { ...chatFile, ...summarizeChatFileActivity(chatFile) };
                }
            });
            return { chats: loadedChats.filter(Boolean) };
        };
        globalThis.__CHARALOG_LOAD_SILLYTAVERN_LIBRARY__ = async () => {
            const currentContext = getContext();
            const characters = Array.isArray(currentContext.characters) ? currentContext.characters : [];
            const headers = typeof currentContext.getRequestHeaders === 'function'
                ? currentContext.getRequestHeaders()
                : { 'Content-Type': 'application/json' };
            const chatsByAvatar = {};
            const reportProgress = (payload) => {
                try {
                    globalThis.__CHARALOG_LIBRARY_PROGRESS__?.(payload);
                } catch {
                    // Progress is cosmetic; loading should continue.
                }
            };
            reportProgress({ phase: 'characters', totalCharacters: characters.length, loadedCharacters: 0, loadedChats: 0 });

            for (const [characterIndex, character] of characters.entries()) {
                if (!character?.avatar) {
                    continue;
                }

                try {
                    reportProgress({
                        phase: 'chat-list',
                        totalCharacters: characters.length,
                        loadedCharacters: characterIndex,
                        currentCharacterName: character.name,
                        loadedChats: Object.values(chatsByAvatar).reduce((sum, chats) => sum + chats.length, 0),
                    });
                    const listResponse = await fetchWithTimeout('/api/characters/chats', {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({ avatar_url: character.avatar }),
                    });
                    if (!listResponse.ok) {
                        continue;
                    }
                    const listPayload = await listResponse.json();
                    const chatFiles = Object.values(listPayload || {});
                    const chats = chatFiles
                        .map((chatFile) => {
                            const fileName = String(chatFile?.file_name || '');
                            return fileName ? { ...chatFile, ...summarizeChatFileActivity(chatFile) } : undefined;
                        })
                        .filter(Boolean);

                    chatsByAvatar[character.avatar] = chats;
                    reportProgress({
                        phase: 'chat-list',
                        totalCharacters: characters.length,
                        loadedCharacters: characterIndex + 1,
                        currentCharacterName: character.name,
                        loadedChats: Object.values(chatsByAvatar).reduce((sum, loadedChats) => sum + loadedChats.length, 0),
                    });
                } catch (error) {
                    console.warn(`[${EXTENSION_NAME}] Failed to load chats for`, character.name, error);
                }
            }

            reportProgress({
                phase: 'done',
                totalCharacters: characters.length,
                loadedCharacters: characters.length,
                loadedChats: Object.values(chatsByAvatar).reduce((sum, chats) => sum + chats.length, 0),
            });
            return {
                characters,
                chatsByAvatar,
                currentCharacterId: currentContext.characterId,
                currentChat: currentContext.chat,
            };
        };
        const extractGeneratedText = (value) => {
            if (typeof value === 'string') {
                return value;
            }
            if (Array.isArray(value)) {
                return value.map(extractGeneratedText).filter(Boolean).join('\n');
            }
            if (!value || typeof value !== 'object') {
                return value == null ? '' : String(value);
            }
            const direct = value.content || value.text || value.message || value.result || value.response || value.output;
            if (typeof direct === 'string') {
                return direct;
            }
            if (value.message && typeof value.message === 'object') {
                const messageContent = extractGeneratedText(value.message.content);
                if (messageContent) {
                    return messageContent;
                }
            }
            const firstChoice = Array.isArray(value.choices) ? value.choices[0] : null;
            if (firstChoice && typeof firstChoice === 'object') {
                return extractGeneratedText(firstChoice.message?.content) || extractGeneratedText(firstChoice.text) || extractGeneratedText(firstChoice.content);
            }
            return '';
        };
        globalThis.__CHARALOG_GENERATE_RAW__ = async (input) => {
            const currentContext = getContext();
            const prompt = `${input.systemPrompt ? `${input.systemPrompt}\n\n` : ''}${input.prompt}`;
            const attempts = [];
            let openAiApi = null;
            let scriptApi = null;

            try {
                openAiApi = await loadSillyTavernOpenAiApi();
            } catch (error) {
                attempts.push(`导入酒馆 Chat Completion 模块失败：${error?.message || String(error)}`);
                console.warn(`[${EXTENSION_NAME}] Failed to import SillyTavern OpenAI API`, error);
            }

            try {
                scriptApi = await loadSillyTavernScriptApi();
            } catch (error) {
                attempts.push(`导入酒馆原生生成模块失败：${error?.message || String(error)}`);
                console.warn(`[${EXTENSION_NAME}] Failed to import SillyTavern script API`, error);
            }

            if (typeof openAiApi?.sendOpenAIRequest === 'function') {
                try {
                    const messages = [];
                    if (input.systemPrompt) {
                        messages.push({ role: 'system', content: input.systemPrompt });
                    }
                    messages.push({ role: 'user', content: input.prompt });
                    const chatResult = openAiApi.sendOpenAIRequest('quiet', messages);
                    const chatText = extractGeneratedText(await chatResult).trim();
                    if (chatText) {
                        return chatText;
                    }
                    attempts.push('酒馆 Chat Completion 请求返回空文本');
                } catch (error) {
                    attempts.push(`酒馆 Chat Completion 请求失败：${error?.message || String(error)}`);
                    console.warn(`[${EXTENSION_NAME}] sendOpenAIRequest failed`, error);
                }
            }

            if (typeof scriptApi?.generateRaw === 'function') {
                try {
                    const rawResult = scriptApi.generateRaw(input.prompt, '', false, false, input.systemPrompt || '', 4096, false);
                    const rawText = extractGeneratedText(await rawResult).trim();
                    if (rawText) {
                        return rawText;
                    }
                    attempts.push('酒馆原生 generateRaw 返回空文本');
                } catch (error) {
                    attempts.push(`酒馆原生 generateRaw 失败：${error?.message || String(error)}`);
                    console.warn(`[${EXTENSION_NAME}] native generateRaw failed`, error);
                }
            }

            if (typeof currentContext.generateRaw === 'function') {
                try {
                    const rawResult = currentContext.generateRaw(input.prompt, '', false, false, input.systemPrompt || '', 4096, false);
                    const rawText = extractGeneratedText(await rawResult).trim();
                    if (rawText) {
                        return rawText;
                    }
                    attempts.push('generateRaw 返回空文本');
                } catch (error) {
                    attempts.push(`generateRaw 失败：${error?.message || String(error)}`);
                    console.warn(`[${EXTENSION_NAME}] generateRaw failed`, error);
                }
            }

            if (typeof currentContext.generateQuietPrompt === 'function') {
                try {
                    const quietResult = currentContext.generateQuietPrompt(prompt, false, true, null, EXTENSION_NAME, 4096);
                    const quietText = extractGeneratedText(await quietResult).trim();
                    if (quietText) {
                        return quietText;
                    }
                    attempts.push('generateQuietPrompt 返回空文本');
                } catch (error) {
                    attempts.push(`generateQuietPrompt 失败：${error?.message || String(error)}`);
                    console.warn(`[${EXTENSION_NAME}] generateQuietPrompt failed`, error);
                }
            }

            if (!attempts.length) {
                attempts.push('当前 SillyTavern 上下文没有可用的 generateRaw 或 generateQuietPrompt');
            }
            throw new Error(`酒馆后台生成失败：${attempts.join('；')}。请确认酒馆 API 已连接且当前模型可以正常发送消息。`);
        };
        globalThis.__CHARALOG_SILLYTAVERN_CONTEXT__ = context;
        return context;
    }

    function loadCharaLogModule() {
        charaLogModulePromise ??= import(APP_MODULE_URL);
        return charaLogModulePromise;
    }

    function createShadowAppHost() {
        const overlay = document.createElement('div');
        overlay.className = 'charalog-extension-overlay';
        Object.assign(overlay.style, {
            background: '#f6f3ee',
            display: 'block',
            height: '100dvh',
            inset: '0',
            overflow: 'hidden',
            position: 'fixed',
            width: '100dvw',
            zIndex: '2147483647',
        });

        const host = document.createElement('div');
        host.id = ROOT_ID;
        host.className = 'charalog-extension-host';
        Object.assign(host.style, {
            display: 'block',
            height: '100%',
            inset: '0',
            margin: '0',
            maxHeight: 'none',
            maxWidth: 'none',
            padding: '0',
            position: 'absolute',
            width: '100%',
        });

        const shadowRoot = host.attachShadow({ mode: 'open' });

        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = APP_STYLES_URL;
        shadowRoot.append(stylesheet);

        const localStyles = document.createElement('style');
        localStyles.textContent = `
            :host {
                color: var(--text);
                display: block;
                font-family: "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                overflow: clip;
                width: 100%;
            }

            .charalog-extension-app {
                height: 100%;
                max-width: 100%;
                min-height: 0;
                overflow: auto;
                overscroll-behavior: contain;
                scrollbar-gutter: stable;
                width: 100%;
            }

            .charalog-extension-loading {
                align-items: center;
                background: #101211;
                color: #f5f7f4;
                display: flex;
                justify-content: center;
                min-height: 70vh;
                padding: 24px;
            }

            .charalog-extension-close {
                align-items: center;
                background: rgba(15, 18, 22, 0.86);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: 999px;
                color: #f8f4ec;
                cursor: pointer;
                display: flex;
                font: 24px/1 "Segoe UI", sans-serif;
                height: 38px;
                justify-content: center;
                position: fixed;
                right: 18px;
                top: 14px;
                width: 38px;
                z-index: 2;
            }

            .charalog-extension-close:hover {
                background: rgba(80, 44, 34, 0.95);
            }

            .app-shell {
                min-height: 100%;
                width: 100%;
            }

            @media (max-width: 720px) {
                .app-shell {
                    padding: 0;
                }
            }
        `;
        shadowRoot.append(localStyles);

        const closeButton = document.createElement('button');
        closeButton.className = 'charalog-extension-close';
        closeButton.type = 'button';
        closeButton.title = '关闭 CharaLog';
        closeButton.textContent = '×';
        shadowRoot.append(closeButton);

        const appRoot = document.createElement('div');
        appRoot.className = 'charalog-extension-app';
        Object.assign(appRoot.style, {
            height: '100%',
            minHeight: '0',
            overflow: 'auto',
            width: '100%',
        });
        appRoot.innerHTML = '<div class="charalog-extension-loading">正在打开 CharaLog...</div>';
        shadowRoot.append(appRoot);

        overlay.append(host);
        return { overlay, host, appRoot, closeButton };
    }

    async function openCharaLog() {
        exposeSillyTavernContext();
        const { overlay, appRoot, closeButton } = createShadowAppHost();
        let mountedModule = null;
        const close = () => {
            mountedModule?.unmountCharaLog?.(appRoot);
            overlay.remove();
            document.body.classList.remove('charalog-extension-open');
        };
        closeButton.addEventListener('click', close);
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                close();
            }
        });
        document.addEventListener('keydown', function onKeyDown(event) {
            if (event.key === 'Escape' && document.body.contains(overlay)) {
                event.preventDefault();
                close();
                document.removeEventListener('keydown', onKeyDown);
            }
        });
        document.body.append(overlay);
        document.body.classList.add('charalog-extension-open');

        try {
            const module = await loadCharaLogModule();
            exposeSillyTavernContext();
            mountedModule = module;
            appRoot.innerHTML = '';
            module.mountCharaLog(appRoot);
        } catch (error) {
            console.error(`[${EXTENSION_NAME}] Failed to load`, error);
            appRoot.innerHTML = '<div class="charalog-extension-loading">CharaLog 加载失败，请打开浏览器控制台查看错误。</div>';
            globalThis.toastr?.error?.(error?.message || String(error), EXTENSION_NAME);
        }
    }

    function addButton() {
        if (document.getElementById(BUTTON_ID)) {
            return;
        }

        const menu = document.getElementById('extensionsMenu');
        if (!(menu instanceof HTMLElement)) {
            return;
        }

        const button = document.createElement('div');
        button.id = BUTTON_ID;
        button.className = 'list-group-item flex-container flexGap5';
        button.tabIndex = 0;
        button.innerHTML = `
            <div class="fa-solid fa-book-open extensionsMenuExtensionButton"></div>
            <span>${EXTENSION_NAME}</span>
        `;
        button.addEventListener('click', () => {
            void openCharaLog().catch(error => {
                console.error(`[${EXTENSION_NAME}] Failed to open`, error);
                globalThis.toastr?.error?.(error?.message || String(error), EXTENSION_NAME);
            });
        });

        menu.append(button);
    }

    function addSettingsPanel() {
        if (document.getElementById(SETTINGS_ID)) {
            return;
        }

        const settings = document.getElementById('extensions_settings');
        if (!(settings instanceof HTMLElement)) {
            return;
        }

        const panel = document.createElement('div');
        panel.id = SETTINGS_ID;
        panel.className = 'inline-drawer';
        panel.innerHTML = `
            <div class="inline-drawer-toggle inline-drawer-header">
                <b>CharaLog</b>
                <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
            </div>
            <div class="inline-drawer-content">
                <div class="charalog-extension-settings-row">
                    <span>角色卡口味账本</span>
                    <div class="menu_button interactable charalog-extension-open-button" tabindex="0">打开 CharaLog</div>
                </div>
                <small>自动读取酒馆角色卡和使用记录，批量生成标签、角色摘要和 XP 小票。</small>
            </div>
        `;

        panel.querySelector('.charalog-extension-open-button')?.addEventListener('click', () => {
            void openCharaLog().catch(error => {
                console.error(`[${EXTENSION_NAME}] Failed to open`, error);
                globalThis.toastr?.error?.(error?.message || String(error), EXTENSION_NAME);
            });
        });

        settings.append(panel);
    }

    function scheduleButtonMount(attempt = 0) {
        addButton();
        addSettingsPanel();

        const hasMenuButton = document.getElementById(BUTTON_ID);
        const hasSettingsPanel = document.getElementById(SETTINGS_ID);
        if ((hasMenuButton && hasSettingsPanel) || attempt >= BUTTON_MOUNT_RETRY_LIMIT) {
            return;
        }

        window.setTimeout(() => scheduleButtonMount(attempt + 1), BUTTON_MOUNT_RETRY_MS);
    }

    const context = getContext();
    context.eventSource.on(context.event_types.APP_READY, () => scheduleButtonMount());
    scheduleButtonMount();
})();
