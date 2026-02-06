---
created: 2025-04-17
---
# Model Context Protocol(MCP)

[Anthropic에서 발표](https://www.anthropic.com/news/model-context-protocol)한 AI 모델과 AI가 사용하는 도구를 연결하는 프로토콜.
AI 도구의 연동 방식이 난립함에 따라 이를 정리하기 위해 고안되었으며, 2024년 11월에 공개되었다.

MCP 이전에는 Ollama, Phidata와 같은 AI 툴킷에서 function-calling, tool-calling 등 다양한 이름으로 유사한 도구 연동 방식을 시도했다.

개발 도구 환경을 표준화한 [Language Server Protocol](/docs/wiki/language-server-protocol.md)와 유사한데,
실제로 영감을 받았다고 한다:

> MCP takes some inspiration from the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), which standardizes how to add support for programming languages across a whole ecosystem of development tools.

프로토콜의 사양은 [modelcontextprotocol.io](https://modelcontextprotocol.io/specification)에서 관리한다.
AI가 사용할 수 있는 도구를 정의한 MCP 서버, 사용자와 대면하는 Host, Host에서 서버와 통신하는 Client가 JSON-RPC 2.0 메시지로 통신한다.

MCP를 사용하기 위해서, MCP를 지원하는 Client와 미리 구현된 MCP 서버가 필요하다. \
Client는 VSCode, IntelliJ(2025.1 부터), Claude Desktop 등이 지원한다. \
로컬 실행 파일 또는 원격 서버 URL 중 선택한다.
MCP 서버는 [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)에 다양한 구현체가 등록되어 있다.

VSCode에서 [playwright-mcp](/docs/wiki/playwright.md#playwright-mcp)를 사용하는 예시로,
Copilot Chat을 통해 [Playwright](/docs/wiki/playwright.md)를 실행, 대화를 통해서 브라우저를 조작할 수 있다.
예를 들어 "브라우저를 열고 네이버에서 조선호텔 연락처를 검색해서 알려줘"라던가 "AI 기초 레벨을 다루는 아티클 5개만 탭으로 열어놔줘" 같은 명령을 내릴 수 있다.

클라이언트가 받을 수 있는 응답 크기 제한을 주의해야 한다.
내 경우는 OpenAPI Specification 문서를 불러왔다가, 응답 크기 제한에 걸려서 실패했다.
그래서 이를 API 별로 잘라서 도구를 구현해야 했다.
문제는 이러면 도구 호출 승인의 횟수가 늘어나서, 승인해야 하는 피로도로 사용자 경험이 떨어진다.

MCP 서버를 구현하다 보면 AI가 언제 호출해야 할지 유도하지 못하는 상황에 맞닥뜨린다.
`tools/list`로 도구 목록은 불러오지만, 제공하는 도구가 적재 적소에 사용되도록 안내하기는 어렵다.
그래서 의도적인 호출을 유도하기 위해서 "XX 도구로 YY 작업을 수행해줘"라는 식으로 부자연스러운 흐름을 만든다.
이런 문제를 의식했는지, Anthropic은 [Claude Skills](#claude-skills)를 제안한다.

## 서비스별 도구 호출 제한

하나의 요청에서 도구 사용 제한이 있는 것으로 보인다.
JetBrains나 VSCode + GitHub Copilot Chat 모두에서 발생한 현상인데,
URL 40개 각각에 대해 MCP를 사용하라고 요청하면, 실제로는 5개 정도만 사용하고 나머지는 무시된다.
JetBrains AI Chat은 6번째에 도구 사용 횟수에 제한이 있다고 말하며 응답을 종료하고, Copilot Chat은 도구 사용하지 않고 확인했다며 환각을 보인다.
모델은 모두 Claude 3.7 Sonnet을 사용했다.

아래는 JetBrains AI의 응답 일부:

> 네, 남은 엔드포인트들에 대한 Datadog 트레이스 검색을 진행하기 위한 URL 목록을 준비했습니다. 도구 호출 제한으로 인해 모든 URL을 직접 브라우저에서 열지는 못하지만, 각 API 엔드포인트에 대한 Datadog 검색 URL을, 라인마다 하나씩 제공해드리겠습니다.

## MCP Client

MCP 서버는 누구나 제공할 수 있지만, 반면에 클라이언트는 그렇지 않다.
AI 도구 제공자가 MCP 클라이언트를 제공하는 것이 일반적이다.

25년 6월 기준, ChatGPT는 MCP를 지원하지 않는다.
반면에 프로토콜을 고안한 Anthropic의 Claude Desktop은 MCP 클라이언트를 제공한다.

[Claude Code](/docs/wiki/machine-learning.md#claude-code)는 셸 환경에서 동작해서 더 많은 도구를 사용할 수 있다.

## 프로토콜

### initialize

프로토콜은 JSON-RPC 2.0 메시지로 통신한다.

[initialize](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle#initialization)는 MCP 서버와 클라이언트가 처음 연결할 때 호출한다.
이 단계에서는 프로토콜 버전과 기능 등을 서버와 클라이언트가 협상하는 단계이다.

클라이언트 요청 예시:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
    }
  }
}
```

서버는 다음과 같이 응답한다:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": {}
    },
    "serverInfo": {
      "name": "simple-mcp-server",
      "version": "1.0.0"
    }
  }
}
```

### notifications/initialized

성공적으로 초기화가 완료되면, 클라이언트는 `notifications/initialized`를 호출한다.

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/initialized"
}
```

이 단계가 완료되기 전에는 ping, 로깅 등 다른 요청을 하지 말아야 한다.

### tools/list

[tools/list](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#protocol-messages)는 서버가 제공하는 도구 목록을 요청한다.

요청 예시:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
}
```

응답 예시:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "hello",
        "description": "Returns a hello message",
        "inputSchema": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name to greet (optional)"
            }
          }
        }
      }
    ]
  }
}
```

### resources/list

리소스는 파일, 스키마 등 서버가 클라이언트에 공유하는 데이터이다.
각 리소스는 고유한 식별자(URI)를 가진다.

https://modelcontextprotocol.io/specification/2025-06-18/server/resources#listing-resources

## MCP Inspector

MCP 그룹에서 공식 제공하는 디버깅 및 개발 도구.

- Repo: https://github.com/modelcontextprotocol/inspector
- Introduction: https://modelcontextprotocol.io/docs/tools/inspector

```bash
npx @modelcontextprotocol/inspector <command> <args>
```

서버 시작 명령어를 함께 넘겨주거나, `npx @modelcontextprotocol/inspector`로 실행하면 MCP Inspector가 시작된다.
로컬 환경에서 서버가 시작되면, 웹 브라우저에서 서버를 테스트할 수 있다. 일종의 Web UI 기반 MCP 클라이언트인 셈.

## Claude Desktop Extension

Claude Desktop에서 설정에 진입하면 확장 프로그램을 관리할 수 있다.
사실상 MCP 서버를 쉽게 추가할 수 있도록 도와주는 기능이다.

MCP 서버 개발자가 `.dxt` 파일을 만들어서 배포하면, 사용자는 이 파일을 확장 프로그램에 드래그 앤 드롭으로 설치할 수 있다.

`.dxt` 파일은 MCP 서버의 코드(의존성 포함)와 manifest를 포함하는 압축 파일이다.

[anthropics/dxt](https://github.com/anthropics/dxt)는 DXT 파일을 쉽게 만들 수 있는 도구이다.
`dxt init`으로 manifest를 생성하고, `dxt pack`으로 `.dxt` 파일을 생성한다.
별도 빌드 프로세스는 없으므로, 개발 의존성을 제외한 상태에서 `dxt pack`을 실행하자.

2025-07-23, 클라이언트가 MCP 서버를 제대로 호출하지 못하는 문제가 발생했다.
[Reddit 에서도 같은 문제를 겪는 사용자들](https://www.reddit.com/r/ClaudeAI/comments/1m6zckh/local_mcp_servers_just_stopped_working/)이 많다.
도구 호출 자체는 정상적이나, `arguments`를 전달하지 않는 문제다. 사용자의 승인 창에서는 전달한다고 보여주지만, 실제로는 전달하지 않는다.
실행되지 않는 것과 별개로, 사용자가 보는 입력과 실제 입력이 다른 것은 문제가 될 여지가 있다. \
이 이슈는 [Anthropic의 Status 페이지](https://status.anthropic.com/incidents/1874wdtlmhwt)에 기록되어 있다.

## Claude Skills

Anthropic이 제안하는 AI 클라이언트의 기술 확장 방식.

https://code.claude.com/docs/en/skills

Anthropic은 [Claude Skills 구축을 위한 완벽 가이드](https://news.hada.io/topic?id=26328)라는 [pdf 문서를 배포](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)했다.

> MCP가 “무엇을 할 수 있는지”를 제공한다면, Skills는 “어떻게 해야 하는지”를 고정하는 역할

### 불러오는 방식

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
