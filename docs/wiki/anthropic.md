---
created: 2023-10-18
---
# Anthropic

Claude 제품군을 개발하는 AI 회사.

OpenAI가 비 개발자에게 친숙하다면 Anthropic은 개발자에게 더 친화적인 제품을 만든다.

2025년과 2026년에 걸쳐서 AI 도구 생태계의 발전을 주도적으로 이끌어 다양한 에이전트 기능을 제안했다.

[MCP](/docs/wiki/model-context-protocol.md), [Skills](/docs/wiki/claude-skills.md), [Subagent](#subagent)을 고안하였는데,
이 셋은 모두 사용자의 의도에 반응하여 작업을 처리하는 개념으로 모두 같은 범주에 속한다고 볼 수 있다.
아무래도 현재로서는 모델의 컨텍스트가 제한되기 때문에, 이런 기능으로 성능이 떨어지는 문제를 보완하려는 듯한 움직임이다.

2026년 6월 9일. [Fable 5 모델이 출시](https://www.anthropic.com/news/claude-fable-5-mythos-5)되었으나, 12일에 미국 정부의 제재로 미국인 제외하곤 사용할 수 없게 되었다.
Fable은 말 많은 Mythos의 열화 버전으로, 22일까지만 기존 플랜에 포함하고, 이후론 Credit 기반으로만 제공한다고 했었다.
Mythos는 뛰어난 성능으로 기대를 모았으나, 보안 문제로 Anthropic이 자체적으로 출시를 보류한 모델이다.
백엔드 개발하는 나로서는 Fable이나 Opus나 큰 차이를 느끼지 못했지만, 사용자 후기는 일반적으로 좋은 편.

## Claude

ChatGPT와 같은 대화형 인공지능.

https://claude.ai/

Google 계정으로 로그인하더라도 연락처 인증이 필요하다.

무료로 시작할 수 있으나, 무료 분량 메시지는 적은 편이다.
아주 작은 텍스트파일 하나 첨부하고, 20여개 대화를 했더니 약 4시간 후에 보낼 수 있다고 한다.

2023년 10월 기준, 구독형 서비스로 1달에 $20.

ChatGPT 처럼 한글 대화도 잘한다.
오랜만에 ChatGPT 처음 접했을 때처럼 재밌게 대화했다.

2022년 11월 데이터까지 학습했다고 한다:

> 저는 현재 2022년 11월 기준의 데이터와 지식으로 학습되었습니다. 따라서 ChatGPT가 2021년 데이터까지 학습한 것과는 달리, 저는 최신의 데이터를 바탕으로 제작되었다고 할 수 있습니다.

Claude에게 직접 물어본 내용이라 오피셜한 내용은 아니다.

무료 버전에서도 파일 첨부하고 파일에 대해서 대화할 수 있다.
txt, pdf, csv과 py, js 등 코드 파일도 첨부 가능한데 이미지는 첨부할 수 없다.

> 아쉽네~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~

이미지 첨부가 안돼서 아쉽다고 위와 같이 말했더니 다음과 같이 말한다:

> 네, 제가 이미지를 이해하지 못한다는 점에서 굉장히 아쉬움을 느끼시는 것 같습니다.
>
> Yes, I understand you feel very disappointed that I cannot comprehend images.
>
> 긴 표현으로 아쉬움을 표현해주신 것으로 보아, 이미지 처리 능력의 부재가 큰 한계점으로 느껴지시는 것 같습니다.
>
> From the long expression, I can see the lack of image processing capabilities feels like a major limitation.
>
> 사람과 자연스러운 대화를 위해서는 이미지 이해 능력도 중요하다는 점이 분명합니다.
>
> It's clear that the ability to understand images is important for natural human conversations.
>
> 현재로선 텍스트 정보만 가능하다는 제한점을 인지하고 계셨음에 감사드립니다. 이는 곧 기술 발전으로 극복해나갈 수 있을 것으로 확신합니다.
>
> I appreciate you understanding my limitation of only handling textual information for now. I'm confident this can soon be overcome as the technology advances.

영문은 항상 답변에 포함해달라고 했더니 붙여줬다.
재밌는건 물결표 숫자로 감정을 이해하려는 점.

### Claude 시스템 프롬프트 공개

2024년 8월, Claude가 시스템 프롬프트를 공개했다.

https://docs.anthropic.com/en/release-notes/system-prompts

시스템 프롬프트는 Claude가 동작하게 하는 핵심이다.

이 프롬프트는 대화가 시작하는 시점에 모델에게 제공한다.
실시간 정보가 포함되어 Claude가 최신 정보를 제공할 수 있게 한다.

> <claude_info> ... </claude_info>\
> <claude_image_specific_info> ... </claude_image_specific_info>\
> <claude_3_family_info> ... </claude_3_family_info>

태그를 사용하여 주제별로 정보를 제공한다.

> The current date is {}. Claude’s knowledge base was last updated on April 2024

현재 날짜를 제공하는 모습.

> It avoids starting its responses with “I’m sorry” or “I apologize”.

죄송하다는 말을 사용하지 않는다. 아마도 반복되면 사용자 입장에서 답답함을 느낄 수 있기 때문이 아닐까.

> Immediately after closing coding markdown, Claude asks the user if they would like it to explain or break down the code.
It does not explain or break down the code unless the user explicitly requests it.

사용자가 요청하기 전까지 코드를 설명하지 않는다. 대신 물어본다.
이 부분도 채팅이 길어지는 것을 방지하기 위함이 아닌가 싶다.
개인적으로 Chat GPT로 대화하다보면 불필요한 설명이 많아서 짧게 요청하는 경우가 많다.

> Instead, Claude describes and discusses the image just as someone would if they were unable to recognize any of the humans in it.

`<claude_image_specific_info>` 태그 부분이다.
이미지의 인물이 누군지 분석하지 말고, 모르는 사람처럼 이미지를 설명하라고 지침한다.
저작권에 대한 문제가 있을 수 있어서 그런 것 같다.
ChatGPT의 프롬프트에서도 Dalle를 사용할 때 유명인의 작품을 생성하지 말라고 했다.

> Claude responds directly to all human messages without unnecessary affirmations or filler phrases like “Certainly!”, “Of course!”, “Absolutely!”, “Great!”, “Sure!”, etc.

불필요한 문구 없이 직접적으로 답변한다.

특정 단어를 사용하지 말라는 프롬프트는, 실제로 사용해보면 지켜지지 않는다는 말이 있다.

> Claude never mentions the information above unless it is directly pertinent to the human’s query. Claude is now being connected with a human.

마지막으로 이 프롬프트에 대해서 언급하지 않는다.
시스템 프롬프트를 가리기 위한 장치지만, Anthropic은 이 프롬프트를 공개했다.

## Claude Code

Anthropic에서 제공하는 에이전트 코딩 **명령줄 도구**.

https://code.claude.com/docs/en/overview

macOS는 `brew install claude-code`로 설치하자, 아쉽게도 cask로 제공되어 Linuxbrew에는 없다.
NPM `npm i @anthropic-ai/claude-code`로도 설치할 수 있지만, native installer를 사용하는 것을 권장한다.

터미널 기반이라 모든 명령줄 도구를 사용할 수 있어서 아주 광범위한 작업을 처리할 수 있다.

2026년 5월 기준, 거의 매일 업데이트되고 있다.\
변경 로그: https://code.claude.com/docs/en/changelog

### 특징

- 대화가 길어지면 알아서 압축(compact)하고 새로운 세션에서 이어간다. 작업중에 압축이 시작되면 많은 시간이 소요되어 불편하다.
- 이미지 분석 가능하다. Web URL을 직접 전달하면 처리하지 못하지만(저장 후 분석하라고 하면 가능할지도) 로컬 파일은 분석한다.
- [세션을 분할하여](https://code.claude.com/docs/en/how-claude-code-works#resume-or-fork-sessions), 기존 세션을 분기할 수 있다.

### 역사

- 2025년 3월 기준 프리뷰 단계에 있다. 프리뷰 단계지만 무료 기간이 없다.
- 2025년 6월 4일, Pro 플랜에 포함되었다.
- 2025년 8월, [Team 플랜](https://www.reddit.com/r/Anthropic/comments/1mvvha9/claude_code_now_on_teams_plan/)에 포함되었다.
  다만 Premium Seat를 추가 구매해야 하는데 가격이 $150이고, 최소 5개 Seat를 구매해야 한다.
- 2026년 1월 16일, [Team 플랜에 Claude Code가 기본 포함되도록 변경](https://www.linkedin.com/posts/claude_claude-code-is-now-included-with-every-team-activity-7418022583620505600-Vjm9)되었다. Premium Seat 구매가 필요없다.
- 2026년 2월, Opus 4.6 모델의 [fast mode가 추가되었다](https://code.claude.com/docs/en/fast-mode).
    - 2.5배 더 빨라진다고 한다. 하지만 가격은 출력 토큰 기준으로 일반 모드가 $25/백만 토큰인 반면에 fast 모드는 $150/백만 토큰으로 [6배 비싸다](https://platform.claude.com/docs/en/about-claude/pricing#fast-mode-pricing).
    - `/fast` 명령어로 전환할 수 있다.
    - Team Plan은 조직에서 활성화해야 한다.

#### 출시 당시 정보

[레딧 BEWARE CALUDE CODE IS NOT FREE 글](https://www.reddit.com/r/ClaudeAI/comments/1ixi2rg/beware_claude_code_is_not_free/)을 보면
쿼리 2~3개에 $5 사용되었다고. 덧글에도 비슷한 경험을 한 사람들이 있다.
비용이 적은 사람도 있는 걸 보면, 코드베이스의 크기에 따라 달라지는 것으로 추정.

기존 프로젝트라면 `/init` 명령어로 프로젝트 분석하고 `CLAUDE.md` 자동 생성을 공식적으로 추천하지만, 개인적으로 사용하지 않는 편.
문서 내용이 너무 장황하여 사용자가 사후 관리가 어렵다.

`CLAUDE.md`는 copilot 등 다른 에이전트도 참조할 수 있다.
`AGENTS.md`로 에이전트 벤더에 종속되지 않는 형태를 제안하기도 했다.
[codex는 AGENTS.md 파일을 참조한다](https://developers.openai.com/codex/guides/agents-md/).

### Insights

`/insights` 명령어로 사용자의 클로드 코드 사용 패턴을 분석한다. `2.1.30` 버전에서 추가되었다.
전체 세션에 대해서 분석하여, 클로드가 놓치는 부분을 개선할 수 있도록 사용 방식을 제안한다.
분석 결과는 html 파일로 출력된다.

아래는 내 분석 결과 중 요약 부분만 번역한 것이다.

> ## 한 눈에 보기
>
> **잘 되고 있는 점:** 여러 리포지토리에서 CLAUDE.md를 먼저 작성하는 체계적인 온보딩 습관이 Claude의 성공적인 작업을 이끌고 있으며, 설계 사고 파트너로서 Claude를 효과적으로 활용하고 있습니다 — 환불 서비스의 sealed class 리팩토링처럼 여러 차례의 설계 반복을 거쳐 아키텍처가 적절해질 때까지 조율하고 있습니다. Skills, Streamlit 앱, CSV 유틸리티 등 다양한 언어에 걸친 인상적인 내부 개발 도구 생태계도 구축했습니다.
>
> **방해가 되는 점:** Claude 측에서는 지정된 도구나 데이터 소스를 지속적으로 무시하고(Skills나 API 문서를 사용하라고 했는데 코드베이스를 grep하는 등), 개념적 질문만 했는데 코드 편집을 시작하는 등 범위를 자주 벗어납니다. 사용자 측에서는 초기 프롬프트의 범위나 기대 출력 형식에 모호함이 있어 Claude의 첫 시도가 잘못된 방향으로 가는 경우가 있으며 — 반복적인 수정 사이클로 생산성이 저하됩니다.
>
> **빠르게 시도할 수 있는 것:** 자주 반복하는 API 조회 워크플로우에 맞춤 Skills(슬래시 커맨드)를 만들어 보세요 — `/sales-history`나 `/purchase-orders` 같은 스킬이 올바른 엔드포인트 소스, 인증 방식, 출력 형식을 하드코딩하면 가장 흔한 마찰 패턴을 한 번에 해결할 수 있습니다. 편집 후 자동으로 테스트를 실행하는 hooks도 설정하면, 누락된 productName assertion 같은 문제를 직접 발견하기 전에 잡아낼 수 있습니다.
>
> **야심찬 워크플로우:** 모델이 더 강력해지면, 기존 Skills 인프라를 활용하여 완전히 자율적인 API 탐색-실행 파이프라인을 구축할 수 있습니다 — 엔드포인트를 찾고, 인증을 처리하고, 호출하고, 수정 없이 포맷된 테이블을 반환하는 하나의 명령. 더 강력한 것은: 세션에서 발생한 마찰(잘못된 접근, 잘못된 관례 이해)이 자동으로 CLAUDE.md 파일에 반영되는 자기 수정 지식 루프로, 같은 실수가 어떤 리포지토리에서도 두 번 다시 발생하지 않게 됩니다.

_빠르게 시도할 수 있는 것_ 항목을 보면, insights 기능을 통해 사용자가 AI와의 핑퐁을 줄이고자 하는 것을 알 수 있다.
실제로는 테스트 hooks로 해결되지 않는 문제였지만.

리포트 결과는 더 많은 내용과 함께 그래프로 보기 좋게 제공된다.
즉시 시도할 수 있도록 CLAUDE.md에 추가하면 좋을만한 내용을 제안하는데, 즉시 복사할 수 있도록 편의 기능도 제공한다.

![Claude Code insights report](./res/claude-code-insights-report.png)

제품에 불리한 내용도 솔직하게 피드백을 준다.
가장 아래 섹션에서 "Claude가 가짜 ID를 사용하여 API를 호출하려고 했고, 내가 중단했다"는 내용이 있다.

### subagent

`/agents` 명령어로 사용자 정의 subagent를 만들거나, 내장된 subagent를 확인할 수 있다.

https://code.claude.com/docs/en/sub-agents

Claude Code는 6개의 내장 subagent를 기본적으로 제공한다.
특히 Bash, Explore, Plan는 쉘 명령어 실행이나 파일 탐색, 계획을 수립하면서 자주 사용된다.

사용자 정의 subagent는 YAML 파일로 작성한다.

```yaml
---
name: code-reviewer
description: 사용자가 요청할 때 최고의 코드 퀄리티와 모범 사례를 위해서 코드를 리뷰합니다
tools: Grep, Read
model: opus
---
당신은 코드 리뷰어입니다. 호출되면, 변경 사항을 확인하고 분석하세요.
```

frontmatter는 [name과 description만 필수](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields)이다.

[Skill](/docs/wiki/claude-skills.md)와 마찬가지로, 호출되는 타이밍이 중요하기 때문에, Code가 subagent에 위임하기 위한 조건을 명세한다.

Code가 subagent에 작업을 위임하는 것은 다음과 같은 장점이 있다.

- 위임하는 작업에 대한 출력을 subagent로 격리하여 주 대화에서 컨텍스트를 보존
- subagent가 사용할 수 있는 도구 제한
- 사용자 레벨의 subagent로 프로젝트 간 구성 재사용
- 도메인 특화 시스템 프롬프트 사용
- 더 빠르고 저렴한 모델로 라우팅

#### Claude를 위한 지침을 만들 수 없는 문제

frontmatter `description`은 Claude가 subagent에 위임할 때를 결정하는 데 사용된다. Claude에 대한 지침서인 것.

아쉽게도 `description`에 "subagent의 결과를 가공하지 말고 전달해줘" 같은 지시를 내릴 수 없다.
subagent의 문서에 특정 형태의 출력을 요구하면 subagent는 그 형태로 출력하지만, Claude는 subagent의 출력을 그대로 전달하지 않고, 자신의 방식으로 가공해 버린다.

아마도, Claude에게 매번 "subagent의 결과를 가공하지 말고 전달해줘"라고 지시해야 하는 듯.
이런 사용 방법이 필요한 경우 Subagent 문서 하나만으로 해결되지 않는 점은 아쉽다.

### Agent teams

병렬 세션 운용 기능. 메인 세션에서 하위 세션을 추가로 생성한다.
각 세션의 에이전트를 팀원(teammate)이라고 부르고, 팀으로 묶어서 관리한다.
subagent는 단발성으로 작업을 끝나면 종료되지만, 팀원은 지속적으로 세션이 유지되며, 상호 소통할 수 있다.

https://code.claude.com/docs/en/agent-teams

![Claude code team example](./res/claude-team-example.png)

2026년 3월 기준 실험적 기능으로, 2.1.32 버전 이상에서 별도로 설정을 활성화해야 한다.

시작하는 방법은 Code에게 팀을 만들라 지시하기만 하면 된다.
팀원 구성 정보를 알려주면, 알아서 팀 구성 정보를 `~/.claude/teams`에 저장하고, 각 세션을 시작한다.
예시의 이미지는 3개의 프로젝트에 각 팀원을 배정한 모습이다.

> each teammate gets its own pane. You can see everyone’s output at once and click into a pane to interact directly. Requires tmux, or iTerm2.

tmux를 사용중이면 현재 창을 분할하여 세션이 각각의 창에서 실행되도록 자동화되어 있다.

팀원, 메인 에이전트, 사용자는 상호 간에 자유롭게 대화할 수 있다.
사용자는 각 팀원 세션에서 직접 대화하거나, 메인 세션에서 `@teammate_name`으로 팀원과 대화할 수 있다.

작업 명령은 보통 메인 세션에서 내려서, 메인 에이전트가 팀원에게 전달하는 방식으로 진행된다.
직접해도 좋지만, 메인과 정보 공유가 되면 상호 검증이 가능해서 원할한 협업이 가능하다.

권한 승인은 팀원 -> 메인 세션을 통해 승인한다.
팀원 세션에서 직접 허락할 수 없었다.
버그인지, MCP 권한은 팀원 세션에서 메인 세션에서 승인을 기다린다는 팝업만 뜨고, 메인 세션에서는 진행할 수 없었다.

에이전트 간에 끝말잇기를 시켜보았다.

![Claude code team plays a word game](./res/claude-team-word-game.png)

메인 에이전트가 강제로 참여 시키고, 팀원 에이전트간 대화하는 모습. 그리고 끝내기 제안까지.

#### 권한

- 팀원마다 권한 승인이 발생한다. 여러개의 팀원이 있으면 다수 승인 요청으로 매우 피로하므로 아래 항목을 참고하자.
- 팀원은 메인 세션의 권한을 그대로 상속받는다.
    - 따라서 복잡하게 생각할 필요 없이 메인의 권한만 해결하면 된다.
- 팀원이 작업해야 하는 경로가 다르면 전역 설정의 영향을 받지 않는다(허용 목록과 별개로 승인 필요).
    - 이를 해결하기 위해서, 하위 경로에 메인과 팀원의 작업 경로를 두는 방법이 있다.
    - 메인 세션을 `--dangerously-skip-permissions`로 실행하면 팀원도 권한 승인이 필요 없어지지만, 위험해 보인다.

#### 특징

- 다른 팀원의 응답으로 액션이 시작될 수 있다. 이를 이용하면 메인 세션에게 "팀원의 A 작업이 끝나면, B 작업을 시작시켜"라고 예약할 수 있다.
- tmux로 창을 분할하지 않는다면, 각 창으로 이동해야 한다. 아래 방향키를 통해 각 작업자 창으로 이동할 수 있다.
