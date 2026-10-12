import React from 'react';
import { Sparkles, ArrowRight, FolderKanban, FileCode, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  totalProjects: number;
  completedTasks: number;
  totalTasks: number;
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalProjects,
  completedTasks,
  totalTasks,
  onNavigate,
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <section className="relative overflow-hidden pt-12 pb-14 border-b border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Kicker Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          기획자·1인 개발자를 위한 에이전틱 개발 & 파이프라인 매니저
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight text-balance">
          아이디어 기획부터 배포까지,<br />
          <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            엔드투엔드 자동화 파이프라인 관리
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
          인간은 비즈니스 로직과 제품 방향을 지휘하고, AI 에이전트와 CI/CD 파이프라인이
          코드 구현, 로컬 패키징, 릴리스 자동화를 완수합니다. 나만의 프로젝트를 등록하고 워크플로를 관리하세요.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => onNavigate('pipeline')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            파이프라인 4단계 보기 <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs sm:text-sm transition flex items-center gap-2"
          >
            <FolderKanban className="w-4 h-4 text-sky-400" />
            내 프로젝트 관리 ({totalProjects}개)
          </button>
          <button
            onClick={() => onNavigate('templates')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs sm:text-sm transition flex items-center gap-2"
          >
            <FileCode className="w-4 h-4 text-emerald-400" />
            규칙/PRD 템플릿 생성
          </button>
        </div>

        {/* Real Live Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 max-w-xl mx-auto gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">등록된 프로젝트</span>
            <span className="text-xl font-bold text-white font-mono tabular-nums">{totalProjects}</span>
            <span className="text-xs text-slate-400 ml-1">개</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-1">운영 원칙 체크</span>
            <span className="text-xl font-bold text-white font-mono tabular-nums">{completedTasks}</span>
            <span className="text-xs text-slate-400 ml-1">/ {totalTasks} 완료</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-400 block mb-1">파이프라인 준비도</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">{completionRate}%</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
