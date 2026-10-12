import React, { useState } from 'react';
import { 
  FileCode, 
  FileText, 
  Workflow, 
  Copy, 
  Check, 
  Download, 
  Sparkles,
  GitCommit,
  CheckCircle2
} from 'lucide-react';

export const TemplateGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clinerules' | 'prd' | 'githubActions' | 'gitCommit'>('clinerules');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // States for .clinerules generator
  const [clineFramework, setClineFramework] = useState('React (Vite) + TypeScript');
  const [clineStyling, setClineStyling] = useState('Tailwind CSS');
  const [clineCapacitor, setClineCapacitor] = useState(true);
  const [clineStrictChecks, setClineStrictChecks] = useState(true);

  // States for PRD.md generator
  const [prdTitle, setPrdTitle] = useState('AI 스마트 영수증 정리기 (Receipt AI)');
  const [prdTarget, setPrdTarget] = useState('영수증 관리와 지출 내역 정리가 번거로운 프리랜서 및 소상공인');
  const [prdFeature1, setPrdFeature1] = useState('영수증 카메라 촬영 및 이미지 업로드');
  const [prdFeature2, setPrdFeature2] = useState('Gemini Vision API 기반 상호명/일자/금액/항목 자동 추출');
  const [prdFeature3, setPrdFeature3] = useState('월별 지출 카테고리 통계 및 CSV 내보내기');

  // States for GitHub Actions generator
  const [ciWorkflowType, setCiWorkflowType] = useState<'android' | 'web'>('android');
  const [javaVersion, setJavaVersion] = useState('17');
  const [nodeVersion, setNodeVersion] = useState('20');

  // States for Git Commit Generator
  const [commitType, setCommitType] = useState('feat');
  const [commitScope, setCommitScope] = useState('ocr');
  const [commitMessage, setCommitMessage] = useState('영수증 이미지 파싱 및 지출 항목 자동 분류 기능 추가');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate .clinerules
  const generateClinerulesContent = () => {
    return `# AI Agent Development Rules (.clinerules)

## 1. Project Overview & Environment
- Framework: ${clineFramework}
- Styling: ${clineStyling}
- Native Packaging: ${clineCapacitor ? 'Capacitor 6.x (Android & Web)' : 'Web Only'}
- Package Manager: npm (do not switch to yarn/pnpm without instruction)

## 2. Core Engineering Principles
- Incremental Execution: Never refactor the entire codebase at once. Tackle one task per turn.
- Zero-Slop Architecture: Write clean, production-grade TypeScript without placeholder stubs.
- No Mocking Production APIs: Wire real handlers, error states, and responsive viewports.
- Atomic Git Discipline: Prompt the user to commit after each verified subtask.

${clineStrictChecks ? `## 3. Strict Verification Protocol
- After modifying TypeScript files, always run: \`npm run lint\` or \`npx tsc --noEmit\`.
- After UI changes, verify responsiveness on both 1440px desktop and 390px mobile viewports.
- If an error occurs, analyze the entire terminal error stack trace before editing files.` : ''}

${clineCapacitor ? `## 4. Capacitor & Mobile Constraints
- Always test safe-area insets: \`env(safe-area-inset-top)\` and \`env(safe-area-inset-bottom)\`.
- Run \`npm run build && npx cap sync\` before testing native changes.
- Never hardcode absolute file protocol URLs; use Capacitor bridge plugins.` : ''}

## 5. Security & Secrets Policy
- NEVER write API keys or keystore secrets directly in source files.
- Strictly use \`import.meta.env.VITE_*\` or server proxies.
- Verify that \`.env\` and \`*.keystore\` are registered in \`.gitignore\`.
`;
  };

  // Generate PRD.md
  const generatePrdContent = () => {
    return `# Product Requirements Document (PRD)

## 1. Product Name & Summary
- Name: ${prdTitle}
- Objective: 1인 개발자를 위한 최소 기능 제품(MVP) 구현 및 프로덕션 출시

## 2. Target Audience
${prdTarget}

## 3. Core MVP Scope (Must Have)
1. **${prdFeature1}**
   - 사용자 플로우: 메인 화면 진입 -> 사진 촬영 또는 선택 -> 실시간 미리보기 확인
2. **${prdFeature2}**
   - 사용자 플로우: 이미지 업로드 -> 백엔드/AI 파싱 진행 중 스켈레톤 노출 -> 결과 필드 검증
3. **${prdFeature3}**
   - 사용자 플로우: 통계 요약 카드 확인 -> 기간 필터링 -> 데이터 내보내기

## 4. Out of Scope (이번 버전에서 절대 만들지 않음)
- 복잡한 다중 조직(Team) 권한 관리
- 실시간 음성 대화 인터페이스
- 결제 PG사 직접 연동 (추후 버전에서 단계적 도입)

## 5. Data Entities
\`\`\`typescript
interface UserProfile {
  id: string;
  name: string;
  createdAt: string;
}

interface RecordItem {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  imageUrl?: string;
}
\`\`\`

## 6. Definition of Done (완료 기준)
- [ ] 정적 빌드(\`npm run build\`) 무오류 통과
- [ ] 실기기 및 웹 브라우저에서 3가지 핵심 기능 정상 작동
- [ ] .env.example 문서화 및 리포지토리 푸시 완료
`;
  };

  // Generate GitHub Actions build.yml
  const generateActionsContent = () => {
    if (ciWorkflowType === 'android') {
      return `name: Build Android Release (AAB)

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-android:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js ${nodeVersion}
        uses: actions/setup-node@v4
        with:
          node-version: '${nodeVersion}'
          cache: 'npm'

      - name: Install Node Dependencies
        run: npm ci

      - name: Build Web Assets
        run: npm run build

      - name: Sync with Capacitor
        run: npx cap sync android

      - name: Setup Java JDK ${javaVersion}
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '${javaVersion}'

      - name: Setup Gradle Cache
        uses: gradle/actions/setup-gradle@v3

      - name: Decode Android Keystore
        if: env.KEYSTORE_BASE64 != ''
        env:
          KEYSTORE_BASE64: \${{ secrets.KEYSTORE_BASE64 }}
        run: |
          echo "$KEYSTORE_BASE64" | base64 --decode > android/app/release.keystore

      - name: Build Android App Bundle (AAB)
        working-directory: android
        env:
          SIGNING_KEY_ALIAS: \${{ secrets.SIGNING_KEY_ALIAS }}
          SIGNING_KEY_PASSWORD: \${{ secrets.SIGNING_KEY_PASSWORD }}
          SIGNING_STORE_PASSWORD: \${{ secrets.SIGNING_STORE_PASSWORD }}
        run: ./gradlew bundleRelease

      - name: Upload AAB Artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-release-bundle
          path: android/app/build/outputs/bundle/release/*.aab
`;
    }

    return `name: Web CI / CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js ${nodeVersion}
        uses: actions/setup-node@v4
        with:
          node-version: '${nodeVersion}'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Type Check & Lint
        run: npm run lint || npx tsc --noEmit

      - name: Build Production Bundle
        run: npm run build
        env:
          VITE_APP_URL: \${{ secrets.VITE_APP_URL }}

      - name: Upload Build Dist Artifact
        uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: dist/
`;
  };

  const generateCommitOutput = () => {
    const scopePart = commitScope.trim() ? `(${commitScope.trim()})` : '';
    return `${commitType}${scopePart}: ${commitMessage.trim()}`;
  };

  return (
    <section className="py-12">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Template Studio
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          자동화 템플릿 제너레이터
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          에이전트 제어용 규칙 파일(.clinerules), 표준 PRD.md, GitHub Actions CI/CD 파일 및 커밋 메시지를 즉시 생성하고 다운로드하세요.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('clinerules')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition border-b-2 flex items-center gap-2 ${
            activeTab === 'clinerules'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4 text-sky-400" />
          .clinerules 규칙 생성기
        </button>
        <button
          onClick={() => setActiveTab('prd')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition border-b-2 flex items-center gap-2 ${
            activeTab === 'prd'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          PRD.md 기획 템플릿
        </button>
        <button
          onClick={() => setActiveTab('githubActions')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition border-b-2 flex items-center gap-2 ${
            activeTab === 'githubActions'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Workflow className="w-4 h-4 text-purple-400" />
          GitHub Actions CI/CD
        </button>
        <button
          onClick={() => setActiveTab('gitCommit')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition border-b-2 flex items-center gap-2 ${
            activeTab === 'gitCommit'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitCommit className="w-4 h-4 text-amber-400" />
          안전 Git 커밋 생성기
        </button>
      </div>

      {/* Tab 1: .clinerules */}
      {activeTab === 'clinerules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              에이전트 규칙 옵션 설정
            </h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                프레임워크 스택
              </label>
              <select
                value={clineFramework}
                onChange={(e) => setClineFramework(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="React (Vite) + TypeScript">React (Vite) + TypeScript</option>
                <option value="Next.js (App Router) + TypeScript">Next.js (App Router) + TypeScript</option>
                <option value="Vue 3 + Vite + TypeScript">Vue 3 + Vite + TypeScript</option>
                <option value="Node.js (Express) + TypeScript">Node.js (Express) + TypeScript</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                스타일링 시스템
              </label>
              <select
                value={clineStyling}
                onChange={(e) => setClineStyling(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Tailwind CSS">Tailwind CSS</option>
                <option value="Tailwind CSS + shadcn/ui">Tailwind CSS + shadcn/ui</option>
                <option value="CSS Modules">CSS Modules</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={clineCapacitor}
                  onChange={(e) => setClineCapacitor(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                />
                <span>Capacitor 모바일 하이브리드 제약 조건 포함</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={clineStrictChecks}
                  onChange={(e) => setClineStrictChecks(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                />
                <span>엄격한 빌드 무결성 검증 규칙 (tsc --noEmit 필수화)</span>
              </label>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>적용 팁:</strong> 생성된 내용을 복사하여 프로젝트 최상단 디렉터리에 <code className="text-indigo-300">.clinerules</code> 또는 <code className="text-indigo-300">.cursorrules</code> 파일로 저장하세요.
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">.clinerules</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generateClinerulesContent(), 'clinerules')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center gap-1.5"
                >
                  {copiedKey === 'clinerules' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사하기</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownload('.clinerules', generateClinerulesContent())}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
              {generateClinerulesContent()}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 2: PRD.md */}
      {activeTab === 'prd' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              MVP 기획서 입력 정보
            </h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">
                서비스 명칭
              </label>
              <input
                type="text"
                value={prdTitle}
                onChange={(e) => setPrdTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">
                타깃 사용자
              </label>
              <textarea
                value={prdTarget}
                onChange={(e) => setPrdTarget(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">
                핵심 기능 1 (Core Feature 1)
              </label>
              <input
                type="text"
                value={prdFeature1}
                onChange={(e) => setPrdFeature1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">
                핵심 기능 2 (Core Feature 2)
              </label>
              <input
                type="text"
                value={prdFeature2}
                onChange={(e) => setPrdFeature2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">
                핵심 기능 3 (Core Feature 3)
              </label>
              <input
                type="text"
                value={prdFeature3}
                onChange={(e) => setPrdFeature3(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">PRD.md</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generatePrdContent(), 'prd')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center gap-1.5"
                >
                  {copiedKey === 'prd' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사하기</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownload('PRD.md', generatePrdContent())}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
              {generatePrdContent()}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: GitHub Actions */}
      {activeTab === 'githubActions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Workflow className="w-4 h-4 text-purple-400" />
              CI/CD 파이프라인 구성
            </h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                배포 대상 (Target)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCiWorkflowType('android')}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                    ciWorkflowType === 'android'
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Android AAB 빌드
                </button>
                <button
                  onClick={() => setCiWorkflowType('web')}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                    ciWorkflowType === 'web'
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  정적 웹 (Vercel/Dist)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">
                  Node.js 버전
                </label>
                <select
                  value={nodeVersion}
                  onChange={(e) => setNodeVersion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="20">Node 20 (LTS)</option>
                  <option value="22">Node 22</option>
                  <option value="18">Node 18</option>
                </select>
              </div>
              {ciWorkflowType === 'android' && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">
                    Java JDK 버전
                  </label>
                  <select
                    value={javaVersion}
                    onChange={(e) => setJavaVersion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="17">Java 17 (권장)</option>
                    <option value="21">Java 21</option>
                  </select>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
              <span className="font-bold block mb-1">필수 Secrets 등록 안내:</span>
              GitHub Repo {'>'} Settings {'>'} Secrets {'>'} Actions에
              <br />
              <code className="text-white bg-purple-900/50 px-1 py-0.5 rounded">KEYSTORE_BASE64</code>, 
              <code className="text-white bg-purple-900/50 px-1 py-0.5 rounded ml-1">KEYSTORE_PASSWORD</code>를 등록해야 서명된 파일이 생성됩니다.
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                {ciWorkflowType === 'android'
                  ? '.github/workflows/build-android.yml'
                  : '.github/workflows/deploy-web.yml'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generateActionsContent(), 'actions')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center gap-1.5"
                >
                  {copiedKey === 'actions' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사하기</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() =>
                    handleDownload(
                      ciWorkflowType === 'android' ? 'build-android.yml' : 'deploy-web.yml',
                      generateActionsContent()
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
              {generateActionsContent()}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Git Commit Generator */}
      {activeTab === 'gitCommit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-amber-400" />
              Conventional Git 커밋 생성기
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              파이프라인 1원칙(작은 단위 커밋)을 실천하기 위해, 규격화된 커밋 메시지를 빠르게 작성하여 롤백 안전망을 만드세요.
            </p>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">커밋 타입</label>
              <select
                value={commitType}
                onChange={(e) => setCommitType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="feat">feat: 새로운 기능 추가</option>
                <option value="fix">fix: 버그 및 오류 수정</option>
                <option value="refactor">refactor: 코드 리팩터링 (동작 불변)</option>
                <option value="style">style: UI 디자인 및 CSS 수정</option>
                <option value="docs">docs: PRD 또는 문서 작성</option>
                <option value="chore">chore: 빌드/패키지 설정 변경</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">작업 스코프 (선택)</label>
              <input
                type="text"
                value={commitScope}
                onChange={(e) => setCommitScope(e.target.value)}
                placeholder="예: ui, ocr, auth, capacitor, ci"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">작업 요약 내용</label>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">Terminal Command</span>
                <button
                  onClick={() =>
                    handleCopy(`git commit -m "${generateCommitOutput()}"`, 'commitCmd')
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center gap-1.5"
                >
                  {copiedKey === 'commitCmd' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>명령어 복사</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 mb-4 font-mono text-xs text-amber-300">
                git commit -m &quot;{generateCommitOutput()}&quot;
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. `git status`로 변경 사항 점검</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. `git add [파일명]`으로 이번 작업 파일만 한정 스테이징</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3. 위 커밋 명령어를 터미널에 붙여넣기 실행</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
