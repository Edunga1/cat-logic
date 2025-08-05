---
created: 2022-12-30
---
# 웹 개발

## GDG WebTech Workshop "측정하는 놈, 로딩하는 놈, 그리는 놈"

[2016-08-27 GDG WebTech Workshop "측정하는 놈, 로딩하는 놈, 그리는 놈"](./2016-08-27-gdg-webtech-workshop-nnn.md)

웹 브라우저 특히 크롬의 렌더링 개선 방법과 오프라인 서비스에 대한 내용

## React 렌더링 동작에 대한 완벽한 가이드

https://velog.io/@superlipbalm/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior

**jsx, createElement**

> 컴포넌트 렌더 출력은 일반적으로 JSX 구문으로 작성되며 자바스크립트가 컴파일되고 배포를 위해 준비될때 React.createElement() 호출로 변환됩니다

**호스트 컴포넌트?**

> // HTML 처럼 보이는 "호스트 컴포넌트"의 경우
> return <button onClick={() => {}}>Click Me</button>

사용자가 만든 커스텀 컴포넌트와 구분한다. html 기본 제공하는 컴포넌트.

## HTML Entity: `&amp;`, `&gt;`

https://developer.mozilla.org/en-US/docs/Glossary/Entity

`&amp;` 는 `&` 를 나타내고, `&gt;` 는 `>` 을 나타낸다. Entity라고 부르며, 이 중 특수문자를 Reserved characters라고 한다.

## 외부 사이트 이동 기능. Redirect Token.

유튜브 댓글에 다른 사용자가 하이퍼 링크를 입력하면 텍스트는 링크한 사이트로 표기되지만, 실제 링크는 유튜브의 redirection 페이지로 변경되어 있다.
변경된 페이지로 이동 시 실제 사이트 주소와 추가 정보를 URL 포함하여 전달하는데, 그 용도에 대해서 알아본다.

**Youtube Use case**

![youtube redirection 1](res/youtube-redirection1.png)
![youtube redirection 2](res/youtube-redirection2.png)

링크를 누르면 이동 대신 경고창으로 정말로 이동할 것인지 묻는다.

![youtube redirection 3](res/youtube-redirection3.png)

나가기 버튼의 링크로 직접 이동하면 위와 같은 화면으로 이동한다.

### redir_token?

변경된 링크는 아래처럼 생겼다:

```
https://www.youtube.com/redirect
?event=comments
&redir_token=QUFFLUhqbFY2dUdkYjFSNmxnTnZQdnJtLWdUdFNVLW42UXxBQ3Jtc0trdkt2UW1fMWRYdDY0MU1JVTh4ODg0SjVCSUhITi1ualBvN3dUU3ZVR0xjV2h1SnQ5NHdpM2hHdVZmT1JTTWszel9BZlBLQUp4RjJnSDNGVTBuVVdwVnR0VVZ3WURweGE3TUZXalFBQTJIOVhxNXpXdw
&q=http%3A%2F%2Fwww.asianfans.net%2Fwatch-online-jewel-in-the-palace-episode-1-54248.html
&stzid=Ugzm01czczwhYRrJQHV4AaABAg.96QNPi1HE5n96bf_VU_ja9
```

실제 이동할 사이트 주소를 가진 `q`와 알 수 없는 `redir_token`, `stzid`가 포함되어 있다.

`stzid` 의미는 이름에서 유추하기 어려워 보인다.
`redir_token`은 redirect token을 의미하는 거 같은데, 어떤 용도로 사용하는지 그 정보가 많이 없다.

https://help.canary.tools/hc/en-gb/articles/360021010477-How-do-I-create-a-Slow-Fast-Redirect-Token-

여기선 slow redirect, fast redirect 방식에 따라 토큰에 포함되는 정보를 달리 하는데, 브라우저와 플러그인 정보의 포함 차이라 한다.

사용자 세션에 따라 달라지는 값은 아니다.
시크릿 탭에서 열어도 같은 값을 가진다. 따라서 사용자마다 생성하는 것은 아닌것으로 보인다.

## Web API

### Device Orientation API

디바이스의 방향에 대한 정보를 제공하는 API

Google Chrome의 경우 개발도구 설정 -> More tools -> Sensors에서 디바이스 방향을 조정할 수 있다.
3D 기기 모델로 표현되어 있어서 직관적으로 이해할 수 있다.

x, y, z 축에 대한 각도로 표현한다. 각각 alpha, beta, gamma 값으로 제공된다.

```js
window.addEventListener("deviceorientation", onDeviceOrientation)

fucntion onDeviceOrientation(event) {
  const { alpha, beta, gamma } = event
  console.log(alpha, beta, gamma)
}
```

### 터치 이벤트와 마우스 이벤트 에뮬레이션

브라우저는 단일 터치 이벤트가 발생하면 마우스 이벤트를 추가 발생시킨다. 이를 마우스 이벤트 에뮬레이션 이라고 한다.

> Browsers typically dispatch emulated mouse and click events when there is only a single active touch point. Multi-touch interactions involving two or more active touch points will usually only generate touch events.
>
> 브라우저는 단일 터치가 발생할 때 일반적으로 마우스 및 클릭 이벤트를 추가로 발생시킵니다.
> 두 개 이상의 터치 포인트를 포함하는 멀티 터치는 일반적으로 터치 이벤트만 생성합니다.
>
> ref. https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events

내 경우 `touchend` 후에 `mousemove`, `mousedown`, `mouseup` 이벤트가 발생해서 의도대로 동작하지 않아서 수정해야 했다.[^1]

마우스 에뮬레이션을 막으려면 `preventDefault()`를 호출한다.

```js
window.addEventListener("touchend", e => {
  e.preventDefault()
  // some code
})
```

[InputDeviceCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceCapabilities_API)를 통한 터치와 마우스 이벤트의 구분도 가능해 보인다.
하지만 2024년 5월 기준 아직 실험적인 기능이다.

`e.sourceCapabilities.firesTouchEvents`는 터치 이벤트면 `true`를 반환하고, 마우스 이벤트면 `false`를 반환한다.

[^1]: [코드 수정 커밋](https://github.com/Edunga1/canvas-floating-alphabet/commit/296f08884f14e49c8ac36d73da7f3e6551c83701)

## HTTP

### Headers

직접 수정할 수 없는 헤더가 있다. `Content-Length`나 `Referer` 등이 그러한데, 이런 헤더를 [Forbidden Header Name](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)이라 한다.

### Server-Sent Events

HTTP를 통해 서버에서 클라이언트로 이벤트를 보내는 기술이다.
웹 소켓보다 간단하고, 서버에서 클라이언트로의 스트림이 필요한 경우에 사용한다.

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

클라이언트는 `new EventSource("url")`를 통해 서버 연결을 열고, 서버는 `Content-Type: text/event-stream` 헤더로 스트림으로 응답한다.

> Warning: When not used over HTTP/2, SSE suffers from a limitation to the maximum number of open connections [^2]

[^2]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#listening_for_custom_events

HTTP 커넥션을 점유하므로, HTTP/2 미만 환경에서는 브라우저의 커넥션 제한에 걸릴 수 있다.

각 메시지는 `event`, `data` 2개의 필드로 구성된다.
`event`는 이벤트 핸들러를 통해 구독할 수 있다.

> A string identifying the type of event described. If this is specified, an event will be dispatched on the browser to the listener for the specified event name;
the website source code should use `addEventListener()` to listen for named events.

---

https://github.com/yellyB/sse-start

Server-Sent Events 데모. Flask 서버와 간단한 HTML 클라이언트로 구성되어 있다.

크롬 브라우저는 별도 클라이언트 없이도 이벤트를 받아서 화면에 출력한다.
서버 URL로 접속만 하면 된다.

## Clean URL

https://en.wikipedia.org/wiki/Clean_URL

> Clean URLs (also known as user-friendly URLs, pretty URLs, search-engine–friendly URLs or RESTful URLs)

Clean URL은 사람이 식별하기 쉬운 URL을 말한다.

URL은 `.html` 등의 확장자, query string, path 등으로 구성되는데 이런 요소를 나타내기 위해 불필요한 문자가 포함된다.
이런 URL을 간결하게 만들 수 있다.

| Original URL                                 | Clean URL                    |
|----------------------------------------------|------------------------------|
| http://example.com/index.php?title=Main_Page | http://example.com/Main_Page |
| http://example.com/user.php?id=123           | http://example.com/user/123  |

[퍼머링크(permalink)](https://en.wikipedia.org/wiki/Permalink)는 주소는 한 번 정해지면 변경되지 않는다는 의미로 만들어진 말이다.
어떤 시스템은 컨텐츠가 추가되면서 URL이 변경되기도 한다. 그러면 기존 링크는 유효하지 않게 되므로 퍼머링크를 제공하기도 한다.

### Slug

[gatsby](./gatsbyjs.md) 등 몇몇 시스템은 *Slug*라는 이름으로 Clean URL을 지원한다.
다만 Slug는 구현체마다 다르게 동작할 수 있어서 주의가 필요하다.
문서 제목을 Slug로 사용한다면 비-영문자와 공백과 특수문자 등을 어떻게 처리할 지 고민해야 한다.\
[gatsby](./gatsbyjs.md)는 자체적으로 Slug를 제공하고 커스텀할 수 있다.
하지만 Slug가 생성되는 부분이 한 두 군데가 아니므로 모두  찾아서 처리하지 않으면 제대로 동작하지 않는 링크가 생길 수 있다.

## Bookmarklet

북마크의 URL 대신 자바스크립트 코드를 저장하면 현재 페이지에서 실행할 수 있다.

크롬 기준으로 아무 페이지나 북마크로 저장하고, 북마크 편집으로 위 코드를 URL 대신 붙여넣으면 저장할 수 있다.

https://en.wikipedia.org/wiki/Bookmarklet

다음은 위키백과에서 제공하는 예시 코드인데, 선택한 텍스트를 위키 백과에서 검색하는 Bookmarklet이다.

```js
javascript:(function(document) {
function se(d) {
    return d.selection ? d.selection.createRange(1).text : d.getSelection(1);
};
let d = se(document);
for (i=0; i<frames.length && (d==document || d=='document'); i++) d = se(frames[i].document);
if (d=='document') d = prompt('Enter%20search%20terms%20for%20Wikipedia','');
open('https://en.wikipedia.org' + (d ? '/w/index.php?title=Special:Search&search=' + encodeURIComponent(d) : '')).focus();
})(document);
```

간단한 확장 프로그램처럼 사용하기 유용하다.
위 코드만으로도 사전 검색을 한다거나 검색 결과를 열거나 등 응용 가능하다.

예를들어 다음은 선택한 텍스트를 다음 사전으로 검색한다:

```js
javascript:(function(document) {function se(d) {    return d.selection ? d.selection.createRange(1).text : d.getSelection(1);};let d = se(document);for (i=0; i<frames.length && (d==document || d==%27document%27); i++) d = se(frames[i].document);if (d==%27document%27) d = prompt(%27Enter search terms for Dictionary%27,%27%27);open(%27https://dic.daum.net/%27 + (d ? %27/search.do?q=%27 + encodeURIComponent(d) : %27%27)).focus();})(document);
```

북마크 저장하면서 코드가 인코딩 되었다.

## 로컬 파일을 서빙하는 간단한 웹 서버 띄우기

아주 간단한 방법은 `SimpleHTTPServer` 또는 `live-server`를 사용하는 것이다.

[python](./python.md) 또는 [node.js](./nodejs.md) 둘 중 하나는 왠만하면 설치되어 있을 것이므로 접근성이 좋다.

### `SimpleHTTPServer` 또는 `live-server`

일반적으로 알려진 방법은 python의 `SimpleHTTPServer` 모듈을 사용하는 것이다.

```sh
python -m SimpleHTTPServer
```

node.js로 만들어진 hot-reload 기능을 제공하는 `live-server`를 사용할 수도 있다.

```sh
$ npm install -g live-server
$ live-server
```

### Throttling 기능이 있는 웹 서버

서버의 지연 사항을 시뮬레이션 필요성이 있는 경우가 있다.
chrome 개발자 도구에서 네트워크 탭에서는 throttling 기능을 제공한다.
하지만 이 방법은 모든 네트워크 요청에 대해 적용되므로 특정 포트에 대해서만 적용할 수 없다.

StackOverflow 질문에서 이에 대한 답변을 찾을 수 있었다:\
https://stackoverflow.com/q/13654663


질문자 본인이 `lighttpd`로 특별한 설정 없이 해결했다고 한다.

덧글에서 이 방법을 docker 이미지로 만들어서 제공해서 사용하기 쉽게 만들었다:\
https://hub.docker.com/r/pbertera/lighttpd-throttle

```sh
docker run -it -p 8080:8080 \
  -e LIGHTTPD_PORT=8080 \
  -e LIGHTTPD_THROTTLE=100 \
  -v $(pwd):/var/www \
  pbertera/lighttpd-throttle
```

현재 경로의 파일을 volume으로 연결하고, `8080` 포트로 서빙하며, `100` kb 대역폭으로 제한한다.

## Web Framework

### Streamlit

Streamlit은 파이썬 웹 프레임워크이다.
간단한 페이지의 프로토타이핑이 필요하다면 Streamlit이 제격이다.

https://github.com/streamlit/streamlit

`pip install streamlit`으로 설치하고, 아래와 같이 간단한 파이썬 코드를 작성한다:

```python
import streamlit as st

st.title(f"Hello Streamlit-er 👋")
st.markdown(
    """
    This is a playground for you to try Streamlit and have fun.

    **There's :rainbow[so much] you can build!**

    We prepared a few examples for you to get started. Just
    click on the buttons above and discover what you can do
    with Streamlit.
    """
)

name = st.text_input("What's your name?")

if name:
    st.write(f"Hello, {name}! 👋")
    st.balloons()
```

`streamlit` 명령을 통해 실행한다:

```bash
streamlit run app.py
```

text input에 입력하면 입력한 이름을 화면에 출력하고, 풍선을 띄운다.

어떤 원리로 사용자 인터랙션을 처리하는지 이해되지 않았는데,
파이썬 코드를 다시 실행되면서 화면을 업데이트한다.
지연이 있는 실행이 있는 경우 어떻게 처리하는지 좀 더 알아봐야 겠다.

코드의 `:rainbow[]`와 같이 streamlit에서 제공하는 별도 문법이 있다.
이외에도 위젯, 레이아웃, 차트 등을 제공한다.
저장소에서 소개 `A faster way to build and share data apps.` 하는 것처럼 Data 앱을 만드는데 특화되어 있다.
