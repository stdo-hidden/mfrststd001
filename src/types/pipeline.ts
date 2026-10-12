export type PlatformType = 'web' | 'android' | 'cross-platform';

export type StageId = 1 | 2 | 3 | 4;

export interface StageTask {
  id: string;
  title: string;
  description: string;
  command?: string;
  badge?: string;
}

export interface PipelineStage {
  id: StageId;
  stepNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  primaryTools: string[];
  tasks: StageTask[];
  pitfalls: string[];
  bestPractices: string[];
}

export interface ProjectChecklistItem {
  id: string;
  stageId: StageId;
  text: string;
  completed: boolean;
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  platform: PlatformType;
  currentStage: StageId;
  repoUrl?: string;
  packageId?: string;
  notes: string;
  checklist: ProjectChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface GlobalChecklistItem {
  id: string;
  principle: 'commit' | 'secrets' | 'rules';
  title: string;
  description: string;
  category: '필수' | '권장' | '운영';
  completed: boolean;
}

export interface ResourceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'tool' | 'channel' | 'docs' | 'custom';
  tag: string;
  isCustom?: boolean;
}
