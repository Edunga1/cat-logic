---
id: page-91
time: 2019-04-04 23:43:44
tag: git, hash, algorithm
---
# 깃 커밋 해시 충돌에 관하여

갑자기 커밋 해시는 어떤 정보를 기반하여 만들어지는지 궁금했다.
커밋 해시는 커밋 `git commit` 할 때 생성되고,
주로 커밋 해시로 파일들을 특정 상태로 맞추는데 `git checkout` 사용한다.

그런데 커밋 할 때 해시가 충돌하지는 않을까? 싶어서 찾아봤다.

먼저, [git-scm](https://git-scm.com/book/ko/v1/Git-도구-리비전-조회하기)의 글
[SHA-1 해시 값에 대한 단상](https://git-scm.com/book/ko/v1/Git-%EB%8F%84%EA%B5%AC-%EB%A6%AC%EB%B9%84%EC%A0%84-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0#SHA-1-%ED%95%B4%EC%8B%9C-%EA%B0%92%EC%97%90-%EB%8C%80%ED%95%9C-%EB%8B%A8%EC%83%81)에서
걱정에 대한 현실적인 조언을 해 준다. 또 실제로 발생하면 어떤 일이 일어나는지 알려준다.

### https://www.facebook.com/iamprogrammer.io/posts/1379005945454259
그래도 운이 정말 나빠서, 해시 충돌이 나는 것이 우려된다면 리누스 토발즈도 이 이슈에 대해 언급했다.
아쉽게도 원글이 있던 google+가 종료되어 볼 수 없지만 예전에 올라온 나프다 게시글에 누군가 요약해 주었다.

사람이 소스코드의 변경을 지켜보고 있기 때문에 괜찮고, 또 대안은 있다고..

### https://stackoverflow.com/questions/9392365
사실 가장 먼저 본 글은 SO의 글이다.
[답변](https://stackoverflow.com/questions/9392365/how-would-git-handle-a-sha-1-collision-on-a-blob/34599081#34599081)에서,
기발하게도 해시 사이즈를 4-bit로 줄여서 실제로 재현했다. `push`, `clone` 할 때 에러가 난다.

### https://stackoverflow.com/questions/34764195
커밋 해시가 무엇으로 결정되는지 알려주는 SO 글. 부모 커밋, 커미터, 메시지 등.

### https://www.codentalks.com/t/topic/2973
>뻘글) git 불안해서 못쓰겟음니다 -.-;

찾다가 나온 유머글 ㅎㅎ. [덧글에 있는 만화](https://www.codentalks.com/uploads/default/original/2X/9/98fa43031c7cfbf44c714ad5819ea504ef37e70c.jpg)처럼
걱정, 우려만 해서는 안되겠다.

### https://zariski.wordpress.com/2017/02/25/sha-1-%EC%B6%A9%EB%8F%8C/
sha1 충돌 이슈에 설명. 해시에 대한 기초 설명, 구글이 sha-1 충돌 재현에 대한 주변 설명.

### https://www.mathstat.dal.ca/~selinger/md5collision

이 글엔 실제로 다른 파일인데 같은 MD5 sum을 가진 예제를 제공한다.
근데 다운받아보면 실행도 안되고, 바이너리지만 열어보면 내용도 같아 보이는데.. 심지어 파일 크기도 같다 :(
