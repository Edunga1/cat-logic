---
created: 2025-04-17
---
# Model Context Protocol(MCP)

2024년 11월에 [Anthropic에서 발표](https://www.anthropic.com/news/model-context-protocol)한 AI 모델과 AI가 사용하는 도구를 연결하는 프로토콜.
AI도구가 많아지면서 난립하는 연동 방식을 정리하기 위해 고안되었다.

프로토콜이 고안되기 이전에는 function-calling, tool-calling 등 다양한 이름으로 ollama, phidata 등 AI toolkit에서 제공했다.

개발 환경 세계를 통일한 [Language Server Protocol](/docs/wiki/language-server-protocol.md)와 유사한데,
실제로 영감을 받았다고 한다:

> MCP takes some inspiration from the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), which standardizes how to add support for programming languages across a whole ecosystem of development tools.

프로토콜의 사양은 [modelcontextprotocol.io](https://modelcontextprotocol.io/specification)에서 관리한다.
AI가 사용할 수 있는 도구를 정의한 MCP 서버, 사용자와 대면하는 Host, Host에서 서버와 통신하는 Client가 JSON-RPC 2.0 메시지로 통신한다.

사용자 입장에서 선택할 것은, MCP Client를 제공하는 Host와 MCP 서버이다.
Client는 VSCode, IntelliJ(2025.1 부터) 등이 지원한다.
MCP 서버는 [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)에 정리되어 있다.

VSCode에서 [playwright-mcp](/docs/wiki/playwright.md#playwright-mcp)를 사용하는 예시로,
Copilot Chat을 통해 [Playwright](/docs/wiki/playwright.md)를 실행, 대화를 통해서 브라우저를 조작할 수 있다.
예를들어 "브라우저를 열고 네이버에서 조선호텔 연락처를 검색해서 알려줘"라던가 "AI 기초 레벨을 다루는 아티클 5개만 탭으로 열어놔줘"같은 명령을 내릴 수 있다.

다만 한 응답에서 도구 사용 제한이 있는 것으로 보인다. JetBrains나 VSCode + GitHub Copilot Chat 모두에서 발생한 현상인데,
URL 40개를 던져주고 확인하고 보고하라고 하면, 5개 정도만 확인하고 나머지는 어떻게든 무시한다.
JetBrains AI는 6번째에 도구 사용 횟수에 제한이 있다고 말하며 응답을 종료하고, Copilot Chat은 도구 사용하지 않고 확인했다며 환각을 보인다.
모델은 모두 Claude 3.7 Sonnet을 사용했다.

아래는 JetBrains AI의 응답 일부:

> 네, 남은 엔드포인트들에 대한 Datadog 트레이스 검색을 진행하기 위한 URL 목록을 준비했습니다. 도구 호출 제한으로 인해 모든 URL을 직접 브라우저에서 열지는 못하지만, 각 API 엔드포인트에 대한 Datadog 검색 URL을, 라인마다 하나씩 제공해드리겠습니다.

## MCP Client

MCP 서버는 누구나 제공할 수 있지만, 반면에 클라이언트는 그렇지 않다.
AI 도구 제공자가 MCP 클라이언트를 제공하는 것이 일반적이다.

25년 6월 기준, ChatGPT는 MCP를 지원하지 않는다.
반면에 프로토콜을 고안한 Anthropic의 Claude Desktop은 MCP 클라이언트를 제공한다.

[Claude Code](#claude-code)는 셸 환경에서 동작해서 더 많은 도구를 사용할 수 있다.

## 프로토콜

Claude Desktop으로 서버를 구현하면서 정리한 내용.

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

## MCP Inspector

MCP 그룹에서 공식 제공하는 디버깅 및 개발 도구.

- Repo: https://modelcontextprotocol.io/docs/tools/inspector
- Introduction: https://github.com/modelcontextprotocol/inspector

```bash
npx @modelcontextprotocol/inspector <command> <args>
```

서버 시작 명령어를 함께 넘겨주거나, `npx @modelcontextprotocol/inspector`로 실행하면 MCP Inspector가 시작된다.
로컬 환경에서 서버가 시작되면, 웹 브라우저에서 서버를 테스트할 수 있다. 일종의 Web UI 기반 MCP 클라이언트인 셈.
