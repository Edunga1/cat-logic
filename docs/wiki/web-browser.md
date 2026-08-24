---
created: 2026-08-24
---
# 웹 브라우저

## Accept 기본값

https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation/List_of_default_Accept_values

브라우저는 주소창을 통해 이동하는 등 정확한 정보를 알 수 없는 경우 몇 가지 정보는 기본값으로 설정한다.

[Chrome](/docs/wiki/chrome-browser.md)의 경우 Accept 기본값은 다음과 같다:

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
```

이 값은 `*/*` 보다 `application/xml`이 우선순위가 높아서 REST API를 디버깅할 때 불편하게 작용하기도 한다.
예로 [Spring 7.0.3](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.3)에는 XmlMapper를 [자동으로 Codec에 등록하는 기능](https://github.com/spring-projects/spring-framework/issues/35752)이 추가되었는데,
크롬 주소창으로 간단한 GET 요청의 API를 호출하면 XmlMapper가 선택되어서 인코드 할 수 없는 오류가 발생한다.

```
java.lang.UnsupportedOperationException: Stream encoding is currently not supported
	at org.springframework.http.codec.xml.JacksonXmlEncoder.encode(JacksonXmlEncoder.java:109)
	Suppressed: The stacktrace has been enhanced by Reactor, refer to additional information below: 
Error has been observed at the following site(s):
	*__checkpoint ⇢ HTTP GET "/my/test-api" [ExceptionHandlingWebHandler]
```
