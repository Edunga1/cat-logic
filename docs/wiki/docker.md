# Docker

# OSX 에서 Docker 환경 구성하기

**docker desktop 또는 rancher desktop이 나와서 이 방법은 더 이상 사용하지 않는다.**

```bash
brew install --cask docker
```

docker desktop은 기업인 경우 규모에 따라 유료 버전을 사용해야 한다. 라이센스에 주의하자.

```bash
brew install --cask rancher
```

rancher desktop은 무료 사용 가능하다.

## 1. Homebrew로 Docker와 Docker-machine 설치

```bash
$ brew install docker docker-machine
```

docker-machine: 맥을 마치 Host OS 처럼 사용 할 수 있도록 해주는 프로그램

## 2. Homebrew로 Virtualbox 설치

```bash
$ brew cask install virtualbox
```

Virtualbox: 가상화 프로그램. 맥에서 docker-machine(Host OS, Linux)을 운영하기 위해서 사용

## 3. docker-machine 설정

```bash
$ docker-machine create -d virtualbox default
```

virtualbox driver를 이용하여 `default` 이름의 Docker-machine을 생성

virtualbox에 Docker-machine이 올라간다.

## 4. 생성한 Docker-machine 활성화

Docker-machine을 생성했지만, 아직 `docker` 명령어를 이용할 수 없다.

Docker-machine을 여러개 관리할 수 있다. 따라서 사용하고자 하는 Docker-machine을 활성화해야 한다.

```bash
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER        ERRORS
default   -        virtualbox   Running   tcp://192.168.99.100:2376           v17.03.0-ce

$ docker-machine env default
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/parkdu/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval $(docker-machine env default)
```

위 명령어로 `default` Docker-machine의 환경 정보를 알 수 있다.

그리고 마지막 `eval` 명령어로 활성화 할 수 있다.

```bash
$ eval $(docker-machine env default)
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER        ERRORS
default   *        virtualbox   Running   tcp://192.168.99.100:2376           v17.03.0-ce
```

ACTIVE 속성이 `*`로 변경되었다.

이제 맥에서 `docker` 명령어를 사용할 수 있다!

# Dockerfile의 Volume 명령어

다음과 같이 컨테이너를 띄우면 `docker run -ti --rm -v $(pwd):/myvol --name foo ubuntu`
현재 디렉토리를 컨테이너와 공유하여 사용할 수 있다.

그런데 **Dockerfile** 내에서 `VOLUME` 키워드를 사용하면 호스트를 지정해 줄 수 없다.

그리고 호스트의 디렉토리를 생략하여 `-v` 옵션을 줄 수 있다: `docker run -ti --rm -v /myvol --name foo ubuntu`

이는 컨테이너의 경로만 지정한 것이 된다.

`docker inspect`로 보면 호스트의 디렉토리(`source`)는 이상한 곳에 연결되어 있다:

```json
"Mounts": [
    {
        "Type": "volume",
        "Name": "922a144309641e2cb18e84498b6b3b5f7f55eacd8073b37062b1dc50cc568814",
        "Source": "/var/lib/docker/volumes/922a144309641e2cb18e84498b6b3b5f7f55eacd8073b37062b1dc50cc568814/_data",
        "Destination": "/myvol",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
```

이건 어디다 어떻게 쓰는가?

**컨테이너간 데이터 공유** 위해서 사용한다.

1. `foo` 컨테이너를 띄운다:<br>
`docker run -ti --rm -v /myvol --name foo ubuntu`

2. 그리고 `foo` 컨테이너와 데이터를 함께 사용할 `bar`를 띄운다:<br>
`docker run -ti --rm --volumes-from foo --name bar ubuntu`

3. `foo`와 `bar` 내에서 볼륨 연결된 디렉토리가 비어있음을 확인한다:<br>
`ls myvol`

4. `foo`에서 `text` 라는 파일을 생성해본다:<br>
`touch myvol/text`

5. `bar`에도 `myvol/text` 라는 파일이 생성되었음을 확인한다:<br>
`ls myvol`

즉, 호스트 디렉토리 연결 없이 볼륨을 사용한다면 `--volumes-from` 옵션을 사용하는 컨테이너가 있음을 의미한다.

# Dockerfile

도커 이미지를 빌드하기 위한 명령어들을 모아놓은 파일.

스크립트로 이루어져 있기 때문에 이미지를 관리하는 것보다 훨씬 비용이 적게 든다는 장점이 있다.

각 명령어 마다 이전 이미지로부터 새로운 이미지를 생성한다.(Layer)

## 명령어

**CMD**

컨테이너 시작 시 실행 할 명령어
- `CMD <command>`
- `CMD ["executable","param1","param2"]`

**RUN**

빌드 시 실행할 명령어, 일반적으로 이미지의 환경을 구성하는데 사용한다.

- `RUN <command>`
- `RUN ["executable", "param1", "param2"]`
- `RUN apt-get install -y nodejs`

**ENV**

환경 변수 설정. RUN, CMD 명령어 모두에서 영향을 받는다.

- `ENV <key> <value>`
- `ENV <key>=<value>`

**WORKDIR**

작업 디렉토리 설정. RUN, CMD 명령어의 실행 위치를 설정한다.

- `WORKDIR <path>`

[ADD](https://docs.docker.com/engine/reference/builder/#add) or [COPY](https://docs.docker.com/engine/reference/builder/#copy)

호스트의 파일을 이미지에 추가.

- `ADD <src> <dest>`
- `ADD <git ref> <dir>` git 저장소에서 파일을 가져온다.

[ADD와 COPY 차이점](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy):

> Although ADD and COPY are functionally similar, generally speaking, COPY is preferred. That’s because it’s more transparent than ADD. COPY only supports the basic copying of local files into the container, while ADD has some features (like local-only tar extraction and remote URL support) that are not immediately obvious. Consequently, the best use for ADD is local tar file auto-extraction into the image, as in ADD rootfs.tar.xz /.

Best Practice 문서에서 설명하기를, 기능 자체는 비슷하나 일반적(파일 복사)으로 `COPY`를 선호한다. 더 명확하기 때문이다.
`ADD`에는 추가 기능이 있는데, tar 파일 압축 해제나 원격 URL 지원, git 저장소를 추가할 수 있다.

[EXPOSE](https://docs.docker.com/engine/reference/builder/#expose)

> The EXPOSE instruction does not actually publish the port. It functions as a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published.

`EXPOSE`는 포트를 실제로 열지 않는다. 이미지 빌드하는 사람과 컨테이너를 실행하는 사람 사이의 문서 역할을 한다.
`-p` 옵션으로 포트를 열거나, docker-compose의 `ports`를 사용하여 포트를 열자.

`EXPOSE`를 주면, 컨테이너를 생성하여 `docker ps`로 컨테이너를 확인했을 때 `PORTS` 열에 포트 정보가 표시된다.

```bash
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS              PORTS                                                            NAMES
9f8fa8cbf88c        grokzen/redis-cluster:latest   "/docker-entrypoint.…"   27 minutes ago      Up 27 minutes       5000-5002/tcp, 6379/tcp, 7001-7007/tcp, 0.0.0.0:6379->7000/tcp   redis-cluster
```

여기서 `5000-5002/tcp, 6379/tcp, 7001-7007/tcp`는 `EXPOSE`로 명세했지만 호스트에는 노출되지 않았다.
즉, `EXPOSE`는 포트 대기중을 의미한다.

# 중지된 도커 컨테이너에서 파일 복사하기

`docker ps -a`로 중지된 컨테이너가 있다면 그 컨테이너로부터 파일을 호스트로 복사해올 수 있다

`docker cp 컨테이너:경로 호스트경로`로 복사한다.<br>
컨테이너와 호스트를 반대로 입력하여 중지된 컨테이너에 파일을 주입할 수도 있을 거 같다.

반면 `docker exec`는 중지된 컨테이너에 접속할 수 없다.

---

ionic으로 빌드를 하고, jarsginer로 서명까지하여 릴리즈 apk를 만드는 도커파일을 작성했다.<br>
그리고 apk를 생성하면 컨테이너는 종료된다.<br>
젠킨스에 등록하여 master 브랜치가 업데이트 될 때마다 apk를 뽑아서, GCP bucket에 업로드하도록 작성했다.<br>

처음엔 볼륨을 연결하여 호스트에 생성되도록 했으나 `mkdir /root/workspace: read-only file system.`에러가 뜬다.<br>
젠킨스 slave의 문제인지. 어차피 볼륨으로 뿜어내는 방식이 내키지 않아서 다른 방식을 찾았다.<br>
무한 루프를 돌도록해서 컨테이너가 죽지 않도록하여 복사해올까 하다가, 중지된 컨테이너에서 가져올 수 있었다.

중지된 컨테이너가 다른 컨테이너에 볼륨을 공유하는 data-only 패턴과 비슷한 방식인듯?

# Jupyter Notebook + NodeJS 도커라이징 기록

Jupyter Notebook이 너무 유용한 거 같아서 NodeJS도 쓰고 싶어졌다.

1. 찾아보니 기존 Jupyter 환경에 npm `ijavascript`라는 cli를 설치하면 기존 Python에 NodeJS 노트까지 추가할 수 있었다.

1. 하지만 python, nodejs 관련 모듈을 설치하면 너무 복잡해져서 나중에 다시 환경 구성하기 힘들 거 같아서
도커 쪽으로 눈길을 돌렸다.

1. 찾아보니 Python, Go, NodeJs 모두 가능한 도커 이미지를 찾았다:
https://github.com/dting/docker-jupyter-go-js<br>
오피셜(docker hub 말고) Jupyter Notebook 이미지를 base로 작성된
Go 언어 용 Jupyter 이미지를 base로 작성된 도커 이미지였다. (음)

1. 문제는 오래된 이미지다 보니 node 버전도 낮고, pip 버전도 낮아서
[fbprophet](https://facebook.github.io/prophet/docs/quick_start.html)
모듈이 설치가 안되었다. Dockerfile을 복사해서 다시 이미지를 빌드하려 했으나
지금은 사라진 `jupyter/notebook`이라는 이미지를 base로 하고 있어서 다시 작성하기 어려웠다.

1. 좀 더 찾아보다가 https://hub.docker.com/r/mfellner/javascript-notebook 이미지를 찾았다.
오래 되었지만, 지금도 관리되고 있는 `jupyter/minimal-notebook`를
base로 하고 있어서, 참고하여 Dockerfile을 다시 작성하기로 했다.

1. `mfellner/javascript-notebook` Dockerfile을 수정해서 nodejs 버전을 올리고
`6.0.0` -> `10.15.3` 빌드했다.

1. 실행은 잘 되나, 최초 연결 시 비밀번호/토큰을 입력해야 했다.
어차피 로컬에서만 사용할거라 불필요하다고 판단돼서, jupyter notebook 옵션인
`--NotebookApp.token=''`을 시작 스크립트인 `start-notebook.sh`에 주었으나,
`mfellner/javascript-notebook`에서 원본 스크립트를 `ijavascript` 실행 명령어로 덮어 씌우고 있어서,
적용되지 않고 계속 토큰을 입력해야 했다.

1. 그래서 덮어 씌우는 부분을 Dockerfile에서 제거하고 빌드했으나, 언어 목록에서 nodejs가 제외되었다. 찾아보니
    ```json
    {
      "argv": [
        "node",
        "/usr/local/lib/node_modules/ijavascript/lib/kernel.js",
        "{connection_file}",
        "--protocol=5.0"
      ],
      "display_name": "Javascript (Node.js)",
      "language": "javascript"
    }
    ```
    커널 정보를 이런 포맷으로, Jupyter Notebook의 특정 위치에 두어야 언어 목록에서 출력되는 것이었다.
    `ijavascript`는 `ijsinstall`이라는 명령어로 환경 구성을 할 때 `json` 파일을 추가도 해 주고 있었다:
    https://github.com/n-riesco/ijavascript/blob/d459956f76a22f9ec89937e02645ee7555f92d2b/bin/rc.js#L525

1. 그래서 간단하게 `RUN ijsinstall` 해 줘서, 원본 `start-notebook.sh`는 수정하지 않아도 잘 실행되도록 했다.

## Jupyter Docker Stacks

Jupyter Notebook의 도커 버전은 상당히 많은 시리즈로 되어 있다.
도커 허브엔 설명이 적고 GitHub: https://github.com/jupyter/docker-stacks 에 메뉴얼이 잘 되어 있다.

Dockerfile 관계 트리를 보면 멋있다:<br>
http://interactive.blockdiag.com/?compression=deflate&src=eJyFzTEPgjAQhuHdX9Gws5sQjGzujsaYKxzmQrlr2msMGv-71K0srO_3XGud9NNA8DSfgzESCFlBSdi0xkvQAKTNugw4QnL6GIU10hvX-Zh7Z24OLLq2SjaxpvP10lX35vCf6pOxELFmUbQiUz4oQhYzMc3gCrRt2cWe_FKosmSjyFHC6OS1AwdQWCtyj7sfh523_BI9hKlQ25YdOFdv5fcH0kiEMA

커스터마이징하려면 `jupyter/notebook-minimal`을 기반으로 하면 될 거 같다.

https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-base-notebook
여기에 데이터과학, 머신러닝 등 각 분야에 자주 사용하는 모듈을 미리 설치한 이미지들 정보가 나와있다.

## End

Jupyter Notebook NodeJS 도커라이징한 것은 여기에 올렸다:<br>
https://github.com/Edunga1/jupyter-notebook-nodejs

Dockerfile 작성하면서 `MAINTAINER`가 deprecated, `LABEL`을 사용해야 하는 것을 알았다: https://stackoverflow.com/questions/38899977/how-do-i-declare-multiple-maintainers-in-my-dockerfile

# `host.docker.internal`로 호스트 서비스 접근하기

`host.docker.internal`은 호스트의 ip를 가르키는 DNS name이다.
[container에서 호스트의 서비스에 접근](https://docs.docker.com/desktop/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host)이 필요할 때 사용한다.

> This is for development purpose and does not work in a production environment outside of Docker Desktop.

주의할 점은 **docker-desktop** 에서 제공하는 것이다. rancher-desktop 등 다른 도구로 docker 구성했다면 사용할 수 없다.

## 대체는?

`docker` 명령어:
```bash
docker run --add-host=host.docker.internal:host-gateway
```

`docker-compose.yml`:

```yaml
my_app:
  extra_hosts:
    - "host.docker.internal:host-gateway"
```

반드시 `host.docker.internal` 필요는 없다. 편한 것으로 수정하면 된다.

`host-gateway`의 정보는 잘 모르겠다. 가상화 도구 중 `dockerd`만 제공하는 것으로 보인다.

`dockerd` cli 문서만 있고, 간단하게 설명되어 있다:

https://docs.docker.com/engine/reference/commandline/dockerd/

> --host-gateway-ip ip
> IP address that the special 'host-gateway' string in --add-host resolves to.
> Defaults to the IP address of the default bridge

# References

NodeJS 어플리케이션의 Dockerizing\
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/