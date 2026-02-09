---
created: 2026-02-09
---
# Anthropic

## Claude Code

Anthropic에서 제공하는 에이전트 코딩 **명령줄 도구**.

https://code.claude.com/docs/en/overview

- 2025년 3월 기준 프리뷰 단계에 있다. 프리뷰 단계지만 무료 기간이 없다.
- 2025년 6월 4일, Pro 플랜에 포함되었다.
- 2025년 8월, [Team 플랜](https://www.reddit.com/r/Anthropic/comments/1mvvha9/claude_code_now_on_teams_plan/)에 포함되었다.
  다만 Premium Seat를 추가 구매해야 하는데 가격이 $150이고, 최소 5개 Seat를 구매해야 한다.
- 2026년 1월 16일, [Team 플랜에 Claude Code가 기본 포함되도록 변경](https://www.linkedin.com/posts/claude_claude-code-is-now-included-with-every-team-activity-7418022583620505600-Vjm9)되었다. Premium Seat 구매가 필요없다.

[레딧 BEWARE CALUDE CODE IS NOT FREE 글](https://www.reddit.com/r/ClaudeAI/comments/1ixi2rg/beware_claude_code_is_not_free/)을 보면
쿼리 2~3개에 $5 사용되었다고. 덧글에도 비슷한 경험을 한 사람들이 있다.
비용이 적은 사람도 있는 걸 보면, 코드베이스의 크기에 따라 달라지는 것으로 추정.

플랫폼이 터미널 기반이고, [MCP](/docs/wiki/model-context-protocol.md) 클라이언트이기 때문에 아주 광범위한 작업을 처리할 수 있다.
IDE에서 동작하는 다른 AI 도구와는 다르게, 명령줄 도구를 이용할 수 있다는 것이 큰 장점이다. 대부분의 OS 작업을 처리할 수 있다는 의미가 된다.

macOS는 `brew install claude-code`로 설치하자, cask로 제공되기 때문.
NPM `npm i @anthropic-ai/claude-code`로도 설치할 수 있지만, native installer를 사용하라는 안내가 뜬다.

기존 프로젝트라면 `/init` 명령어로 분석 후 시작하자.
`CLAUDE.md`를 생성하여 프로젝트 개요와 주요 파일을 기록한다.
`CLAUDE.md`는 copilot 또한 참조할 수 있다.
요즘은 `AGENTS.md`로 에이전트 벤더에 종속되지 않는 것이 추세인 듯.
[codex는 AGENTS.md 파일을 참조한다](https://developers.openai.com/codex/guides/agents-md/).

이미지 분석 가능하다.
Web URL을 제공하면 Fetch하여 분석할 수 없지만, 로컬 파일을 제공하면 분석할 수 있다.
[Playwright](/docs/wiki/playwright.md) MCP 등으로 연동하여 분석할 수 있을 듯.


