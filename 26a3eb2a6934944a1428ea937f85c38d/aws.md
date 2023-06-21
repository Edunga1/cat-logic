# Amazon Web Service

# `awscli`

## ECR 로그인하기

```bash
aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com
```

`REGION`: 서울 리전이라면 `ap-northeast-2`

`AWS_ACCOUNT_ID` 구하기:

```bash
aws sts get-caller-identity
```

`Account` 필드의 값이 `AWS_ACCOUNT_ID` 이다.

e.g. account id = `1234`, region = `ap-northeast-2`:

```bash
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 1234.dkr.ecr.ap-northeast-2.amazonaws.com
```

ref:
* https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
* https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html

## IAM 관련

[비밀번호 변경](https://docs.aws.amazon.com/cli/latest/reference/iam/change-password.html)(응답 메시지 없음):\
`aws iam change-password --old-password <OLD_PASSWORD> --new-password <NEW_PASSWORD>`

[Access Key 교체](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/id_credentials_access-keys.html#rotating_access_keys_cli)

플로우가 조금 복잡하다. 새 access key 생성 -> 새 access key로 도구 업데이트 -> 기존 access key 비활성화 순서로 진행한다.

기존 access key는 비활성화만 하고 나중에 직접 삭제하자.

1. [새 access key 생성](https://docs.aws.amazon.com/cli/latest/reference/iam/create-access-key.html):\
foreground로 읽으니 파일로 저장하자.
```sh
aws iam create-access-key > access-key.json
```

2. [새 access key로 도구 업데이트](https://docs.aws.amazon.com/cli/latest/reference/configure/):
```sh
aws configure
```

3. [기존 access key 비활성화](https://docs.aws.amazon.com/cli/latest/reference/iam/update-access-key.html):
```sh
aws iam update-access-key --access-key-id <OLD_ACCESS_KEY_ID> --status Inactive
```

2번에서 [aws configure cli](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/configure/import.html) 명으로로 `--csv` 포맷의 파일을 읽어서 업데이트 할 수 있다.
그러면 interactive로 secret key를 입력하지 않고 자동화할 수 있을 듯한데, 1번의 생성 명령어에서 csv 포맷을 제공하지 않는다.

기존 access-key를 확인하려면 [list-access-keys](https://docs.aws.amazon.com/cli/latest/reference/iam/list-access-keys.html)를 사용하면 된다:
```sh
aws iam list-access-keys
```

# LocalStack

https://github.com/localstack/localstack

로컬 환경에서 AWS 클라우드 스택을 구축하는 도구이다.

클라우드 기능을 사용하면 의존 때문에 개발 환경을 구축하기 쉽지 않다.
서비스에 가입하거나 비용을 지불하기엔 개발하기 너무 가혹하다.

LocalStack은 AWS 기능 대부분을 제공한다. https://docs.localstack.cloud/references/coverage/ 여기에서 어떤 기능을 커버하는지 확인할 수 있는데, 왠만한 서비스는 다 있는 것으로 보인다.

도커로 실행하면 더 쉽다. 저장소의 [docker-compose.yml](https://github.com/localstack/localstack/blob/master/docker-compose.yml) 확인하고 그대로 사용해도 된다.

Kinesis를 사용하기 위해서 다음과 같이 사용하고 있다:

```yml
version: "3.8"

services:
  localstack:
    image: localstack/localstack
    ports:
      - "127.0.0.1:4566:4566"
      - "127.0.0.1:4510-4559:4510-4559"
    environment:
      - DEBUG=1
      - DOCKER_HOST=unix:///var/run/docker.sock
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "./data:/var/lib/localstack"
      - "./kinesis-my-stream.sh:/etc/localstack/init/ready.d/kinesis-my-stream.sh"
```

다른 점은 볼륨의 마지막 부분인데, hook을 통해서 스트림을 생성하도록 했다:

```bash
#!/bin/bash

aws --endpoint-url=http://localhost:4566 kinesis create-stream --stream-name my-event-dev --shard-count 1 --region ap-northeast-2
aws --endpoint-url=http://localhost:4566 kinesis list-streams --region ap-northeast-2
```

hook에 대해선 다음 문서에서 설명한다:\
https://docs.localstack.cloud/references/init-hooks/

위 예시에서 보듯이 `aws` 명령어가 LocalStack과 잘 호환된다.
`--endpoint-url`을 통해서 LocalStack와 통신한다.
`awslocal` 명령어도 제공하는데, endpoint를 명시하지 않아도 된다. credential 관련 오류가 있으면 `awslocal` 명령을 사용하면 괜찮다.

# Storage Service

2021-09-31 AWS CEP 내용 정리한 것.

Storage는 크게 Block, File, Object로 나뉜다.

* Block: 일반적인 저장소. AWS EBS.
* File: NAS 등. AWS EFS, FSx.
* Object: AWS S3, Glacier.

## EBS - Elastic Block Storage

EC2는 OS 등 모든 파일은 네트워크로 연결되는 EBS를 사용한다.
- EC2의 Instance Store(물리 호스트)도 제공되나, 별도 설정이 필요하고, 사라지는 영역이라서 특정 용도가 아니면 사용되지 않고, 추천하지 않는다.

**내구성** \
AWS에서는 99.999% 신뢰성 제공을 목적으로 설계 되며, 데이터를 잃어버리지 않는 것을 의미

EBS GP2는 Burst 기능을 제공하는데, 유후 시간 후 처음 30분간 3,000 IOPS를 제공하는 기능이다.
- 기본 성능은 3 IOPS/GB 인데, 따라서 1,000GB 이상 볼륨을 사용한다면, Burst 한 것과 같은 성능이므로 Burst 기능을 제공하지 않는다.
- GP3은 항상 3,000 IOPS 고정이나, 1TB(1,000GB)를 초과하더라도 3,000 IOPS 그대로다.

EBS의 스냅샷은 전체 Copy가 아니라 Incremental을 저장하므로, 스냅샷을 자주 사용하도록 설정하는 것이 좋다.

## EFS - Elastic File System

처음부터 얼마나 사용할 지 고민할 필요는 없다. 사용한 만큼 비용 지불. 사용할 때 마다 용량 확장된다.(Scalable)

## Object Storage

![object storage classes](res/aws-object-storage-classes.png)

S3 에서 사용하는 스토리지 타입

HOT - COLD는 오브젝트에 접근했을 때 반응에 대한 내용. Observable과 같은 맥락 같다.

# Networking

2021-09-31 AWS CEP 내용 정리한 것.

![aws-global-infrastructure](res/aws-global-infrastructure.png)

Region에는 2개의 Transit이 존재한다. 다른 Region, 외부와의 연결 통로가 된다.

AZ간 통신은 내부망을 통해서만 이루어진다.

## 주요 네트워킹 서비스

* VPC: AWS 클라우드상에 만드는 가상 네트워크
* VPN: On-premise 데이터 센터와 VPC의 IPSec VPN 연결 
* Direct Connect: On-premise 데이터 센터와 VPC의 전용선 연결
* Route 53: 관리형 DNS 서비스

AWS에서 자원 레벨은 Global과 Regional으로 나뉜다.
EC2는 Regional 서비스에 포함된다.

AWS에서는 Static의 반대되는 용어로 `Elastic`을 사용한다.

### VPC - Virtual Private Cloud

독립된 가상 클라우드 네트워크. 나만의 네트워크라고 이해하면 된다.

IP 대역은 CIDR(Classes Inter-Domain Routing) 블록 /16 ~ /28 까지 사용 가능하다.

공인 IP는 비싼 자원이므로 서버 Stop시 해제된다는 등 제약이 있다.

DNS는 기본으로 제공되는 Private, Public DNS가 제공됨

**IP 대역** \
172.16.0.0/16 CIDR 내에서 네트워크 구성된다.

**VPC Peering**
* 동일 Region 내 VPC간 네트워크 연결 옵션
* VPC간 IP가 중복 불가하며, 하나의 Peering만 제공

### Direct Connect

Direct Connect는 물리적으로 전용선으로 연결한다.

### Route 53

Route53은 FQDN + 다양한 기능을 제공한다.