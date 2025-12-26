---
created: 2025-12-19
---
# Bitbucket

Atlassian의 Git 저장소 관리 서비스.

직접 호스팅하는 버전이 아닌, 클라우드 서비스 기준의 내용이다.

## Bitbucket Rest API

문서는 https://developer.atlassian.com/cloud/bitbucket/rest/intro

인증 방식 중 API 토큰 방식을 사용하면, workspace 관리자 권한 없이 사용자 설정만으로 사용할 수 있다.
[API 토큰 발급 페이지](https://id.atlassian.com/manage-profile/security/api-tokens)에서 **범위를 포함하여 API 토큰 만들기**로 API 마다 필요한 권한을 선택해서 발급받자.

다음은 repository 목록을 조회하는 예시.
placeholder를 실제 값으로 바꿔서 사용해야 한다.

```bash
curl --get \
  --url 'https://api.bitbucket.org/2.0/repositories/{workspace}/{repository}/pullrequests' \
  --user '{email}:{token}' \
  --header 'Accept: application/json'
```

`--user` 대신 헤더를 명세한다면.

```bash
curl --get \
  --url 'https://api.bitbucket.org/2.0/repositories/{workspace}/{repository}/pullrequests' \
  --header "Authorization: Basic $(printf '%s' "${email}:${token}" | base64)" \
  --header 'Accept: application/json'
```

토큰과 함께 이메일 주소를 포함하여 인증해야 한다.

### Query & Sort

검색 결과를 필터링하거나 정렬하기 위해선 `q`와 `sort` [파라미터를 사용](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#filtering)한다.

`q=` 뒤에 오는 값은 URL 인코딩해야 한다.
다음은 curl의 `--data-urlencode` 옵션을 사용하여 인코딩했다.
`/pullrequests` API에서 상태는 `MERGED`, 작성자는 특정 UUID가 아닌 것, 생성일이 2025년 1월 1일 이후인 PR을 ID 오름차순으로 정렬하는 예시다.

```bash
curl --get \
  --url 'https://api.bitbucket.org/2.0/repositories/{workspace}/{repository}/pullrequests' \
  --data-urlencode 'q=state="MERGED" AND author.uuid!="{my_uuid}" AND created_on>="2025-01-01T00:00:00+09:00"' \
  --data-urlencode "sort=id" \
  --user '{email}:{token}' \
  --header 'Accept: application/json'
```

`q`는 SQL과 비슷한 문법을 사용한다. 문자열은 큰따옴표로 감싸야 하고, `sort`는 필드 이름 앞에 `-id` 같이 `-`를 붙이면 내림차순 정렬이다.
