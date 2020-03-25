---
id: cdb84bc5774128fd013bbe84b82475f4
time: 2020-02-10 17:12:30
tags: python
---
# Python

## Package manager

파이썬의 패키지 매니저인 pip는 파이썬 설치 시 함께 제공된다.
그러나 다른 언어의 패키지 매니저와 비교해 보면 안좋다.

`pip install PACKAGE_NAME`로 설치하고 `pip freeze > requirements.txt`로
의존 모듈 목록을 저장하는데, 의존성의 의존성까지 저장하게 된다.
Django만 설치했는데, Django가 사용하는 다른 패키지도 포함된다.

개발과 프로덕션 환경 관리도 애매하다. `pip freeze > requirements-dev.txt` 처럼
수동으로 관리해야 하는데, 프로덕션만 업데이트 하려고 해도 이미 개발 환경의 모듈이
포함되어 있다.

아무튼, 간단하지만 그만큼 이런저런 불편함이 있는 기본 도구다.

### [pipenv](https://github.com/pypa/pipenv)

이런 불편함을 알았는지 환경 분리도 가능하고, lock 파일도 별도로 관리할 수 있는
[pipenv](https://github.com/pypa/pipenv)가 있다. `pyenv`와 좀 헷갈린다.

[python.org](https://www.python.org/)에서도 추천하고 있다.

link: https://packaging.python.org/guides/tool-recommendations/

설치가 좀 애매한데, OSX는 Homebrew로 쉽게 설치가능해 보인다.

ubuntu 14.04에서는 다른 선택지가 없어서 `pip install`로 설치해봤는데 `2018.11.26` 버전이 설치됐다.
구버전 같아 보이는데 아직 제대로 사용해보지 않아서, 최적화된 버전 일지도 모르겠다.


## Packaging

### `__all__`

`my_module.py`라는 파일이 있다고 하자:

```python
__all__ = ['foo', 'Bar']


def foo():
  pass

 
class Bar:
  pass


_baz = 1
```

파일 최상단에 `__all__`을 사용한다고 `my_module.py`을 임포트 했을 때 `_baz`에 접근하지 못하게 할 수는 없다.

`from my_module import _baz`

하지만 `__all__`을 사용하면 `__init__.py`를 사용했을 때 효과가 있다.

```
my_module/
  __init__.py
  my_module.py
```

위 구조로 만들어 두고 `__init__.py`에서 `my_module.py`를 asterisk를 이용하여 임포트한다:


```python
from my_module.my_module import *  # NOQA
```

flake8이 경고를 출력하므로 `# NOQA`로 무시하도록 했다.

이렇게하면 `my_module`을 사용하는 곳에선 `foo`, `bar`만 가져올 수 있다.

```python
from my_module import foo, bar  # 가능
from my_module import _baz  # 불가능
```
