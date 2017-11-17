# Johnpapa's AngularJS Style Guide - Modularity

## [데이터 서비스를 분리하기](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services)

XHR calls, local storage, stashing in memory 등으로 부터 데이터를 얻는 로직은 factory로 분리한다.

1. 컨틀롤러의 역할은 정보(데이터)를 모으고 뷰에 출력하는 것이므로 데이터 관리를 해선 안된다.
1. 테스트 할 때 Mock 구성을 쉽게 만든다.
1. 데이터 저장소(server, local storage, memory)로부터 데이터 핸들링하는 코드가 더 명확해 진다.
    - http header를 포함하는 코드
    - `$http`와 같은 다른 서비스나 데이터와 커뮤니케이션 하는 코드
    - 컨틀롤러와 같이 데이터 서비스를 호출자가 하나의 지점으로 통하게 하고 데이터를 감추어 캡슐화 함
