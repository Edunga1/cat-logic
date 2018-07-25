---
id: page-73
time: 2018-07-25 23:45:12
---
# NodeJS 서버 로컬 요청만 허용하기

https://stackoverflow.com/questions/14043926/node-js-connect-only-works-on-localhost<br>
여기에서 힌트를 얻었음

https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback<br>
`server.listen()` 스펙을 보면 포트 번호와 함께 host(ip)를 입력하면 해당 ip만 허용한다.

기본값은 `0.0.0.0`이고 '지정되지 않음'을 의미하며 외부 ip의 연결도 허용하지만, `127.0.0.1`으로 두면 로컬 연결만 허용된다.

근데, 이렇게 로컬 요청을 구분하는 것은 좋지 않은 것으로 보인다.
MSA 환경 구축하면 다른 머신의 연결도 있을테니까.
virtual host 또는 방화벽으로 막는게 합리적으로 보인다.