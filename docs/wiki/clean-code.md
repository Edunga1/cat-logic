---
created: 2023-04-12
---
# Clean Code

코드를 잘 작성하는 방법. 읽기 쉬운 코드에 대한 이야기.

## Redux 가이드의 보일러 플레이트 줄이기

https://ko.redux.js.org/usage/reducing-boilerplate/#%EC%95%A1%EC%85%98

> Flux에서는 전통적으로 모든 액션 타입을 문자열 상수로 정의합니다:

```javascript
> const ADD_TODO = 'ADD_TODO'
> const REMOVE_TODO = 'REMOVE_TODO'
> const LOAD_ARTICLE = 'LOAD_ARTICLE'
```

> 이게 어떤 이점이 있을까요? **작은 프로젝트에서 상수는 불필요하다는 지적이 종종 있었고 옳은 말**입니다. 큰 프로젝트에서는 액션 타입을 상수로 정의하는 이점들이 있습니다:
> * 모든 액션 타입이 한 곳에 모이기 때문에 이름 짓기의 일관성을 유지하는데 도움이 됩니다.
> * 새 기능을 만들기 전에 기존의 모든 액션을 한눈에 보고 싶을 때가 있을겁니다. 여러분이 필요로 하는 액션이 팀의 다른 사람에 의해 이미 추가되었지만 여러분이 모르고 있을 수도 있으니까요.
> * 추가되고, 제거되고, 변경된 액션 타입의 목록은 풀 리퀘스트에서 팀원 모두가 새 기능의 범위와 구현을 따라가는걸 도와줄겁니다.
> * 만약 여러분이 액션 상수를 불러오다가 오타를 내면 undefined가 나올겁니다. 액션을 보냈는데 아무 일도 일어나지 않는 것보다는 훨씬 알아차리기 쉽습니다.

리덕스의 액션에 대한 이야기지만 다른 곳에서도 공감을 불러일으키는 내용이다.
일련의 문자열에 의도를 표현하고, 한 군데서 관리할 수 있고, 기능 파악에 도움을 주고, 오타에 대한 대응이 있어서 좋은 방법이라고 설명한다.

간단한 아이디어지만 의미를 찾고, 문서화를 했다는 점에서 잘 작성하려는 노력이 보인다.

## Parse, don't validate

> 검증하지 말고 파싱하라.

https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

요지는 데이터를 검증하는 것보다 파싱을 통해 변환된 타입으로 반환하는 것이 더 좋다는 이야기이다.
짧지만 임팩트가 강한 슬로건이 긴 글을 압축한다.

```haskell
validateNonEmpty :: [a] -> IO ()
validateNonEmpty (_:_) = pure ()
validateNonEmpty [] = throwIO $ userError "list cannot be empty"

parseNonEmpty :: [a] -> IO (NonEmpty a)
parseNonEmpty (x:xs) = pure (x:|xs)
parseNonEmpty [] = throwIO $ userError "list cannot be empty"
```

`validateNonEmpty` ro수는 리스트가 비어있지 않은지 검증만 한다.
`parseNonEmpty` 함수는 비어있지 않은 리스트를 `NonEmpty` 타입으로 변환한다. 타입 시스텐이 비어있지 않음을 보장한다.
각 함수의 반환 값을 사용할 때, 검증 방식은 재검증에 대한 여지가 있지만 파싱 방식은 그렇지 않다.

검증의 위험성은 처리 로직과 함께 사용될 때 드러난다.
검증을 통과한 입력을 처리하다가, 다른 부분의 검증에 실패하면 이미 수정된 부분을 되돌리기 어렵다.
모든 검증을 미리 처리할 수 있겠지만, 정말 미리 처리되었는지 그것을 판단하기는 어렵다.
이런식으로 검증의 더미에 내던지고 에러 케이스를 처리할 것이라 기대하는 안티 패턴을 *Shotgun Parser*이라 한다.
