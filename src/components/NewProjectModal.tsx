import React, { useState } from 'react';
import { UserProject, PlatformType } from '../types/pipeline';
import { Globe, Smartphone, Layers, Plus, X } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: UserProject) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('cross-platform');
  const [repoUrl, setRepoUrl] = useState('');
  const [packageId, setPackageId] = useState('com.myapp.app');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const newProject: UserProject = {
      id: 'proj-' + Date.now(),
      title: title.trim(),
      description: description.trim() || '신규 AI 개발 프로젝트',
      platform,
      currentStage: 1,
      repoUrl: repoUrl.trim() || undefined,
      packageId: packageId.trim() || undefined,
      notes: notes.trim() || 'Stage 1 기획 및 PRD.md 작성 진행 중.',
      checklist: [
        { id: 'c-init-1', stageId: 1, text: 'MVP 핵심 기능 3가지 한정', completed: false },
        { id: 'c-init-2', stageId: 1, text: '데이터 스키마 및 PRD.md 문서 작성', completed: false },
        { id: 'c-init-3', stageId: 2, text: '.clinerules 시스템 규칙 파일 구성', completed: false },
        { id: 'c-init-4', stageId: 2, text: 'Task 단위 에이전트 코딩 및 빌드 검증', completed: false },
        { id: 'c-init-5', stageId: 3, text: '정적 웹 빌드 및 Capacitor 동기화', completed: false },
        { id: 'c-init-6', stageId: 4, text: 'GitHub Secrets 설정 및 Actions 자동 빌드', completed: false },
      ],
      createdAt: today,
      updatedAt: today,
    };

    onAddProject(newProject);
    setTitle('');
    setDescription('');
    setRepoUrl('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              신규 AI 개발 프로젝트 등록
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              4단계 파이프라인으로 관리할 새로운 제품이나 서비스 정보를 입력하세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">
              프로젝트 명칭 <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: AI 번역 습관 챌린저, 핏로그 모바일"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-semibold">프로젝트 소개 & 핵심 문제</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="어떤 사용자의 어떤 문제를 해결하는 서비스인지 간략히 서술합니다."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">목표 플랫폼</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPlatform('cross-platform')}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                  platform === 'cross-platform'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>웹 + 앱 (크로스)</span>
              </button>
              <button
                type="button"
                onClick={() => setPlatform('android')}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                  platform === 'android'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>안드로이드 앱</span>
              </button>
              <button
                type="button"
                onClick={() => setPlatform('web')}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                  platform === 'web'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Globe className="w-4 h-4 text-sky-400" />
                <span>단독 웹앱</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">GitHub 저장소 URL (선택)</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">패키지 ID (Android)</label>
              <input
                type="text"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                placeholder="com.example.app"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-semibold">초기 개발 메모</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="현재 기획 상태, 참고 중인 오픈소스 또는 API 메모"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
            >
              프로젝트 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
