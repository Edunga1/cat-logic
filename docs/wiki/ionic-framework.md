# Ionic Framework

2017년에 작성된 내용.

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

# Error - Could not find gradle wrapper within Android SDK

|Env.|Version|
|---|---|
|Android SDK Platform-Tools|26.0.0|
|Android SDK Tools|26.0.1|
|ionic|2.2.2|
|`ionic platform list`|android@?.?.?|

안드로이드로 빌드 시 다음과 같은 에러가 나오는 경우:

```bash
add to body class: platform-android

ANDROID_HOME=/Users/name/Library/Android/sdk

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_77.jdk/Contents/Home

Error: Could not find gradle wrapper within Android SDK. Might need to update your Android SDK.
Looked here: /Users/name/Library/Android/sdk/tools/templates/gradle/wrapper
```

ionic platform android의 버전을 최신으로 맞춘다:

```bash
cordova platform add android@6.2.1
```

아마도 Android SDK 버전을 업데이트 하면서 발생한 듯.
Android SDK와 ionic의 android paltform 버전을 맞추어야 하는 거 같다.

이상하게도 `cordova platform list` 결과에 최신 버전이 `6.1.2`로 낮은 버전이 출력 되었다. 그래서 최신 버전을 명시하여 추가했다.

https://forum.ionicframework.com/t/error-could-not-find-gradle-wrapper-within-android-sdk-might-need-to-update-yo-ur-android-sdk/22056/34

# in-app-brwoser

링크나 redirect를 현재 앱이나 내장 브라우저로 열 수 있다.

이동하려는 URL이 whitelist(`config.xml`)에 등록되어 있으면 현재 앱 내에서 연다.

모든 URL 허용 `config.xml` 예:

```xml
<allow-navigation href="*" />
```

whitelist 플러그인이 필요하다:

```xml
<plugin name="cordova-plugin-whitelist" spec="1.3.3" />
```
