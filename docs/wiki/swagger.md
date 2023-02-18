# Swagger

REST 웹 서비스를 위한 문서화 도구

# Swagger Core

https://github.com/swagger-api/swagger-core

[springdoc-openapi](https://github.com/springdoc/springdoc-openapi)는 Swagger Core를 기반으로 만들어졌다.
따라서 [Spring Framework](spring-framework.md)를 사용하는 경우 문서화에서 발생하는 이슈는 대부분 swagger-core와 관련이 있다.

## enum class에서 Jackson `@JsonFormat`이 적용되지 않는 문제

Github Issue: https://github.com/swagger-api/swagger-core/issues/3691

다음과 같이 kotlin 코드를 작성하였다.

```kotlin
data class Response(
  @JsonUnwrapped
  val status: Status,
  val data: Any?
)

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
enum class Status(val code: Int, val message: String) {
  SUCCESS(0, "success"),
  FAIL(1, "fail")
}
```

내가 예상한 serialization 결과:
```json
{
  "code": 0,
  "message": "success"
  "data": null
}
```

실제 serialization 결과:
```json
{
  "status": "SUCCESS",
  "data": null
}
```

`@JsonUnwrapped`, `@JsonFormat`이 적용되지 않았다.
아직 별다른 해결 방법이 없는 모양. 이슈에서 관련 로직을 [재작성한다](https://github.com/utybo/Tegral/issues/55)는 거 같다.
