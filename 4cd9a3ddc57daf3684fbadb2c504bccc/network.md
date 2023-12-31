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
