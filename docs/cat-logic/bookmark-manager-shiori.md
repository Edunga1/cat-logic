---
id: page-82
time: 2019-09-28 23:02:16
tags: app
---

# 북마크 매니저 shiori

[https://github.com/go-shiori/shior](https://github.com/go-shiori/shiori)

Go로 구현되고, 웹 서버 + 클라이언트 조합으로 구성된다.

클라에는 chrome와 firefox 확장 프로그램
그리고 CLI로도 사용할 수 있다고 한다.

잠깐 사용해보니 괜찮은 거 같다. 특징은..:

* 직접 서버 띄워야 한다.
  * 즉, 직접 북마크 데이터의 저장 정책을 결정해야 한다.
* 사용자별로 구분한다.
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
