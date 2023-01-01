# Kubernetes

<!--toc:start-->
- [Kubernetes](#kubernetes)
- [Kubernetes 컨테이너간 볼륨 공유](#kubernetes-컨테이너간-볼륨-공유)
- [Kubernetes service types](#kubernetes-service-types)
  - [NodePort를 사용하는데도 접근할 수 없는 이슈](#nodeport를-사용하는데도-접근할-수-없는-이슈)
<!--toc:end-->

# Kubernetes 컨테이너간 볼륨 공유

하나의 Pod 내에서 여러개의 Container를 운영할 때,
Docker Compose의 `volumes_from`과 같은 기능을 하려면.

예를들어, static 파일을 가진 컨테이너와 Nginx 컨테이너를
운용하는 경우 Nginx에 static 파일을 공유하는 경우에 대한 글.

https://www.mirantis.com/blog/multi-container-pods-and-container-communication-in-kubernetes/

`volumes`, `emptyDir` 사용하면 되긴 하지만, Docker 빌드 중에 생성되는 파일들은 공유할 수 없다.
그래서 container 설정 중 `lifecycle.poststart` 또는
`entrypoint`에 볼륨 연결한 경로에 파일을 복사하거나 생성해야 한다.

복사, 생성이 아닌 Symbolic Link`ln -s`는 동작하지 않는다.

즉, 컨테이너 생성 후에 생성되는 파일만 공유된다.
`emptyDir` 의미 그대로, 각 컨테이너에서 mount한 경로를 완전 새로운 공간으로 분리했기 때문에, **비어있다** 로 해석하면 좋을 듯?

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
