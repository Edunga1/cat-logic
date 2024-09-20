---
created: 2024-09-18
---
# Podman

오픈소스 운영체제 수준 가상화 컨테이너 관리 도구.

[Docker Desktop](/docs/wiki/docker.md)의 대체제로 사용할 수 있다.

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

```bash
# PATH에 포함된 디렉토리 내에서
$ ln -s "/mnt/c/Program Files/RedHat/Podman//podman.exe"
```

`podman.exe` 경로는 다를 수 있으니 `which podman.exe`로 확인하자.
