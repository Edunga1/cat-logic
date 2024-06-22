# CURL

URL로 데이터를 전송하거나 받을 수 있는 커맨드라인 도구.

## 재시도 `--retry`

`--retry`는 특정 상태 코드에서만 재시도한다.
메뉴얼에 따르면 `408`, `429`, `500`, `502`, `503`, `504`가 모두이다:

```bash
--retry <num>
      If a transient error is returned when curl tries to perform a transfer, it will retry this number of times before giving up. Setting the number to 0 makes curl do no retries (which is the
      default). Transient error means either: a timeout, an FTP 4xx response code or an HTTP 408, 429, 500, 502, 503 or 504 response code.
```

일시적인 오류(transient error)가 반환되면 재시도 한다고 한다.
따라서 특정 상태 코드만 재시도 하는 거 같은데, 다른 상태코드는 서버에서 명시적으로 내려주었을 가능성이 있으니 재시도하지 않는 것이 옳아 보인다.
다만, python의 requests나 Spring WebFux의 WebClient의 retry 상태 코드는 공식 문서에서 확인하지 못했다.
만약 모든 상태에 대해서 재시도 한다면 옵션 사용에 고민이 필요해 보인다.

## URL

URL에 `[]` 사용하면 순차적으로 요청을 보낼 수 있다:

```bash
$ curl http://httpbin.org/anything/\[8-11\].txt
{
  "url": "http://httpbin.org/anything/8.txt"
}
{
  "url": "http://httpbin.org/anything/9.txt"
}
{
  "url": "http://httpbin.org/anything/10.txt"
}
{
  "url": "http://httpbin.org/anything/11.txt"
}
```

`[]`는 alphanumeric series를 받으며, leading zero도 사용할 수 있다.

```bash
$ curl http://httpbin.org/anything/\[008-011\].txt
{
  "url": "http://httpbin.org/anything/008.txt"
}
{
  "url": "http://httpbin.org/anything/009.txt"
}
{
  "url": "http://httpbin.org/anything/010.txt"
}
{
  "url": "http://httpbin.org/anything/011.txt"
}
```

`httpbin.org`는 HTTP 테스트하기 위한 사이트이므로 위 예제 코드를 바로 돌려볼 수 있다.

## curl 이용한 API 마이그레이션 응답 비교하기

API 이전할 때 기존 API의 응답과 새 API의 응답을 비교해야 할 때 주로 사용하는 방법이다.

2개의 API 서버를 띄워놓고, 다량의 API를 각각 호출, 응답을 비교하여 얼마나 다른지 확인하는 스크립트를 작성한다.

`script.sh`:

```bash
#!/bin/bash

count=1

while read line; do
    IFS=','; arrline=($line); unset IFS;
    token=${arrline[0]}
    param1=${arrline[1]}

    curl -s -X GET --location "http://API_HOST_ASIS/some/api/path/${param1}" \
    -H "Authorization: Bearer ${token}" \

    | python -m json.tool \
    > diffc

    curl -s -X GET --location "http://API_HOST_TOBE/some/api/path/${param1}" \
    -H "Authorization: Bearer ${token}" \
    | python -m json.tool \
    > diffd

    result=$(diff diffc diffd)

    if [ -n "$result" ]
    then
        echo "=== phase $count: $token,$param1 ==="
        echo "$result"
    fi

    let count+=1
done < $1
```

위 스크립트에 넘길 token 등 파라미터 정보를 별도 파일에 명세한다.

`param.txt`:

```
token1,foo
token2,bar
token3,baz
token4,apple
token5,banana
token5,orange
```

이제 `bash script.sh param.txt`로 실행하면, 각 파라미터로 API를 호출하여 응답을 비교한다.

응답이 다른 경우 diff를 출력한다.

```
<                     "field1": "do something"
<                 }
<             ]
---
>             }
=== phase 35: token912,something ===
21,30c21
<             },
<             "items": [
<                 {
<                     "id": 1234,
<                     "name": "item1",
<                     "price": 500,
<                     "status": "alive",
<                     "url": "https://example.com/item1"
<                 }
<             ]
---
>             }
=== phase 50: token123,whatever ===
21,30c21
<             },
<             "items": [
```

가장 마지막 호출은 `diffc`, `diffd` 파일에 각각 as-is, to-be API 응답을 저장한다.
출력을 확인하거나 diff 파일을 확인하여 디버깅하면 된다.

파라미터를 더 추가하고 싶으면 `,` 구분하여 추가하고, 스크립트에서 `variable=${arrline[2]}`로 읽어온다.

응답 없이 사이드 이펙트만 있는 API는 이 방법으로 테스트하기 어렵다.

## Reference

https://antonz.org/mastering-curl/ \
curl mastering 가이드. 잘 사용하지 않지만 유용한 옵션들을 소개한다.
