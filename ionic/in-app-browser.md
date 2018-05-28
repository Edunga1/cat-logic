# in-app-brwoser

링크나 redirect를 현재 앱이나 내장 브라우저로 열 수 있다.

이동하려는 URL이 whitelist(```config.xml```)에 등록되어 있으면 현재 앱 내에서 연다.

모든 URL 허용 ```config.xml``` 예:

```xml
<allow-navigation href="*" />
```

whitelist 플러그인이 필요하다:

```xml
<plugin name="cordova-plugin-whitelist" spec="1.3.3" />
```
