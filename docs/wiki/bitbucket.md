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

```bash
curl --request GET \
  --url 'https://api.bitbucket.org/2.0/repositories/{workspace}/{repository}/pullrequests' \
  --user '{email}:{token}' \
  --header 'Accept: application/json'
```

`--user` 대신 헤더를 명세한다면.

```bash
curl --request GET \
  --url 'https://api.bitbucket.org/2.0/repositories/{workspace}/{repository}/pullrequests' \
  --header "Authorization: Basic $(printf '%s' "${email}:${token}" | base64)" \
  --header 'Accept: application/json'
```

토큰과 함께 이메일 주소를 포함하여 인증해야 한다.
