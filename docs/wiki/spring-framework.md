# Spring framework

# WebClient 첫 요청이 느린 문제

상황: 서버 시작 직후 다른 서버의 API를 호출하는 내 API가 느려서 클라이언트에서 타임아웃이 자주 발생함.\
해결: netty http client의 `warmup` + 사용자 진입 전 미리 타겟 서버 API 호출

https://projectreactor.io/docs/netty/release/reference/index.html#_eager_initialization_4

1. warmup으로 event loop pool을 준비시키고
2. 서버 시작 시 임의로 호출하여 모든 사용자 요청은 첫 요청 이후가 되도록 한다.

2의 임의 호출은 해당 서버의 health check가 되는 API로 했다.

문서에서 설명하는 첫 요청에서 시간을 소요하는 요소는 다음과 같다:
1. event loop group
2. host name resolver
3. 내장된 transport 라이브러리들
4. 보안과 관련된 라이브러리들

# `RequestMapping` Request mapping narrowing

[RequestMapping - Spring API](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)

`@RequestMapping`는 Controller의 매핑 범위를 줄이는 파라미터를 제공한다.

`@GetMapping` `@PostMapping` 사용하여 우선 method로 선택 범위를 좁힐 수 있다.

## parameters

### `value` (alias of `path`)

가장 기본적인 인자로, url path를 매핑한다. 기본 값은 빈 문자열이므로 `/` 와 같다.

### `params`

query-string 매핑.

* `myParam=myValue` 특정 값인 경우만 매핑한다.
* `myParam!=myValue` 위의 반대. 특정 값이 아닌 경우만 매핑한다.
* `!myParam` `myParam` 파라미터 자체가 제공된 경우만 매핑한다.

### `headers`

header 매핑.

`@RequestMapping(value = "/something", headers = "content-type=text/*")`

wildcard를 사용한 경우 `text/plain` `text/html` 모두 매핑한다.

# Test

# Transactional Test

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

# Spring CLI

Installation(Homebrew):
```bash
$ brew tap spring-io/tap
$ brew install spring-boot
```

도움말 확인하려면 `spring help <command>`\
e.g. `spring help init`

## 빠른 프로젝트 생성

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

JDK 버전 등 기본 설정값을 확인하려면 `spring init --list`:

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

`spring init --list`는 설치 지원하는 의존성도 보여주는데, 설명이 간락하게 잘 되어있다:

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

의존성을 추가하려면 `--dependencies=actuator,webflux`와 같이 옵션을 추가한다.

# Troubleshooting

## IntelliJ에서 Properties의 선언부를 찾을 수 없는 경우

`@ConfigurationProperties(prefix="foo.bar")`가 선언된 클래스가 있음에도 `application.yml`에서 선언부를 찾지 못하고,
`Cannot resolve configuration property 'foo.bar'` 경고가 출력되는 문제. 서버 시작은 잘 된다.

`org.springframework.boot:spring-boot-configuration-processor` 의존성을 추가하고, `gradle compileJava`를 실행하면 된다.

gradle(kts) 예시:

```gradle
kapt("org.springframework.boot:spring-boot-configuration-processor")
```

# Reference

Spring CLI:\
https://docs.spring.io/spring-boot/docs/current/reference/html/cli.html
