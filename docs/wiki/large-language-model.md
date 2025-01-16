---
created: 2024-02-29
---
# Large Language Model

인공 신경망으로 구성된 언어 모델을 말한다.

## AI Assistant 제작 도구

로컬 환경에서 LLM을 사용할 수 있도록 도와주는 도구들이 있다.

GPT-4는 너무 비싸다.
특히 한글은 토큰화하면 영어보다 더 많은 분량이 나온다.
그래서 비용이 더 많이 들고, 더 적은 내용만 API의 입력으로 전달된다.

그래도 공개 LLM보다 ChatGPT 같은 상용 LLM의 품질이 훨씬 좋다.
특히 한글 지원에서 성능차이가 크게 나타난다.

phidata와 ollama는 function calling을 지원한다.
자연어 응답 대신, 함수 호출하는 응답을 만드는 기능이다.
API를 호출하거나 사용자가 만든 함수를 사용할 수 있으면 더 정확한 답변을 만들어 낼 수 있다.

### Phidata

[Phidata](/docs/wiki/phidata.md)는 AI Assistant를 만드는 도구다.

### Ollama

[Ollama](/docs/wiki/ollama.md)는 AI Assistant를 만들거나 모델을 실행하는 도구다.

### Spring AI

[Spring AI](/docs/wiki/spring-framework.md#spring-ai) 문서 참조.

Spring Boot는 OpenAI, Ollama 등 AI 플랫폼을 쉽게 연동할 수 있게 해준다.
[Spring 프레임워크](/docs/wiki/spring-framework.md)에 익숙하면 좋은 선택으로 보인다.

다만 2024년 7월 1.0.0 SNAPSHOT 단계여서 운영 레벨에서 사용하기에는 무리가 있다.
