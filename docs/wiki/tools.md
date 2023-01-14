# 개발/비개발 도구

커맨드라인 도구는 [shell](shell)에서 관리한다.

<!--toc:start-->
- [개발/비개발 도구](#개발비개발-도구)
- [북마크 매니저 shiori](#북마크-매니저-shiori)
  - [간단하게 사용해보기](#간단하게-사용해보기)
- [MySQL](#mysql)
  - [MySQL Workbench](#mysql-workbench)
  - [mycli](#mycli)
- [API Client 비교 Postman, Insomnia, IntelliJ builtin `.http`](#api-client-비교-postman-insomnia-intellij-builtin-http)
  - [비교](#비교)
<!--toc:end-->

# 북마크 매니저 shiori

[https://github.com/go-shiori/shior](https://github.com/go-shiori/shiori)

Go로 구현되고, 웹 서버 + 클라이언트 조합으로 구성된다.

클라에는 chrome와 firefox 확장 프로그램
그리고 CLI로도 사용할 수 있다고 한다.

잠깐 사용해보니 괜찮은 거 같다. 특징은..:

* 셀프 호스팅
  * 직접 북마크 데이터의 저장 정책을 결정해야 한다.
* 사용자 구분
  * 처음 서버 실행하면 기본 계정으로 로그인해서 계정 생성
  * 시작 계정 정보는 `shiori`/`gopher`. 왜 서버 시작시 알려주지 않지?
* 태그 기능
* Archive 가능!
  * 레이아웃 그대로 저장되지 않는다.
  * 기본적으로 비공개지만, 공개할 수 있다.
  * 공개 취소가 안되더라... 버그인가?
* 클라로 크롬 확장프로그램을 사용하기 위해서는
https://github.com/go-shiori/shior
여기서 직접 확장프로그램을 로드해야 한다.

## 간단하게 사용해보기

[https://github.com/go-shiori/shiori/wiki/Usage](https://github.com/go-shiori/shiori/wiki/Usage)

위 링크에 잘 나와 있다.

크롬 기준 테스트 해본다:

1. 도커로 서버 실행: `docker run -d --rm --name shiori -p 8080:8080 -v $(pwd):/srv/shiori radhifadlillah/shiori`
2. [https://github.com/go-shiori/shiori-web-ext/releases](https://github.com/go-shiori/shiori-web-ext/releases)
zip 파일 받아서 압축 해제한다.
3. [chrome://extensions/](chrome://extensions/)
`Load unpacked` 압축 해제한 폴더 선택
4. shiori 아이콘이 생성되었으면 `우클릭 메뉴 - Options`
5. shiori 로그인 팝업 출력되면 입력:
Server: `http://localhost:8080`
Username: `shiori` Password: `gopher`

# MySQL

## MySQL Workbench

https://www.mysql.com/products/workbench/

`brew cask install mysqlworkbench`

가끔씩 발생하는 버그가 답답해서 요즘은 Datagrip을 많이 쓴다. 유로다.

## mycli

https://www.mycli.net

기본 mysql cli 보다 다양한 기능을 제공하는 도구.

`\dt`, `\G` 등 유용한 shortcuts.

# API Client 비교 Postman, Insomnia, IntelliJ builtin `.http`

standalone 버전인 Postman, Insomnia 그리고 IntelliJ 내장형 `.http`. 사용해보고 비교한다.

꼭 필요로 하는 기능은 다음과 같다:

* private 데이터 동기화
* api auth token, api path 등 민감 정보를 동기화 시 감출 수 있어야 함
* 자동 완성. `content-type` 헤더를 설정했으면 정의된 값들을 잘 알려주는 가 등
* curl로 import, export 가능

추가로 pre-request script 기능이 있으면 좋겠다. 호출 전에 토큰 정보를 받아올 때 유용하다.

## 비교

|                    | Postman   | Insomnia                             | IntelliJ                             |
| ---                | ---       | ---                                  | ---                                  |
| 데이터 동기화      | 가입 필요 | Git repository 명시적 commit, push   | 파일 저장 위치를 cloud와 동기화 가능 |
| 민감 데이터 처리   | 불가      | export, 동기화 되지 않는 environment | 불가                                 |
| 자동 완성          | O         | O                                    | O                                    |
| curl exchange      | O         | O                                    | O                                    |
| pre-reqeust script | O         | O                                    | X                                    |
| open source        | X         | O                                    | X                                    |

종합적으로 Insomnia가 가장 만족스럽다.

Postman은 closed source + 데이터 저장을 postman에 위임해야 한다. 회사 토큰 정보라던지 민감 데이터가 저장되는 것은 별로다.
내 데이터를 export해서 드라이브에 저장하는 방식으로 동기했는데, 불편하다.
특히 로그인하지 않으면 매번 뜨는 로그인 유도 메시지를 무시하는 기능도 없다.

Insomnia는 version control을 기본으로, github 등에 private repository에 저장할 수 있다.
팀 간 API 공유가 필요하더라도 이 것으로 가능해 보인다. 유료 결제로 제공도 한다.

IntelliJ는 메인으로 사용해선 안되겠다. 개발하면서 에디터 방식이 편하다보니 많은 파일을 생성해 버렸는데,
IntelliJ 버전에 따른 변경사항이 있는 상황에서, 라이센스 문제로 버전을 바꾸다보니 잘 사용하던 것을 못쓰게 되기도 한다. (fallback license로 회귀)
구글 드라이브에 동기화 해놓고 사용하면 편리하긴 한데, 충돌이 잦다. 방금 수정한 데이터가 클라우드 버전과 맞지 않아 어느 것을 사용할 것인지 계속 물어본다.
그리고 이쪽이 부가기능이라 기능이 좀 부실하다. 개발 도구가 IntelliJ라면 접근성은 가장 좋다. Endpoints, Spring Annotation으로부터 바로 생성할 수도 있다.
