---
created: 2024-08-25
---
# Ollama

Ollama는 LLM을 로컬에서 쉽게 사용할 수 있게 만든 도구다.

https://github.com/ollama/ollama

cli와 [python](/docs/wiki/python.md) 라이브러리를 제공한다.
간단한 모델 테스트 정도는 cli로 확인하고, Ollama로 AI Assistant를 만드는 용도로 라이브러리를 사용하면 된다.

1. [ollama](https://github.com/ollama/ollama) binary
  1. cli 클라이언트와 서버를 제공
  2. `114343` 포트로 http 서버 제공
  3. cli, rest api로 서버 제어 및 모델 다운로드, 실행 가능
2. [ollama-python](https://github.com/ollama/ollama) 라이브러리
  1. Python으로 Ollama를 사용하는 라이브러리

## Docker로 Ollama 시작하기

모델 저장소를 제공하여, 유명한 모델이나 다른 사람이 커스텀한 모델을 쉽게 다운받아 사용할 수 있다.
[홈페이지](https://ollama.com/)에서 검색할 수 있다.

실행은 Docker로 하자:

```bash
$ docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

GPU를 사용할 수 있지만 나는 WSL2 환경에서 실행하지 못하고 있다:

```bash
$ docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

백그라운드로 실행해 두고, [shell](./shell.md)에서 실행해보자:

```bash
$ docker exec -ti ollama ollama run llama2
pulling manifest
pulling 8934d96d3f08... 100% ▕█████████████████████████████████████████████████████▏ 3.8 GB
pulling 8c17c2ebb0ea... 100% ▕█████████████████████████████████████████████████████▏ 7.0 KB
pulling 7c23fb36d801... 100% ▕█████████████████████████████████████████████████████▏ 4.8 KB
pulling 2e0493f67d0c... 100% ▕█████████████████████████████████████████████████████▏   59 B
pulling fa304d675061... 100% ▕█████████████████████████████████████████████████████▏   91 B
pulling 42ba7f8a01dd... 100% ▕█████████████████████████████████████████████████████▏  557 B
verifying sha256 digest
writing manifest
removing any unused layers
success
>>> hi?
Hello! It's nice to meet you. Is there something I can help you with or would you like to chat?
```

`ollama run <LLM>`으로만 실행해도 모델 다운로드 후 바로 대화할 수 있다.

## Ollama tool-calling

2024년 7월 26일, [0.3.0 버전](https://github.com/ollama/ollama/releases/tag/v0.3.0)을 출시하면서 tool-calling 기능이 추가되었다.
[phidata](/docs/wiki/large-language-model.md#phidata)의 tools 기능과 같은 기능이다.
phidata는 python 함수의 docstring을 명세하면 프롬프트에 자동으로 추가해 주는 반면에,
ollama는 tool 정보를 따로 명세해야 한다.

사용자가 정의한 함수를 AI 모델에 알려주면, AI가 자연어로 된 답변 대신 함수 호출을 위한 규격화된 정보를 응답한다.
즉, 함수를 Ollama가 호출해 주는 것은 아니고, 함수(도구) 이름과 인자를 응답에 포함시키는 것이다.
이 정보를 이용해 함수를 호출하는 프로세스를 구현하고, 그 결과를 다시 AI에 전달하여 최종 답변을 얻는다.

[MCP](/docs/wiki/model-context-protocol.md)가 표준이 되면서 tool-calling의 관심이 개인적으로 줄었다.

공식 문서는 파이썬 예제는 다음과 같다.
날씨를 가져오는 도구를 정의하고, 토론토의 날씨를 물어보는 예제다.
도구를 직접 실행하지 않으므로 구현은 필요하지 않다.

```python
import ollama

response = ollama.chat(
    model='llama3.1',
    messages=[{'role': 'user', 'content':
        'What is the weather in Toronto?'}],

    # provide a weather checking tool to the model
    tools=[{
      'type': 'function',
      'function': {
        'name': 'get_current_weather',
        'description': 'Get the current weather for a city',
        'parameters': {
          'type': 'object',
          'properties': {
            'city': {
              'type': 'string',
              'description': 'The name of the city',
            },
          },
          'required': ['city'],
        },
      },
    },
  ],
)

print(response['message'])
```

위 코드를 실행하면 응답과 함께 도구 호출 정보를 일련의 양식으로 응답한다.

```python
{
  'role': 'assistant',
  'content': '',
  'tool_calls': [
    {
      'function': {
        'name': 'get_current_weather',
        'arguments': {
          'city': 'Toronto',
        },
      },
    },
  ],
}
```

위 양식으로 함수를 실행하는 것은 사용자가 구현한다.
[파이썬으로 작성된 공식 예제](https://github.com/ollama/ollama-python/blob/33c4b61ff99bb79133d6965bf40120eda2428efa/examples/tools/main.py)가 있으니 참고하자.
함수 호출까지 구현하는 것이 번거로워 보이지만, 모듈화를 잘 해두면 편리하게 사용할 수 있을 거 같다.
특이한 점은, 도구 사용 응답인 경우 챗 응답은 비어있다.
그래서 함수 반환값을 `role=tool`로 설정하고, `이전 프롬프트` + `이전 응답` + `함수 반환값`를 다시 AI에 전달하여 최종 응답을 얻는 프로세스로 되어있다.
컨텍스트를 유지하기 위한 방식인 모양이다.

[설명에 따르면](https://ollama.com/blog/tool-support), 특정 모델만 지원한다.
Ollama 공식 홈페이지의 [모델 목록](https://ollama.com/search?c=tools)에서 `tools` 카테고리를 확인하면 된다.

---

도커로 위 예제를 실행할 환경을 구축하려면.

1. ollama 실행: `docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama`
2. Llama 3.1 모델 다운로드: `docker exec -ti ollama ollama run llama3.1`
3. Ollama python dependency 설치: `pip install ollama`

### tool-calling 예제

공식 예제를 참고하여, 웹 페이지를 요약하는 도구를 만들어 보았다.

```python
from typing import Sequence

import ollama
import requests


def get(url: str) -> str:
    print('[tool] Making GET request to', url)
    return requests.get(url).text


available_functions = {
    'get': get,
}

messages: Sequence[ollama.Message] = [
    {'role': 'user', 'content': 'Summarize this page: "https://www.reddit.com/r/pathofexile/comments/1exyavx/325_updated_guide_to_recombinators/"'},
]

response = ollama.chat(
    model='llama3.1',
    messages=messages,
    tools=[
        {
            'type': 'function',
            'function': {
                'name': 'get',
                'description': 'Make a GET request to a URL',
                'parameters': {
                    'type': 'object',
                    'properties': {
                        'url': {
                            'type': 'string',
                            'description': 'URL of the webpage to scrape',
                        },
                    },
                    'required': ['url'],
                },
            },
        },
    ],
)

print('[assistant]', response['message'])
messages.append(response['message'])

if response['message'].get('tool_calls'):
    for tool in response['message']['tool_calls']:
        function = available_functions[tool['function']['name']]
        tool_response = function(**tool['function']['arguments'])
        print('[tool] returned:', tool_response[:100])
        print('[tool] return value size:', len(tool_response))
        messages.append({'role': 'tool', 'content': tool_response})

final_response = ollama.chat(model='llama3.1', messages=messages)
print(final_response['message'])
```

중간마다 로그를 찍어서 도구가 호출되는지 확인했다.

URL을 요약해 달라는 요청을 하면, GET 요청을 보내고, 그 결과를 요약해서 응답한다.
문제는 html 태그 등 컨텍스트가 너무 많아서 그런지 요약이 잘 안된다.

```bash
[assistant] {'role': 'assistant', 'content': '', 'tool_calls': [{'function': {'name': 'get', 'arguments': {'url': 'https://www.reddit.com/r/pathofexile/comments/1exyavx/325_updated_guide_to_recombinators/'}}}]}
[tool] Making GET request to https://www.reddit.com/r/pathofexile/comments/1exyavx/325_updated_guide_to_recombinators/
[tool] returned:
    <!DOCTYPE html>
    <html lang="en-US" class="is-shredtop-pdp theme-beta">
      <head prefix="
[tool] return value size: 336690
{'role': 'assistant', 'content': 'This is a HTML code snippet that appears to be a Reddit page, likely generated by the Reddit platform. Here\'s a breakdown of what I can see:\n\n**Header**\n\nThe top section contains various JavaScript files and Faceplate-loader components, which are likely used for loading different parts of the page. The `reddit-header-large` component is also present.\n\n**Main Content**\n\nThe main content area includes a Shreddit app container, which contains various UI components such as:\n\n* A hamburger menu (represented by the `<faceplate-partial name="hamburger-menu" src="/svc/shreddit/hamburger-menu" loading="programmatic">` element)\n* An alert controller (`<alert-controller>` component)\n* A share menu (`<share-menu>` component)\n* An award dialog (`<award-dialog>` component)\n* A comment share menu (`<comment-share-menu>` component)\n* A lead gen dialog (`<lead-gen-dialog>` component)\n\n**Canonical URL and Redirect**\n\nThe page includes a canonical URL updater and a redirect element, which suggests that this page is a redirect to another URL. In this case, it appears to be a redirect to `/r/pathofexile/comments/1exyavx/325_updated_guide_to_recombinators/`.\n\n**Performance Metrics and Navigation Timings**\n\nThe page includes two script elements (`<shreddit-perfmetric-collector>` and `<shreddit-navtimings-collector>`) that are likely used for collecting performance metrics and navigation timings.\n\n**Other Scripts**\n\nThere are also three script elements (`#recaptcha-script`, `#googleid-signin-script`, and `#appleid-signin-script`) that appear to be related to sign-in functionality using Google ID and Apple ID services.\n\nOverall, this code snippet appears to be a Reddit page with various UI components and scripts for loading different parts of the page. If you have any specific questions or would like me to explain further, please let me know!'}
```

텍스트 요약이 아니라, HTML 요약이 되었다.
