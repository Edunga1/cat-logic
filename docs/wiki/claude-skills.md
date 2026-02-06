---
created: 2026-02-06
---
# Claude Skills

Anthropic이 제안하는 AI 클라이언트의 기술 확장 방식.

https://code.claude.com/docs/en/skills

Anthropic은 [Claude Skills 구축을 위한 완벽 가이드](https://news.hada.io/topic?id=26328)라는 [pdf 문서를 배포](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)했다.

> MCP가 “무엇을 할 수 있는지”를 제공한다면, Skills는 “어떻게 해야 하는지”를 고정하는 역할

## Skill 불러오기 단계

요약하면 Frontmatter -> SKILL.md 본문 -> 추가 파일 순으로 불러온다.

> * **First level (YAML frontmatter)**: Always loaded in Claude's system prompt. Provides just enough information for Claude to know when each skill should be used without loading all of it into context.

Skill이 MCP 보다 잘 트리거되는 이유는 시작 시 로드되는 YAML frontmatter 덕분인 것으로 보인다.
Frontmatter에는 Skill의 전체 정보의 요약본과 함께 언제 사용하는지에 대한 힌트를 포함한다.

기능만 명세하는 MCP와 달리, Skills는 AI를 위한 지침서 역할을 가진다.

> * **Second level (SKILL.md body)**: Loaded when Claude thinks the skill is relevant to the current task. Contains the full instructions and guidance.
> * **Third level (Linked files)**: Additional files bundled within the skill directory that Claude can choose to navigate and discover only as needed. This progressive disclosure minimizes token usage while maintaining specialized expertise

Frontmatter의 정보만으로 AI가 Skill을 결정하면, 참고를 위해서 SKILL.md 본문을 불러온다.
필요에 따라 추가 파일도 불러온다.
이런 분리 구조는 토큰 사용량을 최소화하면서도 전문 지식 유지를 돕는다.

## 연관 문서

- [2024-11-26 Anthropic, Model Context Protocol 오픈소스로 공개](https://news.hada.io/topic?id=17951)
- [2025-06-29 MCP: (우연한) 범용 플러그인 시스템 (worksonmymachine.substack.com)](https://news.hada.io/topic?id=21706)
    - MCP를 AI 도구의 프로토콜로 제한하는 것이 아니라, 범용 플러그인 시스템으로 확장할 수 있는 가능성을 제시한다.
