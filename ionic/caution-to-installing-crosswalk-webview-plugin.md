# Caution to installing crosswalk-webview plugin

crosswalk-webview 플러그인 설치 시 주의사항

```bash
cordova plugin add crosswalk-webview
```

cordova 명령어로 설치 시 제대로 동작하지 않는 문제 발생.

deviceready 이벤트가 호출되지 않고, 자바스크립트 콘솔 창에 다음 메시지 출력 됨:

```javascript
deviceready has not fired after 5 seconds
...
```

**해결 방법**

github repository로부터 플러그인을 추가한다.

```bash
cordova plugin add https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview
```
