---
created: 2023-02-11
---
# crontab

작업 스케쥴링을 위한 명령어 도구.

- `crontab -e`: crontab 파일을 열어서 수정한다.
- `crontab -l`: crontab 파일을 출력한다.
- `crontab -r`: crontab 파일을 삭제한다.

각 명령어는 현재 사용자 기준으로 동작한다.

## crontab 등록 및 실행

`crontab -e` 명령어를 입력하면 vi 에디터가 실행되며, 아래와 같이 작성한다.

```
PATH=/Users/username/bin:/usr/local/Cellar/pyenv-virtualenv/1.1.5/shims:/usr/local/Cellar/pyenv-virtualenv/1.1.5/shims

21 * * * * docker-compose -f ~/workspace/my-api/docker-compose.local.yml run server python script.py >> ~/workspace/my-api/script.log
```

이제 `cron`을 통해 실행되면, `~/workspace/my-api/script.log` 파일에 결과가 기록된다.
실행되지 않으면 daemon(`cron`)이 실행되고 있지 않은 것이므로, `cron`을 실행한다.
이는 운영체제마다 다를 것으로 보인다. ubuntu([wsl](./windows-subsystem-for-linux.md))의 경우 `cron`을 직접 실행시켜야 했다.(`sudo cron`)

- 명령어의 실행 위치는 home directory다. 상대 경로로 사용시 주의해야 한다.
- 사용자 로그인을 통해 shell에 접속한 것이 아니므로 profile 파일을 읽지 않는다. 따라서 명령어의 경우 PATH 환경변수를 명시적으로 지정해야 한다.
- 예시와 같이 crontab 파일에 `PATH` 등 환경변수를 지정할 수 있다.

**실행 결과**

> Output of the crontab jobs (including errors) is sent through
email to the user the crontab file belongs to (unless redirected).

*- crontab 파일 내용중*

예시처럼, 출력은 redirection을 통해서 남기거나, 그렇지 않으면 사용자의 email로 전송된다고 한다.

## macOS의 경우 email로 결과가 전송된다.

읽지 않은 메일이 있으면, 터미널에 접속하면 다음과 같은 메시지가 나온다:

```bash
Last login: Sun Apr 25 15:44:23 on ttys000
You have new mail.
```

`mail` 실행하면.

```bash
❯ mail
Mail version 8.1 6/6/93.  Type ? for help.
"/var/mail/username": 10 messages 10 new
>N  1 username@usernameui-Mac  Sun Apr 25 16:39  21/862   "Cron <username@usernameui-MacBookPro> python ~/workspace/my-api/script.py"
 N  2 username@usernameui-Mac  Sun Apr 25 16:41  18/742   "Cron <username@usernameui-MacBookPro> doco -f docker-compose.local.yml run server python script.py"
 N  3 username@usernameui-Mac  Sun Apr 25 16:42  21/862   "Cron <username@usernameui-MacBookPro> python ~/workspace/my-api/script.py"
 N  4 username@usernameui-Mac  Sun Apr 25 16:42  18/739   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
 N  5 username@ip-192-168-0-1  Sun Apr 25 16:43  18/900   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
 N  6 username@ip-192-168-0-1  Sun Apr 25 16:46  18/900   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
 N  7 username@ip-192-168-0-1  Sun Apr 25 16:48  18/900   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
 N  8 username@ip-192-168-0-1  Sun Apr 25 16:49  18/900   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
 N  9 username@ip-192-168-0-1  Sun Apr 25 16:50  18/900   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
 N 10 username@ip-192-168-0-1  Sun Apr 25 16:50  18/900   "Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py"
? 10
Message 10:
From username@ip-192-168-0-10.ap-northeast-2.compute.internal  Sun Apr 25 16:50:02 2021
X-Original-To: username
Delivered-To: username@ip-192-168-0-10.ap-northeast-2.compute.internal
From: username@ip-192-168-0-10.ap-northeast-2.compute.internal (Cron Daemon)
To: username@ip-192-168-0-10.ap-northeast-2.compute.internal
Subject: Cron <username@ip-192-168-0-10> doco -f docker-compose.local.yml run server python script.py
X-Cron-Env: <SHELL=/bin/sh>
X-Cron-Env: <PATH=/usr/bin:/bin>
X-Cron-Env: <LOGNAME=username>
X-Cron-Env: <USER=username>
Date: Sun, 25 Apr 2021 16:50:01 +0900 (KST)

/bin/sh: doco: command not found

? q
Saved 1 message in mbox
Held 9 messages in /var/mail/username
```

번호를 입력해서 메일을 읽을 수 있다. 위 같은 경우 cronjob에 입력한 명령어를 찾을 수 없어서 에러가 발생했다.

읽은 메시지는 목록에서 사라지는데 `~/mbox` 파일에 텍스트로 저장된다.
