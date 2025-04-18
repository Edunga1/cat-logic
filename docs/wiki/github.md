---
created: 2017-01-25
---
# GitHub

Git 저장소 호스팅 서비스.

## GitHub Copilot

AI 기반의 코드 완성 도구.

자세한 내용은 [문서 참조](/docs/wiki/machine-learning.md#github-copilot)

## GitHub CLI

`gh` 명령어로 GitHub 기능을 사용할 수 있다.

자동 완성을 위해서 `gh completion`을 설정한다:

```bash
# .zshrc
if command -v gh &> /dev/null; then
  eval "$(gh completion -s zsh)"
fi
```

shell에 맞는 `-s` 옵션을 사용하자.

### GitHub CLI Copilot

`gh` 명령어의 확장으로 GitHub Copilot을 사용할 수 있다.

[copilot-cli](https://githubnext.com/projects/copilot-cli/)와 비슷한 기능으로,
터미널에서 쿼리하는 방식으로 명령어 추천이나 설명을 요청하는 기능이다.

https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli

설치하려면: `gh extension install github/gh-copilot`

`gh copilot explain`은 명령어 설명을 받는 기능이다:

```bash
$ gh copilot explain "sudo apt-get"

Welcome to GitHub Copilot in the CLI!
version 0.5.3-beta (2023-11-09)

I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve.

Explanation:

  • sudo is used to run a command with elevated rights, typically as a superuser or administrator.
  • apt-get is the command-line package management tool for Debian-based systems (like Ubuntu).
    • It is used to manage the installation, upgrade, and removal of software packages.
    • It interacts with the APT (Advanced Package Tool) package management system.
    • It requires administrative privileges (hence the use of sudo).
    • It can be followed by various sub-commands and options to perform specific tasks, such as installing, updating, and removing packages.
  • The specific command sudo apt-get without any additional sub-commands or options will not produce any meaningful result or action.
```

`gh copilot suggest`로 명령어 추천을 받을 수도 있다:

```bash
$ gh copilot suggest "Install git"

Welcome to GitHub Copilot in the CLI!
version 0.5.3-beta (2023-11-09)

I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve.

? What kind of command can I help you with?
> generic shell command

Suggestion:

  sudo apt-get install git

? Select an option
> Exit
```

명령어 유형을 선택하도록 하는데, 쿼리에 힌트를 주더라도 항상 선택한다.

24년 1월 기준, 2개 기능만 지원한다. 아직은 copilot-cli의 `??` 명령어를 주로 사용할 것 같다.

```bash
$ gh copilot

Available Commands:
  config      Configure options
  explain     Explain a command
  suggest     Suggest a command
```

GitHub copilot chat이 포함되기를 기대해 본다. GPT-4 기반이라던데.

`gh copilot`을 사용하기 위해선 extension을 설치해야 한다:

```bash
$ gh extension install github/gh-copilot
✓ Installed extension github/gh-copilot

# 설치된 extension 목록
$ gh extension list
NAME        REPO               VERSION
gh copilot  github/gh-copilot  v0.5.3-beta
```

제거하려면 `gh extension remove github/gh-copilot`.

## GitHub Copilot Workspace

Copilot과 함께 프로젝트의 문제 정의, 계획을 세우고, 구현을 도와주는 AI 개발 환경이다.

https://githubnext.com/projects/copilot-workspace/

2024년 10월 기준, [GitHub Next](https://githubnext.com/)의 실험적인 프로젝트이다.
나는 4월에 Waitlist에 등록해서 10월 24일에 초대를 받았다.

사용 방법은 별도 저장소로 문서화되어 있다: https://github.com/githubnext/copilot-workspace-user-manual

첫 사용 소감은, 개인 프로젝트의 진행이 막연할 때 사용하면 좋겠다.
잘 짜여진 흐름으로 작업을 진행할 수 있도록 가이드를 해주기 때문이다.

공개 프로젝트라면 잘 모르겠다. 아직 얼만큼 성능이 얼마나 좋은지 잘 몰라서 평가하기 어렵다.

Workspace는 저장소의 모든 파일을 분석한다.
저장소에 대해서 일일이 설명하지 않아도 어떤 프로젝트인지 알고 상황에 맞춰서 진행한다.

### 사용법

Workspace로 작업할 저장소를 선택하는 것으로부터 시작한다.
선택하기 위해서 GitHub의 연동(권한)이 필요하다. Copilot Workspace는 별도 앱으로 동작하기 때문이다.

아이디어 구상 -> 작업 계획 -> 구현 순서로 진행된다.
모든 것은 자연어로 입력으로 이루어진다.

![copilot workspace task](./res/copilot-workspace-task.png)

Task 단계에서는 어떤 작업을 할 것인지 고민하는 단계다.
상단을 보면 `Brainstorm`이라고 되어 있다.

내가 입력한 것은 `Write a friendly README` 일 뿐이다.
그랬더니 현재 저장소의 상황을 브리핑했다.
`Current Behavior`이 그 부분이다.
README.md 파일이 없고, 프로젝트에 대한 문서, 정보, 목적, 설치 방법, 협업 방법 등이 없다고 한다.

그리고 해결 방법을 제안한다.
`Proposed Solution` 지점이다.
README.md 파일을 생성할 것이고, 부족한 부분을 채울거란다.

친절하게도 `Suggested Questions`을 제시한다.
부족한 부분을 질문을 통해서 채워보라는 것이다.
물론 직접 내가 작성할 수도 있도록 되어있다.
GitHub의 세심한 배려가 느껴진다.

`Generate Plan` 버튼을 누르면 Plan 단계로 넘어간다.

---

![copilot workspace plan](./res/copilot-workspace-plan.png)

Plan 단계는 Workspace가 제안한 작업을 내가 검토하는 단계다.

왼쪽 지면에 TODO 목록을 만들어 놓았다.
우선 순위가 중요한지, 아이템의 위치를 변경할 수 있고, 직접 추가, 삭제가 가능하다.

가운데는 어떤 파일을 작업할 것인지 보여준다.

`Implement selected files` 버튼을 누르는 것으로 Workspace가 작업을 시작한다.

---

![copilot workspace implementation](./res/copilot-workspace-implementation.png)

README 추가 정도는 간단한지 작업은 빠르게 진행되었다.

Plan 단계에서 한글로 작성하자고 했는데, 정말로 한글로 작성했다.
프로젝트 설명은 틀린 부분이 있다.
`적 캐릭터의 이동` 기능은 없다. 그냥 적 캐릭터가 없다.
그 외에는 맞다.

여기서도 Workspace의 결과를 내가 검토하고 수정할 수 있다.
모든 단계는 사용자의 피드백으로 마무리한다.

오른쪽 상단의 `Create pull request` 버튼을 눌러서 다음으로 진행한다.

구현에 문제가 있다면, `Revise` 창에 수정할 내용을 입력하면 다시 구현한다.

---

![copilot workspace pull request 1](./res/copilot-workspace-pull-request-1.png)

사용자가 명령만 하면 모든 것은 Workspace가 처리한다는 기조인가?

브랜치 이름부터 PR 제목, 설명까지 모두 작성해줬다.
시작은 비어있는데, 내용을 생성하는 버튼이 있다.

![copilot workspace pull request 2](./res/copilot-workspace-pull-request-2.png)

PR까지 생성한 모습이다.
이로써 코드 반영만 내가 하면 된다.

아이디어 구상부터 구현까지 Workspace가 모두 처리했다.
떠밀리듯 구현한 느낌이다.

## Github API로 Release 된 파일 다운받기

[Github API를 사용하기 위한 토큰 발급, 권한 설정 및 인증 방법은 생략](https://developer.github.com/v3/)

Release 관련 API는 [https://developer.github.com/v3/repos/releases/](https://developer.github.com/v3/repos/releases/)
 여기서 볼 수 있다.

---

Release 목록 API

```
GET https://api.github.com/repos/:owner/:repo/releases
```

Release 목록(또는 Latest라면 정보 하나)을 가져오면 success(200)와 함께 이런 형태로 전송 된다.

```json
{
  "url": "https://api.github.com/repos/octocat/Hello-World/releases/1",
  "html_url": "https://github.com/octocat/Hello-World/releases/v1.0.0",
  "assets_url": "https://api.github.com/repos/octocat/Hello-World/releases/1/assets",
  "upload_url": "https://uploads.github.com/repos/octocat/Hello-World/releases/1/assets{?name,label}",
  "tarball_url": "https://api.github.com/repos/octocat/Hello-World/tarball/v1.0.0",
  "zipball_url": "https://api.github.com/repos/octocat/Hello-World/zipball/v1.0.0",
  "id": 1,
  "tag_name": "v1.0.0",
  "target_commitish": "master",
  "name": "v1.0.0",
  "body": "Description of the release",
  "draft": false,
  "prerelease": false,
  "created_at": "2013-02-27T19:35:32Z",
  "published_at": "2013-02-27T19:35:32Z",
  "author": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  },
  "assets": [
    {
      "url": "https://api.github.com/repos/octocat/Hello-World/releases/assets/1",
      "browser_download_url": "https://github.com/octocat/Hello-World/releases/download/v1.0.0/example.zip",
      "id": 1,
      "name": "example.zip",
      "label": "short description",
      "state": "uploaded",
      "content_type": "application/zip",
      "size": 1024,
      "download_count": 42,
      "created_at": "2013-02-27T19:35:32Z",
      "updated_at": "2013-02-27T19:35:32Z",
      "uploader": {
        "login": "octocat",
        "id": 1,
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      }
    }
  ]
}
```

업로드한 파일 URL을 얻기 위해서는 `assets` 정보에 접근해야 한다.
`assets` 또한 많은 정보를 가지고 있다.
여러개의 asset을 가지고 있을 수 있기 때문에 적당한 것을 찾는 것이 선행되어야 할 것이다.

여기서 **두 가지** URL을 사용할 수 있는데, `assets[].browser_download_url`와 `assets[].url`이다.

---

`browser_download_url`은 실제 파일에 대한 링크를 가지고 있어서 **권한만 있다면** 쉽게 이용할 수 있다.
문제는 private repository인 경우 not found(404)만 반환한다.

사용자가 클라이언트에서 깃허브에 로그인 세션을 가지고 있다면 404가 아닌 파일을 받을 수 있겠지만..

---

private repository는 `url`을 이용해야 한다.
`url`은 **Github API** 주소이기 때문에 `url`로 http **GET** 요청을 해야한다.

```
GET https://api.github.com/repos/octocat/Hello-World/releases/assets/1
```
```json
{
  "url": "https://api.github.com/repos/octocat/Hello-World/releases/assets/1",
  "browser_download_url": "https://github.com/octocat/Hello-World/releases/download/v1.0.0/example.zip",
  "id": 1,
  "name": "example.zip",
  "label": "short description",
  "state": "uploaded",
  "content_type": "application/zip",
  "size": 1024,
  "download_count": 42,
  "created_at": "2013-02-27T19:35:32Z",
  "updated_at": "2013-02-27T19:35:32Z",
  "uploader": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  }
}
```

하지만 추가 작업을 하지 않은 이상 다시 **asset** 정보를 반환한다.

제대로된 바이너리 파일 정보를 받기 위해선 헤더에 `Accept: application/octet-stream`를 추가해야 한다.

제대로 했다면 success(200)와 함께 response로 바이너리 정보가 문자열로 들어온다.
바이너리로 파일 생성 작업이 필요할 것이다.

