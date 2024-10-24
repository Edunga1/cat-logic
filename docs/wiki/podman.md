---
created: 2024-09-18
---
# Podman

오픈소스 운영체제 수준 가상화 컨테이너 관리 도구.

[Docker Desktop](/docs/wiki/docker.md)의 대체제로 사용할 수 있다.

docker-compose와 호환되는 [podman-compose](https://github.com/containers/podman-compose)는
WSL에서 `brew install podman-compose`로 설치할 수 있었다.

**[WSL](/docs/wiki/windows-subsystem-for-linux.md)에서는 CPU, 메모리 등 리소스를 변경할 수 없다.**

`podman machine set` 옵션으로 리소스 변경이 가능하지만, WSL에서는 변경할 수 없다는 에러 문구가 출력된다.

```bash
$ podman machine set --memory 8192
Error: changing memory not supported for WSL machines
```

메모리 뿐만 아니라 CPU도 변경할 수 없다.

```bash
$ podman machine ls
NAME                     VM TYPE     CREATED         LAST UP         CPUS        MEMORY      DISK SIZE
podman-machine-default*  wsl         45 minutes ago  14 minutes ago  6           2GiB        100GiB
```

내 머신 설정으로는 메모리가 2GiB 밖에 되지 않아서, Ollama 등 무거운 이미지를 실행할 수 없었다.

---

- `podman machine`에 대한 정보: https://docs.podman.io/en/v5.2.2/markdown/podman-machine.1.html
- podman 설치: https://podman.io/docs/installation

## WSL에서 Podman 사용하기

https://podman.io/docs/installation

공식 문서의 Ubuntu 지면을 따라 설치하면 안된다.
우선 `apt list podman`으로 패키지를 확인할 수 없었다.
24년 9월 기준으로 Ubuntu 20.10 and newer 버전을 지원한다고 나와 있어서인지, 20.04에서는 찾을 수 없었다.
다만 검색해보면 20.04 기준으로 지원을 했었는지 관련된 문서를 찾을 수 있었다.

Windows 지면이 별도 설명되어 있는데, [Podman for Windows](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md) 문서를 참고하라고 한다.
정리하면, [GitHub Release](https://github.com/containers/podman/releases)에서 exe 파일을 받아서 설치하면 Powershell에서 `podman` 명령어를 사용할 수 있다.
WSL에서는 `$PATH`에 Podman 경로가 자동으로 추가되어 `podman.exe` 명령어를 사용할 수 있다.
`podman.exe` 이외에도 폴더 내 모든 파일들이 `$PATH`에 추가되면서, 자동 완성에 방해가 되는 것은 단점이다.

설치한 후 `podman machine init`으로 초기화하고, `podman machine start`로 시작한다.
다음부터는 `podman machine start`로만 시작하면 된다.

WSL에서는 `podman` 명령어를 제공하지 않기 때문에, alias를 만들거나 해야한다.
하지만 alias의 문제는 `podman` 명령어를 사용하는 스크립트에서는 사용할 수 없다.
non-interactive shell에서는 사용자 profile을 읽지 않기 때문이다.
그래서 내 경우는 `$PATH`에 포함된 디렉토리에 Symbolic link를 만들어서 사용했다.
나는 `~/bin`을 `$PATH`에 포함시켜두고 있어서 여기에 만들었다.

```bash
ln -s "/mnt/c/Program Files/RedHat/Podman//podman.exe" ~/bin/podman:w
```

`podman.exe` 경로는 다를 수 있으니 `which podman.exe`로 확인하자.

## 확인중인 문제

`podman run` 명령어를 사용할 때, `The directory name is invalid.` 에러가 발생하는 문제.

```bash
❯ podman run --rm -t -i -v `pwd`:/app embedding
Error: open /proc/self/uid_map: The directory name is invalid.
```
