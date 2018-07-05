# 도커 이미지 빌드 시 유의사항

`docker build -t NAME .`

`Dockerfile`로 이미지를 빌드할 때 `Dockefile`의 위치가 중요하다.

소스코드 및 리소스와 같은 위치 즉, 프로젝트 루트에 두면 build 시 모든 파일들을 검사하므로 상당히 느려진다.

따라서 `docker/` 폴더와 같이 빈 폴더에 옮긴 후 빌드하자.
