---
created: 2017-02-28
---
# Docker

운영체제 수준 가상화 컨테이너 관리 도구.

[podman](/docs/wiki/podman.md)의 선택지도 있다.
docker 명령어와 호환된다. 다만 WSL에서는 리소스 설정을 할 수 없어서 사용하지 않는다.

## Docker 환경 구성하기

여러가지 선택지가 있으나 MacOS, Linux라면 Colima를 가장 추천한다.
WSL2는 Rancher Desktop 추천.

### Docker Desktop

https://www.docker.com/products/docker-desktop/

```bash
brew install --cask docker
```

가장 쉽게 Docker를 사용할 수 있는 방법이다.
개인 사용자는 무료로 사용할 수 있다.
라이센스 정책 변경으로 인해 [기업 사용자는 조건](https://www.docker.com/pricing/faq/)에 따라 유료로 사용해야 한다.

### Rancher Desktop

https://rancherdesktop.io/

```bash
brew install --cask rancher
```

Docker Desktop과 흡사하다. 기본적으로 [k8s](./kubernetes.md) 제공한다.
불필요 하다면 끄는 편이 리소스 절약에 좋다.
container runtime을 containerd, dockerd 중 선택할 수 있는데, docker에 익숙하면 dockerd를 선택하는 것이 좋다.

개인 사용자더라도 docker desktop의 라이센스 정책이 불편하니 그냥 rancher desktop을 사용하는 것이 좋을지도.

WSL2을 잘 지원한다.

`rdctl` 명령어를 제공한다.

다음과 같이 시작할 수 있다: `rdctl start --path /mnt/c/Program\ Files/Rancher\ Desktop/Rancher\ Desktop.exe`

`--path` 옵션이 필수는 아닌 거 같지만, 내 경우는 찾지 못했다. 그래서 실행 파일로 시작하는 것과 비교해서 별다른 장정이 없다.

종료는 그래도 편할 수도 있겠다: `rdctl shutdown`

### Colima

https://github.com/abiosoft/colima/

Linux, MacOS 모두 지원한다.
최소한의 설정으로 컨테이너를 제공한다고 설명한다:

> Container runtimes on macOS (and Linux) with minimal setup

MacOs는 homebrew로 쉽게 설치할 수 있다: `brew install colima`

[아직 WSL2를 지원하지 않으니](https://github.com/abiosoft/colima/issues/434) 주의.
[Lima](https://github.com/lima-vm/)라는 가상머신 지원 도구를 사용하는데, 아직 윈도우를 지원하지 않아서 colima도 제공할 수 없다는 듯. 조만간 WSL도 제공할 수 있을 거 같다고 하니 기다려 보자.

Command line으로만 도커를 시작할 수 있다.
GUI를 제공하지 않지만 Docker Desktop이나 Rancher Desktop에서도 GUI를 잘 사용하지 않으니 딱히 문제는 안된다.

`colima` 명령어를 제공하고, `colima start`로 도커를 시작한다.
다만 기본으로 memory가 2GiB로 설정되는데 이는 특정 도커 이미지를 사용할 때 예기치 않은 문제를 일으킬 수 있다.
내 경우 메모리 문제로 [airflow 컨테이너](https://github.com/marclamberti/docker-airflow/blob/main/docker-compose.yml)가 시작하자마자 죽는 문제가 있었다.

`colima start --memory 8 --cpu 4` 와 같이 `--memory`, `--cpu` 옵션으로 메모리와 CPU를 늘릴 수 있다.

현재 자원 할당 상태를 보려면 `colima status -e`를 입력하자.

```bash
❯ colima status -e
INFO[0000] colima is running using QEMU
INFO[0000] arch: aarch64
INFO[0000] runtime: docker
INFO[0000] mountType: sshfs
INFO[0000] socket: unix:///Users/alleb/.colima/default/docker.sock
INFO[0000] networkDriver: gvproxy
INFO[0000] cpu: 2
INFO[0000] mem: 8GiB
INFO[0000] disk: 60GiB
```

#### 바인딩한 포트로 컨테이너의 네트워크 접근이 안되는 문제

`docker ps`로 포트 바인딩을 확인되는데도, `localhost:포트`로 액세스할 수 없는 경우가 종종 발생한다.

docker-desktop 등 다른 도구에서는 그런적이 없었던 거 같은데, colima 사용하면서, 재시작하지 않고 오래 사용하면 발생하는 거 같기도 하다.

어쨌든 `colima stop`으로 중지하고 다시 `colima start`로 재시작하면 해결되었다. `colima restart`는 안되었다.

[Colima 이슈](https://github.com/abiosoft/colima/issues/71#issuecomment-1048749674)에 비슷한 내용으로 등록된 것도 있는데,
내 경우는 colima를 시작하지 얼마 안된 경우에는 발생하지 않았다는 점에서 좀 다르다. 이슈어는 방금 시작한 후 포트가 활성화되지 않았다고 한다.\
리액션이 가장 많은 답변은 `docker.sock`이 오래된 파일을 가르키고 있어서 발생했고, symlink를 새로 만들어서 해결했다고 한다.

> Solved it by removing the old symlink and then sudo ln -s /Users/$USER/.colima/docker.sock /var/run/docker.sock.

### OSX 에서 수동으로 Docker 환경 구성하기

**docker desktop 또는 rancher desktop이 나와서 이 방법은 비추천.**

**1. Homebrew로 Docker와 Docker-machine 설치**

```bash
$ brew install docker docker-machine
```

docker-machine: 맥을 마치 Host OS 처럼 사용 할 수 있도록 해주는 프로그램

**2. Homebrew로 Virtualbox 설치**

```bash
$ brew cask install virtualbox
```

Virtualbox: 가상화 프로그램. 맥에서 docker-machine(Host OS, Linux)을 운영하기 위해서 사용

**3. docker-machine 설정**

```bash
$ docker-machine create -d virtualbox default
```

virtualbox driver를 이용하여 `default` 이름의 Docker-machine을 생성

virtualbox에 Docker-machine이 올라간다.

**4. 생성한 Docker-machine 활성화**

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
## Run this command to configure your shell:
## eval $(docker-machine env default)
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

## Dockerfile의 Volume 명령어

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

## Dockerfile

도커 이미지를 빌드하기 위한 명령어들을 모아놓은 파일.

스크립트로 이루어져 있기 때문에 이미지를 관리하는 것보다 훨씬 비용이 적게 든다는 장점이 있다.

각 명령어 마다 이전 이미지로부터 새로운 이미지를 생성한다.(Layer)

### 명령어

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

여기서 `5000-5002/tcp, 6379/tcp, 7001-7007/tcp`는 `EXPOSE`로 명세했지만 호스트와 바인딩되지 않았음을 의미한다.
즉, `EXPOSE`는 포트 대기중을 의미한다.

## 중지된 도커 컨테이너에서 파일 복사하기

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

## `host.docker.internal`로 호스트 서비스 접근하기

`host.docker.internal`은 호스트의 ip를 가르키는 DNS name이다.
[container에서 호스트의 서비스에 접근](https://docs.docker.com/desktop/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host)이 필요할 때 사용한다.

> This is for development purpose and does not work in a production environment outside of Docker Desktop.

주의할 점은 **docker-desktop** 에서 제공하는 것이다. rancher-desktop 등 다른 도구로 docker 구성했다면 사용할 수 없다.

### 대체는?

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

## Troubleshooting

### 맥북 m2 이슈

Intel CPU(amd64) -> M2(arm)로 옮기면서 발생한 문제

#### mysql:5.6

mysql 8 버전 이하는 arm64 용으로[제공하지 않는 것](https://hub.docker.com/r/arm64v8/mysql/)으로 보인다.
그래서 `docker pull mysql:5.6` 하면 manifest를 찾을 수 없다며 실패한다:

```bash
❯ docker pull mysql:5.6
5.6: Pulling from library/mysql
no matching manifest for linux/arm64/v8 in the manifest list entries
```

해결을 위해선 그냥 amd64 것을 사용해도 동작하므로 `--platform` 옵션을 줘서 amd64 것으로 받는다:

```bash
❯ docker pull --platform linux/amd64 mysql:5.6
```

### WSL2에서 Nvidia GPU 사용하기 (해결중...)

Docker와 GPU 모두 잘 모르므로 일단 관련 정보만 좀 수집하자.

해결하고자 하는 문제는 WSL2에서 GPU(Nvidia 사용중)를 사용하는 것이다.

docker는 `--gpus` 옵션으로 GPU를 사용할 수 있다. 하지만 내 경우에는 다음과 같은 에러가 발생했다:

```bash
$ docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
f94d6b2f2858892727c28c259e4d224b7f53414efa198d89e72bb06825cbeab6
docker: Error response from daemon: could not select device driver "" with capabilities: [[gpu]].
```

ollama는 LLM을 사용하기 쉽게 해주는 도구. GPU로 향상된 성능을 이용하고 싶었다.

---

Nvidia 공식 WSL2 지원 문서:\
https://docs.nvidia.com/cuda/wsl-user-guide/index.html

위 링크는 [nvidia-docker 이슈](https://github.com/NVIDIA/nvidia-docker/issues/1034#issuecomment-703102098)의 덧글에서 얻는 정보다.

> Note that NVIDIA Container Toolkit does not yet support Docker Desktop WSL 2 backend.

2020년 10월에는 위 문구가 있었나 본데, 2024년 2월에는 해당 문구가 없어졌다. 지원하는 건가?

---

GPU 지원 여부를 확인하려면:\
`docker run -it --gpus=all --rm nvidia/cuda:11.4.2-base-ubuntu20.04 nvidia-smi`

[WSL 2 GPU Support for Docker Desktop on NVIDIA GPUs](https://www.docker.com/blog/wsl-2-gpu-support-for-docker-desktop-on-nvidia-gpus/) 글에선 다음과 같이 응답한다:

```bash
$ docker run -it --gpus=all --rm nvidia/cuda:11.4.2-base-ubuntu20.04 nvidia-smi
Tue Dec  7 13:25:19 2021
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 510.00       Driver Version: 510.06       CUDA Version: 11.6     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  On   | 00000000:01:00.0 Off |                  N/A |
| N/A    0C    P0    13W /  N/A |    132MiB /  4096MiB |     N/A      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------
```

반면에 나는 제대로된 응답을 받지 못한다:

```bash
$ docker run -it --gpus=all --rm nvidia/cuda:11.4.2-base-ubuntu20.04 nvidia-smi
Unable to find image 'nvidia/cuda:11.4.2-base-ubuntu20.04' locally
docker: Error response from daemon: manifest for nvidia/cuda:11.4.2-base-ubuntu20.04 not found: manifest unknown: manifest unknown.
See 'docker run --help'.
```

## References

NodeJS 어플리케이션의 Dockerizing\
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

WSL 2 GPU Support for Docker Desktop on NVIDIA GPUs\
https://www.docker.com/blog/wsl-2-gpu-support-for-docker-desktop-on-nvidia-gpus/
