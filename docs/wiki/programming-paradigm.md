# Programming Paradigm

<!--toc:start-->
- [Programming Paradigm](#programming-paradigm)
- [Object Oriented Progamming](#object-oriented-progamming)
- ["Database Abstraction Layers Must Die!"라는 글을 읽고](#database-abstraction-layers-must-die라는-글을-읽고)
- [Expression Problem - 표현 문제](#expression-problem-표현-문제)
  - [https://m.facebook.com/story.php?story_fbid=2581087648844171&id=1676787645940847](#httpsmfacebookcomstoryphpstoryfbid2581087648844171id1676787645940847)
  - [https://edykim.com/ko/post/expression-problem/](#httpsedykimcomkopostexpression-problem)
  - [감상](#감상)
- [coroutine, generator, async, monad](#coroutine-generator-async-monad)
- [작은 언어는 프로그래밍의 미래입니다.](#작은-언어는-프로그래밍의-미래입니다)
<!--toc:end-->

# Object Oriented Progamming

[Object Oriented Progamming](object-oriented-programming)

# "Database Abstraction Layers Must Die!"라는 글을 읽고

http://jeremy.zawodny.com/blog/archives/002194.html

추상화의 장점을 다음과 같이 반박한다.

데이터베이스 계층을 추상화해야 한다는 사람들의 주장: *추상 계층을 잘 만들면 $this_database에서 $other_database로 이동하는데 덜 고통스럽다(쉽다).*

>절대 쉽지 않다. 어느 누구도 데이터베이스를 변경하는 것을 쉬운 일로 생각하지 않는다.
>
>"(데이터베이스) 전환이 덜 고통스러울 것이다"는 판타지다.
>
>좋은 개발자는 개발하는데 가장 최선의 도구(데이터베이스)를 선택한다.
>그리고 도구의 강력하고 유니크한 기능을 사용하면서 이점을 가진다.
>
>모든 RDBMS의 공통 기능만 사용하는 것으로 제한한다면 자신과 클라이언트에 막대한 손해를 입히는 것이다.
>
>이는 이렇게 말하는 것과 같다. "나는 Perl, C, PHP 공통 기능으로 제한하려고 해요. 왜냐하면 언젠가 언어를 바꿔야 한다면 덜 고통스러웠으면 하거든요."

애플리케이션이 개발, 배치 후에 데이터베이스를 교체하는 비용은 꽤 높다.

스키마와 인덱스를 변경하고 문법도 변경하고 최적화와 튜닝도 다시 해야한다.\
데이터베이사의 힌트도 조정하거나 제거해야 한다.\
mysql_foo()를 oracle_foo()로 변경하는 것은 문제점 중에서 가장 작은 부분이다.

# Expression Problem - 표현 문제

## https://m.facebook.com/story.php?story_fbid=2581087648844171&id=1676787645940847

> FP와 OOP의 차이는 Expression Problem을
어떻게 해결 하느냐에 있다고 말씀드린적이 있습니다.

## https://edykim.com/ko/post/expression-problem/

http://c2.com/cgi/wiki?ExpressionProblem 의 번역

* OOP는 새로운 타입을 추가하는데 자유롭다.
* FP는새로운 함수를 추가하는데 자유롭다.

## 감상

FP는 함수가 써드파티 라이브러리라면, 어떻게 새로운 타입을 추가할 수 있을까?

OOP는 써드파티 라이브러리의 인터페이스를 구현했다면, 새 메서드가 추가될 때
내가 구현한 클래스가 수정되어야 한다. 그래도 FP 쪽 보다는 형편이 나아보인다.
FP에서 이런 문제를 해결하기 위한 납득 가능한 방법이 있을 거 같다.

# coroutine, generator, async, monad

[Monad란 무엇인가? - NAVER engineering](https://tv.naver.com/v/5340169)

[WaitForSeconds - Unity 3D](https://docs.unity3d.com/ScriptReference/WaitForSeconds.html)

Unity의 `WaitForSeconds`는 일정 시간 동안 코루틴 실행을 중단(suspend)한다.

# 작은 언어는 프로그래밍의 미래입니다.

https://news.hada.io/topic?id=8009

> "Little Language"란?
> * '작은 언어'는 특정 문제를 해결하기 위한 목적을 가지고 만들어진 언어들
>   → SQL, RegEx, Dhall,..
>   → 또한 DSL이라고도 불려짐

핵심 주제에 집중하는 언어를 작은 언어라 한다. 이런 언어를 사용하면 문제 해결을 더 쉽게한다.

[kotlin은 언어 차원에서 DSL](kotlin.md#Kotin DSL)을 제공한다.
