# Spring framework

# WebClient 첫 요청이 느린 문제

상황: 서버 시작 직후 다른 서버의 API를 호출하는 내 API가 느려서 클라이언트에서 타임아웃이 자주 발생함.\
해결: netty http client의 `warmup` + 사용자 진입 전 미리 타겟 서버 API 호출

https://projectreactor.io/docs/netty/release/reference/index.html#_eager_initialization_4

1. warmup으로 event loop pool을 준비시키고
2. 서버 시작 시 임의로 호출하여 모든 사용자 요청은 첫 요청 이후가 되도록 한다.

2의 임의 호출은 해당 서버의 health check가 되는 API로 했다.

문서에서 설명하는 첫 요청에서 시간을 소요하는 요소는 다음과 같다:
1. event loop group
2. host name resolver
3. 내장된 transport 라이브러리들
4. 보안과 관련된 라이브러리들
