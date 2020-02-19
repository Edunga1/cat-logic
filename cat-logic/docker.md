---
id: 6ef6ba9a92e4ae77e96299e43276d4e2
time: 2020-02-19 19:02:03
tags: docker
---
# Docker

## 네트워크 모드

기본 네트워크 모드인 `bridge` 기준 Container 안에서 호스트에 접근하려면..

* OSX: `host.docker.internal`
* Ubuntu: `171.17.0.1`

로 접근할 수 있다.

docker는 `--net` docker-compose는 `network_mode` 로 설정한다.

개발 환경이라면 왠만하면 변경하지 말고, 위 값을 사용하자.

### `host`

호스트와 네트워크를 공유한다.

컨테이너가 `8080` 포트로 웹 서버를 띄우면 호스트에 `8080` 요청 할 수 있다.
