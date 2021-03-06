---
id: page-1
---
# The Twelve-Factor App

애플리케이션을 잘 돌아가게, 그리고 쉽게 유지보수 할 수 있도록 하는 **방법론**이다.

> Twelve-Factor app은 아래 특징을 가진 SaaS 앱을 만들기 위한 방법론이다. <생략>

코드 구조에 힌트를 주는 것에 나아가서 개발 문화에 까지도 조언한다.
그래서 조금 부정적인 느낌이 들긴 하지만 공감하게 되는 내용들이다.

## I. 코드베이스

### 버전 관리되는 하나의 코드베이스와 다양한 배포

코드 베이스는 지속 관리하는 코드의 모음을 의미한다.
**하나의 코드 베이스로부터 하나의 애플리케이션**만 나와야 하며,
만약 성격이 다른 여러개의 애플리케이션이 나온다면 그건 **분산 시스템**이다.

따라서 분산 시스템은 각각 개별 앱을 가지며, 개별 앱이 12-factor를 따른다.
개별 앱은 서로 공유하는(중복되는) 코드를 가지면 안되고,
공유되는 코드를 라이브러리화 하여 종속성 매니저로 관리해야 한다.

로컬 테스트, 스테이징, 라이브 서버를 별개의 앱으로 보는 것은 아니다.
이는 데이터베이스의 URL이 다르거나 환경 설정이 상이할 뿐이기 떄문이다.
별개의 앱인지 구분하는 방법은 특정 커밋으로부터 분기되어 ```git cherry-pick``` 이나
```Copy and Paste``` 와 같은 방법으로 공유 코드를 가지는 것이다.

단일 앱은 버전 관리 시스템에서 모든 브랜치들이 언젠가는 통합될 수 밖에 없다.
개발, 스테이징 브랜치도 결국은 ```master``` 브랜치로 ```rebase```, ```merge``` 될 것이다.

하나의 코드 베이스와 환경 설정의 조합으로 배포가 발생한다.
배포는 **실행중인 인스턴스**를 말하며, 테스트, 개발, 라이브 서버와 같이 분리하는 방법을
**다양한 배포**라고 한다.

분산 시스템과 다양한 배포 이 차이를 잘 알아야 한다고 생각한다.

## II. 종속성

### 명시적으로 선언되고 분리된 종속성

## III. 설정

### 환경(environment)에 저장된 설정

## IV. 백엔드 서비스

### 백엔드 서비스를 연결된 리소스로 취급

## V. 빌드, 릴리즈, 실행

### 철저하게 분리된 빌드와 실행 단계

## VI. 프로세스

### 애플리케이션을 하나 혹은 여러개의 무상태(stateless) 프로세스로 실행

## VII. 포트 바인딩

### 포트 바인딩을 사용해서 서비스를 공개함

## VIII. 동시성(Concurrency)

### 프로세스 모델을 사용한 확장

## IX. 폐기 가능(Disposability)

### 빠른 시작과 그레이스풀 셧다운(graceful shutdown)을 통한 안정성 극대화

## X. dev/prod 일치

### development, staging, production 환경을 최대한 비슷하게 유지

## XI. 로그

### 로그를 이벤트 스트림으로 취급

## XII. Admin 프로세스

### admin/maintenance 작업을 일회성 프로세스로 실행
