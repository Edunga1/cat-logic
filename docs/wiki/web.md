# 웹 개발

# GDG WebTech Workshop "측정하는 놈, 로딩하는 놈, 그리는 놈"

[2016-08-27 GDG WebTech Workshop "측정하는 놈, 로딩하는 놈, 그리는 놈"](2016-08-27-gdg-webtech-workshop-nnn)

웹 브라우저 특히 크롬의 렌더링 개선 방법과 오프라인 서비스에 대한 내용

# React 렌더링 동작에 대한 완벽한 가이드

https://velog.io/@superlipbalm/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior

**jsx, createElement**

> 컴포넌트 렌더 출력은 일반적으로 JSX 구문으로 작성되며 자바스크립트가 컴파일되고 배포를 위해 준비될때 React.createElement() 호출로 변환됩니다

**호스트 컴포넌트?**

> // HTML 처럼 보이는 "호스트 컴포넌트"의 경우
> return <button onClick={() => {}}>Click Me</button>

사용자가 만든 커스텀 컴포넌트와 구분한다. html 기본 제공하는 컴포넌트.
