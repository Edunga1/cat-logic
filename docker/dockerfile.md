# Dockerfile

C의 Makefile와 비슷하다.

도커 이미지를 생성해주는 **별도의 문법을 가진** 스크립트.

스크립트로 이루어져 있기 때문에 이미지를 관리하는 것보다 훨씬 비용이 적게 든다는 장점이 있다.

각 명령어 마다 이전 이미지로부터 새로운 이미지를 생성하고 저장하는 방식.

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
