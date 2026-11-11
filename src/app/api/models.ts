// Shapes of the Linfra API's JSON. Money values are EUR per month.

export type IntentState =
  | 'PROPOSED' | 'PLANNED' | 'APPROVED' | 'APPLYING' | 'SUCCEEDED'
  | 'REJECTED' | 'EXPIRED' | 'FAILED' | 'NEEDS_ATTENTION';

export interface Trait {
  value?: string;
  minGb?: number;
  source: 'STATED' | 'INFERRED';
  reason: string;
}

export interface VmRequirements {
  vcpuMin: number;
  memoryGbMin: number;
  area: 'EU' | 'US' | 'ANY';
  environment: 'DEV' | 'STAGING' | 'PROD';
  maxMonthlyEur: number | null;
  estimatedEgressGbPerMonth: number;
  cpuProfile: Trait | null;
  architecture: Trait | null;
  storage: Trait | null;
  disk: Trait | null;
  purpose: string;
}

export interface CatalogEntry {
  provider: string;
  instanceType: string;
  region: string;
  vcpu: number;
  memoryGb: number;
  cpuModel: string;
  architecture: string;
  storage: string;
}

export interface CostBreakdown {
  instance: number;
  disk: number;
  egress: number;
  ipv4: number;
  total: number;
}

export interface RankedPick {
  entry: CatalogEntry;
  cost: CostBreakdown;
  diskGb: number;
  preferencesMet: string[];
  preferencesMissed: string[];
}

export interface Draft {
  requirements: VmRequirements;
  pick: RankedPick;
  explanation: string;
}

export interface Message {
  id: number;
  role: 'USER' | 'ASSISTANT';
  content: string;
  draft: Draft | null;
  createdAt: string;
}

export interface IntentSummary {
  id: string;
  state: IntentState;
  sourceMessageId: number | null;
}

export interface ConversationSummary {
  id: string;
  /** From the first message; null until the user writes something. */
  title: string | null;
  createdAt: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  intents: IntentSummary[];
}

export interface Intent {
  id: string;
  state: IntentState;
  /** Why the policy rejected it, why it waits for a human, or who approved it. */
  decisionReason: string | null;
  spec: Draft;
  conversationId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  intentId: string;
  provider: string;
  region: string;
  instanceType: string;
  cloudId: string;
  outputs: { ipv4?: string | null };
  status: 'ACTIVE' | 'DESTROYED' | 'MISSING';
  createdAt: string;
  lastSeenAt: string | null;
}

export type FindingAction =
  | 'DESTROY' | 'ADOPT' | 'DISMISS' | 'KEEP' | 'MARK_DESTROYED'
  | 'ACCEPT' | 'RETRY_NOW' | 'MARK_NEEDS_ATTENTION';

export interface Finding {
  id: string;
  type: 'ORPHAN' | 'DUPLICATE' | 'MISSING' | 'DRIFT' | 'STUCK';
  status: 'OPEN' | 'CLEARED' | 'RESOLVED';
  intentId: string | null;
  resourceId: string | null;
  cloudIds: string[];
  details: {
    reason?: string;
    differences?: Record<string, { expected: string; actual: string }>;
    state?: string;
    stuckForSeconds?: number;
  };
  firstSeenAt: string;
  lastSeenAt: string;
  resolvedAt: string | null;
  resolution: FindingAction | null;
  resolutionDetail: string | null;
  availableActions: FindingAction[];
}

/** Empty lists mean "any catalog value". */
export interface PolicyUpdate {
  allowedInstanceTypes: string[];
  allowedRegions: string[];
  monthlyBudgetEur: number;
  autoApproveMaxEur: number;
  requireApprovalForProd: boolean;
}

export interface Policy extends PolicyUpdate {
  /** True while the configured defaults apply. */
  isDefault: boolean;
  /** Running resources plus approved-but-not-created intents, per month. */
  committedSpendEur: number;
  catalogInstanceTypes: string[];
  catalogRegions: string[];
}
