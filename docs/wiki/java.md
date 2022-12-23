# Jakarta EE (a.k.a. Java EE)

https://www.samsungsds.com/kr/insights/java_jakarta.html

EE는 Enterprise Edition의 줄임말이다.

명칭을 Java EE -> Jakarta EE 명칭을 변경하면서, 오픈소스로 전환했다.

기업(enterise)용 애플리케이션을 개발 및 실행하기 위한 기술과 환경을 제공한다.

## 포함하는 기술

https://jakarta.ee/specifications/platform/8/platform-spec-8.html#a84

### HTTP

클라이언트 사이드 API를 `java.net`으로 제공한다. 서버 사이드는 Jakarta Servlet, Jakarta Server Pages,Jakarta Server Faces 등에서 제공한다.

ref. https://reflectoring.io/comparison-of-java-http-clients/
```
HttpClient client = HttpClient.newBuilder()
  .version(Version.HTTP_2)
  .followRedirects(Redirect.NORMAL)
  .build();

HttpRequest request = HttpRequest.newBuilder()
 .uri(new URI(URLConstants.URL))
 .GET()
 .header(URLConstants.API_KEY_NAME, URLConstants.API_KEY_VALUE)
 .timeout(Duration.ofSeconds(10))
 .build();


client.sendAsync(request, BodyHandlers.ofString())
  .thenApply(HttpResponse::body)
  .thenAccept(System.out::println)
  .join();java
```

### JNDI (Java Naming and Directory Interface)

> JNDI는 디렉터리 서비스에서 제공하는 데이터 및 객체를 발견하고 참고하기 위한 자바 API다.

```java
ds = new DriverManagerDataSource("jdbc:h2:mem:mydb");
```

### JTA (JAva Transaction API)

`javax.transaction` 패키지로 제공한다.

[Transactional Annotations: Spring vs. JTA](https://www.baeldung.com/spring-vs-jta-transactional)
스프링이 제공하는 `org.springframework.transaction.annotation.Transactional`. JTA가 제공하는 `javax.transaction.Transactional`. 두 개를 비교하는 글.

Spring Framework 4.0부터 JTA 1.2를 지원해서 Spring에서 JTA Transactional을 사용할 수 있다고 한다.
