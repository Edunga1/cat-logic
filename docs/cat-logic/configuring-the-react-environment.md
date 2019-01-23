---
id: page-85
time: 2019-01-23 13:47:30
tag: react, eslint, javascript
---

# React 개발환경 구성하기

## Create React App 이용하기

필요한 의존 모듈을 일일이 설치할 수 있지만, Create React App을 이용하면 설치도 간편할뿐더러
Create React App이 각종 의존 모듈의 버전을 관리해주고, 이슈들을 해결해주기 때문에 지속적으로 케어를 받을 수 있다.

Create React App은 명령어 도구라서 처음 프로젝트 생성에만 필요하기 때문에 설치하지 않아도 된다:

`npx create-react-app my-app`

## ESlint 구성

Create Rect App으로 설치하면 eslint가 이미 존재하기 때문에 별도로 설치할 필요가 없다.
심지어 React 환경에 맞는 eslint 플러그인도 설치되어 있다.
하지만 [아주 관대학 규칙](https://www.npmjs.com/package/eslint-config-react-app)만 사용하기 때문에,
다른 Rule을 따를 필요가 있다. 가장 유명한 것으로 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)가 있다.

`npm install -D eslint-config-airbnb`

설치 후 `package.json`의 `eslintConfig`를 제거하고,

```json
// package.json
  "eslintConfig": {
    "extends": "airbnb"
  },
```

프로젝트 루트에 `.eslintrc`을 생성한다:

```json
// .eslintrc
{
  "extends": "airbnb",
  "rules": {
      "react/prefer-stateless-function": 0,
      "react/jsx-filename-extension": 0,
      "react/jsx-one-expression-per-line": 0
  },
  "env": {
      "browser": true
  },
  "parser": "babel-eslint"
}
```

여기까지 적용하고, 아무 소스코드나 열어서 (예를 들면 `App.js`) 빈 라인을 몇 줄 추가해서 linter가 제대로 잡으면 된다.

![eslint warning](../$images/eslint-no-multiple-empty-lines.png)

그리고 기존 airbnb 규칙에 3가지 규칙을 추가했는데, 그대로 사용하면 너무 불편하기 때문이다.

**react/prefer-stateless-function**

![eslint warning 2](../$images/eslint-react-prefer-stateless-function.png)

Class 형식의 리액트 컴포넌트 대신 함수형 방식을 사용하도록 하는 옵션인데, 클래스가 편한 입장에서 Off 하였다.

**react/jsx-filename-extension**

![eslint warning 3](../$images/eslint-react-jsx-filename-extension.png)

JSX 문법을 사용하기 위해서 `.jsx` 확장자만 허용하도록 하는 옵션인데, 마찬가지로 불편한 이유로 Off 했다.

**react/jsx-one-expression-per-line**

![eslint warning 4](../$images/eslint-react-jsx-one-expression-per-line.png)

한 라인에 여러 표현식을 금지하는 것인데, 마찬가지로 불편하다.

## `prop-types` 사용하기

여러 개의 컴포넌트를 작성하다가 props로 데이터를 넘기다 보면 eslint로 인해 결국 자연스럽게 설치하게 된다.

컴포넌트에서 props의 속성에 접근하려고 하면 미리 정의되지 않았다고 linter가 잡아낸다.

```javascript
MyComponent.propTypes = {
  myProp: PropTypes.bool
};
```

이런 식으로 props로 받는 데이터는 미리 타입을 정의해야 한다. 그러면 코딩 단계에서 여러 가지 도움을 얻을 수 있고,
잘못된 타입을 건네주면 런타임 때 잡아 내준다.

자세한 사용 방식은 [https://www.npmjs.com/package/prop-types](https://www.npmjs.com/package/prop-types) 에서 얻을 수 있다.
