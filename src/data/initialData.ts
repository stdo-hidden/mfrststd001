import { PipelineStage, GlobalChecklistItem, ResourceLink, UserProject } from '../types/pipeline';

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    stepNumber: '01',
    title: '기획 & 스펙 확정',
    subtitle: 'Gemini, Claude, Notion',
    summary: '아이디어를 최소 기능 제품(MVP) 단위로 압축하고, 데이터 스키마 및 사용자 흐름을 정의한 표준 PRD.md를 작성합니다.',
    primaryTools: ['Gemini / Claude', 'Notion', 'Mermaid.js', 'Figma'],
    tasks: [
      {
        id: 'p1-t1',
        title: 'MVP 핵심 기능 3~5개로 범위 한정',
        description: '처음부터 거대한 기능을 만들지 않고 사용자의 가장 핵심적인 문제 1가지를 해결하는 기능에만 집중합니다.',
        badge: '범위 제어'
      },
      {
        id: 'p1-t2',
        title: '데이터 엔티티 및 상태 흐름 설계',
        description: 'User, Post, Transaction 등 데이터 모델의 필드 타입과 화면 간 전환 흐름을 사전 정의합니다.',
        badge: '스키마 설계'
      },
      {
        id: 'p1-t3',
        title: '표준 PRD.md 문서화 및 저장소 루트 배치',
        description: '에이전트가 언제든 제품 목표와 제한 사항을 읽을 수 있도록 프로젝트 최상단에 PRD.md를 고정합니다.',
        command: 'touch PRD.md',
        badge: '문서 고정'
      }
    ],
    pitfalls: [
      '처음부터 결제, 소셜 로그인, 알림 등 복잡한 기능을 한 번에 구현하려다 컨텍스트 초과 발생',
      '화면 레이아웃만 생각하고 데이터 구조(스키마)를 정하지 않아 에이전트가 매번 데이터 형태를 바꿈'
    ],
    bestPractices: [
      '사용자 유저 스토리: "사용자는 [행동]을 하여 [가치]를 얻는다" 형식으로 명시',
      'API 엔드포인트 명세 및 모의 데이터(Mock Data) 형식을 미리 작성해두면 구현 속도 3배 증가'
    ]
  },
  {
    id: 2,
    stepNumber: '02',
    title: '에이전트 코딩',
    subtitle: 'VS Code, Cline, Cursor',
    summary: '.clinerules 규칙 파일로 에이전트의 개발 원칙을 통제하고, Task 단위로 점진적 구현 및 터미널 피드백 루프를 반복합니다.',
    primaryTools: ['Cline', 'Cursor', 'VS Code', 'Git'],
    tasks: [
      {
        id: 'p2-t1',
        title: '.clinerules / .cursorrules 시스템 규칙 설정',
        description: '프레임워크 버전, 패키지 매니저, 컴포넌트 구조, Git 커밋 규칙, 금지 라이브러리를 명시합니다.',
        command: 'touch .clinerules',
        badge: '규칙 주입'
      },
      {
        id: 'p2-t2',
        title: 'Task-by-Task 점진 구현 방식 적용',
        description: '전체 앱을 한 번에 생성 요청하지 않고, 1개 기능 구현 -> 검증 -> Git 커밋 순으로 순차 진행합니다.',
        badge: '단위 제어'
      },
      {
        id: 'p2-t3',
        title: '터미널 에러 자동 피드백 루프로 자가 디버깅',
        description: '타입스크립트 오류(tsc)나 린트 경고가 발생하면 에이전트에게 에러 로그 전체를 전달해 즉시 수정시킵니다.',
        command: 'npm run lint || npx tsc --noEmit',
        badge: '에러 피드백'
      }
    ],
    pitfalls: [
      '에이전트에게 "멋진 웹앱 만들어줘" 같은 모호한 요청을 하여 코드가 겉돌거나 환각 발생',
      '수정한 파일이 누적되어 테스트 없이 10개 이상 파일을 건드리다 앱 전체가 작동 불능 상태에 빠짐'
    ],
    bestPractices: [
      '커밋 전 항상 `npm run build` 또는 `tsc --noEmit`을 실행하여 빌드 무결성 유지',
      'UI 컴포넌트는 단일 책임 원칙으로 작게 분리하여 에이전트가 토큰 제한 내에서 수정 가능하게 관리'
    ]
  },
  {
    id: 3,
    stepNumber: '03',
    title: '로컬 빌드 & 패키징',
    subtitle: 'Node.js, Capacitor, Android Studio',
    summary: '웹 번들 결과물을 네이티브 프로젝트에 동기화(Cap sync)하고 Android Studio 또는 에뮬레이터에서 실동작을 검증합니다.',
    primaryTools: ['Capacitor', 'Android Studio', 'Vite', 'Gradle'],
    tasks: [
      {
        id: 'p3-t1',
        title: '정적 웹 빌드 무오류 통과 검증',
        description: '모바일 번들링 전 Vite 빌드가 경고나 에러 없이 dist 폴더를 정상 생성하는지 확인합니다.',
        command: 'npm run build',
        badge: '웹 번들'
      },
      {
        id: 'p3-t2',
        title: 'Capacitor 네이티브 프로젝트 생성 및 동기화',
        description: 'Android 플랫폼을 추가하고 최신 웹 빌드 소스를 네이티브 디렉터리로 복사 및 동기화합니다.',
        command: 'npx cap add android && npx cap sync',
        badge: 'Capacitor 동기화'
      },
      {
        id: 'p3-t3',
        title: 'Android Studio 실기기/에뮬레이터 디버깅',
        description: '안드로이드 스튜디오를 열어 앱 권한, 화면 비율, 터치 반응성 및 네이티브 플러그인을 최종 점검합니다.',
        command: 'npx cap open android',
        badge: '실기기 테스트'
      }
    ],
    pitfalls: [
      '웹에서는 작동하지만 모바일 뷰포트에서 상단 노치나 하단 네비게이션 바와 겹쳐 터치가 불가능한 현상 (Safe Area 미적용)',
      '로컬 웹 빌드(`npm run build`)를 잊고 `cap sync`만 실행하여 이전 버전 빌드가 패키징되는 문제'
    ],
    bestPractices: [
      'package.json에 `"build:android": "npm run build && npx cap sync android"` 스크립트 등록',
      'Capacitor Safe Area 플러그인 또는 CSS `env(safe-area-inset-top)`를 적극 활용'
    ]
  },
  {
    id: 4,
    stepNumber: '04',
    title: '자동 배포 (CI/CD)',
    subtitle: 'GitHub Actions, Vercel / Play Console',
    summary: '코드 푸시 또는 태그 릴리스 시 자동으로 릴리스 빌드(AAB/APK 또는 웹 배포)를 수행하는 GitHub Actions 워크플로를 구축합니다.',
    primaryTools: ['GitHub Actions', 'Google Play Console', 'Vercel / Cloudflare'],
    tasks: [
      {
        id: 'p4-t1',
        title: 'GitHub Secrets로 서명 키 및 환경 변수 보호',
        description: 'Android Release Keystore(Base64), 키 비밀번호, API Key를 리포지토리 Secret에 등록합니다.',
        badge: '비밀값 보호'
      },
      {
        id: 'p4-t2',
        title: 'GitHub Actions 워크플로 (.github/workflows) 설정',
        description: 'Java/Node 환경 설정 -> 의존성 설치 -> 빌드 -> Gradle 릴리스 패키징 단계를 자동화합니다.',
        command: 'mkdir -p .github/workflows && touch .github/workflows/build.yml',
        badge: 'CI/CD 자동화'
      },
      {
        id: 'p4-t3',
        title: 'Release Artifact 생성 및 스토어 내부 테스트 배포',
        description: '빌드된 app-release.aab 파일을 GitHub Releases에 업로드하거나 Play Console 내부 테스트 트랙에 직배포합니다.',
        badge: '원클릭 배포'
      }
    ],
    pitfalls: [
      'Keystore 파일이나 비밀번호를 실수로 Git 저장소에 푸시하여 보안 감사에서 차단당함',
      'JDK 버전 불일치(예: Gradle 8.x와 Java 17/21 요구사항 차이)로 CI 워크플로가 빌드 도중 중단됨'
    ],
    bestPractices: [
      'GitHub Actions 실행 전 캐시(`actions/cache@v4` or Gradle Build Action)를 추가하여 빌드 시간 70% 단축',
      '릴리스 빌드 버전(versionCode, versionName)을 Git Tag 기반으로 자동 증가하도록 스크립팅'
    ]
  }
];

export const GLOBAL_CHECKLIST: GlobalChecklistItem[] = [
  {
    id: 'gc-1',
    principle: 'commit',
    title: '단일 기능 검증 후 즉시 Git 커밋',
    description: '작은 단위 커밋으로 에이전트의 대량 코드 왜곡 발생 시 즉시 `git checkout` 또는 `git revert` 가능하도록 안전망 확보',
    category: '필수',
    completed: true
  },
  {
    id: 'gc-2',
    principle: 'commit',
    title: '기능 브랜치(feature branch) 전략 채택',
    description: '새로운 기능을 시도할 때는 feature/xxx 브랜치를 따서 실험하고, 안정화 후 main으로 머지',
    category: '권장',
    completed: false
  },
  {
    id: 'gc-3',
    principle: 'secrets',
    title: '.gitignore에 환경 변수 및 키 파일 등록',
    description: '.env, .env.local, *.keystore, google-services.json 등 민감 파일이 깃에 추적되지 않는지 철저 확인',
    category: '필수',
    completed: true
  },
  {
    id: 'gc-4',
    principle: 'secrets',
    title: '.env.example 공개 스키마 문서화',
    description: '실제 키 값 없이 어떤 환경변수가 필요한지만 명시한 템플릿 파일을 저장소에 동봉',
    category: '필수',
    completed: true
  },
  {
    id: 'gc-5',
    principle: 'secrets',
    title: 'CI/CD Secrets에 Keystore Base64 주입',
    description: 'GitHub Settings > Secrets and variables > Actions에 KEYSTORE_BASE64, KEYSTORE_PASSWORD 등록',
    category: '운영',
    completed: false
  },
  {
    id: 'gc-6',
    principle: 'rules',
    title: '프로젝트 최상단 .clinerules 또는 .cursorrules 배치',
    description: '에이전트가 프레임워크 선택, 폴더 구조, 스타일 가이드라인을 이탈하지 않도록 구체적 규칙 명시',
    category: '필수',
    completed: true
  },
  {
    id: 'gc-7',
    principle: 'rules',
    title: 'PRD.md에 기능 제외 범위(Out of Scope) 명시',
    description: '이번 버전에서 절대 만들지 않을 기능을 명확히 하여 에이전트의 불필요한 코드 생성을 사전에 방지',
    category: '권장',
    completed: false
  },
  {
    id: 'gc-8',
    principle: 'rules',
    title: '빌드 무결성 검증 명령어 자동 실행 습관화',
    description: '에이전트 작업 후 무조건 `npm run build`와 `npm run lint`를 터미널에서 구동하여 런타임 오류 차단',
    category: '필수',
    completed: true
  }
];

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    id: 'r-cline',
    title: 'Cline (VS Code Extension)',
    description: '자율 실행 코딩 에이전트 오픈소스. 터미널 제어, 파일 수정, 브라우저 테스트를 지원합니다.',
    url: 'https://github.com/cline/cline',
    category: 'tool',
    tag: '에이전트 도구'
  },
  {
    id: 'r-capacitor',
    title: 'Capacitor by Ionic',
    description: '웹 프로젝트(Vite, React, Vue)를 모바일 네이티브 iOS/Android 앱으로 간편하게 패키징합니다.',
    url: 'https://capacitorjs.com',
    category: 'tool',
    tag: '모바일 패키징'
  },
  {
    id: 'r-github-actions',
    title: 'GitHub Actions 공식 문서',
    description: '빌드, 테스트, 안드로이드 릴리스 패키징 및 클라우드 배포 자동화 워크플로 가이드입니다.',
    url: 'https://docs.github.com/ko/actions',
    category: 'docs',
    tag: 'CI/CD 공식 문서'
  },
  {
    id: 'r-jocoding',
    title: '조코딩 JoCoding',
    description: 'AI 기반 1인 서비스 기획·개발·Capacitor 앱 패키징 및 스토어 릴리스 전 과정을 알기 쉽게 시연합니다.',
    url: 'https://www.youtube.com/@jocoding',
    category: 'channel',
    tag: '추천 영상 채널'
  },
  {
    id: 'r-nomad',
    title: '노마드 코더 Nomad Coders',
    description: '에이전트 제어 프롬프트 테크닉 및 모던 프론트엔드/백엔드 프로덕션 개발 노하우를 다룹니다.',
    url: 'https://www.youtube.com/@nomadcoders',
    category: 'channel',
    tag: '추천 영상 채널'
  },
  {
    id: 'r-android-cicd',
    title: 'GitHub Actions 안드로이드 자동 빌드 가이드',
    description: '안드로이드 서명 키 설정, Gradle 캐싱 및 AAB 자동 패키징에 관한 최신 실전 튜토리얼 모음입니다.',
    url: 'https://www.youtube.com/results?search_query=GitHub+Actions+%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C+%EC%9E%90%EB%8F%99+%EB%B9%8C%EB%93%9C',
    category: 'channel',
    tag: '실전 영상 튜토리얼'
  }
];

export const INITIAL_PROJECTS: UserProject[] = [
  {
    id: 'proj-1',
    title: 'AI 스마트 영수증 정리기 (Receipt AI)',
    description: '영수증 사진을 촬영하면 OCR 및 Gemini AI가 항목과 금액을 분석해 가계부로 자동 저장하는 하이브리드 앱',
    platform: 'cross-platform',
    currentStage: 2,
    repoUrl: 'https://github.com/my-workspace/receipt-ai',
    packageId: 'com.receiptai.app',
    notes: 'Stage 1 PRD.md 확정 완료. 현재 Cline을 이용해 카메라 캡처 모듈 및 영수증 파싱 컴포넌트 개발 중.',
    checklist: [
      { id: 'c-1', stageId: 1, text: 'MVP 기능 3가지 한정 (촬영, 파싱, 목록 표시)', completed: true },
      { id: 'c-2', stageId: 1, text: 'PRD.md 작성 및 루트 배치', completed: true },
      { id: 'c-3', stageId: 2, text: '.clinerules 프레임워크 규칙 생성', completed: true },
      { id: 'c-4', stageId: 2, text: 'Gemini 영수증 파싱 API 컴포넌트 구현', completed: false },
      { id: 'c-5', stageId: 3, text: 'Capacitor Android 플러그인 연동 및 로컬 빌드', completed: false },
      { id: 'c-6', stageId: 4, text: 'GitHub Actions AAB 릴리스 빌드 파이프라인 구성', completed: false }
    ],
    createdAt: '2026-10-10',
    updatedAt: '2026-10-11'
  }
];
