# Sentry - APM & Error Tracking

## Timezone을 KST로 변경하기.

`User settings -> Preferences -> Timezone`에서 한국 시간(`(UTC+0900) Asia/Seoul`)으로 변경할 수 있다.
기본값으로 사용하면 매우 헷갈리니 변경했다.

추가로 같은 설정에 있는 `Use a 24-hour clock`도 설정해서 AM/PM 구분하지 않도록 했다.
훨신 가독성이 좋다.

## 이슈 검색에 태그 이용하기

`is:unresolved url:*user*` 이런식으로 검색하면 Url에 `user`가 포함된 이슈를 검색할 수 있다.
`url`은 태그고, `*user*`는 값. `*`는 wildcard로 적용된다.

`server_name: my-api-59bkas`와 같이 서버 인스턴스 이름을 저장하여 사용하는 중이다.
같은 서버라도 배포 버전이 다르면 서버 이름도 다르게 해서, 문제가 발생했을 때 알 수 있다.

이런 태그는 해당 언어의 라이브러리와 어떻게 설정했냐에 따라 달라지니 유의한다.

검색창 오른쪽에 `Toggle search builder` 이름의 설정 모양 버튼이 있다.
여기서 고급 검색을 할 수 있는 거 같은데 사용하지 않아서 잘 모르겠다.
Sentry 이슈 화면에 있는 모든 내용이 검색창에서 검색되지 않기 때문에 불편한데,
태그를 잘 정의하면 유용할 거 같다.
