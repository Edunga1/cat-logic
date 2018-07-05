# Dockerfile의 Volume 명령어

볼륨은 호스트와 컨테이너간 데이터를 공유하기 위해서 사용한다고만 알고 있었다.

다음과 같이 컨테이너를 띄우면 ```docker run -ti --rm -v $(pwd):/myvol --name foo ubuntu```
현재 디렉토리를 컨테이너와 공유하여 사용할 수 있다.

그런데 **Dockerfile** 내에서 ```VOLUME``` 키워드를 사용하면 호스트를 지정해 줄 수 없다.

그리고 호스트의 디렉토리를 생략하여 ```-v``` 옵션을 줄 수 있다: ```docker run -ti --rm -v /myvol --name foo ubuntu```

이는 컨테이너의 경로만 지정한 것이 된다.

```docker inspect```로 보면 호스트의 디렉토리(```source```)는 이상한 곳에 연결되어 있다:

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

그러면 이건 어디다 어떻게 쓰는가?

답은 **컨테이너간 데이터 공유**를 위해서 사용한다.

1. ```foo``` 컨테이너를 띄운다:<br>
```docker run -ti --rm -v /myvol --name foo ubuntu```

1. 그리고 ```foo``` 컨테이너와 데이터를 함께 사용할 ```bar```를 띄운다:<br>
```docker run -ti --rm --volumes-from foo --name bar ubuntu```

1. ```foo```와 ```bar``` 내에서 볼륨 연결된 디렉토리가 비어있음을 확인한다:<br>
```ls myvol```

1. ```foo```에서 ```text``` 라는 파일을 생성해본다:<br>
```touch myvol/text```

1. ```bar```에도 ```myvol/text``` 라는 파일이 생성되었음을 확인한다:<br>
```ls myvol```

즉, 호스트 디렉토리 연결 없이 볼륨을 사용한다면 ```--volumes-from``` 옵션을 사용하는 컨테이너가 있음을 의미한다.
