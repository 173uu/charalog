export type CardType = 'single' | 'multi_scenario' | 'group' | 'world';

export interface CharacterCardRaw {
  id: string;
  name?: string;
  description?: string;
  tags?: string[];
  creator_notes?: string;
  first_mes?: string;
  alternate_greetings?: string[];
  character_book?: unknown;
  regex_scripts?: unknown[];
  data?: Partial<Omit<CharacterCardRaw, 'data'>>;
  [key: string]: unknown;
}

export interface TagEntry {
  id: string;
  label: string;
  source: 'card' | 'creator_notes' | 'description' | 'system';
  confidence: number;
}

export interface DictionaryTagEntry {
  id: string;
  label: string;
  category: TagCategory;
  family?: string;
  aliases: string[];
  negativeAliases?: string[];
  description?: string;
  examples?: string[];
  parentId?: string;
  priority?: number;
  scopePreference?: RecallScopePreference;
  status?: DictionaryTagStatus;
}

export interface DictionaryData {
  _meta?: {
    version?: string;
    source?: string;
    schema?: string;
    categories?: string[];
    families_used?: string[];
    notes?: string[];
  };
  tags: DictionaryTagEntry[];
}

export interface ScenarioOpening {
  id: string;
  characterId: string;
  title: string;
  text: string;
  source: 'first_mes' | 'alternate_greeting';
  index: number;
}

export interface NormalizedCharacterCard {
  id: string;
  name: string;
  description: string;
  tags: TagEntry[];
  creatorNotes: string;
  firstMessage: string;
  alternateGreetings: string[];
  scenarioOpenings: ScenarioOpening[];
  cardType: CardType;
  rawCard: CharacterCardRaw;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'character' | 'system';
  characterId?: string;
  content: string;
  createdAt: string;
}

export interface ChatRaw {
  id: string;
  characterId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ScenarioUsage {
  scenarioId: string;
  openingTitle: string;
  chatCount: number;
  totalMessages: number;
  userMessages: number;
  firstActiveAt?: string;
  lastActiveAt?: string;
  activeDays?: number;
  activeHourBuckets?: number[];
}

export type TagCategory = string;

export type RecallScopeHint = 'card' | 'scenario' | 'cast' | 'world' | 'unknown';
export type RecallScopePreference = RecallScopeHint | 'any';
export type DictionaryTagStatus = 'active' | 'draft' | 'deprecated' | 'disabled' | (string & {});

export type RecallMatchedField =
  | 'rawTags'
  | 'description'
  | 'creatorNotes'
  | 'systemPrompt'
  | 'firstMes'
  | 'alternateGreetingContent'
  | 'extensionsWorld';

export interface CharacterUsage {
  characterId: string;
  chatCount: number;
  totalMessages: number;
  userMessages: number;
  firstActiveAt?: string;
  lastActiveAt?: string;
  activeDays?: number;
  activeHourBuckets?: number[];
  scenarioStats: ScenarioUsage[];
}

export interface CandidateTag {
  tagId: string;
  label: string;
  category: TagCategory;
  family?: string;
  parentId?: string;
  priority?: number;
  scopePreference?: RecallScopePreference;
  score: number;
  scopeHint: RecallScopeHint;
  matchedFields: RecallMatchedField[];
  matchedSnippets: string[];
}

export type EvidenceCategoryHint =
  | 'identity'
  | 'personality'
  | 'relationship'
  | 'world'
  | 'interaction_rule'
  | 'boundary'
  | 'scenario_manifest'
  | 'style'
  | 'unknown';

export type EvidenceSourceType =
  | 'description'
  | 'personality'
  | 'scenario'
  | 'creatorNotes'
  | 'systemPrompt'
  | 'postHistoryInstructions'
  | 'characterBook'
  | 'firstMes'
  | 'alternateGreeting'
  | 'extensionsWorld';

export interface CardEvidenceSection {
  id: string;
  sourceType: EvidenceSourceType;
  sourceLabel: string;
  categoryHint: EvidenceCategoryHint;
  text: string;
  score: number;
  matchedTags: string[];
  reason: string;
}

export type OpeningSelectionReason = 'played' | 'first_valid' | 'candidate_tag_hit' | 'diverse_sample';
export type OpeningSkipReason = 'placeholder' | 'decorative_or_ui' | 'route_manifest' | 'duplicate' | 'unplayed_over_budget' | 'empty';

export interface FirstMesRouteManifestItem {
  index: number;
  rawText: string;
  routeLabel: string;
  userRole?: string;
  relationshipSetup?: string;
  worldBookHint?: string;
  difficultyHint?: string;
}

export interface FirstMesDigest {
  characterIntroEvidence: CardEvidenceSection[];
  routeManifest: FirstMesRouteManifestItem[];
  worldBookHints: string[];
  interactionHints: string[];
  discardedUiTextLength: number;
}

export interface SelectedOpeningDigest {
  scenarioId: string;
  title: string;
  source: ScenarioOpening['source'];
  index: number;
  textExcerpt: string;
  selectionReason: OpeningSelectionReason;
  matchedTags: string[];
  linkedEvidence?: CardEvidenceSection[];
  totalMessages?: number;
  chatCount?: number;
}

export interface SkippedOpeningDigest {
  scenarioId: string;
  title: string;
  reason: OpeningSkipReason;
}

export interface CardDigest {
  cardId: string;
  name: string;
  cardTypeHint: CardType;
  sourceLengths: Record<string, number>;
  firstMesDigest: FirstMesDigest;
  evidenceSections: CardEvidenceSection[];
  selectedOpenings: SelectedOpeningDigest[];
  skippedOpenings: SkippedOpeningDigest[];
  skippedOpeningsSummary: Record<OpeningSkipReason, number>;
}

export interface ScenarioTagGroup {
  scenarioId: string;
  scenarioTitle: string;
  tags: CandidateTag[];
}

export type AiCardType =
  | 'single_character'
  | 'single_character_multi_scenario'
  | 'multi_character'
  | 'world_setting'
  | 'fandom'
  | 'scenario_collection'
  | 'unknown';

export type AiTagScope = 'card' | 'scenario' | 'world' | 'cast';

export interface AiSelectedTag {
  label: string;
  category: string;
  scope: AiTagScope;
  confidence: number;
  reason: string;
}

export interface AiSuggestedTag {
  label: string;
  category?: string;
  scope: AiTagScope;
  confidence: number;
  reason: string;
  evidence: string;
}

export interface AiScenarioTagGroup {
  scenarioId: string;
  scenarioName: string;
  tags: AiSelectedTag[];
}

export interface ScenarioOneLineSummary {
  scenarioId: string;
  summary: string;
}

export interface CardAnalysisResult {
  cardId: string;
  cardType: AiCardType;
  baseTags: AiSelectedTag[];
  scenarioTags: AiScenarioTagGroup[];
  worldTags: AiSelectedTag[];
  castTags: AiSelectedTag[];
  suggestedTags: AiSuggestedTag[];
  oneLineSummary: string;
  scenarioOneLineSummaries: ScenarioOneLineSummary[];
  warnings: string[];
  localCandidateTags: CandidateTag[];
  usage?: CharacterUsage;
  generatedAt: string;
  sourceHash: string;
  debug?: AiAnalysisDebugInfo;
}

export interface TasteProfile {
  id: string;
  title: string;
  summary: string;
  baseTags: AiSelectedTag[];
  characterUsages: CharacterUsage[];
  analyzedCardCount: number;
  tagStats: TasteTagStat[];
  coOccurrences: TagCoOccurrence[];
  absentTags: AbsentTag[];
  representativeCharacters: RepresentativeCharacter[];
  representativeScenarios: RepresentativeScenario[];
  aiSections: TasteProfileAiSection[];
  warnings: string[];
  debug?: TasteProfileDebugInfo;
  generatedAt: string;
}

export interface TasteTagStat {
  label: string;
  category: string;
  scope: AiTagScope | 'mixed';
  frequency: number;
  cardCount: number;
  scenarioCount: number;
  weightedScore: number;
  representativeCardId?: string;
  representativeCardName?: string;
  representativeScenarioId?: string;
  representativeScenarioName?: string;
  reasons: string[];
}

export interface TagCoOccurrence {
  labels: [string, string];
  count: number;
  weightedScore: number;
  exampleCardIds: string[];
}

export interface AbsentTag {
  id: string;
  label: string;
  category: string;
  family?: string;
}

export interface RepresentativeCharacter {
  cardId: string;
  name: string;
  score: number;
  tags: string[];
  oneLineSummary: string;
}

export interface RepresentativeScenario {
  cardId: string;
  cardName: string;
  scenarioId: string;
  scenarioName: string;
  score: number;
  tags: string[];
  summary?: string;
  totalMessages?: number;
  chatCount?: number;
}

export interface TasteProfileAiSection {
  title: string;
  body: string;
  relatedTags: string[];
}

export interface TasteProfileDebugInfo {
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  systemPrompt: string;
  userPrompt: string;
  requestPayloadPreview: unknown;
  tokenEstimate: TokenEstimate;
  apiUsage?: ApiUsage;
  rawApiResponse?: unknown;
  parsedTasteProfile?: unknown;
  parseWarnings: string[];
  validationErrors: string[];
  error?: {
    statusCode?: number;
    message: string;
    retryCount: number;
  };
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
  timeoutMs: number;
  maxRetries: number;
  batchSize: number;
  enableDebugMode: boolean;
}

export interface TokenEstimate {
  systemPromptTokens: number;
  userPromptTokens: number;
  totalInputTokens: number;
  estimatedOutputTokenLimit: number;
  estimatedTotalTokens: number;
}

export interface ApiUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

export interface AiAnalysisDebugInfo {
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  systemPrompt: string;
  userPrompt: string;
  requestPayloadPreview: unknown;
  cardAnalysisInputPreview: {
    cardId: string;
    name: string;
    cardTypeHint: CardType;
    sourceLengths: Record<string, number>;
    evidenceSectionCount: number;
    evidenceSectionsPreview: Array<{
      sourceType: EvidenceSourceType;
      categoryHint: EvidenceCategoryHint;
      length: number;
      score: number;
      matchedTags: string[];
      reason: string;
    }>;
    firstMesRouteCount: number;
    firstMesIntroEvidenceCount: number;
    firstMesWorldBookHintCount: number;
    selectedOpeningsCount: number;
    skippedOpeningsCount: number;
    skippedOpeningsSummary: Record<OpeningSkipReason, number>;
    openingExcerptLengths: Array<{
      scenarioId: string;
      title: string;
      length: number;
      selectionReason: OpeningSelectionReason;
      hasRouteManifestItem?: boolean;
    }>;
    candidateTagsCount: number;
    candidateTagsPreview: Array<{
      label: string;
      category: string;
      score: number;
      scopeHint: RecallScopeHint;
      matchedFields: RecallMatchedField[];
    }>;
  };
  tokenEstimate: TokenEstimate;
  apiUsage?: ApiUsage;
  rawApiResponse?: unknown;
  parsedCardAnalysisResult?: unknown;
  parseWarnings: string[];
  validationErrors: string[];
  error?: {
    statusCode?: number;
    message: string;
    retryCount: number;
    failedBatchIndex?: number;
  };
}

export interface BatchAnalysisProgress {
  cardsRead: number;
  cardsToAnalyze: number;
  currentBatch: number;
  totalBatches: number;
  batchSize: number;
  maxBatchInputTokens: number;
  completedCards: number;
  failedBatches: number;
  successfulCards: number;
  failedCards: number;
  currentCardName?: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  errorMessage?: string;
}

export interface OpeningMatchResult {
  scenarioId?: string;
  confidence: number;
  detectionMethod: 'first_role_message_similarity' | 'no_character_message' | 'no_match';
}
