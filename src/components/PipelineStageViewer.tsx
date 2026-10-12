import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../data/initialData';
import { PipelineStage, StageId } from '../types/pipeline';
import { Check, Copy, AlertTriangle, Lightbulb, Terminal, ArrowRight, Wrench } from 'lucide-react';

interface PipelineStageViewerProps {
  onApplyStageToProject?: (stageId: StageId) => void;
}

export const PipelineStageViewer: React.FC<PipelineStageViewerProps> = () => {
  const [selectedStageId, setSelectedStageId] = useState<StageId>(1);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const selectedStage: PipelineStage =
    PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const getStageColor = (id: StageId) => {
    switch (id) {
      case 1:
        return {
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/30',
          text: 'text-indigo-400',
          accent: 'bg-indigo-600',
        };
      case 2:
        return {
          bg: 'bg-sky-500/10',
          border: 'border-sky-500/30',
          text: 'text-sky-400',
          accent: 'bg-sky-600',
        };
      case 3:
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          accent: 'bg-emerald-600',
        };
      case 4:
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          accent: 'bg-purple-600',
        };
    }
  };

  return (
    <section className="py-12">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Core Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          4단계 자동화 파이프라인
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          각 단계를 클릭하여 구체적인 작업 스펙, 터미널 실행 명령어, 실패 방지 노하우를 확인하세요.
        </p>
      </div>

      {/* 4 Cards Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PIPELINE_STAGES.map((stage) => {
          const colors = getStageColor(stage.id);
          const isSelected = selectedStageId === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`text-left p-5 rounded-2xl border transition-all relative ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${colors.bg} ${colors.text}`}
                >
                  {stage.stepNumber}
                </span>
                <span className="text-[11px] text-slate-400">
                  {stage.subtitle}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{stage.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {stage.summary}
              </p>
              <div className="flex items-center text-xs font-medium text-indigo-400 gap-1 mt-auto">
                <span>{isSelected ? '상세 가이드 열림' : '가이드 확인'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Panel */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${getStageColor(selectedStage.id).bg} ${getStageColor(selectedStage.id).text}`}
              >
                STAGE {selectedStage.stepNumber}
              </span>
              <span className="text-xs text-slate-400">
                핵심 도구: {selectedStage.primaryTools.join(' · ')}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {selectedStage.title} 가이드라인
            </h3>
            <p className="text-sm text-slate-300 mt-1">{selectedStage.summary}</p>
          </div>
        </div>

        {/* Tasks & Command List */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-indigo-400" />
              단계별 핵심 활동 (Core Tasks)
            </h4>

            <div className="space-y-3">
              {selectedStage.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <span className="text-sm font-semibold text-white">
                      {task.title}
                    </span>
                    {task.badge && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 whitespace-nowrap">
                        {task.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2.5">
                    {task.description}
                  </p>
                  {task.command && (
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                      <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                        <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="whitespace-nowrap">{task.command}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(task.command!)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition shrink-0 flex items-center gap-1"
                        title="명령어 복사"
                      >
                        {copiedCommand === task.command ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>복사</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pitfalls & Best Practices Sidebar */}
          <div className="space-y-6">
            {/* Pitfalls */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                주의해야 할 함정 (Pitfalls)
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {selectedStage.pitfalls.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Practices */}
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <Lightbulb className="w-4 h-4 text-indigo-400" />
                모범 실천법 (Best Practices)
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {selectedStage.bestPractices.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
