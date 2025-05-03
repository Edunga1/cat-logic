# Google Analytics

## Google Analytics 수동 테스트하는데 활성화 사용자가 0으로 뜨는 현상. 트래픽 쫓아가기.

https://stackoverflow.com/q/27945501

GA를 심은 페이지에 접속했는데도 활성화 사용자가 0으로 뜬다. 내부 트래픽 설정하지도 않았다.

크롬 네트워크탭을 보니 http status가 `307`(internal redirect) 뜬다.

질문자처럼 파폭 접속해보니 활성화 사용자가 1로 변경된다.

답변자 말대로 `chrome://net-internals/#events` 에서 `analytics.js` `URL_REQUEST` 찾아보니, 확장프로그램이 가로챔 확인.

확장프로그램 탭에서 찾아보니 ublock이 가로채고 있었다. 광고만 막는게 아니라 GA 트래픽도 막는 것으로 보인다.
