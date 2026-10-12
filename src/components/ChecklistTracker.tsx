import React, { useState } from 'react';
import { GlobalChecklistItem } from '../types/pipeline';
import { CheckCircle2, Circle, GitBranch, KeyRound, ShieldCheck, Filter, RotateCcw } from 'lucide-react';

interface ChecklistTrackerProps {
  checklist: GlobalChecklistItem[];
  onToggleItem: (id: string) => void;
  onReset: () => void;
}

export const ChecklistTracker: React.FC<ChecklistTrackerProps> = ({
  checklist,
  onToggleItem,
  onReset,
}) => {
  const [filterPrinciple, setFilterPrinciple] = useState<'all' | 'commit' | 'secrets' | 'rules'>('all');

  const filteredItems = filterPrinciple === 'all'
    ? checklist
    : checklist.filter((item) => item.principle === filterPrinciple);

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <section className="py-12">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Reliability & Guardrails
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          파이프라인 운영 3원칙 & 안전 점검표
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          에이전트 개발 중 발생하기 쉬운 대량 코드 왜곡, 보안 키 유출, 런타임 오류를 원천 차단하는 핵심 원칙입니다.
        </p>
      </div>

      {/* 3 Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Principle 1 */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3.5">
            <GitBranch className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            작은 단위 Git 커밋
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            단일 기능이 검증될 때마다 커밋을 남겨 에이전트의 코드 왜곡이나 의도치 않은 대량 삭제 시
            즉시 <code>git checkout</code>이나 <code>git revert</code>로 롤백할 수 있도록 안전망을 확보합니다.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold mb-3.5">
            <KeyRound className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            환경 변수 (Secrets) 분리
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            API 키, 안드로이드 서명 키스토어, 인증 토큰은 저장소 코드에 절대 커밋하지 않고
            <code>.env.example</code>에 형식만 명시한 후 CI/CD 플랫폼의 Secrets로 안전하게 주입합니다.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold mb-3.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            규칙 파일 엄격 제어
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            프로젝트 최상단에 기술 스택과 코딩 스타일을 규정한 규칙 파일(<code>.clinerules</code>)을 두어
            모델의 컨텍스트 이탈과 비표준 라이브러리 남용을 사전 차단합니다.
          </p>
        </div>
      </div>

      {/* Interactive Checklist Panel */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-slate-400">CHECKLIST PROGRESS</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-bold text-white font-mono tabular-nums">
                {completedCount} / {checklist.length}
              </span>
              <span className="text-sm font-semibold text-emerald-400">
                ({progressPercent}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterPrinciple('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterPrinciple === 'all'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilterPrinciple('commit')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterPrinciple === 'commit'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Git 커밋
              </button>
              <button
                onClick={() => setFilterPrinciple('secrets')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterPrinciple === 'secrets'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                환경 변수
              </button>
              <button
                onClick={() => setFilterPrinciple('rules')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterPrinciple === 'rules'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                규칙 제어
              </button>
            </div>

            <button
              onClick={onReset}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              title="체크리스트 기본값 초기화"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-950 my-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-start gap-3.5 group"
            >
              <button className="mt-0.5 text-slate-600 group-hover:text-indigo-400 transition shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      item.completed ? 'line-through text-slate-500' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      item.category === '필수'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        : item.category === '권장'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
