---
created: 2023-01-08
---
# Network

## 혼잡 제어

congestion window.

[사이 좋게 네트워크를 나눠 쓰는 방법, TCP의 혼잡 제어](https://evan-moon.github.io/2019/11/26/tcp-congestion-control/)

[웹 개발자라면 알고 있어야 할 HTTP의 진화 과정](https://yozm.wishket.com/magazine/detail/1686/)

> 혼잡 제어 (congestion control) 기능도 기본적으로 제공했기 때문에 복잡한 사항을 신경 쓸 필요가 없었다.

## 인터넷 제어 메시지 프로토콜 (ICMP, Internet Control Message Protocol)

[ICMP는 네트워크 계층 프로토콜이다.](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)

`ping` 명령어는 ICMP 프로토콜의 `Echo Request` 메시지(8번)를 호스트에 전달하는 진단 도구이며, 호스트는 `Echo Reply`로 응답한다.

> Send ICMP ECHO_REQUEST packets to network hosts. -- `man ping`

포트 번호는 Transport Layer부터 관리되므로, `ping`은 포트 번호를 받지 않는 것으로 보인다.

## traceroute

`traceroute` 명령어는 호스트까지 경로를 추적하는 도구이다.

traceroute는 IP 패킷의 TTL(Time To Live) 값을 조작하여 각 중간 라우터에서 응답을 받음으로써 경로를 추적한다.
라우터 등 네트워크 장비 사이의 경로를 홉(Hop)이라고 부르는데, 각 홉을 지날 때 마다 TTL 값이 1씩 감소한다.
TTL 값이 0이 되면 해당 패킷은 폐기되고, 해당 라우터는 출발지로 ICMP "Time Exceeded" 메시지를 보낸다.
이를 이용하여 종료된 지점의 IP 주소를 알아낼 수 있다.
TTL 값을 1부터 순차적으로 증가시키면서 패킷을 보내어 모든 지점의 IP 주소를 알아낼 수 있다.

```bash
$ traceroute -w 1 -n -a google.com
traceroute to google.com (142.250.207.110), 64 hops max, 40 byte packets
# ... 생략
11  [AS15169] 142.250.168.244  67.764 ms  44.372 ms  44.235 ms
12  * * *
13  [AS15169] 108.170.233.20  47.684 ms
    [AS15169] 216.239.47.82  46.079 ms
# ... 생략
```

- `-w 1`: 응답 대기 시간 1초
- `-n`: 도메인 네임 대신 IP 주소 출력
- `-a`: AS 번호 출력

기본적으로 `64 hops max`로 TTL이 최대 64까지 증가한다.
`* * *`는 응답이 없음을 의미한다.

관련
- how-did-i-get-here.net 사이트는 traceroute 결과를 시각화 및 설명해준다.
