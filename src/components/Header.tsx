import React from 'react';
import { Plus, Github } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewProject,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <a
          href="#pipeline"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('pipeline');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
            ⚡
          </span>
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            AI Pipeline Studio
          </span>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'pipeline'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            파이프라인 4단계
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'projects'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            프로젝트 관리
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'templates'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            템플릿 제너레이터
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'checklist'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            운영 원칙 체크
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'resources'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            핵심 레퍼런스
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <button
            onClick={onOpenNewProject}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            프로젝트 등록
          </button>
        </div>
      </div>
    </header>
  );
};
