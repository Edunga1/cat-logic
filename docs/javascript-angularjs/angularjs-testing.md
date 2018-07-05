# AngularJS 테스트하기

## 테스트 환경 모듈

Karma + Mocha + Chai, Angular Mocks

NPM modules:
* angular-mocks
* karma
* karma-mocha
* karma-mocha-repoter
* karma-chai
* karma-chrome-launcher
* mocha
* chai
* sinon

karma의 경우 글로벌로 ```karma-cli```를 설치하라는 글들이 많이 보였지만

로컬에 ```karma```만 설치하여 ```./node_modules/karma/bin/karma```로 명령어를 실행할 수 있었다.

## karma.conf.js

```karma init```을 통해 생성되는 카르마 설정파일을 수정한다.

```javascript
module.exports = function(config) {
    config.set({
        // ...

        // 사용 할 테스트 모듈 목록
        frameworks: ['mocha', 'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            // AnguarJS 등 프레임워크와 라이브러리 파일의 경로를 여기에 작성한다.
            // 왠만하면 index.html 내에 <script> 태그로 임포트하는 파일 순서 그대로 작성한다.
            // karma가 브라우저에 웹 페이지를 띄울 떄 여기에 작성한 파일들을 순서대로 가져오는 거 같다. (순서 중요)

            // 테스트 대상이 되는 소스 코드를 포함한다.
            'www/**/*.js',

            // angular-mocks
            'node_modules/angular-mocks/angular-mocks.js',

            // 테스트 스크립트를 포함한다.
            // test 폴더 아래에 abc.spec.js 와 같은 방식으로 작성했다.
            'test/**/*.spec.js'
        ],

        // 콘솔에 출력되는 테스트 진행 상황에 관한 모듈.
        // karma-mocha-repoter를 사용했다.
        reporters: ['mocha'],

        // ...
  })
}

```

## 실행

```karma start``` 또는 ``` ./node_modules/karma/bin/karma start```
