---
id: 1a26613878a6463f075083d15a498c78
time: 2020-01-29 17:21:31
tags: kotlin
---
# Kotlin

## Extension

```kotlin
assertThat("foo").isEqualTo("bar")
```

위 코드를 코틀린 Extension을 사용하면.

```kotlin
infix fun <A, B> A.isEqualTo(that: B): ObjectAssert<A> = assertThat(this).isEqualTo(that)
```

```kotlin
"foo" isEqualTo "bar"
```

처럼 사용할 수 있다.
