---
created: 2024-04-27
---
# Gradle

빌드 자동화 도구.

https://docs.gradle.org/current/userguide/userguide.html

JVM에서 가장 많이 사용되는 빌드 도구이다.

[Java](java.md), [Kotlin](kotlin.md) 등 JVM 기반 언어뿐만 아니라 C++, Javascript 등 언어도 제공한다. 그런데 본 적은 없는 듯.

Gradle 빌드 스크립트는 Groovy 또는 Kotlin으로 작성할 수 있다. 여기서는 Kotlin을 기준으로 작성했다.

## Task

Task는 빌드가 실행되는 작업 단위이다.

> A task represents some independent unit of work that a build performs, such as compiling classes, creating a JAR, generating Javadoc, or publishing archives to a repository.

예를 들어 컴파일, JAR 파일 생성, 문서 생성, 모듈 배포 등이 있다.

https://docs.gradle.org/current/userguide/more_about_tasks.html

스크립트로는 Task를 다음과 같이 작성한다.

```kotlin
// register는 Task를 등록한다.
tasks.register('docFileJar', Jar) {
  group = 'documentation'
  description = 'Generate documentation.'
  archiveVersion = null
  archiveFileName = 'doc-files.jar'
  from 'src/main/template'
}

// named는 Task를 설정한다. 또는 `withType`으로 Task의 유형을 설정할 수 있다.
tasks.named('jar', Jar) {
  from docFileJar
}

// DefaultTask 구현으로 Task를 구현한다.
abstract class DocFileCreationTask : DefaultTask() {}
```

Task 식별하는 방법은 여러 방법이 있다. Lazy, Eager 그리고 alias가 있어서, 문서를 보고 적절하게 사용해야 겠다.

불필요한 Task 설정 피하기: https://docs.gradle.org/current/userguide/task_configuration_avoidance.html#sec:old_vs_new_configuration_api_overview

## Java & JVM 프로젝트에서의 테스트

테스트 코드는 Gradle을 통해서 실행된다. 따라서 실행하거나 또는 제외할 패턴 등 옵션을 제공한다.

https://docs.gradle.org/current/userguide/java_testing.html

테스트의 Task 유형은 `Test`이다.
JUnit, TestNG 등 프레임워크의 통합을 제공한다.

```kotlin
dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.7.1")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()

    maxHeapSize = "2g"

    testLogging {
        events("passed")
    }
}
```

[`useJUnitPlatform`](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/testing/Test.html#useJUnitPlatform-org.gradle.api.Action-)는 테스트를 JUnit 플랫폼으로 실행한다.

JUnit 옵션은 `useJUnit`으로 설정한다.

```kotlin
tasks.withType<Test> {
    useJUnitPlatform()

    useJUnit {
        includeCategories("com.mycompany.junit.CategoryA")
    }
}
```

주로 사용하는 옵션은 다음과 같다.

[`maxHeapSize`](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/testing/Test.html#setMaxHeapSize-java.lang.String-)\
테스트 JVM의 최대 Heap 크기를 설정한다.
