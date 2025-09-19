---
created: 2024-02-29
---
# Large Language Model

인공 신경망으로 구성된 대규모 언어 모델을 말한다.

## Open Models

### gpt-oss

OpenAI의 오픈 소스 모델.
[2025년 8월 5일](https://openai.com/index/introducing-gpt-oss/)에 공개하였다.

파라미터 수에 따라 20b, 120b 모델이 있다.

Hugging Face [openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b)에 공개하였다.

[Ollama](https://ollama.com/library/gpt-oss)로 사용할 수 있다.

```bash
ollama pull gpt-oss:20b
ollama run gpt-oss:20b
```

b20 기준으로도 파인튜닝 하지 않은 모델 그대로 사용해도 한국어 답변을 잘한다.
다른 오픈 모델은 한자나 다른 외국어가 섞여있는 경우가 있었다.

웹 브라우징, 정의된 스키마에 맞춘 함수 호출, 브라우저 작업 같은 에이전트 작업을 [잘 한다고](https://huggingface.co/openai/gpt-oss-20b#tool-use) 한다.

[agno](/docs/wiki/phidata.md)로 function calling을 요청하면 잘 사용한다!
문제는 input context 크기가 작아서 웹페이지의 응답을 처리할 수 없는 점.
많은 모델을 사용하진 않았지만 로컬 모델에서 function calling을 처리하는 모델은 gpt-oss가 처음이다.

### Wan 2.2

Alibaba에서 공개한 영상 생성 오픈 모델이다.

https://huggingface.co/Wan-AI/models?search=wan2.2

파라미터 수에 따라 5b, 14b가 있고 Text-to-Video, Image-to-Vieo, Text-and-Image-to-Video 모델이 있다.

[ComfyUI](/docs/wiki/machine-learning.md#comfyui)에서 쉽게 사용할 수 있다.

## AI Assistant 제작 도구

로컬 환경에서 LLM을 사용할 수 있도록 도와주는 도구들이 있다.

GPT-4는 너무 비싸다.
특히 한글은 토큰화하면 영어보다 더 많은 분량이 나온다.
그래서 비용이 더 많이 들고, 더 적은 내용만 API의 입력으로 전달된다.

그래도 공개 LLM보다 ChatGPT 같은 상용 LLM의 품질이 훨씬 좋다.
특히 한글 지원에서 품질 차이가 크게 나타난다.

phidata와 ollama는 'function calling' 기능으로 답변의 품질을 개선한다.
AI가 함수 호출을 통해 답변을 생성하는 기능이다.

### Phidata

[Phidata](/docs/wiki/phidata.md)는 AI Assistant를 만드는 도구로 function calling 기능을 제공한다.

### Ollama

[Ollama](/docs/wiki/ollama.md)는 AI Assistant를 만들거나 모델을 실행하는 도구다.
tool-calling 이름으로 function calling 기능을 제공한다.

### Spring AI

[Spring AI](/docs/wiki/spring-framework.md#spring-ai) 문서 참조.

Spring Boot는 OpenAI, Ollama 등 AI 플랫폼을 쉽게 연동할 수 있게 해준다.
[Spring 프레임워크](/docs/wiki/spring-framework.md)에 익숙하면 좋은 선택으로 보인다.

다만 2024년 7월 1.0.0 SNAPSHOT 단계여서 운영 레벨에서 사용하기에는 무리가 있다.

## GitHub spec-kit

GitHub에서 공개한 Spec-Driven Development 도구.
스펙을 명세하고 AI 에이전트를 통해서 개발하는 툴킷이다.
즉 바이브 코딩 용.

https://github.com/github/spec-kit

툴킷 자체에서 AI를 지원하는 것이 아니라, gemini cli나 claude code 등 도구에 기능을 추가한다.
claude, gemini, copilot 등 다양한 에이전트 도구를 지원한다.
copilot은 별도 cli용 챗복 도구가 없기 때문에 VSCode에서 사용해야 한다.
확장성 측면에서 아쉬운 부분.
