import React, { useState } from 'react';
import { UserProject, StageId, PlatformType } from '../types/pipeline';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  Layers, 
  Edit3, 
  Save, 
  Check,
  Calendar
} from 'lucide-react';

interface ProjectManagerProps {
  projects: UserProject[];
  onUpdateProjects: (projects: UserProject[]) => void;
  onOpenNewProject: () => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  onUpdateProjects,
  onOpenNewProject,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.length > 0 ? projects[0].id : ''
  );
  const [newChecklistText, setNewChecklistText] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleStageChange = (projectId: string, newStage: StageId) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          currentStage: newStage,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });
    onUpdateProjects(updated);
  };

  const handleToggleChecklist = (projectId: string, itemId: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        const nextChecklist = p.checklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        return {
          ...p,
          checklist: nextChecklist,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });
    onUpdateProjects(updated);
  };

  const handleAddChecklistItem = (projectId: string) => {
    if (!newChecklistText.trim()) return;
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          checklist: [
            ...p.checklist,
            {
              id: 'custom-' + Date.now(),
              stageId: p.currentStage,
              text: newChecklistText.trim(),
              completed: false,
            },
          ],
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });
    onUpdateProjects(updated);
    setNewChecklistText('');
  };

  const handleDeleteProject = (projectId: string) => {
    if (projects.length <= 1) {
      alert('최소 1개의 프로젝트는 유지되어야 합니다.');
      return;
    }
    if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
      const remaining = projects.filter((p) => p.id !== projectId);
      onUpdateProjects(remaining);
      if (selectedProjectId === projectId) {
        setSelectedProjectId(remaining[0].id);
      }
    }
  };

  const handleSaveNotes = (projectId: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          notes: editedNotes,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });
    onUpdateProjects(updated);
    setIsEditingNotes(false);
  };

  const startEditNotes = (currentNotes: string) => {
    setEditedNotes(currentNotes);
    setIsEditingNotes(true);
  };

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'web':
        return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      case 'android':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
      case 'cross-platform':
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const calculateProgress = (project: UserProject) => {
    if (!project.checklist || project.checklist.length === 0) return 0;
    const completed = project.checklist.filter((i) => i.completed).length;
    return Math.round((completed / project.checklist.length) * 100);
  };

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Project Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            내 개발 파이프라인 관리
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            진행 중인 1인 개발 프로젝트의 4단계 파이프라인 이행 상태와 작업 체크리스트를 관리합니다.
          </p>
        </div>
        <button
          onClick={onOpenNewProject}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          신규 프로젝트 추가
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project List Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            등록된 프로젝트 ({projects.length})
          </div>

          <div className="space-y-2">
            {projects.map((p) => {
              const progress = calculateProgress(p);
              const isSelected = activeProject && activeProject.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setIsEditingNotes(false);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {getPlatformIcon(p.platform)}
                      <span className="text-sm font-bold text-white truncate max-w-[170px]">
                        {p.title}
                      </span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-slate-800 text-indigo-300">
                      Stage {p.currentStage}/4
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1 mb-2.5">
                    {p.description}
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>진행률</span>
                      <span className="font-mono tabular-nums text-slate-200">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Details Main Panel */}
        {activeProject ? (
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium flex items-center gap-1">
                    {getPlatformIcon(activeProject.platform)}
                    {activeProject.platform.toUpperCase()}
                  </span>
                  {activeProject.packageId && (
                    <span className="text-xs font-mono text-slate-400">
                      {activeProject.packageId}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    수정: {activeProject.updatedAt}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {activeProject.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                    title="저장소 열기"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => handleDeleteProject(activeProject.id)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition"
                  title="프로젝트 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stage Selector Bar */}
            <div className="py-6 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                현재 파이프라인 단계 전환
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { stage: 1, label: '01 기획 확정' },
                  { stage: 2, label: '02 에이전트 코딩' },
                  { stage: 3, label: '03 로컬 빌드' },
                  { stage: 4, label: '04 CI/CD 배포' },
                ].map((s) => {
                  const isCurrent = activeProject.currentStage === s.stage;
                  const isPast = activeProject.currentStage > s.stage;
                  return (
                    <button
                      key={s.stage}
                      onClick={() => handleStageChange(activeProject.id, s.stage as StageId)}
                      className={`p-3 rounded-xl border text-left transition ${
                        isCurrent
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                          : isPast
                          ? 'bg-slate-900 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-mono mb-1 flex items-center justify-between">
                        <span>STAGE {s.stage}</span>
                        {isPast && <Check className="w-3 h-3 text-emerald-400" />}
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
                      </div>
                      <div className="text-xs font-bold truncate">{s.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checklist Section */}
            <div className="py-6 border-b border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  작업 체크리스트 ({activeProject.checklist.filter((c) => c.completed).length}/
                  {activeProject.checklist.length})
                </span>
                <span className="text-xs text-indigo-400 font-mono">
                  {calculateProgress(activeProject)}% 완료
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {activeProject.checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(activeProject.id, item.id)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition group"
                  >
                    <button className="text-slate-500 group-hover:text-indigo-400 transition">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <span
                      className={`text-xs flex-1 ${
                        item.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {item.text}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 font-mono">
                      S{item.stageId}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add checklist input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddChecklistItem(activeProject.id);
                  }}
                  placeholder="새로운 구현 과제 추가 (예: Vercel 도메인 연결)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAddChecklistItem(activeProject.id)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition"
                >
                  추가
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  에이전트 개발 메모 & 이슈 트래킹
                </span>
                {!isEditingNotes ? (
                  <button
                    onClick={() => startEditNotes(activeProject.notes)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    편집
                  </button>
                ) : (
                  <button
                    onClick={() => handleSaveNotes(activeProject.id)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    저장 완료
                  </button>
                )}
              </div>

              {isEditingNotes ? (
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-indigo-500"
                  placeholder="현재 겪고 있는 빌드 오류나 에이전트 수정 지침, API 스펙 메모를 입력하세요."
                />
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed min-h-[60px] whitespace-pre-wrap">
                  {activeProject.notes || '작성된 개발 메모가 없습니다. 편집 버튼을 눌러 메모를 남기세요.'}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
