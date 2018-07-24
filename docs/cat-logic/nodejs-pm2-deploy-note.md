---
id: page-72
time: 2018-07-24 23:44:00
---
# pm2 deploy 시 주의할 점

[pm2 deploy tutorial](http://pm2.keymetrics.io/docs/usage/deployment/#complete-tutorial)
처럼 `post-deploy`를 다음과 같이 저장하는 경우 조심해야 한다.

```json
"post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production"
```

`pm2 deploy` 하면 다음 절차로 일이 발생한다:
1. 로컬 `ecosystem.json`과 같은 설정 파일을 읽어들임
1. 명세한 서버 정보(`user`, `host`)로 리모트 서버에 접속
1. (리모트 서버에서) git pull
1. (리모트 서버에서) npm install
1. (리모트 서버에서) pm2 startOrRestart ecosystem.json --env production
1. (리모트 서버에서) 위 명령어에 의한 `ecosystem.json` 설정 파일을 읽어들임
1. `apps` 명세에 따른 배포

그러니까 설정 파일은 로컬에서, 리모트에서 총 2번 읽어들인다.

그래서 pm2는 현재 브랜치가 트래킹 중인 리모트 브랜치와 달라지면 싱크를 맞추라고 한다: `push your changes before deploying`

로컬이랑 서버랑 설정 파일이 안맞으면 골치아파진다. 서로 다른 설정 파일을 읽기 때문에 원하는 대로 작업이 이루어지지 않을 수도 있다.
원인은 로컬에서 실행되는 명령어의 명세인 `deploy`, 리모트 서버에서 실행되는 명령어의 명세인 `apps`를 보통 하나의 파일에서 관리하고
코드베이스에 포함하기 때문인데, 설정 파일을 다른 위치에 두면 로컬과 리모트의 설정 파일의 싱크를 보장할 수 없다.

---

pm2로 배포 프로세스를 관리하고 싶어서 설정 파일을 작성하였으나, 데이터베이스 비밀번호를 `env`에 저장하면 코드베이스에 포함되기 때문에,
다른 repository로 분리하려 했다.

그래서 `npm run deploy`하면 셸 스크립트를 실행하도록 했다:
1. pm2 설정 파일을 가지는 저장소`git clone git@github.com:user/repo.git .config`
2. `pm2 deploy .config/ecosystem.json production`

리모트 서버에는 `config` 저장소를 하나 클론 받아놓고 적절한 곳에 두고
`post-deploy`를 `"npm install && pm2 startOrRestart /home/node/config/ecosystem.json --env production"`
설정 파일의 위치를 해당 위치를 가리키도록 했다.

이러다보니 설정 정보를 업데이트해도 리모트에서 다시 pull 하지 않으면 로컬에서는 최신 설정을, 리모트에서는 이전 설정을 사용하는 문제가 있다.

따라서 리모트에서도 항상 `config` 저장소를 clone 후 `pm2 startOrRestart` 하도록 해야겠다.