---
created: 2024-02-29
---
# Large Language Model

인공 신경망으로 구성된 언어 모델을 말한다.

## LLM 도구

로컬 환경에서 LLM을 사용해 보자.

GPT-4는 너무 비싸더라. 한글은 쿼리하기 위해서 토큰화하면 분량이 영어보다 더 많다. 그래서 비용이 더 많이 들고, 더 적은 내용만 API로 전달할 수 있다.

공개 LLM보다 상용 LLM의 품질이 훨씬 좋다. 특히 한글 지원에서 크게 차이가 난다.

### Phidata

phidata는 AI Assistant를 만드는 toolkit이다.
특히 function calling을 추가할 수 있어서, 더 똑똑한 assistant를 만들 수 있다.

https://github.com/phidatahq/phidata

AI가 사용할 수 있는 도구(function call)을 제공하고 사용자가 프롬프트로 요청하면, AI가 도구를 사용하여 답변을 생성한다.
도구로는 웹 검색, 파이썬, DB가 있다.

OPENAI_API_KEY 없이도 사용할 수 있다.
실제 동작은 phidata의 API를 사용하여 phidata는 OpenAI의 ChatGPT-4 Turbo를 사용한다. 그래서 무료로 시도해볼 수 있다.
다만 2024-02-22, 사용량이 너무 많아서 막았다. 무료로 사용하게 뒀던 것이 대단한데, 아마 조만간 영구히 막을 것 같다.

OPENAI_API_KEY를 제공하면 해당 Key가 사용된다.
두 번 사용한 후 OpenAI에서 사용량을 확인해보니 $0.10 사용되었다. 한글로 사용해서 그런지 비싸다.

AI에게 도구를 쥐어주는 컨셉은 ChatGPT-4의 동작 원리와 비슷해 보인다.
ChatGPT-4의 프롬프트 유출 내용을 보면, browser와 dalle, python 등의 도구에 대한 사용법을 알려주었다.

---

다음은 Phidata에서 소개하는 간단한 예제이다.\
지금은 OpenAI API 키가 없으면 실행할 수 없다.

poetry를 사용하고 있어서 `pyproject.toml`를 작성한다.

```toml
[tool.poetry]
name = "phidata-start"
version = "0.1.0"
description = ""
authors = []

[tool.poetry.dependencies]
python = "3.10.8"
phidata = "^2.3.41"
openai = "^1.12.0"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

`poetry shell`로 가상 환경을 만들고, `poetry install`로 의존성을 설치한다.
`phidata`와 `openai` 단 두개만 설치하면 된다.

이제 스크립트를 작성하자 `assistant.py`:

```python
from phi.assistant import Assistant

assistant = Assistant(description="You help people with their health and fitness goals.")
assistant.print_response("Share a quick healthy breakfast recipe.", markdown=True)
```

실행하면 OpenAI GPT-4 turbo 모델로 쿼리하여 응답을 받는다:

```shell
phidata-start-G7rAPLlM-py3.10 ❯ python assistant.py
╭──────────┬───────────────────────────────────────────────────────────╮
│ Message  │ Share a quick healthy breakfast recipe.                   │
├──────────┼───────────────────────────────────────────────────────────┤
│ Response │ Certainly! Here's a simple and healthy breakfast recipe   │
│ (26.2s)  │ for an Avocado Toast with Poached Egg:                    │
│          │                                                           │
│          │                       Ingredients:                        │
│          │                                                           │
│          │  • 1 slice of whole-grain bread                           │
│          │  • 1/2 ripe avocado                                       │
│          │  • 1 egg                                                  │
│          │  • Salt and pepper, to taste                              │
│          │  • Red pepper flakes (optional)                           │
│          │  • A few leaves of fresh spinach or arugula (optional)    │
│          │  • A splash of vinegar (for poaching the egg)             │
│          │                                                           │
│          │                       Instructions:                       │
│          │                                                           │
│          │  1 Toast the Bread                                        │
│          │     • Begin by toasting your whole-grain bread to your    │
│          │       preferred level of crispiness.                      │
│          │  2 Poach the Egg                                          │
│          │     • Fill a pot with about 3 inches of water, add a      │
│          │       splash of vinegar, and bring to a light simmer.     │
│          │     • Crack the egg into a small bowl or cup.             │
│          │     • Create a gentle whirlpool in the pot by stirring    │
│          │       with a spoon.                                       │
│          │     • Carefully slide the egg into the center of the      │
│          │       whirlpool. The swirling water will help the egg     │
│          │       white wrap around the yolk.                         │
│          │     • Let it cook for about 3-4 minutes for a soft poach, │
│          │       or longer if you prefer a firmer yolk.              │
│          │     • Use a slotted spoon to remove the egg from the      │
│          │       water and set aside to drain on a kitchen towel.    │
│          │  3 Mash the Avocado                                       │
│          │     • While the egg is poaching, slice the avocado in     │
│          │       half, remove the pit, scoop out the flesh, and mash │
│          │       it with a fork.                                     │
│          │     • Spread the mashed avocado onto your toasted bread.  │
│          │     • Season with salt, pepper, and red pepper flakes if  │
│          │       desired.                                            │
│          │  4 Assemble the Avocado Toast                             │
│          │     • Place the poached egg on top of the mashed avocado. │
│          │     • Add a handful of fresh spinach or arugula on the    │
│          │       side for extra greens.                              │
│          │     • Adjust seasoning to your taste.                     │
│          │  5 Serve                                                  │
│          │     • Serve immediately and enjoy your healthy and        │
│          │       filling breakfast!                                  │
│          │                                                           │
│          │ This breakfast provides you with a good balance of        │
│          │ protein, healthy fats, and whole grains to start your day │
│          │ with energy.                                              │
╰──────────┴───────────────────────────────────────────────────────────╯
```

다음은 duckduckgo를 이용해 AI가 검색하는 예시다.
모델에게 함수를 사용하도록 지시하고, 함수 결과를 종합하여 답변하는 구조다.

`duckduckgo-search` 모듈이 필요하다: `poetry add duckduckgo-search`

```python
from phi.assistant import Assistant
from phi.tools.duckduckgo import DuckDuckGo


assistant = Assistant(tools=[DuckDuckGo()], show_tools_calls=True)
assistant.print_response("한국어로, poetry 사용법에 대해서 조사해 주세요.", markdown=True)
```

결과는 다음과 같다:

```shell
phidata-start-G7rAPLlM-py3.10 ❯ python assistant.py
╭──────────┬───────────────────────────────────────────────────────────╮
│ Message  │ 한국어로, poetry 사용법에 대해서 조사해 주세요.           │
├──────────┼───────────────────────────────────────────────────────────┤
│ Response │ 죄송합니다, 제가 잘못된 정보를 얻어왔습니다. poetry에     │
│ (49.4s)  │ 대한 사용법 조사를 다시 시도하겠습니다. 조금만            │
│          │ 기다려주십시오.죄송합니다, 결과가 부정확합니다. 다시      │
│          │ 시도하겠습니다.죄송합니다, 제가 드린 정보가 poetry의      │
│          │ 사용법과 관련이 없었습니다. 해당 도구에 대한 정보를 찾기  │
│          │ 위해 다시 시도하겠습니다.Poetry는 파이썬 프로젝트를 위한  │
│          │ 의존성 관리 및 패키징을 용이하게 하는 도구입니다. 여기  … │
│          │ 가지 참고할 수 있는 자료입니다:                           │
│          │                                                           │
│          │  1 Poetry - Python dependency management and packaging    │
│          │    made easy: Poetry의 공식 웹사이트에서는 Python         │
│          │    패키징과 의존성 관리를 간편하게 만들어주며, 프로젝트 … │
│          │    결정적인 방법으로 관리할 수 있는 모든 도구를           │
│          │    제공합니다.                                            │
│          │  2 Dependency Management With Python Poetry - Real        │
│          │    Python: Real Python 웹사이트에서 제공하는 튜토리얼로   │
│          │    Python 프로젝트에 필요한 외부 패키지를 지정, 설치 및   │
│          │    해결하는 방법에 대해 배울 수 있습니다.                 │
│          │  3 Poetry: Python packaging and dependency management     │
│          │    made easy: GitHub의 Poetry 저장소 페이지에서는 Python  │
│          │    프로젝트의 의존성을 선언, 관리 및 설치하는 데 도움을   │
│          │    주며, 기존의 setup.py, requirements.txt 등을           │
│          │    pyproject.toml 기반 프로젝트 형식으로 대체합니다.      │
│          │  4 How to Use Poetry to Install Python Packages and       │
│          │    Manage Dependencies: Data to Fish 웹사이트에서는       │
│          │    pyproject.toml 파일에 패키지를 추가하고 관리하는       │
│          │    방법을 단계별로 안내합니다.                            │
│          │  5 Python Poetry: Package and venv Management Made Easy:  │
│          │    Python Land에서는 Poetry가 가상 환경 관리와 Python     │
│          │    패키지 설치, 의존성 관리에서 어떻게 편리한 도구인지를  │
│          │    설명합니다.                                            │
│          │                                                           │
│          │ 위의 자료들을 통해 Poetry에 대해 충분한 정보를 얻을 수    │
│          │ 있을 것입니다.                                            │
╰──────────┴───────────────────────────────────────────────────────────╯
```

정보를 찾기위한 AI의 고뇌가 돋보인다.

#### 나만의 도구 만들기

Phidata는 내가 만든 함수를 사용할 수 있도록 도와준다.

간단한 예제로 웹페이지의 HTML을 가져오는 도구를 만들어보자.

`assistant.py`의 코드는 다음과 같다:

```python
from phi.assistant import Assistant
from requests import get

def get_html(url: str):
    """Get the HTML of a webpage.

    Args:
        url (str): The URL of the webpage.

    Returns:
        str: The HTML of the webpage.
    """
    return get(url).text


assistant = Assistant(tools=[get_html], show_tools_calls=True)
assistant.print_response("`https://news.hada.io/topic?id=13436` 사이트의 내용을 3줄 요약해 주세요.", markdown=True)
```

`tools=`에 함수를 제공하면 되는데, docstring을 잘 작성하면 AI가 알아서 사용한다.

다음은 사용 결과:

```shell
phidata-start-G7rAPLlM-py3.10 ❯ python assistant.py
╭──────────┬───────────────────────────────────────────────────────────╮
│          │ `https://news.hada.io/topic?id=13436` 사이트의 내용을 3 … │
│ Message  │ 요약해 주세요.                                            │
├──────────┼───────────────────────────────────────────────────────────┤
│ Response │                                                           │
│ (12.1s)  │  1 phidata는 인간처럼 문제를 해결하기 위해 LLM(Large      │
│          │    Language Model)을 이용하여 함수를 호출하고, 그 응답을  │
│          │    바탕으로 다음 단계를 지능적으로 선택하여 작업을        │
│          │    수행하는 AI 비서를 만드는 도구입니다.                  │
│          │  2 이 툴킷을 사용하기 위해, 사용자는 Assistant를          │
│          │    생성하고, Tools(Functions), Knowledge(VectorDB),       │
│          │    Storage(DB)를 추가해야 합니다.                         │
│          │  3 이 툴킷은 Streamlit, FastAPI, Django와 같은            │
│          │    프레임워크를 이용해 서빙함으로써 AI 애플리케이션을     │
│          │    구축할 수 있도록 지원합니다.                           │
╰──────────┴───────────────────────────────────────────────────────────╯
```

프롬프트를 개선하면 다양한 결과를 얻을 수 있다.

```python
message = f"""
`${url}` 사이트의 내용을 요약해주세요.

horizontal line으로 총 4개 구역을 나눠주세요.

첫 번째 구역은 본문 내용을 10줄 이내로 요약해주세요.
두 번째 구역은 리액션이 많은 덧글을 최대 3개까지 원문 그대로 포함해주세요.
세 번째 구역은 모든 덧글을 요약해 주세요. 원문은 포함하지 않아도 됩니다.
마지막 구역은 URL에서 다음 시퀀스 정보를 찾아서 다음 글을 매우 간략하게 요약해주고, URL을 함께 포함해주세요.
"""
```

이렇게 프롬프트를 작성하면, 본문을 위해 도구를 한 번 사용하고 다음 글을 요약하기 위해 도구를 한 번 더 사용한다.

---

여기있는 코드도 copilot과 함께 작성하다보니, 내가 직접 짠 코드는 거의 없다.\
인공지능의 발전이 새삼 대단하다고 느낀다.

이 예제코드는 내 저장소에 올려두었다:\
https://github.com/Edunga1/practice-phidata

#### 로컬 LLM 사용하기

Ollama를 사용해서 로컬 LLM을 쉽게 띄우고, phidata로 도구를 쥐어주는 것이 아이디어다.

```python
import sys
from phi.llm.ollama.chat import Ollama

from phi.tools.toolkit import Toolkit
from phi.assistant.assistant import Assistant
from requests import get


class WebpageVisitor(Toolkit):
    def get_html(self, url: str):
        """Get the HTML of a webpage.

        Args:
            url (str): The URL of the webpage.

        Returns:
            str: The HTML of the webpage.
        """
        print(f"============== Visiting {url}")
        return get(url).text


url = sys.argv[1]
message = f"""
Please summarize the contents of the site: {url}.

Use `get_html` to get the HTML of the webpage.

If the body content contains another link, visit it. And repeat this process up to five times.

List all the links you visited in a bullet list.
"""

assistant = Assistant(
    run_id="webpage_summarizer",
    tools=[WebpageVisitor()],
    llm=Ollama(model="llama2", host="localhost:11434"),
)
assistant.print_response(message, markdown=True)
```

모델은 `llama2`를 사용했다. 기존처럼 `get_html` 함수를 사용해서 제공하면 이상하게도 오류가 난다.
`Toolkit`을 구현하면 오류가 나지 않는다.

Ollama는 docker로 띄우고 host로 제공했다.

문제는 도구를 전혀 사용(function calling)하지 않는다. URL 자체를 기반한 답변을 하는데, 당연히 제대로된 답변을 못한다.
아마도 모델 성능 문제인 거 같다. GPT-4의 경우에도 프롬프트의 해석에 따라서 도구를 사용하는 빈도가 달라졌기 때문.

[오픈소스 모델을 지원하는지?](https://github.com/phidatahq/phidata/issues/121#issuecomment-1963098829) 질문에
기여자의 답변 내용을 보면, GPT-4 말고는 function calling을 제대로 사용할 수 없다고 한다:

> But only GPT4 can do function calling reliably. local/oss models are great for completion therefore most of the examples you'll see with OSS models will be of RAG

---

OpenAI의 `GPT-3.5-turbo`도 잘 동작한다.

```python
def get_html(url: str):
    """Get the HTML of a webpage.

    Args:
        url (str): The URL of the webpage.

    Returns:
        str: The HTML of the webpage.
    """
    print(f"Fetching HTML from {url}...")
    return get(url).text


url = sys.argv[1]
message = f"""
{url} 사이트의 내용을 요약해주세요. 다른 링크는 방문하지 마세요.

horizontal line으로 총 3개 구역을 나눠주세요.

첫 번째 구역은 본문 내용을 10줄 이내로 요약해주세요.
두 번째 구역은 리액션이 많은 덧글을 최대 3개까지 원문 그대로 포함해주세요.
마지막 구역은 모든 덧글을 요약해 주세요. 원문은 포함하지 않아도 됩니다.
"""


assistant = Assistant(
    tools=[get_html],
    llm=OpenAIChat(
        model="gpt-3.5-turbo-0125",
        max_tokens=4096,
        temperature=0.9,
    )
)
assistant.print_response(message, markdown=True)
```

`다른 링크는 방문하지 마세요.`라는 조건을 추가하지 않으면 엉뚱한 링크를 추가 방문하려고 한다.
그러다 보니 토큰 초과로 실패하는 문제가 있었다. `GPT-3.5-turbo-0125`의 최대 토큰은 `16,385`.

다음은 응답 결과이다:

```bash
$ python assistant.py https://news.hada.io/topic\?id\=13464
Fetching HTML from https://news.hada.io/topic?id=13464...
╭──────────┬──────────────────────────────────────────────────────────────────────╮
│          │                                                                      │
│          │ https://news.hada.io/topic?id=13464 사이트의 내용을 요약해주세요.    │
│          │ 다른 링크는 방문하지 마세요.                                         │
│          │                                                                      │
│          │ horizontal line으로 총 3개 구역을 나눠주세요.                        │
│          │                                                                      │
│          │ 첫 번째 구역은 본문 내용을 10줄 이내로 요약해주세요.                 │
│          │ 두 번째 구역은 리액션이 많은 덧글을 최대 3개까지 원문 그대로         │
│          │ 포함해주세요.                                                        │
│          │ 마지막 구역은 모든 덧글을 요약해 주세요. 원문은 포함하지 않아도      │
│          │ 됩니다.                                                              │
│ Message  │                                                                      │
├──────────┼──────────────────────────────────────────────────────────────────────┤
│ Response │ ──────────────────────────────────────────────────────────────────── │
│ (12.7s)  │                                                                      │
│          │                                 요약                                 │
│          │                                                                      │
│          │                              본문 내용                               │
│          │                                                                      │
│          │  • 개발자 생산성 측정 시 흔히 저지르는 실수는 '근무 시간'과 같은     │
│          │    투입물에 의존하는 것이며, 이는 잘못된 행동을 유발할 수 있음.      │
│          │  • 기업 문화가 화면 앞 시간을 가치 있게 여기고 보상한다면, 개발자는  │
│          │    시간을 너무 많이 쏟게 되어 작업 품질을 보장하기 어려워짐.         │
│          │  • 더 엄한 환경에서는 '일찍 출근하고 늦게 퇴근하는' 경쟁이 생김.     │
│          │                                                                      │
│          │ ──────────────────────────────────────────────────────────────────── │
│          │                                                                      │
│          │                             리액션 덧글                              │
│          │                                                                      │
│          │  1 *******                                                           │
│          │     • "아찔하네요. 매니저의 관점과 실무자의 관점이 차이가 있을 것    │
│          │       같아요,,"                                                      │
│          │  2 ********                                                          │
│          │     • "딱 llm이 필요한 부분인듯해요"                                 │
│          │  3 ********                                                          │
│          │     • "저는 최근에는 이런 글에 대해서 좀 비판적으로 보는 것이        │
│          │       사람들이 결국 이러한 글을 보고 내리는 결론이 아무 관리도       │
│          │       안하는 것을 선택하는 것이라고 생각합니다."                     │
│          │                                                                      │
│          │ ──────────────────────────────────────────────────────────────────── │
│          │                                                                      │
│          │                            전체 덧글 요약                            │
│          │                                                                      │
│          │  • 덧글들은 경영자와 실무자 사이의 관점 차이, 필요한 부분에 대한     │
│          │    언급, 글의 비판적 시각 등 다양한 의견이 포함되어 있습니다.        │
╰──────────┴──────────────────────────────────────────────────────────────────────╯
```

`GPT-3.5-turbo-0125`로 2번 성공, 2번 토큰 초과 실패하여 든 비용은 $0.02.
GPT-4와 비교하면 훨씬 저렴하기도 하지만, 사용 토큰 제한량에서 크게 차이가 나서 많이 사용할 수 없는 구조다.

나중에 앱을 고도화 한다면 이 토큰 차이로 인해서 품질이 달라질 수도 있겠다.

### Ollama

ollama는 LLM을 로컬에서 쉽게 사용할 수 있게 만든 도구다.

https://github.com/ollama/ollama

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

로컬 LLM으로 [phidata](https://github.com/phidatahq/phidata)를 시작하는 것이 내 목표.

