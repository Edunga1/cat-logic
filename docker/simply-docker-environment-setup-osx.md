# OSX 에서 Docker 환경 구성하기 - 간단 버전

도커 머신을 사용하지 않고 맥 자체를 호스트인 것 처럼 사용하게 해 준다.

따라서 VirtualBox에 도커 머신을 깔아서 사용했을 때
맥의 루트 폴더 접근 등이 어려웠던 부분을 해소할 수 있다. (Preference에서 지정 가능)

1. [Docker for Mac](https://docs.docker.com/docker-for-mac/install/) 설치

    Homebrew로도 가능하다: ```brew cask install docker``` (중요! ```cask```)

1. 이미 맥 자체를 도커 머신처럼 사용할 수 있다.

    ```docker``` ```docker-machine``` ```docker-compose``` 등 명령어가 있는지 확인 해 보자.

## 주의

기존에 ```docker-machine```을 깔고 환경 변수를 변경
```eval $(docker-machine env)```  해서 사용하다가 제거하지 않고 깔았다면
환경 변수가 활성화 되는 동안 ```docker``` 명령어는 해당 드라이버로 향한다.

따라서 ```docker-machine stop``` 해 줘야 맥을 도커 머신으로 사용할 수 있다.

기존 도커 머신 기능은 계속해서 사용 할 수 있다. 도커 머신을 Active 하지 않았을 때 기본 도커 머신이 맥이 되는 개념
