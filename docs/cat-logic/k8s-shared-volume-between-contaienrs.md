---
id: page-88
time: 2019-03-21 23:40:50
tag: k8s
---

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
`emptyDir` 의미 그대로, 각 컨테이너에서 mount한 경로를 완전 새로운 공간으로 분리했기 때문에,
**비어있다**로 해석하면 좋을 듯?
