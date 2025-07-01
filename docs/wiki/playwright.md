# Playwright

웹 자동화 및 테스트 도구.
Chromium, Firefox, WebKit의 Headless 브라우저를 지원한다.

- https://playwright.dev/
- https://github.com/microsoft/playwright

## Playwright MCP

Playwright [MCP](/docs/wiki/machine-learning.md#model-context-protocolmcp) 서버.

https://github.com/microsoft/playwright-mcp

MCP Server Configuration:

```json
{
  "name": "playwright",
  "command": "npx",
  "args": [
    "@playwright/mcp@latest"
  ]
}
```

브라우저 탭을 열고 URL로 이동, 스냅샷을 찍고 화면을 분석하거나, 페이지를 저장할 수 있는 도구를 제공한다.

VSCode + GitHub Copilot Chat으로 시도해본 결과 잘 동작했다.
Claude 3.7 Sonnet이 가장 잘 동작했다.
예를들어 "인공 지능 기초 레벨을 다루는 아티클을 검색하고 5개 정도 탭 열어놔줘"라고 했을 때 잘 수행했다.
반면에 GPT-4o는 탭 하나만 연다던지 도구 여러개를 잘 사용하지 못하는 경우가 있었다.
