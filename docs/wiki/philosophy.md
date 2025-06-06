---
created: 2016-11-24
---
# 개인적인 철학

내 생각을 정리하고, 다른 사람의 생각을 살펴본다.

[기억하지 못하더라도, 읽거나 경험한 것은 나에게 영향을 준다](https://news.hada.io/topic?id=14506)고 한다.

취업 활동을 시작한 후로 부단히 노력하는 것이 있다.
아무리봐도 이해되지 않지만, 다른 분야의 이야기를 보려고 하는 거다.
예를들어, AI를 개발하지 않지만 AI 그룹에 가입하거나, 사업을 할 생각이 없었지만 관련된 뉴스를 보고있다.\
그렇게 지내왔더니 요즘은 오픈 AI 모델을 다운로드해서 사용해 보거나 사업에 대해 진지한 생각을 하게 된다.

컨텐츠를 주로 얻는 곳은 다음과 같다.

[AGI KR](https://www.facebook.com/groups/agikr)은 머신 러닝 페이스북 그룹이다.\
다양한 논문과 구현에 대한 질문들이 올라오는 곳이다. 솔직히 대부분 알아듣지 못하고, 논문 링크를 봐도 무슨 소리인지 전혀 이해하지 못한다.
그래도 키워드를 주워 듣고, 관련 뉴스를 보면 의도는 조금 이해가 된다.

[GeekNews](https://news.hada.io/)는 서비스 시작 당시부터 보고있는 뉴스 사이트이다.\
주제는 IT와 사업 등 광범위하다. [Hacker News](https://news.ycombinator.com/)가 모티브인데, 그래서 주제가 비슷하다.
예전에는 내 개인 사업을 하는 것에 대해서 꿈도 꾼 적 없지만, 이제는 시도는 해보지 않을까 싶다.

이외에도 개인 블로그나 기술 블로그를 RSS로 구독하고 있다.
주제는 다른 프로그래밍 언어이기도 하고, 다른 회사이야기 등이 있다.

[읽는 것만으로도 기억하지 못하지만, 나를 만든다는 글](https://news.hada.io/topic?id=14506)을 본 후로,
정말로 내 생각도 조금씩 바뀌어가는 것을 느낀다.
건강한 컨텐츠에 노출되도록 신경 써야겠다. 그리고 계속해서 모르는 것을 찾아보자.

## TED - Linus Torvalds: 리눅스의 기본 철학

[TED - 리누스 토발즈(Linus Torvalds): 리눅스의 기본 철학](https://www.ted.com/talks/linus_torvalds_the_mind_behind_linux?language=ko)

리누스 토발즈가 TED에서 인터뷰 형식으로 진행하는 영상이다.

### 좋은 코드

14:20 장면을 보면 Linked List의 node를 제거하는 함수 구현 코드 2개를 비교한다.

**Code 1**
```c
remove_list_entry(entry)
{
    prev = NULL;
    walk = head;

    // Walk the lsit

    while (walk != entry) {
        prev = walk;
        walk = walk->next;
    }

    // Remove the entry by updating the
    // head or the previous entry

    if (!prev)
        head = entry->next;
    else
        prev->next = entry->next;
}
```

**Code 2**
```c
remove_list_entry(entry)
{
    // The "indirect" pointer points to the
    // *address* of the thing we'll update

    indirect = &head;

    // Walk the list, looking for the thing that
    // points to the entry we want to remove

    while ((*indirect) != entry)
        indirect = &(*indirect)->next;

    // ... and just remove it
    *indirect = entry->next;
}
```

차이점은 마지막 부분의 if-else 키워드의 유무이다.

첫 번째 코드는 조건문을 통해 제거하는 노드가 첫 번째인지 아닌지 `if (!prev)` 판단한다.
반면에 두 번째 코드는 제거하려는 노드가 가리키는 주소를 다음 노드로 변경한다.

리누스 토발즈가 말하는 것은 특수 조건이 사라지면서 코드가 더 간결해 진다는 것이다.

물론 이 예시는 적절하지 않다고 한다. 너무 작은 규모이고, 단적인 예시이라는 것이다.
더 큰 프로젝트는 다양한 관점에서 좋은 코드를 찾아야 한다.

경험상 개발 로직의 알고리즘 순서도를 그려보면 분기문이 있는 쪽이 확실히 더 복잡해 보인다.
특수 케이스를 줄여보면 간결하기도 하고, 도형(프로세스) 순서를 바꿔보면서 다른 로직을 수행할 수도 있다.
이는 실제 코드로 옮겼을 때 관리하기 쉽게 만드는 것을 의미한다. 분기문이 있는 코드는 변경하기 좀 더 까다롭다.

<!-- TBD: 코드를 순서도로 표현한 예시를 넣자. -->

### 리누스 토발즈의 개발자 자세

16:40 장면부터

자신은 git, linux와 같은 프로젝트를 만들었음에도 예지자가 아니라고 한다.

하늘을 보며 걷는(미래 지향적인) 사람들과 일하는 게 좋으며,
자신은 그 **사람들이 구멍에 빠지지 않게 구멍을 메우는 일** 을 한다고 한다. Wow..

---

[리누스 토발즈의 인터뷰](https://kldp.org/node/96360)에서 좋아하는 것을 찾고, 깊게 파고들어 보라고 한다.
파고들면 자연스레 영역을 넓힐 수 있을 거라고.

> 저는 제가 좋아하는 일을 처음부터 지금까지 계속 해오고 있는 것입니다. 좋아하는 일을 빨리 찾아냈다는 것이 중요한 차이점인 것 같고요... 만약 여러분이 무엇을 좋아하는지 스스로 모르고 있다면 여러분을 도와줄 수 있는 사람은 아무도 없습니다. 리눅스 커널 관련해서 실력자가 되려면 무엇을 해야 하는지 제게 물어보는 사람들이 많은데요... 그럴때마다 항상 같은 대답을 합니다. 커널 내부에서 특별히 관심있는 분야를 찾아서 계속 파고들라고요. 그러다 보면 여러가지 일들을 추가로 하게 되고 메인테이너도 될 수 있지요.

#### 과격한 점

리누스 토발즈는 과격한 면이 있다.

[Git 메일링 리스트 중 하나](https://harmful.cat-v.org/software/c++/linus)를 보면, C++에 대한 논쟁이 있다.
원 저자가 예의없이 질문을 하긴 했지만, 리누스 토발즈의 답변은 더 매콤하다.

다음은 메일 중 일부이다.

> > When I first looked at Git source code two things struck me as odd:
> > 1. Pure C as opposed to C++. No idea why. Please don't talk about portability,
> > it's BS.
>
> *YOU* are full of bullshit.

마지막 줄이 답변이다.

C++를 아주 싫어하는데, C++ 개발자를 배제하는 것만으로도 C를 선택하는 이유가 충분하다고 말한다:

> Quite frankly, even if \
> the choice of C were to do *nothing* but keep the C++ programmers out, \
> that in itself would be a huge reason to use C.

## 게이브 뉴웰의 경력

마이크로소프트에 일하기 위해 하버드 대학을 자퇴했다.
이후에 인터뷰하기를 마이크로소프트에서의 첫 3개월간 배운 것이 하버드 시절보다 많다고 한다.:

> Newell said he didn't want to make Harvard seem bad but noted he "learned more in three months with those guys at Microsoft than I did the entire time I was at Harvard." [^1]

13년간 마이크로소프트에서 일하고, 게임 Doom에 감명을 받아 하프라이프를 개발, 성공적으로 출시했다.
[하프라이프의 위대한 점을 설명하는 글](https://news.hada.io/topic?id=19387)에 따르면 2가지 원칙이 있는데, 게임에 스토리를 부여하는 것과 플레이어의 컨트롤을 뺏지 않는 것이라고 한다.

이후에는 대표적인 게임 플랫폼인 스팀을 만들고, 게임으로는 포탈, 레프트4데드를 개발했다.
연이어 성공적인 사업을 이룬 것을 보거나 [밸브의 조직 문화](/docs/wiki/valve.md)를 보면 원칙을 세우고 고수하는 것이 중요하지 않나 생각한다.

[^1]: https://web.archive.org/web/20250105202241/https://www.neowin.net/news/gabe-newell-i-learned-more-in-three-months-at-microsoft-than-entire-time-at-harvard/

## 개발에 대한 사소한 생각

가끔 정말 사소할 수 있거나, 피부로는 느끼지만 말로 표현할 수 없었던 것들이 있다.

트렌드에 관한 것들이 대표적이다.
표현하기 힘든 이유은 시간이 지남에 따라 정말 조금씩 염색해 나가기 때문이다.

그리고 이런 것들을 잘 표현하는 사람도 있다.

### 코드 스타일

예전에는 코드 스타일이 마치 시 같은 것이 유행했다.

원래 단어를 알기 힘들도록 줄여진 변수와 함수 이름이 그렇다.

시를 적고 주석으로 시의 해석을 작성했다.

[https://www.facebook.com/dgtgrade/posts/1249328668459330](https://www.facebook.com/dgtgrade/posts/1249328668459330)

> 요즘은 함수명, 변수명이 길어진 것 같다. 내 코드도 그렇고, 남의 코드도 그렇다. 옛날에는 왜 그렇게 안 했을까? 모니터가 작았고, 에디터가 불편 해서 그랬으려나. 또는 옛날에는 조금 더 간결한 것을 좋아하는, 그러니까 alpha 보다는 a를 좋아하는 프로그래머가 더 많아서 그랬을 수도 있겠다.
>
> ...
>
> 옛날에는 내 코드를 내가 이해하기 위해서라도 코멘트를 꽤 많이 달아 두었어야 했다. 코멘트를 다는 일은 매우 귀찮은 일이지만 어쩔 수 없었다. 그런데 요즘은 최소한 나 스스로를 위해서는 코멘트를 달아둘 일이 거의 없는 것 같다.
>
> gt = 0 # ground truth
>
> 옛날 습관대로 이렇게 코딩 했다가, 에잇!. 하고,
>
> ground_truth = 0
>
> 이렇게 고쳐쓰는 일이 많아졌다.
>
> 평균적으로 코드 100줄에 (단순히 코드를 설명하긴 위한) 코멘트는 5줄도 안 되는 것 같다.
>
> ...
>
> 가만 생각해 보니, 함수명, 변수명은 더 길어지고, 신택스는 더 짧아지고 쉬워져서, 코멘트를 달아봐야 그 내용이 그냥 코드를 읽어주는 수준인 경우가 많아져서 그런 거 같다.

그리고 지금은 필요한 만큼만 적당히 하자는 느낌.

코딩은 개발자의 문학같다.

### 언어

4학년이 되어서도 어떤 분야의 개발자가 되고 싶은지 결정하지 못했었다.

웹 쪽이 마음에 있긴 했으나 저급 언어보다는 배우기 쉽다는 느낌이 계속 드는게 싫었다.

솔루션만 낼 수 있다면 러닝 커브가 어떻든 관계 없다고 생각했다.

결국 유행과 서비스에 가장 가까운 웹을 선택했다.

그러면 계속 웹을 할 것인가?

[https://www.facebook.com/dgtgrade/posts/1248502591875271](https://www.facebook.com/dgtgrade/posts/1248502591875271)

> 90년대 말. 당시에 C를 잘 하는 선배는 많았다. 그런데 Java를 조금이라도 하는 선배는 많지 않았다. Assembly는 잘 다뤄도 HTML, Javascript, CSS는 다루지 못하는 선배가 많았다.
>
> 나는 Java, HTML, CSS, Javascript를 다룰 수 있었다. (그 기술들도, 그리고 나도) 아주 기초적인 수준이었고, 아마 C와 Assembly를 잘 하는 선배들이 관심만 가지면 한주 또는 한달이면 다 할 수 있는 수준이었을 거다.
>
> 그런데 그런 수준으로도 이런 저런 크고 작은 일을 할 수 있는 기회가 많이 주어졌었다. 수요는 넘쳐났는데 공급이 매우 딸리는 상황이었던 것이다.
>
> 2008년부터 2013년 정도까지는 모바일에서 그런 상황이 연출 되었었다. 모바일을 잘 이해하는 개발자, 디자이너, 기획자는 그 희소가치가 매우 높았다.
>
> 그리고, 지금, 그러니까 아마 2014년 정도부터는 머신러닝이 그렇다.
>
> 그동안, 그러니까 지난 70년 동안 알고리즘과 휴리스틱으로 풀어 보려 노력 했으나 잘 안 풀리던 문제들이 머신러닝으로 마치 "마술 같이" 또는 "믿기 어려울 정도로 간단하게" 풀려 버린다는 보고들이 계속 나오고 있다.
>
> 앞으로 머신러닝으로 얼마나 많은 문제들을 풀 수 있을까?
>
> ♫ 세상에 뿌려진 패턴만큼 ♫ ?
>
> 아무튼 풀어야 할 아니 최소한 풀어보는 시도는 해 봐야 할 문제들은 엄청나게 많이 쌓여있다.
>
> 그에 반해 머신러닝을 할 수 있는 사람은 매우 적다.
>
> 그래서 어떤 개발자든 머신러닝을 3달만 공부하면 앞으로 한동안 좋은 기회들을 맞이할 수 있을 거라 나는 확신한다.

### 집중

나는 웹의 수혜를 잔뜩 얻은 세대다.

초딩 때 컴퓨터가 유행하더니 순식간에 내 손으로 쥘 수 있을만큼 작아졌고
눈만 돌리면 보이는게 웹이다 보니 그 정보바다에 빠져버렸다.

지금도 못 나왔다.

코딩을 검색으로 시작했다 보니 크게 와닿지는 않지만 무슨 느낌인지는 알겠다.

[https://www.facebook.com/dgtgrade/posts/1247704851955045](https://www.facebook.com/dgtgrade/posts/1247704851955045)

> 요즘에 코딩 할 때, 웹에서 참고할 만한 Example 코드 찾아서 이해 하려고 노력 하는 시간이 전체 코딩 시간의 상당부분을 차지 하는 것 같다.
>
> 구글이 없으면 코딩을 못 할 것 같은 느낌...
>
> 뭔가 미래가 불안 하고, 스스로에게 불만족스럽다.
>
> 옛날에는 (그러니까 2000년도 쯤에는) 조금만 특별한 것, 또는 어려운 것을 구현 하려면 (웹에서 찾아봐야) Example은 커녕 Tutorial도 잘 없어서 Reference 찾아보고 공부 하고 내 머리 속에 완전히 집어 넣는 시간이 아주 길었었다.
>
> 예를 들면, CSS를 조금 더 잘 써 보려고 (당시에 가장 정리가 잘 되어 있었던) MSDN을 아주 많이 봤었고, CSS의 많은 것들을 외우고 있었다.
>
> ...
>
> 그런데, 옛날에는 분명 전화 번호 몇개 정도는 외우고 있었던 것 같은데, 요즘은 가장 가까운 사람들의 전화번호조차 기억이 안 나잖아.
>
> 그러니까... 굳이 시시콜콜한 Syntax, Function 이름, Argument 순서 이런거 머리 속에 없어도 괜찮은 것 같다. 아니 오히려 그거 넣어둘 공간에 다른 거 넣어둬야 하는 것 같기도 하다.
>
> 그렇게 불안해 하고, 불만족스러워 할 필요는 없을 것 같다.

사실 요즘에 지구가 황폐화가 되어서 세상에 고급 언어 개발자만 남아버린다면 어떻게 될까 생각한다.

언제 꺼질지 모르는 컴퓨터로 기술력을 복구해야 하는 것이다. :| :| :|

OS만 깔려있는 컴퓨터에서 어떻게 코딩을 시작할 것이며,
구글 없이 무엇을 할 수 있을지..

다행이도 기본으로 깔려있는 웹 브라우저의 콘솔창에 'Hello, World!'만 찍어보고 껏을 거다.

어....

### 프로그래밍

절차적 프로그래밍에서 시작하여 C++, 객체지향 언어가 나오더니 프로그래밍 패러다임이 바꼈다.

그리고 이젠 함수형 프로그래밍이 스물스물 나온다.

'하드웨어의 한계를 소프트웨어로 메꿔야 해!'

'상태를 추적하기 쉬운 함수형 프로그래밍!!'

'lambda'

'순수 함수'

사실 OOP도 잘 못하는 입장이지만, 그래도 조금씩 봐 두어야 겠지.

[임백준 - 함수형 프로그래밍이라는 유령](http://www.cnet.co.kr/view/18272)

## 소프트웨어 부식

오래된 노트북을 꺼내서 급하게 작업할 일이 하면서 든 생각이다.

소프트웨어 요구 사항이 높아져서 버벅거리는 것에서 오는 불편함은 예상했지만,
개발 도구들이 편의를 위해 제공하는 자동 업데이트 기능으로 고통받을 줄이야.

[윈도우의 자동 업데이트 밈](https://www.youtube.com/watch?v=k899IiwP-iw)은 굳이 오래된 상황이 아니더라도 누구나 공감한다.

다음은 급하게 노트북을 꺼내면서 마주한 불편한 점들.

1. IntelliJ를 열먼서 마주한 수많은 알림창. 업데이트 알림은 이해해도 `git` 설치하라는 것은 뭔지?
2. awscli configure 갱신 -> python 버전 지원 문제로 버전업 -> pyenv를 Homebrew로 업데이트 해야 하는데.
3. Homebrew는 모든 도구를 자동 업데이트를 해버린다. 수십분이 소요된다.
4. 크롬의 구글 계정 로그인 만료. 예상한 지점이지만, 구글 연동된 모든 사이트도 다시 재인증해야 한다. 사용하던 사이트가 이렇게나 많았나?
5. github, bitbucket ssh key는 왜 제거했더라. 보안상 잘했지만, 다시 ssh-keygen부터 시작한다. 멀티 계정 설정했다면 ssh/config도 수정해야 한다.

## 일일 커밋

[![GitHub Streak](https://streak-stats.demolab.com/?user=edunga1)](https://git.io/streak-stats)

22년 11월부터 시작한 일일 커밋이 어느덧 400일을 돌파했다.

위 이미지는 [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats)을 이용해 만들었다.

일일 커밋에 대한 이야기들을 읽어보면 우려에 대한 이야기가 있다. 진심이 아닌 억지로 하게 된다는 것이다.

스케쥴링을 통해 자동 커밋을 하는 사람도 있고, 일일 커밋을 하기 위해 무의미한 커밋을 하기도 하고, 커밋 날짜를 조작하기도 한다.
뭐, 하는 것도 나쁘지 않다고 본다. 어떻게든 자신의 노력을 PR하는 것은 운을 높히는 방법 중 하나라고 생각하기 때문이다.

나는 양심껏 그렇게 하지는 않았다. 완벽한 것은 없다고 생각하고, 흠이 있어야 더 완벽해질 수 있다고 믿는다.
[테니스 이너 게임](./book.md)에서 정말 집중해야 하는 점에 대해서 배웠기 때문일까.

물론 모든 커밋이 큰 의미를 가졌던 것은 아니다.
간단한 리팩토링 작업을 할 때도 있고, 하루에 여러개의 작업을 하기도 했다.
작업량 자체는 들쑥날쑥 할 수 밖에 없다.
감명 깊었던 것은 누군가 TIL에 대한 정의를 한 것인데, *하루라도 배우지 않는 사람은 없다*라는 것이다.
퇴근길에 곰곰히 생각해보니 정말로 매일 무언가를 적을 수 있을 것만 같았다. 딱히 못할 것도 없다고 생각했다.
그래서 시작해 보니, 딱히 고통스럽지 않았다.

내가 놓치지 않고 계속할 수 있었던 이유가 하나 있는 듯 하다. 바로 별다른 취미가 없는 것이다.\
회사 동료나 주변 사람들에게, 매일 또는 일주일에 한 번 정도로 "잔디심기"를 해보라고 권유하고 있다.
다들 꾸준히 못하는데, 관찰해 보면 취미를 하나씩은 가지고 있더라. 그래서 많이 놓치게 되고, 그러면 포기하게 된다.
운동을 하거나 그림을 그리거나 무언가에 집중하고 있기 때문에 잔디심기에 집중하지 못하는 것이다.
그래서 놓치는 것이 당연하다.\
시도를 해보는 것에서 뭔가를 알아가면 좋겠고, 사람들이 우려하는 것을 직접 경험해 봤으면 충분하다고 생각한다.

---

느낀 점

- 코드 정리 등 짧은 작업이라도 프로젝트를 여는 시간 동안에 무언가 생각하면서 배우는 것이 있더라.
- 꾸준히 할 프로젝트가 필요하다. 나는 [Cat Logic](./cat-logic.md) 자체가 TIL 이면서, 다양한 것을 시도할 수 있는 웹 프로젝트이다.

## 레슬리 램포트의 코딩은 프로그래밍이 아닙니다

코딩 이전에 추상적 설계의 중요성을 주장하는 키노트.
분산 시스템과 LaTeX의 초기 개발자인 Leslie Lamport가 2025년 3월 10일에 진행한 SCaLE 22x에서 발표하였다.

https://www.youtube.com/live/tsSDvflzJbc?si=gtdi5TdGN3xGSBP5

골자는 추상적 설계를 통해 구조적으로 비즈니스 로직에 결함이 없는 코드를 작성할 수 있다는 것이다.
추상적으로 설계를 잘하면 코드가 더 간결해지거나 코딩에서 발생하는 결함을 줄일 수 있다.

시스템 설계의 결함을 찾기 위한 언어 TLA+를 소개를 포함한다.
AWS는 TLA+를 사용하여 코드 작성 전에 결함을 발견했다고 한다.

---

[9:27](https://www.youtube.com/live/tsSDvflzJbc?si=Iinr6-wX5Bfd2_6m&t=567)에서 정수 배열의 최대 원소를 구하는 함수의 _사소한 예시_ 하나를 보여준다.\
먼저, What을 정의하면 "정수 배열 A에서 가장 큰 원소를 반환한다"라고 볼 수 있다.\
How는 "A[0], A[1]를 차례로 비교하여 가장 큰 값을 찾고, x에 저장 그리고 x를 반환한다"라고 볼 수 있다.\
그리고 구현하면 다음과 같다.

```rust
fn ArrayMax(A: &[i32]) -> i32 {
    let mut x = A[0];
    let i = 1;
    while i < A.len() {
        if A[i] > x {
            x = A[i];}
        i += 1;  }
    x }
```

하지만 위 코드에는 버그가 있다.
A가 비어있을 때는 가장 큰 원소가 없기 때문이다.
그리고 버그는 코딩 버그가 아니라 What의 버그다.
버그는 분명한 해결 방법이 있다. 빈 배열에 대한 예외 처리를 추가하면 된다.

**추상화**는 코딩 세부사항을 제거한다.\
"정수 배열 A에서 가장 큰 원소 또는 A가 비어있으면 error를 반환한다"라고 정의해보자.
하지만 '반환한다'는 코딩 세부사항이다.
관심 있는 것은 어떻게 A에서 가장 큰 원소를 찾는 것인가이다.\
"x를 정수 중복집합 A에서 가장 큰 원소 또는 A가 비어있으면 error로 설정한다"라고 수정한다.
'배열' 또한 '중복집합'으로 변경하여 세부사항을 감춘다.\
Lamport는 이 부분이 코드를 복잡하기 만들어서 좋아하지 않는다고 한다.

"A가 비어있으면 error를 반환한다"를 제거하면 더 간단해진다.\
"x를 A의 모든 원소보다 큰 가장 작은 숫자로 설정한다"로 더 간단화할 수 있다.
이는 수학적 개념이 필요하다.
이 정의는 A가 비어있으면, 모든 수는 A의 모든 원소보다 크거나 같다도 성립한다.([15:34](https://www.youtube.com/live/tsSDvflzJbc?si=Iinr6-wX5Bfd2_6m&t=934))\
여기에 x의 초기 값을 -∞로 설정하면 빈 배열에 대한 예외 처리를 할 수 있다.

Lamport가 프로그램을 작성할 때 다음의 과정을 거친다:

- 프로그램이 하길 **원하는** 것을 결정한다.
- 코딩한다.
- 프로그램을 통해 정말로 필요한 것을 파악한다.

그래도 프로그램은 내가 원하는 모든 것을 갖추진 않지만, 필요한 모든 것을 갖춘다고 한다.
이 과정엔 시간이 소요되지만 코딩에 시간을 절약할 수 있다고.
