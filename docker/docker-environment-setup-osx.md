# OSX 에서 Docker 환경 구성하기


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

virtualbox driver를 이용하여 ```default``` 이름의 Docker-machine을 생성

virtualbox에 Docker-machine이 올라간다.

## 4. 생성한 Docker-machine 활성화

Docker-machine을 생성했지만, 아직 ```docker``` 명령어를 이용할 수 없다.

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

위 명령어로 ```default``` Docker-machine의 환경 정보를 알 수 있다.

그리고 마지막 ```eval``` 명령어로 활성화 할 수 있다.

```bash
$ eval $(docker-machine env default)
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER        ERRORS
default   *        virtualbox   Running   tcp://192.168.99.100:2376           v17.03.0-ce
```

ACTIVE 속성이 ```*```로 변경되었다.

이제 맥에서 ```docker``` 명령어를 사용할 수 있다!
