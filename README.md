
# 🎬 CineStream (Movie Information Service)

> **🚀 Project Evolution: Legacy Migration**
> 본 프로젝트는 기존 JavaScript(CRA) 기반 서비스를 **TypeScript 마이그레이션 → Next.js App Router 마이그레이션**으로 이어지는 점진적인 아키텍처 개선을 담고 있습니다.

<br/>

## 📖 Project Overview
CineStream은 TMDB API를 활용한 실시간 영화 정보 플랫폼입니다. 단순한 기능 구현을 넘어, 견고한 애플리케이션 아키텍처 구축과 현대적인 웹 개발 패턴 적용에 집중했습니다.

### 핵심 특징
- **Server-Side Rendering**: Next.js App Router를 통한 SEO 최적화 및 초기 로딩 성능 개선
- **Type Safety**: TypeScript 도입으로 런타임 오류 방지 및 유지보수성 향상
- **Dynamic Routing**: 영화 ID별 상세 페이지 구현 (`/movie/[id]`)
- **Authentication**: Firebase 기반 사용자 인증 시스템(Auth) 구축
- **Data Integration**: TMDB REST API를 활용한 실시간 데이터 조회 및 검색

<br/>

## 🚀 Troubleshooting & Engineering Decisions

### 1. 타입 안전성(Type Safety) 확보
- **Problem:** JavaScript 기반 레거시 코드에서 발생하는 오타, `undefined` 속성 접근 등 런타임 에러 빈번 발생.
- **Action:** TypeScript 마이그레이션을 통해 모든 API 응답 구조를 Interface로 명확히 정의하여 안정성 확보.

```typescript
export interface Movie {
  id: number;
  backdrop_path: string;
  title?: string;
  name?: string;
  overview?: string;
  vote_average?: number;
  poster_path?: string;
}

```

### 2. Next.js App Router 아키텍처 설계

* **Problem:** SPA(CRA) 아키텍처의 한계로 인한 SEO 최적화 부재 및 초기 로딩 속도 제약.
* **Action:** 서버 컴포넌트(RSC)와 클라이언트 컴포넌트의 명확한 경계 분리를 통한 렌더링 최적화 수행.

### 3. Hydration Error 해결 (Client-side API)

* **Problem:** SSR 환경에서 `localStorage`, `window` 객체에 직접 접근 시 서버/클라이언트 불일치 에러 발생.
* **Action:** 브라우저 API 접근 로직을 `useEffect` 내부로 이동시켜 클라이언트 사이드 실행을 보장함.

```javascript
// ✅ useEffect를 활용해 클라이언트 사이드 마운트 후 실행 보장
useEffect(() => {
  const initialUserData = localStorage.getItem("userData");
  if (initialUserData) {
    setInitialUserData(JSON.parse(initialUserData));
  }
}, []);

```
<br/>

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router), React 18
* **Language**: TypeScript 5.7.3
* **Styling**: Styled Components 6.1.8
* **State/Auth**: React Hooks (Context API), Firebase SDK v10.7.1
* **API**: TMDB REST API (Axios 기반 Wrapper)

<br/>

## 🏗️ Architecture Migration Journey

### 1단계: JavaScript CRA →  TypeScript 마이그레이션

* 모든 컴포넌트 타입 정의 및 `interface` 기반의 엄격한 타입 체크 구조 구축

### 2단계: TypeScript CRA → Next.js App Router 마이그레이션

* 서버 컴포넌트 데이터 fetching 전략 수립 및 동적 메타데이터 생성(SEO) 수행
* **Note:** 레거시 CRA 코드는 별도 디렉토리에 보관하여 변경 사항 관리

<br/>

## 📈 Key Achievements

* **타입 안전성**: 100% 마이그레이션을 통한 런타임 오류 원천 차단
* **성능 개선**: SSR 도입으로 TTFB 개선 및 검색 엔진 최적화 달성
* **코드 품질**: 컴포넌트별 관심사 분리로 유지보수성 및 확장성 확보
* **문제 해결 능력**: 아키텍처 전환 시 발생하는 하이드레이션 및 모듈 오류 100% 해결

```
