---
id: page-82
time: 2018-07-30 23:25:17
tags: kubernetes
---
# Kubernetes service types

**ClusterIP (Default)**

- Cluster 내부에서만 접근 가능하다. 외부에서 연결 할 수 없다.
- Pod에서 `http://서비스이름:포트`로 접속 가능하다.
- 예를 들어 이름을 `app-backend`, port를 `80`으로 설정했다면 `http://app-backend`로 연결할 수 있다.
- kubectl proxy 명령어를 사용하여 내부를 향하는 프록시를 열 수 있다.
  - localhost:8001: k proxy 로 serve 된 주소
  - default: 네임스페이스 이름
  - gceme-backend:8080/version: 서비스이름:포트/API
  ```shell
  $ kubectl proxy
  Starting to serve on 127.0.0.1:8001
  $ curl http://localhost:8001/api/v1/proxy/namespaces/default/services/gceme-backend:8080/version
  ```
- 보통 private api를 구축할 때 사용한다.

**NodePort**

- Cluster의 3xxxx 포트에 바인딩한다.
- nodePort 속성으로 3xxxx 포트를 직접 정할 수도 있다만. 하지 않는 것이 좋겠다.
  - 컨테이너가 접근해야 한다면 환경 변수나 DNS를 이용하여 접근하는게 좋다.
- `$ kubectl get service` 포트 정보가 80:32220 되어 있다면, localhost:32220으로 접속할 수 있다.


**LoadBalancer**

- 80:32220 되어 있다면, `localhost:80` 으로 접속할 수 있다. 즉, 호스트의 포트를 사용한다.
- 하나의 고정 IP를 부여한다. 그러니까, 클라우드에서 사용하면 IP 사용료를 지불해야 한다.
- GCP에서 LB나 Ingress를 사용하면 클라우드 레벨의 라우터를 사용하고, 비싸다.

각 서비스별 다이어그램으로 설명되어 있는 글:<br>
https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0

## NodePort를 사용하는데도 접근할 수 없는 이슈

Docker for mac을 사용하는데 상태바에서 주황색 원과 함께 `Kubernetes is starting...`라고 뜨면서 호스트에서 접근 할 수 없었다.

Docker for mac을 완전 초기화(Reset -> Reset to factory defaults)하면 `running` 상태가 되고, 접속할 수 있었다.