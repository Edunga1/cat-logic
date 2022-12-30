<!--toc:start-->
- [OSX 에서 Docker 환경 구성하기](#osx-에서-docker-환경-구성하기)
  - [1. Homebrew로 Docker와 Docker-machine 설치](#1-homebrew로-docker와-docker-machine-설치)
  - [2. Homebrew로 Virtualbox 설치](#2-homebrew로-virtualbox-설치)
  - [3. docker-machine 설정](#3-docker-machine-설정)
  - [4. 생성한 Docker-machine 활성화](#4-생성한-docker-machine-활성화)
- [Dockerfile의 Volume 명령어](#dockerfile의-volume-명령어)
- [Dockerfile](#dockerfile)
  - [명령어](#명령어)
<!--toc:end-->

# OSX 에서 Docker 환경 구성하기

docker desktop 또는 rancher desktop이 나와서 이 방법은 더 이상 사용하지 않는다.

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

Makefile와 비슷하다.

도커 이미지를 생성해주는 스크립트를 명세한다.

스크립트로 이루어져 있기 때문에 이미지를 관리하는 것보다 훨씬 비용이 적게 든다는 장점이 있다.

각 명령어 마다 이전 이미지로부터 새로운 이미지를 생성한다.(Layer)

## 명령어

* **CMD**

    컨테이너 시작 시 실행 할 명령어

    `CMD <command>`

    `CMD ["executable","param1","param2"]`

* **RUN**

    빌드 시 실행할 명령어, 일반적으로 이미지의 환경을 구성하는데 사용한다.

    `RUN <command>`

    `RUN ["executable", "param1", "param2"]`

    이미지에 NodeJS 구성 예) `RUN apt-get install -y nodejs`

* **ENV**

    환경 변수 설정

    `ENV <key> <value>`

    `ENV <key>=<value>`

    RUN, CMD 명령어 모두에 영향을 미친다. (즉, 이미지 빌드, 컨테이너 실행 모두 영향)

* **WORKDIR**

    작업 디렉토리 설정

    `WORKDIR <path>`

    RUN, CMD 명령어의 실행 위치를 설정한다.

* **ADD**

    호스트의 파일을 이미지에 추가

    `ADD <src> <dest>`
    
    ```COPY```도 비슷한 역할을 한다.
