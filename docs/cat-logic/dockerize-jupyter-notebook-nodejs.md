---
id: page-87
time: 2019-03-07 00:22:27
tag: journal, docker, jupyter-notebook
---

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
