---
created: 2023-02-09
---
# Jira

Issue & Project Tracking Software

## 작업중 필터

회사에서 개발 지라 이슈 상태를 다음과 같이 사용하고 있다:
1. Backlog
1. To Do
1. In Progress - 진행중
1. Review - 코드 리뷰
1. Staging - 스테이징
1. Done - 개발 완료
1. RELEASED - 배포 완료

대시보드를 통해서 작업중인 이슈를 한눈에 볼 수 있다:

![jira filter dashboard](res/jira-filter-dashboard.png)

나의 `Work In Progress` 필터는 다음과 같다.

```
assignee = currentUser() AND (status not in (Backlog, Done, RELEASED) OR (status in (Done, RELEASED) AND updated > -1w)) ORDER BY status DESC, due ASC, created DESC
```

쿼리 의도:
* `assignee = currentUser()` : 나에게 할당된 이슈
* `status not in (Backlog, Done, RELEASED)` : Backlog, Done, RELEASED 상태가 아닌 이슈
  * `Backlog`는 진행 계획이 없기 때문에 관심에 분리한다.
* `status in (Done, RELEASED) AND updated > -1w` : Done, RELEASED 상태이면서 1주일 이내에 업데이트된 이슈
  * `Done`과 `RELEASED`는 작업이 완료된 이슈이기 때문에 종료하고 일주일 동안만 관심있다. 완료하고도 덧글을 통해서 관련 내용을 공유하더라.
* `ORDER BY status DESC, due ASC, created DESC` : 상태 내림차순, 마감일 오름차순, 생성일 내림차순
  * 상태`status`로 우선 정렬해야 보기 편하다. 따라서 가장 중요하다. 순서는 위에서 언급한 상태 순서와 동일하다.
  * 마감일`due`은 진행중일 때 특히 중요한데, 마감일이 가까운 순서대로 정렬해서 강조한다.
  * 생성일`created`은 최근에 생성된 것이 더 중요하다고 생각한다.


## Jira CLI

비공식 Jira Command Line Interface. Jira API를 사용해서 조회 및 이슈를 관리할 수 있다.

https://github.com/ankitpokhrel/jira-cli

설치는 Homebrew로 하자. 다만 Tapping이 필요하다.

```bash
brew tap ankitpokhrel/jira-cli
brew install jira-cli
```

1. CLI를 사용하기 위해선 Jira API 토큰이 필요하다.
Atlasian 계정 설정에서 API 토큰을 발급받고 환경 변수`JIRA_API_TOKEN`로 저장해야 한다.
2. `jira init`으로 최초 한 번 설정을 해야 한다.
이 과정에서 Cloud 버전이라면 도메인을 입력해야 한다:  `https://[your-domain].atlassian.net`.

이제 `jira issue view [issue-key]`으로 이슈를 조회할 수 있다.

### 응용하기

#### 브랜치 이름에서 이슈 키 추출

작업 브랜치 이름에 이슈 키를 포함하는 정책을 사용한다면, 다음 명령어로 현재 브랜치의 이슈 키를 조회할 수 있다.

```bash
alias jira-issue="git branch --show-current | grep -o '\b[[:upper:]]\+-\d\+\b'"
```

`jira-issue`를 입력하면 `user/BP-1234` 양식의 브랜치 이름에서 `BP-1234`를 추출한다.

#### 브랜치 이름으로 이슈 조회

다음은 현재 브랜치의 이슈를 조회하는 함수다. 위 `jira-issue`를 사용한다.

```bash
function jiras() {
  local issuenum=${1:-$(jira-issue)}
  if [[ -n $issuenum ]]; then
    jira issue view --raw "$issuenum" | jq '.fields.summary'
  else
    echo "No JIRA issue found in the current branch" >&2
    return 1
  fi
}
```

`jiras`를 입력하면 현재 브랜치의 이슈의 제목을 조회한다.
`jiras BP-1234`와 같이 이슈 키를 직접 입력해도 된다.

#### 브랜치 이름으로 이슈를 브라우저에서 열기

다음은 현재 브랜치의 이슈를 브라우저에서 열어주는 함수다. 위 `jira-issue`를 사용한다.

```bash
function jira-open() {
  local issuenum=${1:-$(jira-issue)}
  local jirahost=$(cat ~/.config/.jira/.config.yml | grep '^server:' | awk -F' ' '{print $2}')
  if [[ -n $jirahost && -n $issuenum ]]; then
    open "$jirahost/browse/$issuenum"
  else
    echo "No JIRA issue or JIRA host found in the current branch" >&2
    return 1
  fi
}
```

`jira-open`를 입력하면 현재 브랜치의 이슈를 브라우저에서 열어준다.
`jira-open BP-1234`와 같이 이슈 키를 직접 입력해도 된다.

`open`은 macOS에서 제공하므로 OS에 따라 다른 명령어를 사용해야 한다.
[WSL](/docs/wiki/windows-subsystem-for-linux.md)에서는 `explorer.exe`를 사용할 수 있다.
`alias open=explorer.exe`를 추가하면 자연스럽게 연동된다.

내 셸 스크립트는 dotfiles에 업로드 하였다: \
https://github.com/Edunga1/dotfiles/blob/f7805039ec1d2feeecdb5dd7ead5c30ad4460b59/shell/.zshrc#L168-L195
