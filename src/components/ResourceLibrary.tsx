import React, { useState } from 'react';
import { ResourceLink } from '../types/pipeline';
import { ExternalLink, Plus, Wrench, Youtube, BookOpen, Trash2, Bookmark } from 'lucide-react';

interface ResourceLibraryProps {
  resources: ResourceLink[];
  onAddResource: (resource: Omit<ResourceLink, 'id'>) => void;
  onDeleteResource: (id: string) => void;
}

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({
  resources,
  onAddResource,
  onDeleteResource,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'tool' | 'channel' | 'docs' | 'custom'>('custom');
  const [tag, setTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    onAddResource({
      title: title.trim(),
      url: url.startsWith('http') ? url.trim() : `https://${url.trim()}`,
      description: description.trim() || '사용자 추가 레퍼런스',
      category,
      tag: tag.trim() || '내 북마크',
      isCustom: true,
    });

    setTitle('');
    setUrl('');
    setDescription('');
    setTag('');
    setShowAddModal(false);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'tool':
        return <Wrench className="w-4 h-4 text-indigo-400" />;
      case 'channel':
        return <Youtube className="w-4 h-4 text-rose-500" />;
      case 'docs':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      default:
        return <Bookmark className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Curated Resources
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            학습 및 주요 레퍼런스 링크
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            파이프라인 구축에 실질적인 도움이 되는 공식 도구 및 대표 추천 채널입니다.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs sm:text-sm font-medium transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-indigo-400" />
          레퍼런스 북마크 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Official Platforms & Tools */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-400" />
            필수 공식 플랫폼 및 도구
          </h3>
          <div className="space-y-3 flex-1">
            {resources
              .filter((r) => r.category === 'tool' || r.category === 'docs')
              .map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between group transition"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-white group-hover:text-indigo-400 transition">
                        {r.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {r.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {r.isCustom && (
                      <button
                        onClick={() => onDeleteResource(r.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-500 group-hover:text-white transition"
                      title="새 탭으로 열기"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recommended Video Channels & Tutorials */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Youtube className="w-4 h-4 text-rose-500" />
            추천 영상 가이드 채널 & 튜토리얼
          </h3>
          <div className="space-y-3 flex-1">
            {resources
              .filter((r) => r.category === 'channel' || r.category === 'custom')
              .map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between group transition"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-white group-hover:text-indigo-400 transition">
                        {r.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {r.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {r.isCustom && (
                      <button
                        onClick={() => onDeleteResource(r.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-500 group-hover:text-white transition"
                      title="새 탭으로 열기"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Custom Bookmark Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-indigo-400" />
                새 레퍼런스 북마크 등록
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">링크 이름</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: Capacitor 공식 플러그인 문서"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">웹 URL</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://capacitorjs.com/docs/apis"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">분류</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="tool">도구 & 플랫폼</option>
                  <option value="docs">공식 문서</option>
                  <option value="channel">영상 및 튜토리얼</option>
                  <option value="custom">기타 유용한 사이트</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">설명 요약</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="예: 카메라 및 파일 시스템 연동 API 레퍼런스"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">태그</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="예: 모바일 플러그인"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                >
                  북마크 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
