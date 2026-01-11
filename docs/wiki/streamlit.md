---
created: 2025-08-05
---
# Streamlit

Streamlit은 파이썬 웹 프레임워크이다.
간단한 페이지의 프로토타이핑이 필요하다면 Streamlit이 제격이다.

https://github.com/streamlit/streamlit

`pip install streamlit`으로 설치하고, 아래와 같이 간단한 파이썬 코드를 작성한다:

```python
import streamlit as st

st.title(f"Hello Streamlit-er 👋")
st.markdown(
    """
    This is a playground for you to try Streamlit and have fun.

    **There's :rainbow[so much] you can build!**

    We prepared a few examples for you to get started. Just
    click on the buttons above and discover what you can do
    with Streamlit.
    """
)

name = st.text_input("What's your name?")

if name:
    st.write(f"Hello, {name}! 👋")
    st.balloons()
```

`streamlit` 명령을 통해 실행한다:

```bash
streamlit run app.py
```

text input에 입력하면 입력한 이름을 화면에 출력하고, 풍선을 띄운다.

어떤 원리로 사용자 인터랙션을 처리하는지 이해되지 않았는데,
파이썬 코드를 다시 실행되면서 화면을 업데이트한다.
지연이 있는 실행이 있는 경우 어떻게 처리하는지 좀 더 알아봐야 겠다.

코드의 `:rainbow[]`와 같이 streamlit에서 제공하는 별도 문법이 있다.
이외에도 위젯, 레이아웃, 차트 등을 제공한다.
저장소에서 소개 `A faster way to build and share data apps.` 하는 것처럼 Data 앱을 만드는데 특화되어 있다.

https://docs.streamlit.io/develop/api-reference \
개발 문서가 잘 되어 있다.
Streamlit에는 HTML과는 다른 고유한 컴포넌트가 많은데, 이를 한 눈에 볼 수 있도록 큐레이션했다.

## 예제

https://github.com/Edunga1/gemini-file-search-start

[Gemini API File Search](/docs/wiki/machine-learning.md#gemini-api-file-search)를 구현한 예제.
파일 스토어를 불러와서 테이블로 보여주고, 하나를 선택하면 업로드한 문서를 목록화한다.
파일을 드래그 앤 드롭으로 업로드할 수 있다.
업로드한 파일에 대해서 쿼리하는 것이 Gemioni API File Search의 핵심 기능이다.
테이블, 파일 업로더 등 모든 컴포넌트는 Streamlit가 지원한다.
