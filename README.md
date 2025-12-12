# 🎬 CineStream (OTT Platform TypeScript Migration)

> **Project Status: Refactoring (JS → TS)**
> 기존 JavaScript(React)로 개발된 영화 스트리밍 서비스를 **TypeScript**로 마이그레이션하여, **타입 안정성(Type Safety)** 확보 및 **개발 생산성(DX)**을 개선한 개인 리팩토링 프로젝트입니다.

---

## 🎯 Project Goal: Why TypeScript?

단순히 언어를 변환하는 것을 넘어, 정적 타이핑이 제공하는 이점을 활용하여 **"런타임 에러 없는 안정적인 애플리케이션"**을 구축하고자 했습니다.
특히 **API 데이터 처리, Firebase 인증, 컴포넌트 상태 관리** 등 핵심 기능에 TypeScript를 도입하여 다음과 같은 개선을 이루었습니다.

### 1. 타입 안정성 (Type Safety) 확보

#### ✅ API 응답 데이터의 명확한 정의 (Interface)
영화 API(TMDB)로부터 받아오는 데이터 구조를 `interface`로 명확히 정의했습니다.
이를 통해 `title`, `poster_path` 등 데이터 필드 접근 시 발생할 수 있는 **오타나 잘못된 속성 참조를 컴파일 단계에서 차단**했습니다.

```typescript
// Example: Movie Data Interface
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}
