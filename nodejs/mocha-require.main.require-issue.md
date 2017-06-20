# Mocha 사용 시 require.main.require 이슈

```mocha``` 명령어로 코드 실행 시 ```require``` 가 아닌 ```require.main.require``` 구문을 사용한 파일이 있으면 제대로 모듈을 가져오지 못한다.

```require.main.require``` **진입 파일을 기준**으로 경로가 결정되기 때문이다.

Mocha는 각 테스트 스크립트 파일이 진입점이기 때문에 그 파일을 기준으로 경로가 결정된다.
