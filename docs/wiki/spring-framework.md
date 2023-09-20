# Spring framework

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

예를들어 다음 설정은 모두 같은 것을 의미한다:

```
spring.jpa.database-platform=mysql
spring.jpa.databasePlatform=mysql
spring.JPA.database_platform=mysql
```

공식적으로 추천하는 포맷은 kebab-case를 사용하는 것이다:

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

## Spring CLI

https://docs.spring.io/spring-boot/docs/current/reference/html/cli.html

Installation(Homebrew):
```bash
$ brew tap spring-io/tap
$ brew install spring-boot
```

도움말 확인하려면 `spring help <command>`\
e.g. `spring help init`

### 빠른 프로젝트 생성

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
