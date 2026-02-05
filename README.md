# 🎬 CineStream - Next.js App Router Migration Portfolio

> **프로젝트 상태:** 완료 (포트폴리오 목적)  
> **역할:** 프론트엔드 개발  
> **기술 스택:** Next.js App Router, TypeScript, React, Firebase, Styled-Components, TMDB API

<br/>

## 📖 프로젝트 개요

CineStream은 기존 JavaScript(Create React App) 기반 영화 스트리밍 서비스를 **TypeScript 마이그레이션 → Next.js App Router 마이그레이션**으로 이어지는 점진적인 아키텍처 개선을 담은 포트폴리오 프로젝트입니다. 단순한 기능 구현을 넘어, 견고한 애플리케이션 아키텍처 구축과 현대적인 웹 개발 패턴 적용에 집중했습니다.

### 핵심 특징
- **서버 사이드 렌더링**: Next.js App Router를 통한 SEO 최적화 및 초기 로딩 성능 개선
- **정적 타이핑**: TypeScript를 통한 런타임 오류 방지 및 코드 유지보수성 향상
- **동적 라우팅**: 영화 ID별 상세 페이지 구현 (`/movie/[id]`)
- **Firebase 인증**: 구글 OAuth 기반 사용자 인증 시스템
- **TMDB API 연동**: 실시간 영화 데이터 조회 및 검색 기능

<br/>

## 🚀 주요 개선 사항 & 기술적 결정

### 1. 타입 안전성(Type Safety) 확보

**문제:** JavaScript 기반의 기존 코드에서는 런타임 시 발생하는 오타, undefined 속성 접근, API 응답 구조 불일치 등의 문제 발생

**해결:** TypeScript 마이그레이션을 통해 모든 API 응답 구조를 명확히 정의

```typescript
// 영화 데이터 인터페이스 정의
export interface Movie {
  id: number;
  backdrop_path: string;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  first_air_date?: string;
  poster_path?: string;
  media_type?: string;
}
```

**효과:** 
- 컴파일 시점에서 타입 오류 감지
- IDE 자동완성 및 코드 리팩토링 지원 강화
- API 응답 구조 변경 시 영향 범위 파악 용이

### 2. Next.js App Router 아키텍처 설계

**문제:** SPA 기반 CRA 아키텍처로 인한 SEO 및 초기 로딩 성능 제약

**해결:** 서버 컴포넌트와 클라이언트 컴포넌트 분리를 통한 최적의 렌더링 전략 설계

```typescript
// 서버 컴포넌트: 데이터 fetch 및 메타데이터 생성
export default async function DetailPage({ params }: DetailPageProps) {
  const { id: movieId } = params;
  
  let movie: Movie | null = null;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=...`);
  
  if (response.ok) {
    movie = (await response.json()) as Movie;
  }

  return <MovieDetailClient movie={movie} />;
}

// 클라이언트 컴포넌트: 인터랙티브 UI 처리
'use client';
export default function MovieDetailClient({ movie }: MovieDetailClientProps) {
  // 클라이언트 사이드 상태 관리 및 이벤트 처리
}
```

**효과:**
- 데이터 fetching을 서버에서 처리하여 TTFB(Time to First Byte) 개선
- 인터랙티브 UI 요소만 클라이언트 번들에 포함
- SEO를 위한 동적 메타데이터 생성 가능

### 3. 서버/클라이언트 컴포넌트 경계 분리

**문제:** 서버 사이드 렌더링 환경에서 `localStorage`, `window` 객체 접근으로 인한 에러 발생

**해결:** `localStorage` 접근을 `useEffect` 내부로 이동시켜 클라이언트 사이드 실행 보장

```typescript
// ❌ 서버 사이드에서 실행되어 에러 발생
const initialUserDataString = localStorage.getItem("userData");

// ✅ 클라이언트 사이드에서만 실행되도록 수정
useEffect(() => {
  const initialUserDataString = localStorage.getItem("userData");
  if (initialUserDataString) {
    try {
      const parsedData = JSON.parse(initialUserDataString);
      setInitialUserData(parsedData);
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
    }
  }
}, []);
```

**효과:**
- 서버 사이드 렌더링 시 브라우저 API 관련 에러 해결
- 올바른 하이드레이션(Hydration) 처리

<br/>

## 🔧 기술 스택

| 영역 | 기술 |
|------|------|
| **프레임워크** | Next.js 14 (App Router), React 18 |
| **타입 시스템** | TypeScript 5.9.3 |
| **스타일링** | Styled Components 6.1.8 |
| **상태 관리** | React 내장 Hooks (useState, useEffect, useContext) |
| **인증** | Firebase SDK v10.7.1 |
| **API 연동** | TMDB REST API (axios 기반 wrapper) |
| **빌드 도구** | Next.js App Router (React Server Components) |

<br/>

## 🏗️ 아키텍처 개선 여정

### 1단계: JavaScript CRA → TypeScript 마이그레이션
- 모든 컴포넌트에 타입 정의 적용
- API 응답 구조를 명확히 정의하여 런타임 오류 방지
- `interface` 기반의 엄격한 타입 체크 구조 구축

### 2단계: TypeScript CRA → Next.js App Router 마이그레이션
- 서버 컴포넌트와 클라이언트 컴포넌트 분리 구조 설계
- 동적 라우팅 (`/movie/[id]`, `/search`) 구현
- SEO 최적화를 위한 동적 메타데이터 생성
- 레거시 CRA 코드는 `legacy-cra/` 디렉토리에 보관

### 3단계: 포트폴리오 품질 향상
- 모듈 간 의존성 분리 및 재사용 가능한 컴포넌트 설계
- 환경 변수 관리 개선 (Firebase API 키, TMDB API 키)
- 오류 처리 및 예외 케이스 대응 로직 구현

<br/>

## 💡 해결한 주요 문제

### 1. 모듈 해결(Module Resolution) 오류
- **문제:** Next.js App Router의 `[id]` 동적 라우트 폴더 구조에서 모듈 임포트 오류 발생
- **해결:** 서버/클라이언트 컴포넌트 분리 구조를 통한 올바른 import/export 패턴 설계

### 2. 서버 사이드 렌더링 브라우저 API 접근 문제
- **문제:** `localStorage`, `window` 객체를 서버 사이드에서 접근하면서 발생하는 오류
- **해결:** 브라우저 API 접근을 `useEffect` 내부로 이동하여 클라이언트 사이드 실행 보장

### 3. Next.js 라우팅 시스템과의 호환성 문제
- **문제:** 기존 CRA의 `react-router-dom`과 Next.js App Router 간 충돌
- **해결:** 레거시 코드는 별도 디렉토리에 보관, 새로운 Next.js 라우팅 시스템 적용

<br/>

## 🎯 포트폴리오로서의 가치

### 1. 아키텍처 설계 능력
- 기존 아키텍처의 한계를 식별하고 적절한 마이그레이션 전략 수립
- 서버/클라이언트 컴포넌트 분리 개념 이해 및 실제 적용

### 2. 기술 스택 마스터리
- TypeScript의 정적 타이핑 철학을 실제 프로젝트에 적용
- Next.js App Router의 SSR/SSG 기능을 활용한 성능 최적화

### 3. 문제 해결 능력
- 마이그레이션 과정에서 발생한 다양한 기술적 문제 해결 경험
- 런타임 오류, 모듈 해결 오류, 브라우저 API 접근 문제 등 다차원적 문제 해결

### 4. 유지보수성 고려
- 레거시 코드 보존을 통한 마이그레이션 여정 문서화
- 명확한 컴포넌트 책임 분리 및 타입 정의

<br/>


<br/>

## 📊 기술적 성과

- **타입 안전성**: 100% TypeScript 마이그레이션으로 런타임 오류 감소
- **성능 개선**: SSR을 통한 초기 로딩 속도 향상 및 SEO 최적화
- **코드 품질**: 컴포넌트별 관심사 분리로 유지보수성 향상
- **아키텍처 유연성**: Next.js App Router 구조로 확장성 있는 라우팅 구현