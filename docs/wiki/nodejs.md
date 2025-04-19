---
created: 2016-11-06
---
# Node JS

크로스플랫폼 자바스크립트 런타임. 보통 서버 사이드에서 사용한다.

node.js(2009)를 시작으로 Deno(2018), Bun(2023) 등 다양한 런타임이 나왔다.

웹 프론트엔드 개발과 서버 사이드를 같은 언어로 작성할 수 있다는 점은 초기 프로젝트 개발에 매력적인 요소이다.

---

[NodeJS 소개 페이지에 따르면...](https://nodejs.org/en/about)

> Node.js is similar in design to, and influenced by, systems like Ruby's [Event Machine](https://github.com/eventmachine/eventmachine) and Python's [Twisted](https://twisted.org/).

Ruby의 Event Machine과 Python의 Twisted에 영향을 받았다고 한다.
두 라이브러리 모두 이벤트 기반 비동기 처리 라이브러리로 보인다.
Node.JS가 이런 라이브러리들과 다른 점은 런타임 차원에서 제공해서 이벤트의 시작을 명시적으로 하지 않아도 된다고 한다.
그래서 비동기 처리를 하는 이벤트루프가 사용자에게 숨겨진다고.

또한 HTTP는 Node.JS에서 일급 객체(First-class citizen)로 취급된다고 한다.
스트리밍과 저지연을 염두하고 설계되어서, 웹 프레임워크나 라이브러리와 잘 맞는다고 한다.

마지막으로 스레드 없이 설계되었다고 해서 멀티 코어의 이점이 없는 것은 아니라고 말한다.
[child_process](https://nodejs.org/api/child_process.html) 모듈을 사용하면 fork 할 수 있으며,
동일한 인터페이스를 가진 [cluster](https://nodejs.org/api/cluster.html) 모듈을 사용해서 소켓을 공유할 수 있다고 마무리한다.

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

## Builit-in Modules

### fs - File System

#### mkdtemp

[fs.mkdtemp](https://nodejs.org/docs/v20.15.1/api/fs.html#fsmkdtempprefix-options-callback)는 임시 디렉토리를 생성한다.
중복 이름을 피하여 생성해 줘서 편리하다.

예를들어 다음과 같이 사용하여 `/tmp` 디렉토리에 임시 폴더를 생성할 수 있다.
동기 버전을 사용했다.

```javascript
const { mkdtempSync } = require('fs')
const { tmpdir } = require('os')

console.log(mkdtempSync(tmpdir() + '/my-temp-folder-'))  // /tmp/my-temp-folder-GqR04W
console.log(mkdtempSync(tmpdir() + '/my-temp-folder-'))  // /tmp/my-temp-folder-egRlg4
```

몇 번 실행하면 `/tmp`에 임시 폴더가 많이 생성되어 있다.

```bash
$ ls /tmp | grep my-temp
my-temp-folder-egRlg4
my-temp-folder-EqXLKK
my-temp-folder-GqR04W
my-temp-folder-LBeRjv
```
---

[gatsby-transformer-gitinfo](https://github.com/kraynel/gatsby-transformer-gitinfo/blob/master/src/__tests__/gatsby_node.js#L68)라는 프로젝트는 통합 테스트에서 Git 프로젝트를 생성하기 위해서 사용한다.

## Test Runner

v20.0.0부터 node.js에서 테스트 러너를 자체적으로 제공한다.
v18.0.0, v16.17.0 부터 실험적 기능으로 추가되었다.

https://nodejs.org/docs/latest/api/test.html

사용 방법은 jest와 흡사하다.

```javascript
const test = require('node:test');
const assert = require('assert');

test('top level test', async (t) => {
  await t.test('subtest 1', (t) => {
    assert.strictEqual(1, 1);
  });

  await t.test('subtest 2', (t) => {
    assert.strictEqual(2, 2);
  });
});
```

assert 라이브러리는 오래전부터 제공했었다.

`describe()` - `it()` 스타일도 지원한다.

```javascript
const assert = require('assert');
const { describe, it } = require('node:test');

describe('A thing', () => {
  it('should work', () => {
    assert.strictEqual(1, 1);
  });

  it('should be ok', () => {
    assert.strictEqual(2, 2);
  });

  describe('a nested thing', () => {
    it('should work', () => {
      assert.strictEqual(3, 3);
    });
  });
});
```

실행은 `node --test`로 실행한다.
지켜보기 모드는 `node --test --watch`.

Mocking 라이브러리도 제공한다고 하니 이제는 별도 라이브러리를 설치할 필요 없이 가능할 거 같다.

---

관련 문서

[10 modern Node.js runtime features to start using in 2024](https://snyk.io/blog/10-modern-node-js-runtime-features/)

---

gatsby 관련 플러그인을 jest에서 node.js 테스트 러너로 마이그레이션해 보았다.

작업 커밋: https://github.com/Edunga1/gatsby-transformer-gitinfo/commit/ccdc7f4ec61e487db047678d32c0f65d85cacd03

장점은 jest 의존성을 없앨 수 있었다는 점 하나 뿐인 듯.
다른 테스트 도구의 인터페이스와 비슷해서 크게 손이 많이 가지는 않았다.
다만 assertion 부분은 오래전부터 자체 제공했던 인터페이스를 유지하고 있어서, 모두 손봐야 했다.

또한 jest가 제공하는 편리한 검증 함수에 비하면 node.js의 검증 도구는 협소하다.
예를들어 두 Object가 다른 한 쪽의 부분 집합인지 확인하는 함수가 없어서, 항상 전체가 같은지 확인해야 한다.
부분 비교를 하고 싶으면 직접 구현하거나, `lodash` 등 외부 라이브러리를 사용해야 하는데 테스트 때문에 추가해야 하는데 그러면 다른 테스트 도구를 사용하는 편이 낫겠다.

또한 jest의 `expect.any(String)` 같은 matcher의 지원이 없어서 테스트 코드의 가독성이 떨어진다.

이런 Jest 코드가 있으면:

```javascript
expect(createNodeField).toHaveBeenCalledWith({
  node,
  name: "gitLogLatestHash",
  value: expect.any(String),
})
```

아래와 같이 3개의 키를 가진 객체인지, 각 키의 값을 검증함으로써 같은 수준의 검증을 수행한다.
테스트 코드가 장황해진다. 검증이 많아진다면 더욱 그렇다.

```javascript
assert.strictEqual(Object.keys(createNodeField.mock.calls[3].arguments[0]).length, 3)
assert.strictEqual(node, node)
assert.strictEqual(name, "gitLogLatestHash")
assert.ok(typeof value === "string")
```

또다른 이슈라면, 위 프로젝트는 esm을 사용하고 있어서 `node` 명령어로 호출할 수 없다.
`babel-node`를 통해서 실행해야 한다. `node -r @babel/register --test **/*.spec.js`로 실행한다.
운영 코드를 `.mjs`로 작성하거나 commonjs 모듈로 전환하면 babel-node를 사용하지 않아도 되겠지만.
babel을 사용하지 않는다면 `node --test **/*.spec.js`로 실행한다.

## Third-party testing libraries

테스트 프레임워크인 mocha를 기반에 검증 라이브러리로 chai를 채택하는 라이브러리 조합 방식 대신,
[Jest](https://github.com/facebook/jest)를 사용하면 모든 기능을 한 번에 제공받을 수 있다.
다른 테스트 라이브러리 의존을 추가할 필요가 없다는 장점이 있다.

아래 도구들은 Jest 이전에 주로 사용하던 도구들이다.

### Mocha - Test Framework

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

### Chai - Assertion Library

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

### Istanbul - Test Coverage Tool

코드 커버리지 도구. 내 **테스트 코드**가 **모듈의 어디까지 테스트하는지 측정**하는데 사용한다.

https://github.com/istanbuljs/nyc

기존 istanbul은 deprecated 되고, nyc로 새로운 프로젝트로 이전되었다. 아래 내용은 istanbul을 기준의 내용이다.

---

설치: `npm install istanbul --save-dev`

테스트 시 `coverage/` 폴더가 생성되어 리포트 페이지(html)를 생성한다. 페이지를 통해서 실제 모듈이 얼마나 호출 되었는지, 어디까지 테스트 되었는지 확인한다.

Mocha와 함께 실행: `istanbul cover _mocha` (`_mocha`인 이유는 Mocha의 프로세스 이름을 이용하기 때문)

### Sinon.JS - Mocking Library

자바스크립트를 위한 테스트 spies, stubs, mocks.
가짜 객체를 만들어서 기존 객체를 대체하여 테스트에 맞게 조작하는 도구이다.

`new Date()` 조작하기

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

## Joi - 데이터 검증 라이브러리

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
[Joi](https://github.com/hapijs/joi)는 [hapijs](https://github.com/hapijs/hapi)의 생태계에서 개발되었다.
Joi는 24년 9월 기준 Star 수가 20k로 인기있는 라이브러리이다. HapiJS는 웹 프레임워크다.

> The most powerful schema description language and data validator for JavaScript.

Joi는 hapijs에 종속되지 않아서 어느 곳에서나 사용할 수 있다.

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

pm2는 node.js 운영 환경의 프로세스 매니저이다.
원격 서버에 코드를 배포하고, 애플리케이션을 다중 실행, 모니터링 등 다양한 기능을 제공한다.

Docker가 일반적으로 사용되기 전에는 pm2가 좋은 선택이었다.

---

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

로컬과 서버의 설정 파일이 불일치하면 골치 아파진다. 서로 다른 설정 파일을 읽기 때문에 원하는 대로 작업이 이루어지지 않을 수도 있다.
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
