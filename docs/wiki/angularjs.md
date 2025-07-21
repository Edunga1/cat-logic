---
created: 2017-09-17
---
# Angular JS

AngularJS(v1)에 대한 이야기.

첫 직장에서 하이브리드 앱을 만들면서, 그리고 학교 프로젝트에서 사용했다.

2017년에 한창 사용했고, typescript 기반인 Angular 2+가 나왔다.\n
그래서 꽤 오래전에 종료한 줄 알았는데, 2022년 1월에 종료되었다고 한다. 생각보다 오래 유지했다.

> AngularJS support has officially ended as of January 2022. See what ending support means and read the end of life announcement.

매력적인 점은 [Dependency Injection](https://docs.angularjs.org/guide/di)이다.\n
[Spring](./spring-framework.md) bean 처럼 directive, service, controller 등을 등록해 놓으면 이름을 기반으로 주입 받을 수 있다.

## Johnpapa's AngularJS Style Guide

https://github.com/johnpapa/angular-styleguide

프론트엔드 자바스크립트 프레임워크의 과도기?에서 만들어진 프레임워크라 생각한다.
그래서 bad practice를 만들기 쉬웠는데, 그래서 이 스타일 가이드의 인기가 많았다.

### Component

#### 컨트롤러

##### `controllerAs`와 `vm` 사용하기

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y032

controllerAS + vm 사용하고 `this` 변수에 담고 직접 사용하지 않는다.

```javascript
/* avoid */
function CustomerController() {
    this.name = {};
    this.sendMessage = function() { };
}
```

```javascript
/* recommended */
function CustomerController() {
    var vm = this;
    vm.name = {};
    vm.sendMessage = function() { };
}
```

#### 서비스 (service, factory, provider)

##### 서비스 코드 작성은 Revealing Module Pattern

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y052

멤버 변수 및 함수는 상단에 위치하여 바로 구분할 수 있도록 한다:
[Revealing Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

1. 이는 서비스가 사용 가능한 정보를 파악하는데 도움을 주고 유닛 테스트 대상이며 Mocking 할 수 있음을 의미한다.
1. 구현 코드가 길어지더라도 스크롤을 내리지 않고 expose 된 기능 및 값을 한눈에 파악할 수 있다.
1. 함수 설정을 쉽게 할 수 있다. 구현 세부사항을 return 아래로, 호출 가능한 인터페이스를 위로 두면 읽기 쉽다.

```javascript
/* avoid */
function dataService() {
  var someValue = '';
  function save() {
    /* */
  };
  function validate() {
    /* */
  };

  return {
      save: save,
      someValue: someValue,
      validate: validate
  };
}
```

```javascript
/* recommended */
function dataService() {
    var someValue = '';
    var service = {
        save: save,
        someValue: someValue,
        validate: validate
    };
    return service;

    ////////////

    function save() {
        /* */
    };

    function validate() {
        /* */
    };
}
```


### Modularity

#### 데이터 서비스를 분리하기

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services

XHR calls, local storage, stashing in memory 등으로 부터 데이터를 얻는 로직은 factory로 분리한다.

1. 컨트롤러의 역할은 정보(데이터)를 모으고 뷰에 출력하는 것이므로 데이터 관리를 해선 안된다.
2. 테스트할 때 Mock 구성을 쉽게 만든다.
3. 데이터 저장소(server, local storage, memory)로부터 데이터 핸들링하는 코드가 더 명확해 진다.
    - http header를 포함하는 코드
    - `$http`와 같은 다른 서비스나 데이터와 커뮤니케이션 하는 코드
    - 컨트롤러와 같이 데이터 서비스를 호출자가 하나의 지점으로 통하게 하고 데이터를 감추어 캡슐화 함


## 테스트

### 테스트 환경 모듈

Karma + Mocha + Chai, Angular Mocks

NPM modules:
* angular-mocks
* karma
* karma-mocha
* karma-mocha-reporter
* karma-chai
* karma-chrome-launcher
* mocha
* chai
* sinon

karma의 경우 글로벌로 ```karma-cli```를 설치하라는 글들이 많이 보였지만

로컬에 ```karma```만 설치하여 ```./node_modules/karma/bin/karma```로 명령어를 실행할 수 있었다.

### karma.conf.js

```karma init```을 통해 생성되는 카르마 설정파일을 수정한다.

```javascript
module.exports = function(config) {
    config.set({
        // ...

        // 사용 할 테스트 모듈 목록
        frameworks: ['mocha', 'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            // AngularJS 등 프레임워크와 라이브러리 파일의 경로를 여기에 작성한다.
            // 왠만하면 index.html 내에 <script> 태그로 임포트하는 파일 순서 그대로 작성한다.
            // karma가 브라우저에 웹 페이지를 띄울 때 여기에 작성한 파일들을 순서대로 가져오는 거 같다. (순서 중요)

            // 테스트 대상이 되는 소스 코드를 포함한다.
            'www/**/*.js',

            // angular-mocks
            'node_modules/angular-mocks/angular-mocks.js',

            // 테스트 스크립트를 포함한다.
            // test 폴더 아래에 abc.spec.js 와 같은 방식으로 작성했다.
            'test/**/*.spec.js'
        ],

        // 콘솔에 출력되는 테스트 진행 상황에 관한 모듈.
        // karma-mocha-reporter를 사용했다.
        reporters: ['mocha'],

        // ...
  })
}

```

### 실행

```karma start``` 또는 ``` ./node_modules/karma/bin/karma start```


## type hinting

컨트롤러 내에서 `vm`(ViewModel)으로 뷰 모델을 관리 할 때 타입 힌트를 제대로 얻을 수 없다.

```javascript
function controller() {
    var vm = this;

    /**
     * @typedef CustomType
     * @property {number} foo
     * @property {string} var
     */
    /**
     * @type {Array.<CustomType>}
     */
    vm.list = []; // any
}
```

따라서 뷰 모델에 `@typedef`로 하위 모델들을 명시하면서 해결했다.

```javascript
function controller() {
    /**
     * @typedef CustomType
     * @property {number} foo
     * @property {string} var
     */
    /**
     * @typedef {ViewModel}
     * @property {Array.<CustomType>} list
     */
    /**
     * @type {ViewModel}
     */
    var vm = this;

    vm.list = []; // Array.<{}>
}
```

## Migrating 1.5 to 1.6

### Component Lifecycle

Lifecycle이 생겼다.

컴포넌트의 컨트롤러 내에서 this.$onInit을 구현하면(함수) 컴포넌트가 초기화 될 때 호출된다.
이 방법으로 tabs를 구현한 공식 예제:

https://docs.angularjs.org/guide/component

Intercomponent Communication 단락 참조

### $http

이제 success, error가 아니라 then, catch를 사용한다. 더 이상 $q.defer()로 wrapping 할 필요가 없다.
