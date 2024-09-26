---
created: 2023-01-08
---
# Spring framework

자바 기반 엔터프라이즈 애플리케이션을 개발하기 위한 프레임워크.

> A key element of Spring is infrastructural support at the application level: Spring focuses on the "plumbing" of enterprise applications so that teams can focus on application-level business logic, without unnecessary ties to specific deployment environments.

특정 배포 환경에 종속되지 않도록 애플리케이션 수준의 인프라 지원을 제공하는 것이 핵심 요소.

> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".

Spring Boot의 목적은 실행만 하면 되는 스프링 기반 애플리케이션을 쉽게 만드는 것이다.

[Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/index.html)

## Features

### `RequestMapping` Request mapping narrowing

[RequestMapping - Spring API](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)

`@RequestMapping`는 Controller의 매핑 범위를 줄이는 파라미터를 제공한다.

`@GetMapping` `@PostMapping` 사용하여 우선 method로 선택 범위를 좁힐 수 있다.

#### parameters

##### `value` (alias of `path`)

가장 기본적인 인자로, url path를 매핑한다. 기본 값은 빈 문자열이므로 `/` 와 같다.

##### `params`

query-string 매핑.

* `myParam=myValue` 특정 값인 경우만 매핑한다.
* `myParam!=myValue` 위의 반대. 특정 값이 아닌 경우만 매핑한다.
* `!myParam` `myParam` 파라미터 자체가 제공된 경우만 매핑한다.

##### `headers`

header 매핑.

`@RequestMapping(value = "/something", headers = "content-type=text/*")`

wildcard를 사용한 경우 `text/plain` `text/html` 모두 매핑한다.

### Test

#### Transactional Test

통합 테스트에서 teardown 시점에 트랜잭션을 롤백하는 방법은 편리해서 자주 사용하는 방법이다.

SpringBootTest에서는 `@Transactional`을 사용하여 테스트 후에 롤백할 수 있다:

```kotlin
@Import(TestClientConfig::class)
@ExtendWith(SpringExtension::class)
@AutoConfigureWebTestClient
@SpringBootTest
@Transactional
class UserAddressTest {
  @Autowired
  lateinit var userAddressRepository: UserAddressRepository

  @BeforeEach
  fun prepare() {
    userAddressRepository.save(UserAddress(uid = 1234, address1 = "서울시"))
  }

  @Test
  fun test1() {
    assertThat(userAddressRepository.count()).isEqualTo(1)
  }

  @Test
  fun test2() {
    assertThat(userAddressRepository.count()).isEqualTo(1)
  }
}
```

하지만 `@Nested` 클래스에서는 롤백되지 않는다:

```kotlin
@Import(TestClientConfig::class)
@ExtendWith(SpringExtension::class)
@AutoConfigureWebTestClient
@SpringBootTest
@Transactional
class DescribeShippingAddressDetailAAA {
  @Autowired
  lateinit var userAddressRepository: UserAddressRepository

  @BeforeEach
  fun prepare() {
    userAddressRepository.save(UserAddress(uid = 1234, address1 = "서울시 구로구 구로동"))
  }

  @Nested
  inner class Context {
    @Test
    fun test1() {
      assertThat(userAddressRepository.count()).isEqualTo(1)
    }

    @Test
    fun test2() {
      assertThat(userAddressRepository.count()).isEqualTo(1)
    }
  }
}
```

`@Nested`에서 롤백되지 않는 것은 [예상 가능한 범위](https://stackoverflow.com/questions/44203244/transaction-roll-back-is-not-working-in-test-case-in-nested-class-of-junit5)라고
Spring TestContext Framework 개발자가 말한다:

> This is to be expected: the Spring TestContext Framework has never supported "inheritance" for nested test classes.

다만 이를 지원할 수 있도록 작업한 모양이다.
[SPR-15366](https://jira.spring.io/browse/SPR-15366) 이슈에서 `@Nested`에 대한 처리를 진행했다.
Spring 5.3의 마일스톤에 포함되어 있다.

이 작업이 [@NestedTestConfiguration](https://docs.spring.io/spring-framework/reference/testing/annotations/integration-junit-jupiter.html#integration-testing-annotations-nestedtestconfiguration)에 대한 내용으로 보인다.

### Application Properties

https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html

Spring Boot는 `application.properties`, `application.yaml`, 환경변수, command-line 인자로부터 설정값을 받을 수 있다.

`@configurationProperties`가 설정된 클래스에 매핑해 주는데 [Relaxed Binding](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.typesafe-configuration-properties.relaxed-binding)을 사용한다.

매우 관대한 규칙으로 property에 binding 하는데, [Relaxed Binding 2.0 Github Wiki](https://github.com/spring-projects/spring-boot/wiki/Relaxed-Binding-2.0)에 그 규칙을 설명하고 있다.

특수 문자는 제거되고, 모두 소문자로 변환한다.
따라서 다음 설정은 모두 동일한 것으로 간주된다:

```
spring.jpa.database-platform=mysql
spring.jpa.databasePlatform=mysql
spring.JPA.database_platform=mysql
spring.jpa.databaseplatform=mysql
```

추천하는 프로퍼티 작성 스타일은 kebab-case를 사용하는 것이다:

> We recommend that properties are stored in lowercase kabab format. i.e. `my.property-name=foo`.

`@ConfigurationProperties` 예시. 생성자를 통해서 주입받는다.

```kotlin
@ConstructorBinding
@ConfigurationProperties(prefix = "foo.bar")
class MyConfig(val baz: String)

// ConstructorBinding 사용하려면 EnableConfigurationProperties가 필요
@EnableConfigurationProperties(MyConfig::class)
@SpringBootApplication
class Application
```

### URI Links

https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-uri-building.html#uri-encoding

`UriComponentsBuilder`로 query parameter에 URL을 전달하기 위해 다음과 같이 작성하면 인코딩 문제가 발생한다.

```kotlin
fun build(url: String) = UriComponentsBuilder
  .fromUriString("https://example.com")
  .queryParam("url", url)
  .build()
  .toString()

build("https://www.google.com/search?q=%ED%91%B8%EB%B0%94&oq=%ED%91%B8%EB%B0%94&aqs=chrome..69i64j46i340i512j0i512l8.2053j0j1&sourceid=chrome&ie=UTF-8")
// https://example.com?url=https://www.google.com/search?q=%ED%91%B8%EB%B0%94&oq=%ED%91%B8%EB%B0%94&aqs=chrome..69i64j46i340i512j0i512l8.2053j0j1&sourceid=chrome&ie=UTF-8
```

`url=` 파라미터의 url에 포함된 slash가 인코딩 되지 않는다.

다음과 같이 `build()`로 전달하면 올바르게 인코딩한다.

```kotlin
fun build(url: String) = UriComponentsBuilder
    .fromUriString("https://example.com")
    .queryParam("url", "{url}")
    .build(url)
    .toString()

build("https://www.google.com/search?q=%ED%91%B8%EB%B0%94&oq=%ED%91%B8%EB%B0%94&aqs=chrome..69i64j46i340i512j0i512l8.2053j0j1&sourceid=chrome&ie=UTF-8")
// https://example.com?url=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3D%25ED%2591%25B8%25EB%25B0%2594%26oq%3D%25ED%2591%25B8%25EB%25B0%2594%26aqs%3Dchrome..69i64j46i340i512j0i512l8.2053j0j1%26sourceid%3Dchrome%26ie%3DUTF-8
```

`/`, `=`, `&` 등 URI 요소를 인코딩한 것을 볼 수 있다.

placeholder`{url}`는 사용하지 않았고, build로 전달하는 순서대로 replace 한다.

### Actuator

Spring Boot는 Actuator로 운영 환경에서 사용할 수 있는 모니터링 및 관리 도구를 제공한다.

- 2.1.0 문서: https://docs.spring.io/spring-boot/docs/2.1.0.M1/reference/html/production-ready.html
- 3.2.x 문서: https://docs.spring.io/spring-boot/docs/3.2.x/reference/html/actuator.html#actuator

문서 제목부터 *Production-ready Features*로 안정감이 느껴진다.

기본적으로 `/actuator`에서 현재 제공하고 있는 도구 목록을 보여주는데, json으로 제공된다:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:5001/actuator",
      "templated": false
    },
    "beans": {
      "href": "http://localhost:5001/actuator/beans",
      "templated": false
    },
    "health": {
      "href": "http://localhost:5001/actuator/health",
      "templated": false
    },
    "health-path": {
      "href": "http://localhost:5001/actuator/health/{*path}",
      "templated": true
    },
    "httptrace": {
      "href": "http://localhost:5001/actuator/httptrace",
      "templated": false
    }
  }
}
```

#### httptrace(httpexchanges)

httptrace는 최근 HTTP 요청 내역을 관리하는 기능이다. Spring Boot 3 부터는 `httpexchanges`라 부른다.

- 2.1.0: https://docs.spring.io/spring-boot/docs/2.1.0.M1/reference/html/production-ready-http-tracing.html
- 3.2.x: https://docs.spring.io/spring-boot/docs/3.2.x/reference/html/actuator.html#actuator.http-exchanges

기능 활성화를 위해서 버전에 따라 설정이 상이하다.

2.7.5 기준으로 `management.endpoints.web.exposure.include=httptrace`를 설정 추가하고, `HttpTraceRepository` Bean을 구현하면 활성화 할 수 있다.\
Bean 구현하는 것은 [2.2.0 M3 부터 변경](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.2.0-M3-Release-Notes#actuator-http-trace-and-auditing-are-disabled-by-default)되었는데, 이전 버전에서는 구현없이 가능했던 모양.

Spring Boot 3부터는 명칭 변경으로 `management.endpoints.web.exposure.include=httpexchanges`로 변경되었다.
Bean 인터페이스 이름도 `HttpExchangeRepository`로 변경되었다.

어느 버전이든 `HttpTraceRepository`를 in-memory 버전 저장소로 간편하게 구현할 수 있다.\
다음은 Spring Boot 2 기준 예시 코드:

```kotlin
@Bean
fun httpTraceRepository(): HttpTraceRepository = InMemoryHttpTraceRepository()
```

내 경우, 운영에서는 `health` 말고는 Actuator 기능을 비활성화했기 때문에 Bean 생성 조건에 property 확인을 추가했다:

```kotlin
@Bean
@ConditionalOnExpression("'\${management.endpoints.web.exposure.include}'.contains('httptrace')")
fun httpTraceRepository(): HttpTraceRepository = InMemoryHttpTraceRepository()
```

서버 시작 후 `/actuator/httptrace`에 접속하면 json으로 제공한다.

```json
{
  "traces": [
    {
      "timestamp": "2023-12-27T08:24:56.956Z",
      "principal": null,
      "session": null,
      "request": {
        "method": "GET",
        "uri": "http://localhost:5001/actuator/",
        "headers": {
          "sec-fetch-mode": [
            "navigate"
          ]
          // ... 생략
        },
        "remoteAddress": null
      },
      "response": {
        "status": 200,
        "headers": {
          "Keep-Alive": [
            "timeout=60"
          ]
          // ... 생략
        }
      },
      "timeTaken": 27
    }
  ]
}
```

actuator 페이지 접근을 위해 기록된 것을 볼 수 있다.
최근 요청의 헤더 정보, 응답 코드, URL 등을 알 수 있다.

### Transaction

#### 트랜잭션 로그 확인하기

`org.springframework.transaction`의 로그 레벨을 log4j, slf4j 기준 `TRACE`로 조정해야 한다: `org.springframework.transaction: TRACE` 

그러면 다음과 같이 로그가 출력된다:

```
2024-05-27T17:05:03.693+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Getting transaction for [com.example.MyService.process]


2024-05-27T17:05:03.694+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Getting transaction for [org.springframework.data.jpa.repository.support.SimpleJpaRepository.deleteAllByIdInBatch]

2024-05-27T17:05:03.708+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Completing tran2024-05-27T17:05:03.708+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Completing transaction for [org.springframework.data.jpa.repository.support.SimpleJpaRepository.deleteAllByIdInBatch]

2024-05-27T17:05:03.709+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Getting transaction for [org.springframework.data.jpa.repository.support.SimpleJpaRepository.saveAll]

2024-05-27T17:05:03.712+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Completing transaction for [org.springframework.data.jpa.repository.support.SimpleJpaRepository.saveAll]


2024-05-27T17:05:03.712+09:00 TRACE 19245 --- [-1 @coroutine#3] o.s.t.i.TransactionInterceptor           : Completing transaction for [com.example.MyService.process]saction for [org.springframework.data.jpa.repository.support.SimpleJpaRepository.deleteAllByIdInBatch]
```

트랜잭션의 시작은 `Getting transaction for`로 시작하고, 종료는 `Completing transaction for`로 끝난다.

기본적으로 쿼리 전후에 트랜잭션의 시작과 종료가 발생하지만(위 예제에서는 `SimpleJpaRepository`의 메서드 호출로 시작과 종료가 발생),
`@Transactional`을 통한 명시적인 트랜잭션 사용 시, 해당 메서드 전후로 트랜잭션 시작과 종료가 발생한다(위 예제에서는 `MyService.process`).

로그 대신 코드로 확인하고 싶다면 `TransactionSynchronizationManager.isActualTransactionActive()`를 사용한다. 전역 객체이므로 디버그 모드에서도 별도 주입 없이 사용할 수 있어서 간편하다.

## Spring Boot CLI

새 Spring 프로젝트를 빠르게 시작할 수 있는 도구.
프로젝트는 Spring Boot를 기반으로 한다.

https://docs.spring.io/spring-boot/docs/current/reference/html/cli.html

Homebrew로 설치:

```bash
$ brew tap spring-io/tap
$ brew install spring-boot
```

- `spring help <command>`: 명령어 도움말을 확인할 수 있다.
- `spring init --list`: 사용 가능한 프로젝트 유형 목록을 확인할 수 있다.

### 프로젝트 생성

Kotlin + Spring Boot + Gradle 프로젝트를 빠르게 생성 해보자.

```bash
spring init --language kotlin --type gradle-project-kotlin --extract demo
```

`demo` 디렉토리와 함께 프로젝트가 생성된다.\
`--extract` 옵션을 생략하면 zip 파일로 생성된다.

Application 코드를 생성해 주지만 `ApplicationRunner`로 간단하게 hello world 출력해보자:

```kotlin
@SpringBootApplication
class DemoApplication: ApplicationRunner {
    override fun run(args: ApplicationArguments) {
        println("Hello, world!")
    }
}

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
}
```

---

`spring init --list`의 가장 마지막 부분에 설정 기본값이 표시된다:

```bash
Parameters
+-------------+------------------------------------------+------------------------------+
| Id          | Description                              | Default value                |
+-------------+------------------------------------------+------------------------------+
| artifactId  | project coordinates (infer archive name) | demo                         |
| bootVersion | spring boot version                      | 3.0.4                        |
| description | project description                      | Demo project for Spring Boot |
| groupId     | project coordinates                      | com.example                  |
| javaVersion | language level                           | 17                           |
| language    | programming language                     | java                         |
| name        | project name (infer application name)    | demo                         |
| packageName | root package                             | com.example.demo             |
| packaging   | project packaging                        | jar                          |
| type        | project type                             | gradle-project               |
| version     | project version                          | 0.0.1-SNAPSHOT               |
+-------------+------------------------------------------+------------------------------+
```

`--type` 옵션에 사용 할 프로젝트 유형 목록도 표시된다:

```bash
Project types (* denotes the default)
+-----------------------+--------------------------------------------------------------+--------------------------------------------+
| Id                    | Description                                                  | Tags                                       |
+-----------------------+--------------------------------------------------------------+--------------------------------------------+
| gradle-build          | Generate a Gradle build file.                                | build:gradle,format:build                  |
|                       |                                                              |                                            |
| gradle-project *      | Generate a Gradle based project archive using the Groovy     | build:gradle,dialect:groovy,format:project |
|                       | DSL.                                                         |                                            |
|                       |                                                              |                                            |
| gradle-project-kotlin | Generate a Gradle based project archive using the Kotlin     | build:gradle,dialect:kotlin,format:project |
|                       | DSL.                                                         |                                            |
|                       |                                                              |                                            |
| maven-build           | Generate a Maven pom.xml.                                    | build:maven,format:build                   |
|                       |                                                              |                                            |
| maven-project         | Generate a Maven based project archive.                      | build:maven,format:project                 |
+-----------------------+--------------------------------------------------------------+--------------------------------------------+
```

포함할 의존성도 선택할 수 있는데, 간단한 설명이 포함되어 있어서 유용하다:

```bash
Supported dependencies
+--------------------------------------+--------------------------------------------------------------+-------------------------------+
| Id                                   | Description                                                  | Required version              |
+--------------------------------------+--------------------------------------------------------------+-------------------------------+
| activemq                             | Spring JMS support with Apache ActiveMQ 'Classic'.           |                               |
|                                      |                                                              |                               |
| actuator                             | Supports built in (or custom) endpoints that let you monitor |                               |
|                                      | and manage your application - such as application health,    |                               |
|                                      | metrics, sessions, etc.                                      |                               |
|                                      |                                                              |                               |
| webflux                              | Build reactive web applications with Spring WebFlux and      |                               |
|                                      | Netty.                                                       |                               |
|                                      |                                                              |                               |
| websocket                            | Build Servlet-based WebSocket applications with SockJS and   |                               |
|                                      | STOMP.                                                       |                               |
|                                      |                                                              |                               |
| zipkin                               | Enable and expose span and trace IDs to Zipkin.              |                               |
+--------------------------------------+--------------------------------------------------------------+-------------------------------+
```

의존성을 추가하려면 `--dependencies=actuator,webflux`와 같이 사용한다.

### 예시

설정 없이, 바로 시작할 수 있는 웹 서버:

```bash
$ spring init --language kotlin --type gradle-project-kotlin -d web --extract spring-web
```

`spring-web` 폴더로 이동 후 `./gradlew bootRun`으로 웹 서버를 시작할 수 있다.
포트 설정이 필요하다면 `./gradlew bootRun --args='--server.port=8888'`.

JPA 추가하여 kotlin + gradle(kts) + web + jpa:

```bash
$ spring init --language kotlin --type gradle-project-kotlin -d data-jpa,web --extract spring-kotlin-web
```

여기에 mysql jdbc connector를 추가하면:

```bash
$ spring init --language kotlin --type gradle-project-kotlin -d data-jpa,web,mysql --extract spring-kotlin-web-mysql
```

좀 더 운영을 생각한다면 actuator도 추가할 수 있겠다:

```bash
$ spring init --language kotlin --type gradle-project-kotlin -d data-jpa,web,mysql,actuator --extract spring-kotlin-web
```

## Caching

https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/boot-features-caching.html

> Use the spring-boot-starter-cache “Starter” to quickly add basic caching dependencies. The starter brings in spring-context-support.

`spring-boot-starter-cache`를 사용하면 간단한 설정으로 캐싱 모듈을 사용할 수 있는 거 같다.
일단 내 경우에는 간단한 형태는 아니고, 함수마다 각기 다른 캐시 만료 정책을 적용하기 위해서 `CacheManager`를 직접 구성해야 했고,
직접 구성하니 `spring-boot-starter-cache`는 필요하지 않았다.

### Caffeine

로컬 캐시 용도로 Caffeine만 써봤다.
[Caffeine에서 제공하는 벤치마크](https://github.com/ben-manes/caffeine/wiki/Benchmarks)로는 가장 우수하다.

[spring managed dependency](https://docs.spring.io/spring-boot/docs/current/reference/html/dependency-versions.html#:~:text=2.15.2-,com.github.ben%2Dmanes.caffeine,-caffeine)이므로 버전을 직접 지정할 필요는 없다.

> If Caffeine is present, a CaffeineCacheManager (provided by the spring-boot-starter-cache “Starter”)

`spring-boot-starter-cache`를 사용하면 `CaffeineCacheManager`를 알아서 만들어 준다고 한다.
내 경우에는 직접 `CacheManager` 구성해서 `spring-boot-starter-cache`가 필요하지 않았다.

```kotlin
@EnableCaching
@Configuration
class CacheConfig {
    @Bean
    fun cacheManager(): CacheManager {
        val caches = CacheType.values().map {
            CaffeineCache(
                it.cacheName,
                Caffeine.newBuilder()
                    .expireAfterWrite(it.duration)
                    .build()
            )
        }
        return SimpleCacheManager().also {
            it.setCaches(caches)
        }
    }
}

enum class CacheType(
    val cacheName: String,
    val duration: Duration,
) {
    CACHE_POLICY1("policy1", Duration.ofMinutes(10)),
    CACHE_POLICY2("policy2", Duration.ofMinutes(50)),
    ;
}
```

enum으로 만료 시간에 다른 캐시 정책을 여러개 만들었다.

```kotlin
@Cacheable(cacheNames = ["policy1"])
fun getItems(): Set<Items> = repository.find()
```

사용을 위해선 캐시 이름을 맞춰서 사용한다.
캐시 이름이 변경되면 캐시 선언 부분과 사용 부분 모두 수정하는데, 이는 캐시 이름을 `const val`로 만들어서 처리할 수 있다.

## Spring AI

Spring AI 프로젝트는 다양한 언어 모델과 플랫폼의 통합을 제공한다.

- 개요: https://spring.io/projects/spring-ai
- 시작하기: https://docs.spring.io/spring-ai/reference/getting-started.html

2024년 5월 아직 정식 릴리즈가 아닌 Milestone Release 단계이다.

OpenAI Key로 ChatGPT를 연동하거나, Ollama로 로컬 LLM을 다운로드 받아서 연결하거나 이외에도 Google Gemini, 임베딩 모델, 이미지 생성 등 다양한 
플랫폼과 모델을 사용할 수 있다.

### Spring AI 프로젝트 시작하기

이 시작 프로젝트는 https://github.com/Edunga1/spring-ai-web-start 에 올려두었다.

---

Spring CLI로 빠르게 시작해 보자.

```bash
$ spring init --language kotlin --type gradle-project-kotlin -d spring-ai-ollama,web --extract spring-ai-start
```

kotlin, gradle + kotlin dsl 그리고 `spring-ai-ollama` 의존성을 가진 프로젝트를 생성한다.
알아서 milestone 저장소를 추가해 준다.

[ollama](large-language-model.md)는 AI 모델을 로컬에서 쉽게 사용하도록 도와주는 도구다.
무료로 사용할 수 있으므로 이 프로젝트에서 비용 발생하지 않는다.

application.properties에 Ollama host와 사용할 모델을 설정한다:

```
spring.application.name=demo
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=llama3
```

간단한 컨트롤러를 작성하자:

```kotlin
package com.example.springaiwebstart

import org.springframework.ai.ollama.OllamaChatClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ChatController(
    private val client: OllamaChatClient,
) {
    @GetMapping("/chat")
    fun chat(q: String) = mapOf(
        "response" to client.call(q)
    )
}
```

이제 `ollama`로 모델만 서빙하면 된다. docker로 띄우면 매우 간단해진다.

```bash
# ollama 시작
$ docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama serve

# llama3 모델 다운로드
$ docker exec -it ollama ollama pull llama3
```

모델 다운로드가 꽤 오래 걸린다. 완료되면 프로젝트를 시작하고 간단한 쿼리를 날려보자.

```bash
$ curl http://localhost:8080/chat\?q\=hello
{"response":"Hello! It's nice to meet you. Is there something I can help you with, or would you like to chat?"}
```

## Troubleshooting

### IntelliJ에서 Properties의 선언부를 찾을 수 없는 경우

`@ConfigurationProperties(prefix="foo.bar")`가 선언된 클래스가 있음에도 `application.yml`에서 선언부를 찾지 못하고,
`Cannot resolve configuration property 'foo.bar'` 경고가 출력되는 문제. 서버 시작은 잘 된다.

`org.springframework.boot:spring-boot-configuration-processor` 의존성을 추가하고, `gradle compileJava`를 실행하면 된다.

gradle(kts) 예시:

```gradle
kapt("org.springframework.boot:spring-boot-configuration-processor")
```

### WebClient 첫 요청이 느린 문제

서버 시작 직후 API를 호출하는데 너무 느려서 타임아웃이 된다면, warmup을 고려하자.
netty http client의 warmup과 사용자 호출이 진입되기 전에 의존 API를 한 번씩 호출해 두는 것으로 사용자의 요청에서의 지연을 줄일 수 있다.

https://projectreactor.io/docs/netty/release/reference/index.html#_eager_initialization_4

1. warmup으로 event loop pool을 준비시키고
2. 서버 시작 시 임의로 호출하여 모든 사용자 요청은 첫 요청 이후가 되도록 한다.

2의 임의 호출은 해당 서버의 health check가 되는 API로 했다.

문서에서 설명하는 첫 요청에서 시간을 소요하는 요소는 다음과 같다:
1. event loop group
2. host name resolver
3. 내장된 transport 라이브러리들
4. 보안과 관련된 라이브러리들
