# Node JS

node.js로 개발을 하고있지 않아서.. 대부분 내용이 2016년 정도에 머물러 있다.

## Package Manager

npm은 node.js의 패키지 관리자이다.
node.js 설치하면 npm을 함께 포함한다.

이 생태계에서 주로 사용하는 패키지매니저는 npm, yarn, pnpm이 있다.
3개 모두 `package.json`을 사용한다. 추가로 패키지매니저 별로 lock와 별도 설정 파일을 사용한다.

어떤 node.js 프로젝트를 확인할 때 패키지매니저 전용 파일을 확인하거나,
`package.json`의 `packageManager` 필드를 확인하면 된다.
e.g. [jest](https://github.com/jestjs/jest/blob/main/package.json)는 `"packageManager": "yarn@3.6.4"`

**의존성 설치 속도 비교**

[cat logic](./cat-logic.md) sites 프로젝트의 의존성 설치 속도를 비교했다.

| Package Manager | Install Time |
|-----------------|--------------|
| npm             | 20s          |
| pnpm            | 2.9s         |
| yarn v1         | 16.1s        |

pnpm이 가장 빨랐다. 다만 모두 캐시된 상황이라 정확한 비교는 아니다.
github actions 환경에서 npm 40s, pnpm 19.3s 소요되었다.

### yarn

[yarn](https://github.com/yarnpkg/yarn)은 v1과 그 이후 버전으로 프로젝트가 나뉜다.

yarn은 `yarn.lock`을 lock 파일로 사용한다.

---

2023-11 최근 yarn을 시도해 보았는데, 좋은 선택은 아닌 거 같다.
일단 [yarn](https://github.com/yarnpkg/yarn) v1은 22년 이후로 1.22.19로 종료되었다.

이후로 yarn v2, v3, v4가 나왔는데, v1과 다른 프로젝다.
[berry](https://github.com/yarnpkg/berry)라는 이름으로 yarn의 새 버전을 이끈다.
cli는 yarn 이름을 같이 사용하지만 프로젝트가 달라서 Homebrew로 설치도 할 수 없다.
예전에는 yarn이 npm보다 더 개선된 패키지 관리자라는 것이었는데,
이렇게 관리하는 것은 생태계에 혼란만 가져온다.

반면에 npm은 지금까지도 한 프로젝트에서 관리되고 있다.
그래서 혼란이 없다. node.js에 내장되어 있으므로 따로 설치할 필요도 없다.
다만 `npm audit`은 짜증만 난다. 이걸로 제대로 고쳐지는 경우가 많이 없는 거 같다.

### pnpm

[pnpm](https://github.com/pnpm/pnpm) GitHub Star가 가장 많다.
최근들어 흔하게 사용하는 거 같다.

설치는 `npm install -g pnpm` 또는 `brew install pnpm`.

- `pnpm-lock.yaml` lock 파일을 사용한다.
- `pnpm-workspace.yaml` Monorepositories 위한 [workspace](https://pnpm.io/workspaces) 설정 파일을 사용한다.

Monorepo가 아니라면 `pnpm-workspace.yaml`은 필요 없는 것으로 보인다.
괜히 빈 내용으로 추가하면 패키지 설치 시 매번 root project 경고가 발생한다.

`pnpm install` 시 warning이 줄어든 것을 확인할 수 있었다.
단순히 숨긴건지는 모르겠지만 `npm install` 경우에는 수 많은 peer depdency warning으로 신경이 쓰이는 반면에 pnpm은 warning이 없었다.

---

다른 패키지매니저와 `node_modules` 구조가 다른지, migration 아티클들을 보면 `node_modules`를 삭제하고 시작한다.

`node_modules` 구조는 [평탄한 node_modules가 유일한 방법은 아닙니다.](https://pnpm.io/ko/blog/2020/05/27/flat-node-modules-is-not-the-only-way) 공식 블로그에서 설명한다.

expressjs를 설치했을 때 `node_modules` 구조를 비교해보면 다음과 같다:

npm은

```bash
.bin
accepts
array-flatten
body-parser
bytes
content-disposition
cookie-signature
cookie
debug
depd
destroy
ee-first
encodeurl
escape-html
etag
express
```

pnpm은

```bash
.pnpm
.modules.yaml
express
```

`node_modules`를 평탄하게 유지하지 않는다. 또한 `express` 폴더는 **심볼릭 링크**이다.

## NodeJS Test Tools

지금은 [Jest](https://github.com/facebook/jest)를 사용하고 있다.
이거 하나면 대부분 가능하더라.

### Mocha - Framework

테스트 구조를 제공한다.

설치 : `npm install mocha --save-dev`

테스트 스크립트 실행 : `mocha <PATH>`

```javascript
describe('어떤 테스트를 할 것인지 대략적인 설명', function () {

    beforeEach(function () {
        // 매 it() 마다 실행 할 코드
    });

    it('테스트 단위 별 설명', function () {
        // 여기에 Assertion 코드를 둔다.
    });
});
```

### Chai - Library

Assertion 라이브러리. 값 비교에 사용한다.

설치 : `npm install chai --save-dev`

```javascript
describe('어떤 테스트를 할 것인지 대략적인 설명', function () {

    it('테스트 단위 별 설명', function () {
        // 여기에 Assertion 코드를 둔다.
        var foo = 'foo';
        expect(foo).to.equal('foo'); // 통과
        expect(foo).to.equal('bar'); // 값이 다르므로 통과하지 못함
    });
});
```

### Istanbul - Coverage Tool

코드 커버리지. 내 **테스트 코드**가 **모듈의 어디까지 테스트하는지 측정** 하는데 사용한다.

테스트 시 `coverage/` 폴더가 생성되어 리포트 페이지(html)를 생성한다. 여기서 실제 모듈이 얼마나 호출 되었는지, 어디가 문맥상 접근하지 않았는지 알 수 있다.

설치 : `npm install istanbul --save-dev`

Mocha와 함께 실행 : `istanbul cover _mocha` (`_mocha`인 이유는 Mocha의 프로세스 이름을 이용하기 때문)

별도의 코드는 없다.

## Proxyquire

https://github.com/thlorenz/proxyquire

### proxyquire 모듈 로드 순서 문제

```bash
src/
    router/
        auth.js
    find-basic-member.js
    app.js
test/
    test.js
```

`app.js` -> `auth.js` -> `find-basic-member.js` 이와같은 모듈 의존 관계가 있다.

테스트 대상은 `app.js`.
Mocking 대상은 `auth.js`가 사용하는 `find-basic-member.js`

사용 방법:

```javascript
proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
const app = require('../src/app'); // app uses mock find-basic-member
```

위 코드가 Mocking 이 되는 이유는
`app.js` -> `auth.js`의 `require('../find-basic-member')`를 호출하더라도
`proxyrequire`에 의해 캐시된 모듈을 이용하기 때문이다.

nodejs `require` 또한 캐시된 정보를 사용하기 때문에 여러번 `require` 해도 실제 파일을 읽는건 한 번 뿐이다.

*Forcing proxyquire to reload modules* 단락 참고: https://github.com/thlorenz/proxyquire

다음과 같이 호출 순서를 변경하면 동작하지 않는다:

```javascript
const app = require('../src/app'); // app uses original find-basic-member
proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
```

`proxyquire`가 `app.js` -> `auth.js`의 `require('../find-basic-member')`를 사용한다.

#### `require('proxyquire').noPreserveCache()` 사용하기

위의 예제처럼 사용한 경우 `proxyquire()` 이후에 로드하는 모듈은 모두 Mock Module을 사용한다.

따라서 명확하게 Mock Module 의존을 주입할 필요가 있다.

`noPreserveCache()`는 캐시된 모듈을 사용하지 않고 다시 모듈을 로드한다.

`proxyquire()`의 반환은 Mock Module 이다. 이를 이용해 의존성을 직접 주입한다.

```javascript
const mockAuth = proxyquire('../src/router/auth', {
    '../find-basic-member': mockFindBasicMember
});
const mockApp = proxyquire('../src/app', {
    './router/auth': mockAuth
});
```

의존의 의존을 모두 명시한다.

## Proxyquire vs. rewire

테스트 할 때 Dependency Injection 하는데 사용하는 도구 2가지 비교.

rewire: https://github.com/jhnns/rewire

rewire는 *monkey-patching* 도구라고 설명하고 있다.

proxyquire: https://github.com/thlorenz/proxyquire

proxyquire는 의존 모듈을 덮어 쓴다고 설명하고 있다. *overriding dependencies*

### 어떤 차이가 있을까?

#### rewire: 테스트 대상 내에 선언한 변수를 가로채어 바꾼다.

```javascript
// app.js
var foo = 1;
module.exports = () => console.log(foo);
```

```javascript
// test.js
const rewire = require('rewire');
const app = rewire('./app');  // 테스트 대상

app.__set__('foo', 2);

app();  // 2
```

#### proxyquire: 테스트 대상이 `require`하는 모듈을 바꿔서 보내준다.

```javascript
// bar.js
module.exports = 1;
```

```javascript
// app.js
const bar = require('./bar');
module.exports = () => console.log(foo);
```

```javascript
// test.js
const proxyquire = require('proxyquire');
// 테스트 대상 및 의존 모듈 mocking
const app = proxyquire('./app', {
    './bar': 2
});

app();  // 2
```

### rewire 제한사항

rewire는 `const`로 선언된 변수는 변경할 수 없었다. 따라서 의존 모듈을 `const`에 할당하면 stub 할 수 없다.
이 문제 때문에 일단 proxyquire를 사용하고 있다.

## Sinon.JS

자바스크립트를 위한 테스트 spies, stubs, mocks.

### `new Date()` 조작하기

```javascript
var clock = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
clock.restore();
console.log(new Date()); // now
```

`useFakeTimers()`로부터 반환되는 객체의 `restore()`를 호출하여 조작된 시간을 복구할 수 있다.

주의할 점은 복구하지 않고 다시 조작하는 경우.

```javascript
var clock1 = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
var clock2 = sinon.useFakeTimers(new Date('2000-12-01 00:00:00'));
console.log(new Date()); // Fri Dec 01 2000 00:00:00 GMT+0900 (KST)
clock2.restore();
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
clock1.restore();
console.log(new Date()); // now
```

나중에 조작한 시간을 복구해도 이전에 조작한 시간이 남아 있다.

`clock1`을 바로 복구해도 돌아올 수 있다.

```javascript
var clock1 = sinon.useFakeTimers(new Date('1800-01-01 00:00:00'));
console.log(new Date()); // Wed Jan 01 1800 00:00:00 GMT+0900 (KST)
var clock2 = sinon.useFakeTimers(new Date('2000-12-01 00:00:00'));
console.log(new Date()); // Fri Dec 01 2000 00:00:00 GMT+0900 (KST)
clock1.restore();
console.log(new Date()); // now
```

## NodeJS data validation

웹 서버를 작성할 때, 요청 데이터를 수동으로 검증하는 일은 너무 피곤하다.

Python Django는 자체적으로 Form 클래스를 제공한다:\
https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Forms

Django Form은 정말 다양한 필드를 지원한다.

Python Flask는 WTForm 또는 Marshmallow을 사용한다:

* https://github.com/wtforms/wtforms
* https://github.com/marshmallow-code/marshmallow

WTForm이 경량하게 사용할 수 있었고, Marshmallow는 사용해보지 않았다.
Marshmallow는 Django의 Form과 영속성을 결합한 Model Form과 비슷한 기능을 지원하는 거 같다.

NodeJS는 아직까지 사용해본 적이 없다.
이때까지 수동으로 처리해왔는데 너무 힘들었다.
이런거도 해보려다가 말았다:\
https://github.com/Edunga1/grooming-type-checker

expressjs나 다른 프레임워크는 어떻게 처리하는지 찾아보니 Joi를 사용하는가 보다.
Joi는 hapijs의 생태계에서 개발되었다.

hapijs에 종속되지 않아서 어느 곳에서나 사용할 수 있다:

> The most powerful schema description language and data validator for JavaScript.

## NodeJS 서버 로컬 요청만 허용하기

https://stackoverflow.com/questions/14043926/node-js-connect-only-works-on-localhost<br>
여기에서 힌트를 얻었음

https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback<br>
`server.listen()` 스펙을 보면 포트 번호와 함께 host(ip)를 입력하면 해당 ip만 허용한다.

기본값은 `0.0.0.0`이고 '지정되지 않음'을 의미하며 외부 ip의 연결도 허용하지만, `127.0.0.1`으로 두면 로컬 연결만 허용된다.

근데, 이렇게 로컬 요청을 구분하는 것은 좋지 않은 것으로 보인다.
MSA 환경 구축하면 다른 머신의 연결도 있을테니까.
virtual host 또는 방화벽으로 막는게 합리적으로 보인다.

## pm2 deploy 시 주의할 점

[pm2 deploy tutorial](http://pm2.keymetrics.io/docs/usage/deployment/#complete-tutorial)
처럼 `post-deploy`를 다음과 같이 저장하는 경우 조심해야 한다.

```json
"post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production"
```

`pm2 deploy` 하면 다음 절차로 일이 발생한다:
1. 로컬 `ecosystem.json`과 같은 설정 파일을 읽어들임
1. 명세한 서버 정보(`user`, `host`)로 리모트 서버에 접속
1. (리모트 서버에서) git pull
1. (리모트 서버에서) npm install
1. (리모트 서버에서) pm2 startOrRestart ecosystem.json --env production
1. (리모트 서버에서) 위 명령어에 의한 `ecosystem.json` 설정 파일을 읽어들임
1. `apps` 명세에 따른 배포

그러니까 설정 파일은 로컬에서, 리모트에서 총 2번 읽어들인다.

그래서 pm2는 현재 브랜치가 트래킹 중인 리모트 브랜치와 달라지면 싱크를 맞추라고 한다: `push your changes before deploying`

로컬이랑 서버랑 설정 파일이 안맞으면 골치아파진다. 서로 다른 설정 파일을 읽기 때문에 원하는 대로 작업이 이루어지지 않을 수도 있다.
원인은 로컬에서 실행되는 명령어의 명세인 `deploy`, 리모트 서버에서 실행되는 명령어의 명세인 `apps`를 보통 하나의 파일에서 관리하고
코드베이스에 포함하기 때문인데, 설정 파일을 다른 위치에 두면 로컬과 리모트의 설정 파일의 싱크를 보장할 수 없다.

---

pm2로 배포 프로세스를 관리하고 싶어서 설정 파일을 작성하였으나, 데이터베이스 비밀번호를 `env`에 저장하면 코드베이스에 포함되기 때문에,
다른 repository로 분리하려 했다.

그래서 `npm run deploy`하면 셸 스크립트를 실행하도록 했다:
1. pm2 설정 파일을 가지는 저장소`git clone git@github.com:user/repo.git .config`
2. `pm2 deploy .config/ecosystem.json production`

리모트 서버에는 `config` 저장소를 하나 클론 받아놓고 적절한 곳에 두고
`post-deploy`를 `"npm install && pm2 startOrRestart /home/node/config/ecosystem.json --env production"`
설정 파일의 위치를 해당 위치를 가리키도록 했다.

이러다보니 설정 정보를 업데이트해도 리모트에서 다시 pull 하지 않으면 로컬에서는 최신 설정을, 리모트에서는 이전 설정을 사용하는 문제가 있다.

따라서 리모트에서도 항상 `config` 저장소를 clone 후 `pm2 startOrRestart` 하도록 해야겠다.

## Jupyter notebook 사용하기

[Jupyter Docker Stacks](docker#Jupyter Docker Stacks)

## Taming architecture complexity in v8

https://blog.theori.io/taming-architecture-complexity-in-v8-translation-47564093473b

[원문](https://v8.dev/blog/csa)을 번역한 글.

옛날엔 내장 함수(builtin)가 self-hosted, JS로 작성되기도 했다.
그러다보니 성능 이슈가 있었고, 어셈블리로 다시 작성되었다.

성능은 향상되었으나, 유지보수를 하는데 어려워졌다.

그래서 어셈블리어로 변환해주는 중간 계층을 두었다.
프레임워크처럼 C++ 매크로로 틀에 맞춰 작성하면,
어셈블리 코드로 변환된다.

테스트코드 또한 C++로 작성할 수 있다.

문자열 객체에 길이를 구하는 `GetStringLength` 함수를 작성하는
자세한 예시를 보여주니 좋다.

작성한 C++ 코드의 가독성이 좋아 보인다:

```cpp
TF_BUILTIN(GetStringLength, CodeStubAssembler) {
    Label not_string(this);

    Node* const maybe_string = Parameter(Descriptor::kInputObject);

    GotoIf(TaggedIsSmi(maybe_string), &not_string);

    GotoIfNot(IsString(maybe_string), &not_string);

    Return(LoadStringLength(maybe_string));

    BIND(&not_string);

    Return(UndefinedConstant());
}
```

[견고한 코드를 작성하는 방법](https://blog.hassler.ec/wp/2019/04/07/1-powerful-way-to-write-robust-code/)
글이 생각났다. 진입점은 깔끔하게 유지하기.
