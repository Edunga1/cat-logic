---
created: 2024-06-22
---
# CURL

URL로 데이터를 전송하거나 받을 수 있는 커맨드라인 도구.

## 재시도

`--retry` 옵션은 특정 상태 코드를 받으면 재시도한다.
메뉴얼에 따르면 `408`, `429`, `500`, `502`, `503`, `504`가 전부다.:

```bash
--retry <num>
      If a transient error is returned when curl tries to perform a transfer, it will retry this number of times before giving up. Setting the number to 0 makes curl do no retries (which is the
      default). Transient error means either: a timeout, an FTP 4xx response code or an HTTP 408, 429, 500, 502, 503 or 504 response code.
```

일시적인 오류(transient error)가 반환되면 재시도 한다고 한다.
이 상태 코드들이 python requests와 같은 Http 라이브러리에서도 사용하는지는 확인하지 못했다.
검색해보면 `429`, `500`, `502`, `503`, `504`를 명시하여 재시도하는 예제 코드가 보인다.

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

    # 입력이 #로 시작하면 pass
    if [[ $token == \#* ]]
    then
        continue
    fi

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
표준 출력 또는 diff 파일을 보면서 차이를 확인한다.

응답 없이 사이드 이펙트만 있는 API는 이 방법으로 테스트하기 어렵다.

데이터를 `,` 대신 다른 구분자로 나누고 싶으면 `IFS`를 변경하면 된다.
탭으로 구분된 파일이라면 `IFS=$'\t'`로 변경하면 된다.

## Reference

https://antonz.org/mastering-curl/ \
curl 가이드. 유용하지만 몰랐던 옵션들도 소개한다.
직접 실행할 수 있는 환경이 제공된다.
