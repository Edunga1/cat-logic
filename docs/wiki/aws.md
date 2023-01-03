# Amazon Web Service

# `awscli`

## ECR 로그인하기

```bash
aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com
```

`AWS_ACCOUNT_ID` 구하기:

```bash
aws sts get-caller-identity
```

e.g. account id = `1234`, region = `ap-northeast-2`:

```bash
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 1234.dkr.ecr.ap-northeast-2.amazonaws.com
```

ref:
* https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
* https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
