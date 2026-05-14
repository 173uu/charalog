import { BarChart3, Library, PlayCircle, ReceiptText, Settings, Sparkles, UsersRound, Wifi } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { analyzeCardsInBatches, buildCardAnalysisDebugPreview } from './core/analyzeCardBatch';
import { getCachedAnalysis } from './core/analysisCache';
import { buildCardAnalysisInput, buildOpeningSummaryMap } from './core/cardAnalysisInput';
import { buildTasteProfileDebugPreview, generateTasteProfileWithAi } from './core/analyzeTasteProfile';
import { testOpenAiCompatibleConnection } from './core/apiConnection';
import { recallCandidateTags } from './core/recallCandidateTags';
import { loadApiConfig, saveApiConfig } from './core/settingsStorage';
import { buildTasteProfile } from './core/tasteProfile';
import { loadSillyTavernCardUsage, loadSillyTavernInitialData, loadSillyTavernLibraryData, type SillyTavernLibraryProgress } from './integrations/sillyTavern';
import type {
  AiAnalysisDebugInfo,
  ApiConfig,
  BatchAnalysisProgress,
  CardAnalysisResult,
  CandidateTag,
  CharacterUsage,
  NormalizedCharacterCard,
  TasteProfile,
} from './domain/types';

type ViewName = 'library' | 'detail' | 'analysis' | 'profile' | 'settings';

const cardTypeLabel: Record<NormalizedCharacterCard['cardType'], string> = {
  single: '单人卡',
  multi_scenario: '多线路卡',
  group: '群像卡',
  world: '世界观卡',
};

const aiCardTypeLabel: Record<CardAnalysisResult['cardType'], string> = {
  single_character: '单人卡',
  single_character_multi_scenario: '多线路卡',
  multi_character: '群像卡',
  world_setting: '世界观卡',
  fandom: '同人卡',
  scenario_collection: '线路合集',
  unknown: '未知类型',
};

function aiTypeFromCardType(cardType: NormalizedCharacterCard['cardType']): CardAnalysisResult['cardType'] {
  if (cardType === 'single') {
    return 'single_character';
  }
  if (cardType === 'multi_scenario') {
    return 'single_character_multi_scenario';
  }
  if (cardType === 'group') {
    return 'multi_character';
  }
  if (cardType === 'world') {
    return 'world_setting';
  }
  return 'unknown';
}

function createUsageSeedAnalysisResult(card: NormalizedCharacterCard, usage?: CharacterUsage): CardAnalysisResult {
  return {
    cardId: card.id,
    cardType: aiTypeFromCardType(card.cardType),
    baseTags: [],
    scenarioTags: [],
    worldTags: [],
    castTags: [],
    suggestedTags: [],
    oneLineSummary: '已读取使用记录，等待 AI 分析。',
    scenarioOneLineSummaries: [],
    warnings: ['pending-analysis', '尚未调用 AI，当前结果只用于保留使用记录。'],
    localCandidateTags: recallCandidateTags(card),
    usage,
    generatedAt: new Date().toISOString(),
    sourceHash: 'usage-seed',
  };
}

function isPlaceholderAnalysisResult(result?: CardAnalysisResult): boolean {
  return Boolean(
    result &&
      (result.sourceHash === 'usage-seed' ||
        result.sourceHash === 'st-test-usage-seed' ||
        result.warnings.includes('pending-analysis') ||
        result.warnings.includes('st-test-usage-seed')),
  );
}

function isAnalyzedResult(result?: CardAnalysisResult): boolean {
  return Boolean(result && !isPlaceholderAnalysisResult(result) && !result.debug?.error);
}

const TASTE_PROFILE_CACHE_KEY = 'charalog.tasteProfile.v1';

function loadSavedTasteProfile(): TasteProfile | undefined {
  try {
    const raw = localStorage.getItem(TASTE_PROFILE_CACHE_KEY);
    return raw ? (JSON.parse(raw) as TasteProfile) : undefined;
  } catch {
    return undefined;
  }
}

function saveTasteProfile(profile: TasteProfile) {
  try {
    localStorage.setItem(TASTE_PROFILE_CACHE_KEY, JSON.stringify(profile));
  } catch {
    // XP receipt text is nice to keep, but never worth breaking the extension over storage quota.
  }
}

function formatRelativeDays(value?: string) {
  if (!value) {
    return '暂无';
  }
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return '暂无';
  }
  const days = Math.max(0, Math.floor((Date.now() - timestamp) / 86400000));
  if (days === 0) {
    return '今天';
  }
  if (days === 1) {
    return '昨天';
  }
  return `${days} 天前`;
}

export function App() {
  const sillyTavernInitialData = useMemo(() => loadSillyTavernInitialData(), []);
  const isSillyTavernMode = Boolean(sillyTavernInitialData);
  const initialCards: NormalizedCharacterCard[] = [];
  const [view, setView] = useState<ViewName>('library');
  const [cards, setCards] = useState<NormalizedCharacterCard[]>(initialCards);
  const [selectedCardId, setSelectedCardId] = useState(initialCards[0]?.id);
  const [config, setConfigState] = useState<ApiConfig>(() => loadApiConfig());
  const [savedTasteProfile, setSavedTasteProfile] = useState<TasteProfile | undefined>(() => loadSavedTasteProfile());
  const [libraryProgress, setLibraryProgress] = useState<SillyTavernLibraryProgress>({
    phase: isSillyTavernMode ? 'characters' : 'idle',
    totalCharacters: initialCards.length,
    loadedCharacters: 0,
    loadedChats: 0,
  });
  const [analysisResults, setAnalysisResults] = useState<CardAnalysisResult[]>(() =>
    [],
  );
  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? cards[0];
  const setConfig = (nextConfig: ApiConfig) => {
    setConfigState(nextConfig);
    saveApiConfig(nextConfig);
  };

  const libraryStats = useMemo(
    () => ({
      cardCount: cards.length,
      scenarioCount: cards.reduce((sum, card) => sum + card.scenarioOpenings.length, 0),
      chatCount: analysisResults.reduce((sum, result) => sum + (result.usage?.chatCount ?? 0), 0),
    }),
    [analysisResults, cards],
  );

  useEffect(() => {
    if (!sillyTavernInitialData) {
      return;
    }

    let cancelled = false;
    void loadSillyTavernLibraryData((progress) => {
      if (!cancelled) {
        setLibraryProgress(progress);
      }
    }).then((library) => {
      if (cancelled || !library?.cards.length) {
        return;
      }
      setCards(library.cards);
      setSelectedCardId((current) => (current && library.cards.some((card) => card.id === current) ? current : library.cards[0]?.id));
      setAnalysisResults((current) => {
        const currentByCardId = new Map(current.map((result) => [result.cardId, result]));
        return library.cards.map((card) => {
          const usage = library.usageByCardId.get(card.id);
          const existing = currentByCardId.get(card.id);
          if (existing && !isPlaceholderAnalysisResult(existing)) {
            return { ...existing, usage: usage ?? existing.usage };
          }
          const cached = getCachedAnalysis(card);
          if (cached && !isPlaceholderAnalysisResult(cached)) {
            return { ...cached, usage: usage ?? cached.usage };
          }
          return createUsageSeedAnalysisResult(card, usage);
        });
      });
      setLibraryProgress((current) => ({
        ...current,
        phase: 'done',
        totalCharacters: library.cards.length,
        loadedCharacters: library.cards.length,
        loadedChats: current.loadedChats,
      }));
    });

    return () => {
      cancelled = true;
    };
  }, [sillyTavernInitialData]);

  function mergeAnalysisResults(nextResults: CardAnalysisResult[]) {
    setAnalysisResults((current) => {
      const byCardId = new Map(current.map((result) => [result.cardId, result]));
      nextResults.forEach((result) => byCardId.set(result.cardId, config.enableDebugMode ? result : { ...result, debug: undefined }));
      return Array.from(byCardId.values());
    });
  }

  function updateCardUsage(cardId: string, usage: CharacterUsage) {
    setAnalysisResults((current) =>
      current.map((result) => (result.cardId === cardId ? { ...result, usage } : result)),
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">CL</div>
          <div>
            <h1>CharaLog</h1>
            <p>角色卡口味账本</p>
          </div>
        </div>
        <nav className="nav-list" aria-label="主导航">
          <NavButton icon={<Library size={18} />} label="卡库" active={view === 'library'} onClick={() => setView('library')} />
          <NavButton icon={<UsersRound size={18} />} label="角色详情" active={view === 'detail'} onClick={() => setView('detail')} />
          <NavButton icon={<PlayCircle size={18} />} label="分析" active={view === 'analysis'} onClick={() => setView('analysis')} />
          <NavButton icon={<ReceiptText size={18} />} label="XP小票" active={view === 'profile'} onClick={() => setView('profile')} />
          <NavButton icon={<Settings size={18} />} label="设置" active={view === 'settings'} onClick={() => setView('settings')} />
        </nav>
      </aside>

      <section className="content">
        {view === 'library' && (
          <LibraryView
            stats={libraryStats}
            cards={cards}
            selectedCardId={selectedCardId}
            analysisResults={analysisResults}
            isSillyTavernMode={isSillyTavernMode}
            libraryProgress={libraryProgress}
            onSelect={(cardId) => {
              setSelectedCardId(cardId);
              setView('detail');
            }}
          />
        )}
        {view === 'detail' && selectedCard && (
          <DetailView
            card={selectedCard}
            config={config}
            analysisResults={analysisResults}
            onAnalysisComplete={mergeAnalysisResults}
            onUsageUpdate={updateCardUsage}
          />
        )}
        {view === 'analysis' && (
          <AnalysisView
            cards={cards}
            config={config}
            analysisResults={analysisResults}
            onComplete={mergeAnalysisResults}
            isSillyTavernMode={isSillyTavernMode}
          />
        )}
        {view === 'profile' && (
          <ProfileViewV2
            cards={cards}
            analysisResults={analysisResults}
            config={config}
            savedProfile={savedTasteProfile}
            onProfileGenerated={setSavedTasteProfile}
          />
        )}
        {view === 'settings' && <SettingsView config={config} onChange={setConfig} />}
      </section>
    </main>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick} type="button">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function LibraryLoadProgress({ progress }: { progress: SillyTavernLibraryProgress }) {
  const total = Math.max(progress.totalCharacters ?? 0, 1);
  const loaded = Math.min(progress.loadedCharacters ?? 0, total);
  const percent = progress.phase === 'done' ? 100 : Math.round((loaded / total) * 100);
  const label =
    progress.phase === 'done'
      ? '酒馆数据读取完成'
      : progress.phase === 'chat-body'
        ? `正在读取聊天正文：${progress.currentCharacterName ?? '角色'}`
        : progress.phase === 'chat-list'
          ? `正在读取聊天列表：${progress.currentCharacterName ?? '角色'}`
          : '正在读取角色卡';

  return (
    <section className="panel library-load-panel">
      <div className="section-title-row">
        <div>
          <h3>{label}</h3>
          <p>
            {loaded}/{progress.totalCharacters ?? 0} 张角色卡，已读取 {progress.loadedChats ?? 0} 个聊天
          </p>
        </div>
        <span>{percent}%</span>
      </div>
      <div className="load-progress-bar" aria-label="酒馆数据读取进度">
        <span style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}

function LibraryView({
  stats,
  cards,
  selectedCardId,
  analysisResults,
  isSillyTavernMode,
  libraryProgress,
  onSelect,
}: {
  stats: { cardCount: number; scenarioCount: number; chatCount: number };
  cards: NormalizedCharacterCard[];
  selectedCardId?: string;
  analysisResults: CardAnalysisResult[];
  isSillyTavernMode: boolean;
  libraryProgress: SillyTavernLibraryProgress;
  onSelect: (cardId: string) => void;
}) {
  return (
    <>
      <header className="page-header compact">
        <h2>卡库</h2>
        <p>{isSillyTavernMode ? '正在读取酒馆角色卡和聊天记录，读完后会自动刷新卡库。' : '先把卡面、开场白和聊天入口捋清楚。'}</p>
      </header>
      {isSillyTavernMode && <LibraryLoadProgress progress={libraryProgress} />}
      <div className="metric-row">
        <Metric label="角色卡" value={stats.cardCount} />
        <Metric label="聊天记录" value={Math.max(stats.chatCount, libraryProgress.loadedChats ?? 0)} />
        <Metric label="已分析" value={analysisResults.filter((result) => isAnalyzedResult(result)).length} />
        <Metric label="待处理" value={Math.max(0, cards.length - analysisResults.filter((result) => isAnalyzedResult(result)).length)} />
      </div>
      <div className="card-grid">
        {cards.map((card) => {
          const usage = analysisResults.find((result) => result.cardId === card.id)?.usage;
          const analysis = analysisResults.find((result) => result.cardId === card.id);
          const analyzed = isAnalyzedResult(analysis);
          const displayTags = analyzed && analysis ? [...analysis.baseTags, ...(analysis.suggestedTags ?? [])] : [];
          const hottestScenario = usage?.scenarioStats
            .filter((scenario) => scenario.chatCount > 0)
            .sort((a, b) => b.totalMessages - a.totalMessages)[0];
          const playedScenarioCount = usage?.scenarioStats.filter((scenario) => scenario.chatCount > 0).length ?? 0;
          return (
            <button
              className={`library-card ${selectedCardId === card.id ? 'selected' : ''}`}
              key={card.id}
              onClick={() => onSelect(card.id)}
              type="button"
            >
              <div className="card-topline">
                <span className="type-pill">{analysis ? aiCardTypeLabel[analysis.cardType] : cardTypeLabel[card.cardType]}</span>
                <span className={analyzed ? 'status-pill analyzed' : 'status-pill pending'}>{analyzed ? '已分析' : '待处理'}</span>
              </div>
              <h3>{card.name}</h3>
              <p>{analyzed ? analysis?.oneLineSummary : '等待 AI 给这张卡写一句话。'}</p>
              {hottestScenario && <p className="hottest-line">最常玩：{hottestScenario.openingTitle}</p>}
              <p className="library-card-meta">
                {playedScenarioCount > 0
                  ? `${playedScenarioCount} 条已匹配线路`
                  : (usage?.chatCount ?? 0) > 0
                    ? `${usage?.chatCount ?? 0} 个聊天，线路待补充`
                    : '暂无聊天记录'}
              </p>
              <div className="tag-list">
                {displayTags.slice(0, 5).map((tag) => (
                  <span key={`${card.id}-${tag.label}`}>{tag.label}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function DetailView({
  card,
  config,
  analysisResults,
  onAnalysisComplete,
  onUsageUpdate,
}: {
  card: NormalizedCharacterCard;
  config: ApiConfig;
  analysisResults: CardAnalysisResult[];
  onAnalysisComplete: (results: CardAnalysisResult[]) => void;
  onUsageUpdate: (cardId: string, usage: CharacterUsage) => void;
}) {
  const analysis = analysisResults.find((result) => result.cardId === card.id);
  const usage = analysis?.usage;
  const candidateTags = analysis?.localCandidateTags ?? recallCandidateTags(card);
  const analyzed = isAnalyzedResult(analysis);
  const displayTags = analysis ? [...analysis.baseTags, ...analysis.worldTags, ...analysis.castTags] : [];
  const analysisInput = useMemo(() => buildCardAnalysisInput(card, usage), [card, usage]);
  const openingDisplayById = useMemo(
    () => new Map(analysisInput.openings.map((opening) => [opening.scenarioId, opening])),
    [analysisInput],
  );
  const openingSummaryById = useMemo(() => buildOpeningSummaryMap(card), [card]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRefiningUsage, setIsRefiningUsage] = useState(false);
  const [hasRefinedUsage, setHasRefinedUsage] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [analysisStatusMessage, setAnalysisStatusMessage] = useState('');
  const showDebugPanel = config.enableDebugMode;
  const debugInfo = analysis?.debug ?? buildCardAnalysisDebugPreview(card, config, usage);

  async function analyzeThisCard() {
    setIsAnalyzing(true);
    setAnalysisStatus('loading');
    setAnalysisStatusMessage('正在把这张卡送去 AI 分析。');
    try {
      const usageByCardId = usage ? new Map([[card.id, usage]]) : undefined;
      const results = await analyzeCardsInBatches([card], config, undefined, usageByCardId);
      onAnalysisComplete(results);
      const hasRequestFailure = results.some((result) => result.debug?.error);
      setAnalysisStatus(hasRequestFailure ? 'error' : 'success');
      setAnalysisStatusMessage(
        hasRequestFailure
          ? '分析请求失败，请在设置里打开开发调试后查看错误信息。'
          : '分析完成，已更新标签和一句话。',
      );
    } catch (error) {
      setAnalysisStatus('error');
      setAnalysisStatusMessage(error instanceof Error ? error.message : '分析失败。');
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function refineScenarioUsage() {
    setIsRefiningUsage(true);
    setAnalysisStatus('loading');
    setAnalysisStatusMessage('正在读取这张卡的聊天摘要，用第一条角色消息匹配线路。');
    try {
      const refinedUsage = await loadSillyTavernCardUsage(card);
      if (!refinedUsage) {
        throw new Error('没有读到可用的聊天记录。');
      }
      onUsageUpdate(card.id, refinedUsage);
      setHasRefinedUsage(true);
      setAnalysisStatus('success');
      setAnalysisStatusMessage('线路统计已补充。');
    } catch (error) {
      setAnalysisStatus('error');
      setAnalysisStatusMessage(error instanceof Error ? error.message : '线路统计补充失败。');
    } finally {
      setIsRefiningUsage(false);
    }
  }

  return (
    <>
      <header className="page-header compact">
        <h2>{card.name}</h2>
        <p>{analyzed ? analysis?.oneLineSummary : '已读取使用记录，等待 AI 分析。'}</p>
      </header>
      <section className="panel">
        <div className="section-title-row">
          <div>
            <h3>角色印象</h3>
            <p>{analyzed ? 'AI 已经基于角色卡内容给出摘要和标签。' : '这张卡还没分析，先保留使用记录。'}</p>
          </div>
          <span>{analysis ? aiCardTypeLabel[analysis.cardType] : cardTypeLabel[card.cardType]}</span>
        </div>
        {displayTags.length > 0 ? <AiTagList tags={displayTags} /> : <p className="empty-copy">还没有 AI 标签。</p>}
        <button className="primary-action" type="button" onClick={analyzeThisCard} disabled={isAnalyzing}>
          <PlayCircle size={18} />
          {isAnalyzing ? 'AI 分析中' : 'AI 分析这张卡'}
        </button>
        {(usage?.chatCount ?? 0) > 0 && (
          <button className="secondary-action" type="button" onClick={refineScenarioUsage} disabled={isRefiningUsage}>
            <BarChart3 size={18} />
            {isRefiningUsage ? '补充线路中' : '补充线路统计'}
          </button>
        )}
        {analysisStatus !== 'idle' && (
          <p className={`analysis-status ${analysisStatus}`}>
            {analysisStatus === 'loading' ? '进行中' : analysisStatus === 'success' ? '完成' : '失败'}：{analysisStatusMessage}
          </p>
        )}
      </section>
      {showDebugPanel && <AiDebugPanel debugInfo={debugInfo} />}
      {showDebugPanel && analysis && (
        <section className="panel ai-panel">
          <div className="section-title-row">
            <div>
              <h3>开发调试：AI 结构化结果</h3>
              <p>这块用于查模型返回的原始结构，稳定使用时可以在设置里关闭。</p>
            </div>
            <span>{analysis.baseTags.length} 个 baseTags</span>
          </div>
          <div className="analysis-summary-grid">
            <span>cardType</span>
            <strong>{analysis.cardType}</strong>
            <span>oneLineSummary</span>
            <strong>{analysis.oneLineSummary}</strong>
          </div>
          <AiTagList tags={analysis.baseTags} />
          {(analysis.suggestedTags?.length ?? 0) > 0 && (
            <div className="scenario-tag-list">
              <h4>suggestedTags</h4>
              <AiSuggestedTagList tags={analysis.suggestedTags ?? []} />
            </div>
          )}
          {analysis.scenarioOneLineSummaries.length > 0 && (
            <div className="scenario-summary-list">
              <h4>scenarioOneLineSummaries</h4>
              {analysis.scenarioOneLineSummaries.map((summary) => (
                <article key={summary.scenarioId}>
                  <strong>{card.scenarioOpenings.find((opening) => opening.id === summary.scenarioId)?.title ?? summary.scenarioId}</strong>
                  <p>{summary.summary}</p>
                </article>
              ))}
            </div>
          )}
          {analysis.warnings.length > 0 && (
            <div className="warning-list">
              {analysis.warnings.map((warning) => (
                <span key={warning}>{warning}</span>
              ))}
            </div>
          )}
        </section>
      )}
      <div className="detail-layout">
        <section className="panel">
          <h3>线路识别</h3>
          {(usage?.chatCount ?? 0) > 0 && !hasRefinedUsage && (usage?.scenarioStats.filter((scenario) => scenario.chatCount > 0).length ?? 0) === 0 && (
            <p className="empty-copy">已读取到 {usage?.chatCount ?? 0} 个聊天，但尚未精确匹配到线路。点击“补充线路统计”后，会读取这张卡的聊天摘要来匹配。</p>
          )}
          <div className="opening-list">
            {card.scenarioOpenings.filter((opening) => opening.source !== 'first_mes').map((opening) => {
              const scenario = usage?.scenarioStats.find((item) => item.scenarioId === opening.id);
              const displayOpening = openingDisplayById.get(opening.id);
              const routeSummary = openingSummaryById.get(opening.id);
              const displayText = routeSummary ?? displayOpening?.contentExcerpt ?? opening.text;
              return (
                <article className="opening-item" key={opening.id}>
                  <div>
                    <strong>{opening.title}</strong>
                    <p>{displayText}</p>
                    {routeSummary && routeSummary !== opening.text && <small>已使用默认开场里的线路摘要；没有摘要的线路才回退显示完整开场白。</small>}
                  </div>
                  <span>{scenario ? `${scenario.totalMessages} 条消息` : hasRefinedUsage ? '0 条消息' : '待补充'}</span>
                </article>
              );
            })}
          </div>
        </section>
        <section className="panel">
          <h3>聊天行为统计</h3>
          <div className="usage-stack">
            <Metric label="聊天数" value={usage?.chatCount ?? 0} />
            <Metric label="总消息" value={usage?.totalMessages ?? 0} />
            <Metric label="活跃天数" value={usage?.activeDays ?? 0} />
            <Metric label="距上次玩" value={formatRelativeDays(usage?.lastActiveAt)} />
          </div>
          <div className="notes-box">
            <BarChart3 size={18} />
            <p>这里只统计你反复点了哪些角色和线路，不偷看聊天正文做人格分析。边界感有了，产品就不油。</p>
          </div>
        </section>
      </div>
      {showDebugPanel && <section className="panel candidate-panel">
        <div className="section-title-row">
          <div>
            <h3>本地先抓到的嫌疑词</h3>
            <p>这些还不是最终审判，只是 CharaLog 先在你卡里闻到的味儿。</p>
          </div>
          <span>{candidateTags.length} 个候选</span>
        </div>
        <CandidateTagTable candidateTags={candidateTags} />
      </section>}
    </>
  );
}

function stringifyDebug(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function AiDebugPanel({ debugInfo }: { debugInfo: AiAnalysisDebugInfo }) {
  const usage = debugInfo.apiUsage;

  return (
    <section className="panel debug-panel">
      <div className="section-title-row">
        <div>
          <h3>开发调试：看看它到底把什么发给了 AI</h3>
          <p>这里是给你查案用的。正常用户不用看，但我们现在需要确认它有没有乱发、有没有浪费 token、有没有被模型糊弄。</p>
        </div>
        <span>Debug</span>
      </div>
      <div className="debug-metrics">
        <Metric label="system tokens" value={debugInfo.tokenEstimate.systemPromptTokens} />
        <Metric label="user tokens" value={debugInfo.tokenEstimate.userPromptTokens} />
        <Metric label="input total" value={debugInfo.tokenEstimate.totalInputTokens} />
        <Metric label="output limit" value={debugInfo.tokenEstimate.estimatedOutputTokenLimit} />
        <Metric label="estimated total" value={debugInfo.tokenEstimate.estimatedTotalTokens} />
      </div>
      <div className="debug-input-preview">
        <h4>CardAnalysisInput 预览</h4>
        <div className="normalized-grid">
          <span>cardId</span>
          <strong>{debugInfo.cardAnalysisInputPreview.cardId}</strong>
          <span>name</span>
          <strong>{debugInfo.cardAnalysisInputPreview.name}</strong>
          <span>cardTypeHint</span>
          <strong>{cardTypeLabel[debugInfo.cardAnalysisInputPreview.cardTypeHint]}</strong>
          <span>evidence sections</span>
          <strong>{debugInfo.cardAnalysisInputPreview.evidenceSectionCount}</strong>
          <span>selected openings</span>
          <strong>{debugInfo.cardAnalysisInputPreview.selectedOpeningsCount}</strong>
          <span>skipped openings</span>
          <strong>{debugInfo.cardAnalysisInputPreview.skippedOpeningsCount}</strong>
          <span>candidateTags</span>
          <strong>{debugInfo.cardAnalysisInputPreview.candidateTagsCount}</strong>
        </div>
        <details>
          <summary>source lengths / skipped openings</summary>
          <pre>{stringifyDebug({
            sourceLengths: debugInfo.cardAnalysisInputPreview.sourceLengths,
            skippedOpeningsSummary: debugInfo.cardAnalysisInputPreview.skippedOpeningsSummary,
          })}</pre>
        </details>
        <div className="debug-chip-list">
          {debugInfo.cardAnalysisInputPreview.evidenceSectionsPreview.map((section, index) => (
            <span key={`${section.sourceType}-${section.categoryHint}-${index}`}>
              {section.sourceType} / {section.categoryHint}: {section.length} chars / score {section.score}
            </span>
          ))}
        </div>
        <div className="debug-chip-list">
          {debugInfo.cardAnalysisInputPreview.openingExcerptLengths.map((opening) => (
            <span key={opening.scenarioId}>
              {opening.title}: {opening.length} / {opening.selectionReason}
            </span>
          ))}
        </div>
        <div className="debug-chip-list">
          {debugInfo.cardAnalysisInputPreview.candidateTagsPreview.map((tag) => (
            <span key={`${tag.label}-${tag.scopeHint}`}>
              {tag.label} / {tag.category} / {tag.score}
            </span>
          ))}
        </div>
      </div>
      <div className="debug-usage">
        {usage ? (
          <>
            <span>prompt_tokens: {usage.prompt_tokens ?? 'n/a'}</span>
            <span>completion_tokens: {usage.completion_tokens ?? 'n/a'}</span>
            <span>total_tokens: {usage.total_tokens ?? 'n/a'}</span>
          </>
        ) : (
          <span>还没有 usage 返回。</span>
        )}
      </div>
      {debugInfo.error && (
        <div className="debug-error">
          <strong>请求失败</strong>
          <span>status code: {debugInfo.error.statusCode ?? 'n/a'}</span>
          <span>retry count: {debugInfo.error.retryCount}</span>
          <span>failed batch index: {debugInfo.error.failedBatchIndex ?? 'n/a'}</span>
          <p>{debugInfo.error.message}</p>
        </div>
      )}
      <details>
        <summary>messages 数组</summary>
        <pre>{stringifyDebug(debugInfo.messages)}</pre>
      </details>
      <details>
        <summary>system prompt</summary>
        <pre>{debugInfo.systemPrompt}</pre>
      </details>
      <details>
        <summary>user prompt / CardAnalysisInput JSON</summary>
        <pre>{debugInfo.userPrompt}</pre>
      </details>
      <details>
        <summary>request payload 预览</summary>
        <pre>{stringifyDebug(debugInfo.requestPayloadPreview)}</pre>
      </details>
      <details>
        <summary>Raw API Response</summary>
        <pre>{debugInfo.rawApiResponse ? stringifyDebug(debugInfo.rawApiResponse) : '还没有 raw response。'}</pre>
      </details>
      <details>
        <summary>Parsed CardAnalysisResult</summary>
        <pre>{debugInfo.parsedCardAnalysisResult ? stringifyDebug(debugInfo.parsedCardAnalysisResult) : '尚未解析。'}</pre>
      </details>
      <details>
        <summary>Parse warnings / validation errors</summary>
        <pre>{stringifyDebug({ parseWarnings: debugInfo.parseWarnings, validationErrors: debugInfo.validationErrors })}</pre>
      </details>
    </section>
  );
}

function TasteProfileDebugPanel({ debugInfo }: { debugInfo: NonNullable<TasteProfile['debug']> }) {
  const usage = debugInfo.apiUsage;

  return (
    <section className="panel debug-panel">
      <div className="section-title-row">
        <div>
          <h3>开发调试：看看 XP 小票到底把什么发给了 AI</h3>
          <p>这里只展示统计摘要、提示词、token 预估和原始返回。API Key 不进页面，也不进 console。</p>
        </div>
        <span>Profile Debug</span>
      </div>
      <div className="debug-metrics">
        <Metric label="system tokens" value={debugInfo.tokenEstimate.systemPromptTokens} />
        <Metric label="user tokens" value={debugInfo.tokenEstimate.userPromptTokens} />
        <Metric label="input total" value={debugInfo.tokenEstimate.totalInputTokens} />
        <Metric label="output limit" value={debugInfo.tokenEstimate.estimatedOutputTokenLimit} />
        <Metric label="estimated total" value={debugInfo.tokenEstimate.estimatedTotalTokens} />
      </div>
      <div className="debug-usage">
        {usage ? (
          <>
            <span>prompt_tokens: {usage.prompt_tokens ?? 'n/a'}</span>
            <span>completion_tokens: {usage.completion_tokens ?? 'n/a'}</span>
            <span>total_tokens: {usage.total_tokens ?? 'n/a'}</span>
          </>
        ) : (
          <span>还没有 usage 返回。</span>
        )}
      </div>
      {debugInfo.error && (
        <div className="debug-error">
          <strong>请求失败</strong>
          <span>status code: {debugInfo.error.statusCode ?? 'n/a'}</span>
          <span>retry count: {debugInfo.error.retryCount}</span>
          <p>{debugInfo.error.message}</p>
        </div>
      )}
      <details>
        <summary>messages 数组</summary>
        <pre>{stringifyDebug(debugInfo.messages)}</pre>
      </details>
      <details>
        <summary>system prompt</summary>
        <pre>{debugInfo.systemPrompt}</pre>
      </details>
      <details>
        <summary>user prompt / TasteProfile JSON</summary>
        <pre>{debugInfo.userPrompt}</pre>
      </details>
      <details>
        <summary>request payload 预览</summary>
        <pre>{stringifyDebug(debugInfo.requestPayloadPreview)}</pre>
      </details>
      <details>
        <summary>Raw API Response</summary>
        <pre>{debugInfo.rawApiResponse ? stringifyDebug(debugInfo.rawApiResponse) : '还没有 raw response。'}</pre>
      </details>
      <details>
        <summary>Parsed TasteProfile</summary>
        <pre>{debugInfo.parsedTasteProfile ? stringifyDebug(debugInfo.parsedTasteProfile) : '尚未解析。'}</pre>
      </details>
      <details>
        <summary>Parse warnings / validation errors</summary>
        <pre>{stringifyDebug({ parseWarnings: debugInfo.parseWarnings, validationErrors: debugInfo.validationErrors })}</pre>
      </details>
    </section>
  );
}

function AiTagList({ tags }: { tags: CardAnalysisResult['baseTags'] }) {
  if (tags.length === 0) {
    return <p className="empty-copy">AI 没有选出 baseTag，先看候选标签和 Debug Panel。</p>;
  }

  return (
    <div className="ai-tag-list">
      {tags.map((tag) => (
        <article key={`${tag.label}-${tag.scope}`}>
          <strong>{tag.label}</strong>
          <span>{tag.category}</span>
          <b>{Math.round(tag.confidence * 100)}%</b>
          <p>{tag.reason}</p>
        </article>
      ))}
    </div>
  );
}

function AiSuggestedTagList({ tags }: { tags: CardAnalysisResult['suggestedTags'] }) {
  return (
    <div className="ai-tag-list">
      {tags.map((tag) => (
        <article key={`${tag.label}-${tag.scope}`}>
          <strong>{tag.label}</strong>
          <span>{tag.category || tag.scope}</span>
          <b>{Math.round(tag.confidence * 100)}%</b>
          <p>{tag.reason}</p>
          <p>{tag.evidence}</p>
        </article>
      ))}
    </div>
  );
}

function AnalysisView({
  cards,
  config,
  analysisResults,
  onComplete,
  isSillyTavernMode,
}: {
  cards: NormalizedCharacterCard[];
  config: ApiConfig;
  analysisResults: CardAnalysisResult[];
  onComplete: (results: CardAnalysisResult[]) => void;
  isSillyTavernMode: boolean;
}) {
  const [analysisScope, setAnalysisScope] = useState<'all' | 'manual'>('manual');
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(() => new Set());
  const [draftSelectedCardIds, setDraftSelectedCardIds] = useState<Set<string>>(() => new Set());
  const [progress, setProgress] = useState<BatchAnalysisProgress>({
    cardsRead: cards.length,
    cardsToAnalyze: cards.length,
    currentBatch: 0,
    totalBatches: Math.ceil(cards.length / config.batchSize),
    batchSize: config.batchSize,
    maxBatchInputTokens: 0,
    completedCards: 0,
    failedBatches: 0,
    successfulCards: 0,
    failedCards: 0,
    status: 'idle',
  });
  const [results, setResults] = useState<CardAnalysisResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const usageByCardId = useMemo(
    () =>
      new Map(
        analysisResults
          .filter((result) => result.usage)
          .map((result) => [result.cardId, result.usage as NonNullable<CardAnalysisResult['usage']>]),
      ),
    [analysisResults],
  );
  const playedCards = useMemo(() => cards.filter((card) => (usageByCardId.get(card.id)?.userMessages ?? 0) > 0), [cards, usageByCardId]);
  const cardsToAnalyze = useMemo(() => {
    if (analysisScope === 'all') {
      return cards;
    }
    return cards.filter((card) => selectedCardIds.has(card.id));
  }, [analysisScope, cards, selectedCardIds]);

  useEffect(() => {
    setSelectedCardIds((current) => {
      const validIds = new Set(cards.map((card) => card.id));
      const next = new Set(Array.from(current).filter((id) => validIds.has(id)));
      return next;
    });
    setDraftSelectedCardIds((current) => {
      const validIds = new Set(cards.map((card) => card.id));
      return new Set(Array.from(current).filter((id) => validIds.has(id)));
    });
  }, [cards]);

  useEffect(() => {
    setProgress((current) => ({
      ...current,
      cardsRead: cards.length,
      cardsToAnalyze: cardsToAnalyze.length,
      totalBatches: Math.ceil(cardsToAnalyze.length / config.batchSize),
      batchSize: config.batchSize,
    }));
  }, [cards.length, cardsToAnalyze.length, config.batchSize]);

  async function runAnalysis() {
    setIsRunning(true);
    setResults([]);
    setProgress({
      cardsRead: cards.length,
      cardsToAnalyze: cardsToAnalyze.length,
      currentBatch: 0,
      totalBatches: Math.ceil(cardsToAnalyze.length / config.batchSize),
      batchSize: config.batchSize,
      maxBatchInputTokens: 0,
      completedCards: 0,
      failedBatches: 0,
      successfulCards: 0,
      failedCards: 0,
      status: 'running',
    });
    const nextResults = await analyzeCardsInBatches(cardsToAnalyze, config, setProgress, usageByCardId);
    setResults(nextResults);
    onComplete(nextResults);
    setIsRunning(false);
  }

  return (
    <>
      <header className="page-header compact">
        <h2>分析</h2>
        <p>{isSillyTavernMode ? '批处理会调用酒馆当前模型。可以先只分析玩过的卡，省 API。' : '批处理会调用你配置的 OpenAI-compatible 接口。最终 XP 小票先别急，这里只审卡片级标签。'}</p>
      </header>
      <section className="panel analysis-panel">
        <div className="analysis-scope-panel">
          <div className="segmented-control" role="group" aria-label="分析范围">
            <button className={analysisScope === 'all' ? 'active' : ''} type="button" onClick={() => setAnalysisScope('all')}>
              全部卡片
            </button>
            <button className={analysisScope === 'manual' ? 'active' : ''} type="button" onClick={() => setAnalysisScope('manual')}>
              手动选择
            </button>
          </div>
          <p>
            当前将分析 {cardsToAnalyze.length} 张卡。全部 {cards.length} 张，有用户发言的卡 {playedCards.length} 张。
          </p>
          {analysisScope === 'manual' && (
            <>
              <div className="manual-card-toolbar">
                <button type="button" onClick={() => setDraftSelectedCardIds(new Set(playedCards.map((card) => card.id)))}>
                  选择玩过
                </button>
                <button type="button" onClick={() => setDraftSelectedCardIds(new Set(cards.map((card) => card.id)))}>
                  全选
                </button>
                <button type="button" onClick={() => setDraftSelectedCardIds(new Set())}>
                  清空
                </button>
                <button className="confirm-selection-button" type="button" onClick={() => setSelectedCardIds(new Set(draftSelectedCardIds))}>
                  确定选择
                </button>
                <strong>已勾选 {draftSelectedCardIds.size} 张 / 已应用 {selectedCardIds.size} 张</strong>
              </div>
              <div className="manual-card-picker">
                {cards.map((card) => {
                  const checked = draftSelectedCardIds.has(card.id);
                  return (
                    <label key={card.id}>
                      <input
                        checked={checked}
                        type="checkbox"
                        onChange={(event) => {
                          setDraftSelectedCardIds((current) => {
                            const next = new Set(current);
                            if (event.target.checked) {
                              next.add(card.id);
                            } else {
                              next.delete(card.id);
                            }
                            return next;
                          });
                        }}
                      />
                      <span>{card.name}</span>
                      <small>{usageByCardId.get(card.id)?.chatCount ?? 0} 聊天</small>
                    </label>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="metric-row">
          <Metric label="已读取卡片" value={progress.cardsRead} />
          <Metric label="准备分析" value={progress.cardsToAnalyze} />
          <Metric label="当前 batchSize" value={progress.batchSize} />
          <Metric label="批次 token 上限" value={progress.maxBatchInputTokens || '待计算'} />
        </div>
        <div className="progress-strip">
          <span>
            当前第 {progress.currentBatch} 批 / 共 {progress.totalBatches} 批
          </span>
          <strong>{progress.successfulCards} 张成功</strong>
          <span>{progress.failedCards} 张失败</span>
          <span>{progress.status === 'failed' ? '已停止' : progress.status === 'completed' ? '已完成' : progress.status === 'running' ? '运行中' : '未开始'}</span>
          {progress.currentCardName && <span>当前：{progress.currentCardName}</span>}
        </div>
        {progress.errorMessage && <p className="analysis-status error">已停止：{progress.errorMessage}</p>}
        <p className="dataset-hint">
          实际批次数会同时受 batchSize 和 token 安全上限影响；Gemini/Flash 模型会使用更高的本地批次上限。
        </p>
        <button className="primary-action" type="button" onClick={runAnalysis} disabled={isRunning || cardsToAnalyze.length === 0}>
          <PlayCircle size={18} />
          {isRunning ? '分析中' : `开始分析 ${cardsToAnalyze.length} 张`}
        </button>
      </section>
      {results.length > 0 && (
        <section className="panel candidate-panel">
          <div className="section-title-row">
            <div>
              <h3>批处理返回</h3>
              <p>这是卡片级分析结果，不是最终画像。先别给自己颁奖，也别给模型递麦克风太久。</p>
            </div>
            <span>{results.length} 张</span>
          </div>
          <div className="analysis-result-list">
            {results.map((result) => (
              <article className={result.warnings.length > 0 ? 'analysis-result-warning' : ''} key={result.cardId}>
                <strong>{cards.find((card) => card.id === result.cardId)?.name ?? result.cardId}</strong>
                <div>
                  <p>{result.oneLineSummary}</p>
                  {result.warnings.length > 0 && <small>{result.warnings[0]}</small>}
                </div>
                <span>{result.baseTags.length} baseTags</span>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function CandidateTagTable({ candidateTags }: { candidateTags: CandidateTag[] }) {
  if (candidateTags.length === 0) {
    return <p className="empty-copy">本地没有召回候选标签，先检查卡面文本和词典 alias。</p>;
  }

  return (
    <div className="candidate-table" role="table" aria-label="候选标签">
      <div className="candidate-row header" role="row">
        <span>标签</span>
        <span>category</span>
        <span>score</span>
        <span>scopeHint</span>
        <span>matchedFields</span>
      </div>
      {candidateTags.map((tag) => (
        <div className="candidate-row" role="row" key={tag.tagId}>
          <strong>{tag.label}</strong>
          <span>{tag.category}</span>
          <span>{tag.score.toFixed(2)}</span>
          <span>{tag.scopeHint}</span>
          <span>{tag.matchedFields.join(', ')}</span>
        </div>
      ))}
    </div>
  );
}

function ProfileViewV2({
  cards,
  analysisResults,
  config,
  savedProfile,
  onProfileGenerated,
}: {
  cards: NormalizedCharacterCard[];
  analysisResults: CardAnalysisResult[];
  config: ApiConfig;
  savedProfile?: TasteProfile;
  onProfileGenerated: (profile: TasteProfile) => void;
}) {
  const localProfile = useMemo(() => buildTasteProfile(cards, analysisResults), [analysisResults, cards]);
  const [profile, setProfile] = useState<TasteProfile>(savedProfile ?? localProfile);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const showDebugPanel = config.enableDebugMode;
  const debugInfo = profile.debug ?? buildTasteProfileDebugPreview(cards, analysisResults, config);

  useEffect(() => {
    setProfile((current) => {
      const keepAiCopy = current.aiSections.length > 0 && current.analyzedCardCount === localProfile.analyzedCardCount;
      return {
        ...localProfile,
        title: keepAiCopy ? current.title : localProfile.title,
        summary: keepAiCopy ? current.summary : localProfile.summary,
        aiSections: keepAiCopy ? current.aiSections : localProfile.aiSections,
        debug: keepAiCopy ? current.debug : undefined,
      };
    });
  }, [localProfile]);

  async function generateAiReceipt() {
    setStatus('loading');
    setStatusMessage('正在根据已分析卡片生成 XP 小票。');
    try {
      const nextProfile = await generateTasteProfileWithAi(cards, analysisResults, config);
      setProfile(nextProfile);
      onProfileGenerated(nextProfile);
      saveTasteProfile(nextProfile);
      const hasError = Boolean(nextProfile.debug?.error);
      setStatus(hasError ? 'error' : 'success');
      setStatusMessage(hasError ? 'AI 生成失败，请查看 Profile Debug。' : 'XP 小票生成完成。');
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'XP 小票生成失败。');
    }
  }

  const displaySections =
    profile.aiSections.length > 0
      ? profile.aiSections
      : [
          {
            title: '本地预览',
            body: profile.summary,
            relatedTags: [],
          },
        ];

  return (
    <>
      <header className="page-header">
        <h2>{profile.title}</h2>
      </header>
      <section className="panel receipt-toolbar">
        <div>
          <h3>本地预览 + AI 说破</h3>
          <p>基于已分析卡片生成统计摘要，再让 AI 写小票；不读取完整聊天正文，也不做心理诊断。</p>
        </div>
        <button className="primary-action" type="button" onClick={generateAiReceipt} disabled={status === 'loading' || profile.analyzedCardCount === 0}>
          <Sparkles size={18} />
          {status === 'loading' ? '正在生成小票' : '生成说破文案'}
        </button>
      </section>
      {status !== 'idle' && (
        <p className={`analysis-status ${status}`}>
          {status === 'loading' ? '进行中' : status === 'success' ? '完成' : '失败'}：{statusMessage}
        </p>
      )}
      <div className="metric-row">
        <Metric label="已分析卡" value={profile.analyzedCardCount} />
        <Metric label="命中标签" value={profile.tagStats.length} />
        <Metric label="有记录卡" value={profile.characterUsages.length} />
      </div>
      <section className="receipt xp-receipt">
        {displaySections.map((section) => (
          <div className="receipt-line" key={section.title}>
            <span>{section.title}</span>
            <strong>{formatReceiptBody(section.body)}</strong>
          </div>
        ))}
      </section>
      <div className="profile-grid">
        <section className="panel">
          <div className="section-title-row">
            <div>
              <h3>高频标签</h3>
              <p>这是当前卡库里反复出现的口味线索。</p>
            </div>
            <span>Top {Math.min(5, profile.tagStats.length)}</span>
          </div>
          <div className="profile-stat-list">
            {profile.tagStats.slice(0, 5).map((tag) => (
              <article key={`${tag.label}-${tag.category}`}>
                <strong>{tag.label}</strong>
                <span>{tag.category}</span>
                <span>出现 {tag.frequency} 次</span>
              </article>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="section-title-row">
            <div>
              <h3>代表角色</h3>
              <p>这些卡不是普通路过，是在你的卡库里刷过存在感的。</p>
            </div>
          </div>
          <div className="representative-list">
            {profile.representativeCharacters.map((character) => (
              <article key={character.cardId}>
                <strong>{character.name}</strong>
                <p>{character.oneLineSummary}</p>
                <div className="tag-list">
                  {character.tags.slice(0, 6).map((tag) => (
                    <span key={`${character.cardId}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      {false && (
        <section className="panel">
          <div className="section-title-row">
            <div>
              <h3>代表线路</h3>
              <p>这里看的是被使用记录加权后的路线偏好。</p>
            </div>
          </div>
          <div className="representative-list">
            {profile.representativeScenarios.map((scenario) => (
              <article key={`${scenario.cardId}-${scenario.scenarioId}`}>
                <strong>
                  {scenario.cardName} / {scenario.scenarioName}
                </strong>
                <p>{scenario.summary ?? scenario.scenarioName}</p>
                <span>
                  {typeof scenario.totalMessages === 'number' ? `${scenario.totalMessages} 条消息` : '使用记录较少'}
                  {typeof scenario.chatCount === 'number' ? ` / ${scenario.chatCount} 个聊天` : ''}
                </span>
                <div className="tag-list">
                  {scenario.tags.slice(0, 6).map((tag) => (
                    <span key={`${scenario.scenarioId}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="panel absent-panel">
        <div className="section-title-row">
          <div>
            <h3>暂时没怎么出现</h3>
            <p>只从角色气质、情感走向、世界观题材、身份阶层、互动机制里抽样，不随机展示敏感偏好。</p>
          </div>
          <span>随机 {profile.absentTags.length} 个</span>
        </div>
        <div className="tag-list">
          {profile.absentTags.map((tag) => (
            <span key={tag.id}>{tag.label}</span>
          ))}
        </div>
      </section>
      {profile.warnings.length > 0 && (
        <section className="panel warning-list">
          {profile.warnings.slice(0, 12).map((warning) => (
            <span key={warning}>{warning}</span>
          ))}
        </section>
      )}
      {showDebugPanel && <TasteProfileDebugPanel debugInfo={debugInfo} />}
    </>
  );
}

function formatReceiptBody(body: string) {
  const percentPattern = /(?:^|\s)(?=[^，。；\n]{1,28}\s+\d{1,3}%\s*[-—])/gu;
  const percentMatches = [...body.matchAll(percentPattern)].filter((match) => (match.index ?? 0) > 0);
  const emojiPattern = /[👑🩹🐶🔥💼🚬🏆📊🔍📈💰🧾🧨🥂🗡️🌙⭐✨]/gu;
  const matches = percentMatches.length > 1 ? percentMatches : [...body.matchAll(emojiPattern)];
  const lines =
    matches.length > 1
      ? matches.map((match, index) => body.slice(match.index, matches[index + 1]?.index ?? body.length).trim()).filter(Boolean)
      : body
          .split(/(?=\s*\d+[.、])/u)
          .map((line) => line.trim())
          .filter(Boolean);

  if (lines.length <= 1) {
    return body;
  }

  return (
    <span className="receipt-body-lines">
      {lines.map((line, index) => (
        <span key={`${index}-${line.slice(0, 12)}`}>{line}</span>
      ))}
    </span>
  );
}

function SettingsView({ config, onChange }: { config: ApiConfig; onChange: (config: ApiConfig) => void }) {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [customBatchSize, setCustomBatchSize] = useState(config.batchSize.toString());
  const presetBatchSizes = [3, 5, 8, 10, 15];

  async function testConnection() {
    setConnectionStatus('testing');
    const ok = await testOpenAiCompatibleConnection(config);
    setConnectionStatus(ok ? 'success' : 'failed');
  }

  return (
    <>
      <header className="page-header compact">
        <h2>设置</h2>
        <p>配置你的 OpenAI-compatible 接口。API Key 只保存在本地浏览器里。</p>
      </header>
      <section className="panel settings-panel">
        <label htmlFor="baseUrl">Base URL</label>
        <input id="baseUrl" value={config.baseUrl} onChange={(event) => onChange({ ...config, baseUrl: event.target.value })} />
        <label htmlFor="apiKey">API Key</label>
        <input
          id="apiKey"
          type="password"
          value={config.apiKey}
          onChange={(event) => onChange({ ...config, apiKey: event.target.value })}
          placeholder="sk-..."
        />
        <label htmlFor="model">Model</label>
        <input id="model" value={config.model} onChange={(event) => onChange({ ...config, model: event.target.value })} />
        <div className="form-grid">
          <label htmlFor="timeoutMs">timeoutMs</label>
          <input
            id="timeoutMs"
            min={1000}
            step={1000}
            type="number"
            value={config.timeoutMs}
            onChange={(event) => onChange({ ...config, timeoutMs: Number(event.target.value) })}
          />
          <label htmlFor="maxRetries">maxRetries</label>
          <input
            id="maxRetries"
            min={0}
            max={10}
            type="number"
            value={config.maxRetries}
            onChange={(event) => onChange({ ...config, maxRetries: Number(event.target.value) })}
          />
        </div>
        <label>batchSize</label>
        <div className="segmented-control">
          {presetBatchSizes.map((size) => (
            <button
              className={config.batchSize === size ? 'active' : ''}
              key={size}
              type="button"
              onClick={() => {
                setCustomBatchSize(size.toString());
                onChange({ ...config, batchSize: size });
              }}
            >
              {size}
            </button>
          ))}
          <input
            aria-label="自定义 batchSize"
            min={1}
            max={64}
            type="number"
            value={customBatchSize}
            onChange={(event) => {
              setCustomBatchSize(event.target.value);
              onChange({ ...config, batchSize: Number(event.target.value) || 1 });
            }}
          />
        </div>
        <label className="checkbox-row">
          <input
            checked={config.enableDebugMode}
            type="checkbox"
            onChange={(event) => onChange({ ...config, enableDebugMode: event.target.checked })}
          />
          开发调试模式
        </label>
        <button className="primary-action" type="button" onClick={testConnection} disabled={connectionStatus === 'testing'}>
          <Wifi size={18} />
          {connectionStatus === 'testing' ? '测试中' : '测试连接'}
        </button>
        {connectionStatus === 'success' && <p className="connection-copy success">连接成功，可以开始分析。</p>}
        {connectionStatus === 'failed' && <p className="connection-copy failed">连接失败，请检查 Base URL、API Key 和模型名。</p>}
        <div className="status-grid">
          <span>设置存储</span>
          <strong>localStorage</strong>
          <span>分析响应</span>
          <strong>real API</strong>
        </div>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
