# Playwright

웹 자동화 및 테스트 도구.
Chromium, Firefox, WebKit의 Headless 브라우저를 지원한다.

- https://playwright.dev/
- https://github.com/microsoft/playwright

## Playwright MCP

Playwright [MCP](/docs/wiki/model-context-protocol.md) 서버.
MCP 프로토콜을 통해 브라우저를 열고, URL로 이동, 스냅샷을 찍고 화면을 분석하거나, 페이지를 저장 등을 제어한다.

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


VSCode + GitHub Copilot Chat으로 시도해본 결과 잘 동작했다.
Claude 3.7 Sonnet이 가장 잘 동작했다.
예를 들어 "인공 지능 기초 레벨을 다루는 아티클을 검색하고 5개 정도 탭으로 열어줘"라고 했을 때 잘 수행했다.
반면에 GPT-4o는 탭 하나만 연다든지 도구를 여러 개 잘 사용하지 못하는 경우가 있었다.

Google의 Captcha를 통과를 시도했으나, 실패했다.
이미지 분석은 실패했고, 오디오는 처리하지 못한다.
