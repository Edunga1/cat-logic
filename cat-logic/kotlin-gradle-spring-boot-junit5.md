---
id: page-96
time: 2020-01-20 21:49:04
tags: WIP, kotlin, spring
---
# Kotlin + Gradle + Spring Boot + Junit5

> 아직 제대로 이해하지 못 함. 추후 수정

```groovy
plugins {
  id("org.springframework.boot") version "2.2.2.RELEASE"
  id("io.spring.dependency-management") version "1.0.8.RELEASE"
  // ...
}

dependencies {
  // ...
  testImplementation("io.projectreactor:reactor-test")
  testImplementation("org.springframework.boot:spring-boot-starter-test") {
    exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
  }
}
```

`org.springframework.boot:spring-boot-starter-*`가 `create-react-app`과 비슷한 모듈인 듯.

Ref. https://meetup.toast.com/posts/152

`CRA`로 생성된 의존 모듈 관리는 `react-scripts`가 Wrapping 하고, `eject` 명령어로 해제할 수 있지만 권장하지는 않는다.
많은 의존 모듈을 호환이 잘 되는 형태로 관리해주기 때문.

`spring-boot-starter`도 그러한 방법을 제공하지 않을까 싶다.
직접 junit5 설정하려니 너무 번거로웠다. 추세는 starter로 관리하는게 아닐까 싶음.

`org.springframework.boot:spring-boot-starter-test`는 junit4도 포함한다. 그래서
`exclude(...)` 구문으로 제외해야 한다.