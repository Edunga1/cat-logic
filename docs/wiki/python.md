# Python

<!--toc:start-->
- [Python](#python)
- [개발도구](#개발도구)
  - [pyright](#pyright)
    - [pyright 설치](#pyright-설치)
    - [`pyrightconfig.json`로 설정관리](#pyrightconfigjson로-설정관리)
      - [타입 힌트를 사용하지 않으려면](#타입-힌트를-사용하지-않으려면)
  - [pylint](#pylint)
  - [Django Stubs](#django-stubs)
  - [mypy](#mypy)
  - [python code formatter: autopep8 vs black vs yapf](#python-code-formatter-autopep8-vs-black-vs-yapf)
- [Python mock](#python-mock)
  - [Decorator를 사용한 mocking.](#decorator를-사용한-mocking)
  - [`@patch('requests.get')`](#patchrequestsget)
  - [`@patch.object(mymodule, 'requests')`](#patchobjectmymodule-requests)
  - [`@patch.object(mymodule, 'requests', new=MyRequests)`](#patchobjectmymodule-requests-newmyrequests)
  - [`@patch.object(mymodule, 'method', return_value=None)`](#patchobjectmymodule-method-returnvaluenone)
- [Package manager](#package-manager)
  - [pipenv](#pipenv)
- [Packaging](#packaging)
  - [`__all__`](#all)
<!--toc:end-->

# 개발도구

vim 기본 설정으로는 텍스트에디터 역할밖에 못한다.

최소한 pyright는 사용하자.

nvim-lspconfig, null-ls 이용하여 다음과 같이 설정, 사용하고 있다.

```lua
-- vim 설정 파일의 일부분
server = require 'lspconfig'.pyright,
sources = {
    null_ls.builtins.diagnostics.pylint,
    null_ls.builtins.diagnostics.mypy.with {
        extra_args = { '--ignore-missing-imports' }
    },
    null_ls.builtins.formatting.autopep8,
    null_ls.builtins.formatting.isort,
},
```

## pyright

https://github.com/microsoft/pyright

[language server](language-server-protocol.md) for python.

### pyright 설치

* nvim-lspconfig은 `Mason`을 사용하자: `:MasonInstall pyright`
* [coc-nvim](https://github.com/fannheyward/coc-pyright): `:CocInstall coc-pyright`

### `pyrightconfig.json`로 설정관리

프로젝트 root에 `pyrightconfig.json`을 생성한다.

#### 타입 힌트를 사용하지 않으려면

```json
{
  "reportGeneralTypeIssues": false
}
```

타입 명세하지 않는 프로젝트의 경우 무수한 에러 메시지가 출력된다. disable 하는 편이 낫다.

## pylint

https://github.com/PyCQA/pylint
정적 분석 도구.

## Django Stubs

https://github.com/typeddjango/django-stubs

django는 `objects` 등 마법을 사용해서 타입 제공을 제대로 받을 수 없다.
pylint, pyright도 type을 알 수 없기 때문에 런타임에서 문제가 없지만 정적분석 시에는 에러로 취급한다.

djang-stubs는 django와 관련된 타입 정보를 제공한다.

## mypy

https://github.com/python/mypy

> Optional static typing for Python

정적 타입 검사 도구.

타입 명세를 할 수 없는 경우에는 `Need type annotation for "variable"` 에러 메시지를 막기 위해 `my.ini` 생성하고 다음과 같이 설정하자:

```
[mypy]

# disable error 'Need type annotation for "variable"'
disallow_untyped_defs = False
```

## python code formatter: autopep8 vs black vs yapf

파이썬 코드 formatter 3종 비교.

[coc.nvim](https://github.com/neoclide/coc.nvim)에서는 파이썬 파일을 열 때 3개 중 하나를 선택하도록 한다:

```sh
Formatter autopep8 is not installed. Install?:
1. Yes
2. Use black
3. Use yapf
```

[Blog: A comparison of autopep8, black, and yapf - Code formatters for Python](https://www.reddit.com/r/Python/comments/8oqy03/blog_a_comparison_of_autopep8_black_and_yapf_code/.md)\
3개를 비교한 다른 글. 덧글에는 black을 사용하고 만족했다나.

| name                                           | stars | description                      |
|------------------------------------------------|-------|----------------------------------|
| [autopep8](https://github.com/hhatto/autopep8) | 4.3k  | pep8 스타일 사용. 가장 많은 커밋 |
| [black](https://github.com/psf/black)          | 31.2k | 가장 많은 star                   |
| [yapf](https://github.com/google/yapf)         | 13k   | 구글이 maintainer                |

**실제 사용 비교**

비교 대상 코드
```python
{
  "refundDeposit": self.refund_deposit and _deposit_to_dict(self.refund_deposit)
}
```

**black**
```python
{
  "refundDeposit": self.refund_deposit
  and _deposit_to_dict(self.refund_deposit)
}
```

이게 맞나?

**yapf**
```python
{
  "refundDeposit":
  self.refund_deposit and _deposit_to_dict(self.refund_deposit)
}
```

이게 맞나?2

**autopep8**
코드를 변경하지 않는다.

개인적으로는 black, yapf의 스타일이 별로라서 autopep8을 사용하고 있다.

# Python mock

https://docs.python.org/3/library/unittest.mock.html

설치: `pip install mock`

## Decorator를 사용한 mocking.

```python
from mock import patch
import mymodule


class Mytest(unittest.TestCase):
  @patch.object(mymodule, 'method')
  def test_normal(self):
    pass
```

테스트는 주로 클래스로 하나의 테스트 슈트를 구성하고,
Mocking은 각 테스트(method)에 `@patch.object`나 `@patch` decorator를 주로 사용하고 있다.

`requests` 모듈을 mocking 한다고 가정하자.

## `@patch('requests.get')`

어디서든 `requests.get()` 사용한다면, mock 객체를 반환한다.
간단한 방법이지만, `mymodule`에서 `requests`를 사용함을 암시적으로 보여준다.

## `@patch.object(mymodule, 'requests')`

`mymodule` 내에서만 `requests`를 사용한다는 점을 명시적으로 표현한다.
개인적으로 이 방법을 더 많이 사용한다.

`requests` 자체가 mock 객체이기 때문에, `requests`의 `get`, `post` 등 모든 함수들이
mock 객체가 된다.

`get` 응답을 대체하고 싶으면, 테스트 안에서, 넘어오는 mock 객체를 변경해야 한다:

```python
class Mytest(unittest.TestCase):
  @patch.object(mymodule, 'requests')
  def test_normal(self, mock_requests):
    mock_requests.get.return_value = None
```

테스트 내에서만 mocking 정보를 명시하기 때문에, 다른 테스트에서 재사용할 수 없다.

## `@patch.object(mymodule, 'requests', new=MyRequests)`

`requests`가 `MyRequests`로 대체된다.

```python
class MyRequests(object):
  @staticmethod
  def get(*args, **kwargs):
    res = Mock()
    res.headers = {
      'content-type': 'text/html'
    }
    return res
```

위와 같은 방법으로 `get` 함수만 내가 원하는 응답을 내려주게 하고,
`post` 등 다른 함수는 기본 mock 객체를 내려준다.

mocking 정보를 다른 테스트에서도 재사용할 수 있어서 유용하다.

## `@patch.object(mymodule, 'method', return_value=None)`

`mymodule.method()` 반환값을 `None`으로 대체한다.


# Package manager

파이썬의 패키지 매니저인 pip는 파이썬 설치 시 함께 제공된다.
그러나 다른 언어의 패키지 매니저와 비교해 보면 안좋다.

`pip install PACKAGE_NAME`로 설치하고 `pip freeze > requirements.txt`로
의존 모듈 목록을 저장하는데, 의존성의 의존성까지 저장하게 된다.
Django만 설치했는데, Django가 사용하는 다른 패키지도 포함된다.

개발과 프로덕션 환경 관리도 애매하다. `pip freeze > requirements-dev.txt` 처럼
수동으로 관리해야 하는데, 프로덕션만 업데이트 하려고 해도 이미 개발 환경의 모듈이
포함되어 있다.

아무튼, 간단하지만 그만큼 이런저런 불편함이 있는 기본 도구다.

## pipenv

https://github.com/pypa/pipenv

이런 불편함을 알았는지 환경 분리도 가능하고, lock 파일도 별도로 관리할 수 있는
[pipenv](https://github.com/pypa/pipenv)가 있다. `pyenv`와 좀 헷갈린다.

[python.org](https://www.python.org/)에서도 가상 `pipenv`를 이용하여 가상환경 사용을 추천하고 있다:
>For software that is not distributed with (or developed for) your system, we recommend using a virtual environment, possibly with an environment manager like conda or pipenv, to help avoid disrupting your system Python installation.

link: https://packaging.python.org/guides/tool-recommendations/

설치가 좀 애매한데, OSX는 Homebrew로 쉽게 설치가능해 보인다.

ubuntu 14.04에서는 다른 선택지가 없어서 `pip install`로 설치해봤는데 `2018.11.26` 버전이 설치됐다.
구버전 같아 보이는데 아직 제대로 사용해보지 않아서, 최적화된 버전 일지도 모르겠다.

Dockerize 하는데 이슈가 있다. 빌드 할 때 pipenv를 결국 설치해야 하는데, 로직을 돌리는데 불필요한 존재기 때문이다.
그래서 multi-stage build를 하는 것이 필요하다. 빌드 스테이지에서 pipenv를 설치하고, pipenv를 이용하여 requirements.txt를 생성하고,
requirements.txt를 가지고 실행 스테이지에서 의존 모듈을 설치한다. 그러면 프로덕션 레벨에서 pipenv를 감출 수 있다.


# Packaging

## `__all__`

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
