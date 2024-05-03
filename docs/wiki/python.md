---
created: 2022-11-28
---
# Python

## 개발환경 구성

pyenv, pyenv-virtualenv로 파이썬 가상환경을 관리하자.

```bash
brew install pyenv
brew install pyenv-virtualenv
```

## 개발도구

pyright + pylint + mypy 사용을 권장한다. python2 프로젝트도 타입이나 참조 문제를 잡아준다.
에러가 너무 많다면 설정을 타협하자.

nvim-lspconfig, null-ls 이용하여 다음과 같이 설정, 사용하고 있다.

```lua
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

### pyright

[language server](./language-server-protocol.md) for python.

https://github.com/microsoft/pyright

django 프로젝트라면 [django-types](https://github.com/sbdchd/django-types)를 설치하자.
mypy와 django-stubs처럼 django model의 필드 타입을 제공한다.

```python
class User(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

user = User.objects.get(id=1)
user.age = 10  # should error
```

`age` 필드는 `IntegerField`로 추정하기 때문에 `user.age = 10`에서 타입 문제가 있다고 알려준다.
django-types는 이런 문제를 해결해준다.

django-types는 django-stubs의 fork project이다.

> non-mypy type checkers like pyright will work better with Django.

vim에서는 coc-nvim 또는 nvim-lspconfig를 사용하여 pyright를 설치할 수 있다.

* nvim-lspconfig은 `Mason`을 사용하자: `:MasonInstall pyright`
* [coc-nvim](https://github.com/fannheyward/coc-pyright): `:CocInstall coc-pyright`

### pylint

정적 분석 도구.

https://github.com/PyCQA/pylint

### mypy

https://github.com/python/mypy

정적 타입 검사 도구.

> Optional static typing for Python

타입 명세를 할 수 없는 경우에는 `Need type annotation for "variable"` 에러 메시지를 막기 위해 `my.ini` 생성하고 다음과 같이 설정하자:

```toml
[mypy]

# disable error 'Need type annotation for "variable"'
disallow_untyped_defs = False
```

#### Django Stubs

django는 `objects` 등 마법을 사용해서 타입 제공을 제대로 받을 수 없다.
djang-stubs는 django 매직과 관련된 타입 정보를 제공한다.

https://github.com/typeddjango/django-stubs

### Ruff

rust로 작성된 python linter.

https://github.com/charliermarsh/ruff

Pylint와 비교하여 매우 빠르다. README에 벤치마크가 있는데 Pylint로 > 60s 걸리는 코드베이스가 0.29s 걸린다고 한다.

실제로 Pylint로 1분 6초 걸리는 프로젝트에서 명령어 입력 즉시 결과가 나왔다.

단점은 아직 Pylint보다 많은 기능을 제공하지 않는다.
예를들어 Pylint는 [broad-exception-caught](https://pylint.readthedocs.io/en/latest/user_guide/messages/warning/broad-exception-caught.html)와 [consider-using-f-string](https://pylint.readthedocs.io/en/latest/user_guide/messages/convention/consider-using-f-string.html)을 잡아주지만 Ruff는 그렇지 않다.

아직 많이 사용해보지 않아서 그 차이가 어느정도인지는 잘 모르겠다.
기능은 부족하지만 매우 빠른 장점으로 앞으로 자주 사용할 것 같다.

nvim은 [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim/blob/main/doc/BUILTINS.md#ruff)에서 제공한다. diagnostic, formatter 두 개 소스로 제공한다.
Pylint와 함께 사용해보면 Ruff의 반응이 빨라서 항상 Pylint보다 Ruff의 진단이 먼저 노출된다.

**개발 환경 구성 시 주의해야 한다.**

Ruff 설명대로 rust로 작성되어 있어서 로컬 개발 환경이나, 개발용 Docker 환경 구성을 위해서 Rust 런타임 환경을 구성이 필요할 수 있다.
macOS 기준으로는 별도 도구 없이 설치되었지만, python alpine 이미지 기준으로 설치에 실패한다.

flake8, isort 등에서 [lint rules](https://beta.ruff.rs/docs/rules/)을 가져왔다. 500+개의 규칙이 있다.

isort와 마찬가지로 사용되지 않는 import는 제거한단다. isort가 필요 없을지도.

[Apache Airflow](https://github.com/apache/airflow/blob/main/pyproject.toml#L29),
[FastAPI](https://github.com/tiangolo/fastapi/blob/master/pyproject.toml#L164),
[Hugging Face](https://github.com/huggingface/transformers/blob/main/pyproject.toml#L5),
[Pandas](https://github.com/pandas-dev/pandas/blob/main/pyproject.toml#L194.md)
[SciPy](https://github.com/scipy/scipy/blob/main/pyproject.toml#L121.md)
등 대규모 프로젝트에서 ruff를 사용하고 있다. pylint와 함께 사용하는 곳도 아닌곳도 있다.

> Ruff can be used to replace Flake8 (plus dozens of plugins), isort, pydocstyle, yesqa, eradicate, pyupgrade, and autoflake, all while executing tens or hundreds of times faster than any individual tool.

Flake8, isort 등 도구를 대체할 수 있다고 한다.

### python code formatter: autopep8 vs black vs yapf

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

### 레거시를 위한 설정

pyright, mypy를 타입 명세하지 않는 등 레거시 프로젝트에서 사용하면 무수히 많은 에러 메시지가 출력된다.
disable 하는 편이 차라리 낫다.

파이썬 도구는 `pyrightconfig.json`, `mypy.ini` 등 설정 파일을 사용하거나, 공통 설정 파일인 `pyproject.toml`을 사용한다.

아래는 `pyproject.toml`에 설정한 내용이다:

```toml
[tool.mypy]
python_version = "3.8"
plugins = ["mypy_django_plugin.main"]
disallow_untyped_defs = false


[tool.django-stubs]
django_settings_module = "app.settings"


[tool.pyright]
reportGeneralTypeIssues = true


[tool.pylint.master]
load-plugins = [
  "pylint_django",
]
django-settings-module = "app.settings"
[tool.pylint.messages_control]
disable = [
  "missing-docstring",
  "too-few-public-methods",
  "too-many-instance-attributes",
  "trailing-newlines",
  "too-many-arguments",
  "too-many-public-methods",
  "invalid-name",
  "too-many-locals",
  "too-many-return-statements",
  "too-many-lines",
]
[tool.pylint.format]
max-line-length = 150
```

mypy, pyright, pylint 설정을 모두 `pyproject.toml`에 넣었다.

`reportGeneralTypeIssues = false`는 `Cannot access member "id" for type "UserFactory"   Member "id" is unknown` 같은 에러를 무시한다.
django, factory-boy 등 파이썬 매직을 사용하는 경우 이런 문제가 발생하는데 무시하자. 최신 버전부터는 이런 문제가 없는지 확인하지 않았다.\
타입을 잘 명세하는 경우, `Literal['foo', 'bar']` 와 같이 명세하고 에러를 정적 체크하는 것은 매우 유용한데, 이런 에러도 무시하게 된다.
`cannot access member ~`만 무시하고 `Argument of type "Literal['foo', 'bar']" cannot be assigned to parameter "param_name" of type` 같은 에러는 리포트 받고 싶은데, 아직 방법을 찾지 못했다.\
일단 `true`로 설정하여 번거롭지만 `Cannot access member ~` 에러도 리포트 받도록 했다.

`disallow_untyped_defs`는 mypy에서 타입 명세하지 않으면 에러 메시지를 출력하는 옵션이다. 이것도 무시한다.

pyproject.toml은 최근에서야 대부분 도구가 지원하는 것 같다.
도구 버전이 낮으면 toml 양식을 인식하지 못하는 경우가 있어서 최신 버전인지 확인해야 한다.
도구마다 설정 파일을 각각 관리하기 어려워서 pyproject.toml 하나로 여러 프로젝트에서 사용하고 있다.

## Python mock

https://docs.python.org/3/library/unittest.mock.html

설치: `pip install mock`

### Decorator를 사용한 mocking.

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

### `@patch('requests.get')`

어디서든 `requests.get()` 사용한다면, mock 객체를 반환한다.
간단한 방법이지만, `mymodule`에서 `requests`를 사용함을 암시적으로 보여준다.

### `@patch.object(mymodule, 'requests')`

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

### `@patch.object(mymodule, 'requests', new=MyRequests)`

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

### `@patch.object(mymodule, 'method', return_value=None)`

`mymodule.method()` 반환값을 `None`으로 대체한다.


## Package manager

pipenv를 시범적으로 회사에서 사용하고 있다가, 최근에 개인 프로젝트에 poetry를 사용하고 있다.
결론은 poetry가 조금 더 만족스럽다. `pyproject.toml`과 통합하는 부분에서 마음이 들었다.

`pipenv`나 `poetry` 모두 운영 환경을 위한 dockerizing 시 cli 도구나 가상환경은 필요하지 않기 때문에,
multi-stage build와 virtualenv를 사용하지 않는 프로세스를 구축해야 한다.

### poetry

https://github.com/python-poetry/poetry

pipenv 보다 star가 더 많다. `pyproject.toml`에 의존성이나, 환경 정보를 저장한다.
최근에 조금씩 사용해보고 있다.

`poetry init --python=3.10 -q`로 초기화하면 `pypoject.toml` 파일이 생성된다.
`-q` 옵션이 없으면 너무 많은 정보를 물어봐서 번거롭다.

```toml
[tool.poetry]
name = "myproject"
version = "0.1.0"
description = ""
authors = []

[tool.poetry.dependencies]
python = "^3.10"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

위와같이 만들어 준다.

`poetry shell`을 입력하면 virtualenv으로 진입한다. 없으면 생성한다.

```bash
❯ poetry shell
Creating virtualenv myproject-jPR28GGN-py3.11 in /home/username/.cache/pypoetry/virtualenvs
Spawning shell within /home/username/.cache/pypoetry/virtualenvs/myproject-jPR28GGN-py3.11
```

home에 가상환경 정보를 저장하므로, `pyenv versions`에 노출되지 않아서 괜찮아 보인다.
프로젝트가 많으면 너무 많은 가상환경이 생성되기 때문이다.

`poetry add rx`로 의존 모듈을 추가한다. 알아서 `pyproject.toml`에 추가하고, lock file`poetry.lock`을 업데이트한다.

파이썬의 패키지 매니저인 pip는 파이썬 설치 시 함께 제공된다.
그러나 다른 언어의 패키지 매니저와 비교해 보면 안좋다.

`pip install PACKAGE_NAME`로 설치하고 `pip freeze > requirements.txt`로
의존 모듈 목록을 저장하는데, 의존성의 의존성까지 저장하게 된다.
Django만 설치했는데, Django가 사용하는 다른 패키지도 포함된다.

개발과 프로덕션 환경 관리도 애매하다. `pip freeze > requirements-dev.txt` 처럼
수동으로 관리해야 하는데, 프로덕션만 업데이트 하려고 해도 이미 개발 환경의 모듈이
포함되어 있다.

아무튼, 간단하지만 그만큼 이런저런 불편함이 있는 기본 도구다.

#### 가상 환경 관리하기

`poetry shell`로 가상 환경을 생성할 때, 현재 시스템의 파이썬 버전을 사용하려고 한다.
다만 `pyproject.toml`에 명시한 [semver](https://github.com/npm/node-semver#versions) 범위에 맞지 않으면 실패한다.

pyenv를 사용한다면 맞는 버전을 직접 찾아서 변경해야 하는 것으로 보인다.

> For instance, if your project requires a newer Python than is available with your system, a standard workflow would be:

```bash
pyenv install 3.9.8
pyenv local 3.9.8  # Activate Python 3.9 for the current project
poetry install
```

> poetry 문서 중: https://python-poetry.org/docs/managing-environments/#switching-between-environments

설치한 가상 환경은 `poetry env list`로 확인할 수 있다.
여러개의 가상 환경을 사용할 수 있는 구조라서 목록으로 보여준다.

위 예제에서 `pyenv local`을 사용했는데, `pyenv global`은 전역 설정인 반면에 `pyenv local`은 현재 디렉토리에만 적용된다.
`.python-version` 파일을 생성하는데, pyenv는 이 파일을 읽어서 파이썬 버전을 결정하기 때문이다. 자세한 내용은 `pyenv local --help`를 참고하자.

가상 환경을 삭제하려면 몇 가지 방법이 있다:

- ``rm -rf `poetry env info -p` `` (가상 환경 경로를 찾아서 삭제한다.)
- `poetry env remove 3.7`
- `poetry env remove test-O3eWbxRl-py3.7` (가상 환경 전체 이름이다.)

### pipenv

https://github.com/pypa/pipenv

이런 불편함을 알았는지 환경 분리도 가능하고, lock 파일도 별도로 관리할 수 있는
[pipenv](https://github.com/pypa/pipenv)가 있다. `pyenv`와 좀 헷갈린다.

[python.org](https://www.python.org/)에서도 가상 `pipenv`를 이용하여 가상환경 사용을 추천하고 있다:
>For software that is not distributed with (or developed for) your system, we recommend using a virtual environment, possibly with an environment manager like conda or pipenv, to help avoid disrupting your system Python installation.

link: https://packaging.python.org/guides/tool-recommendations/

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

## 프로젝트 구조

### PyPA에서 프로젝트 구조를 `src/` 레이아웃으로 바꾸다.

PR: https://github.com/pypa/sampleproject/pull/104

PR 내용을 읽어보면 PyCon US 2019에서 src 레이아웃으로 전환하기로 했다고 한다.

PyCon US Packaging Mini-Summit 2019 토론장: [https://discuss.python.org/t/pycon-us-packaging-mini-summit-2019/833](https://discuss.python.org/t/pycon-us-packaging-mini-summit-2019/833)

PyCon Us Packaging Mini-Summit 2019 토픽 추천 토론장: [https://discuss.python.org/t/packaging-mini-summit-pycon-us-2019-topic-suggestions/1534/5](https://discuss.python.org/t/packaging-mini-summit-pycon-us-2019-topic-suggestions/1534/5)

(토픽 추천 토론장에서) 2017년에 올라온 이슈로 인해서 논의하게 되었다 한다:

> Background: This issue is still unresolved, but a lot of people are converting to the src/ layout. The canonical reference for why is Hynek’s post , though I will refrain from at-messaging him because I don’t think he wants to be the poster-boy for src/ layout.

해당 이슈: https://github.com/pypa/packaging.python.org/issues/320

https://hynek.me/articles/testing-packaging 글에서 src 레이아웃을 사용하는 이유를 말해준다고 한다.

[https://github.com/pypa/packaging.python.org/issues/320#issuecomment-495990983](https://github.com/pypa/packaging.python.org/issues/320#issuecomment-495990983)\
덧글에 논의 내용을 올려주었다.\
**싱글 모듈**을 제외한 구조는 src 레이아웃을 따른다고 한다.

> This was discussed at the Packaging Mini Summit ([notes for that](https://docs.google.com/document/d/1Wz2-ECkicJgAmQDxMFivWmU2ZunKvPZ2UfQ59zDGj7g/edit#)). Here's my rough summary from memory + the notes:
>
> - We should use a name for non-src/ layout that isn't negative-tone:
>     - suggestions at the summit: flat / natural / root / simple (please bikeshed elsewhere)
> - Everyone agreed that there are benefits to the `src/` layout and that it should be documented.
> - Final position after discussion:
>     - single module packages should use flat layout.
>         - REPL breaks when using `src/` (you can't `import module`) and we considered this to be an important detail for first-time packagers who only want to share a script.
>     - Anything beyond a single module being packaged, should use the `src/` directory.

[https://github.com/pypa/packaging.python.org/issues/320#issuecomment-496064900](https://github.com/pypa/packaging.python.org/issues/320#issuecomment-496064900)\
싱글 모듈이란 `.py` 파일 하나만 있는 프로젝트가 싱글 모듈이라고 한다.

> A single module = single `.py` file.
>
> requests is not a single module project. It's a package, containing multiple modules. Using terms from [https://packaging.python.org/glossary/](https://packaging.python.org/glossary/).

구글 시트에서 토론 내용에 대해서 정리 해두었다.

[https://docs.google.com/document/d/1Wz2-ECkicJgAmQDxMFivWmU2ZunKvPZ2UfQ59zDGj7g/edit#heading=h.2cgqnlxl8y3e](https://docs.google.com/document/d/1Wz2-ECkicJgAmQDxMFivWmU2ZunKvPZ2UfQ59zDGj7g/edit#heading=h.2cgqnlxl8y3e)

> Currently the "non source" or "flat" layout is documented in the Packaging documentation, specifically the section on Packaging Python Projects. The "src" layout is not documented in the Packaging documentation.

(이전에는 src 레이아웃이 아닌 최상위에 컴포넌트별 폴더를 두었는데) non source 또는 flat 레이아웃이라고 불렀고, 패키징 관련 문서에 설명했다고 한다.

> Key Questions
Should the src layout be documented?
Should it be the default?

논의 주제는 src 레이아웃을 명시할까? 그리고 기본 레이아웃으로 해도 될까?

> Nick's opinion is that the flat case should be the example case as it is the simplest
Donald and others mention that there are problems with the flat layout and for these reasons the beginner guide should use the src layout

몇 가지 문제점이 있기 때문에 시작 가이드에서 src 레이아웃을 사용한다고 주장함

재밌는 점. Non-src 레이아웃에 대해서 뭐라고 부를지 의논했는데 후보 중..

> Flat (least-disliked option)
Root (potentially non-obvious to beginners; potential confusion with, e.g., ‘filesystem root’)
"Bad" (.....)
Non-src (may imply unduly that “src” is preferred)
Natural (may imply unduly that “src” is discouraged)

Bad 레이아웃이 있다 ㅋㅋ

## Object Converter (Serialization & Deserialization)

| Name                             | Nested Structure |
| -------------------------------- | ---------------- |
| Django Form                      | nope             |
| Django REST Framework Serializer | yes              |
| WTForms                          | yes              |
| Marshmallow                      | yes              |

객체를 변환하거나 검증하는 라이브러리 비교.

### Django REST Framework Serializer

https://www.django-rest-framework.org/api-guide/serializers/

Django Form은 HTML Form을 위한 기능이라 REST API의 중첩 구조 등 JSON을 대응하기엔 부족하다.

```python
class UserSerializer(serializers.Serializer):
  email = serializers.EmailField()
  username = serializers.CharField(max_length=100)

class CommentSerializer(serializers.Serializer):
  user = UserSerializer()
  content = serializers.CharField(max_length=200)
  created = serializers.DateTimeField()

serializer = CommentSerializer(data={'user': {'email': 'foobar', 'username': 'doe'}, 'content': 'baz'})
serializer.is_valid()
# False
serializer.errors
# {'user': {'email': ['Enter a valid e-mail address.']}, 'created': ['This field is required.']}
```

### WTForms

https://github.com/wtforms/wtforms

Django Integration인 [WTForms-Django 프로젝트](https://github.com/wtforms/wtforms-django)가 있다.

```python
class LocationForm(Form):
  id = HiddenField('id')
  title = StringField(_l('Title'), [Required()])
  location = CoordinatesField(_l('Coordinates'))

class ProjectForm(Form):
  title = StringField(_l('Title'))
  manager = StringField(_l('Manager'))
  description = StringField(_l('Description'))
  locations = FieldList(FormField(LocationForm), min_entries=1)

document = {
  'title': unicode,
  'description': unicode,
  'manager': unicode,
  'locations': [{
    'id': uuid.UUID,
    'title': unicode,
    'location': {'coordinates':[float], 'text':unicode}
    }],
  }

f = ProjectForm()
f.process(data=document)
f.locations.data
```

- 예제가 모두 HTML Form 기준으로 되어있다. HTML Form을 대응하는 용도인 거 같다.
- cleaned data를 얻을 수 없다. `StringField`에 숫자를 보내면? 숫자가 나옴. 문자열이 아님.
- Form의 인스턴스에 대해서 작업을 함. 코딩 실수 가능성 농후

### Marshmallow

https://github.com/marshmallow-code/marshmallow

Django가 아니라면 이 솔루션이 적절한 듯.

```python
class ArtistSchema(Schema):
    name = fields.Str()

class AlbumSchema(Schema):
    title = fields.Str(required=True)
    release_date = fields.Date()
    artist = fields.Nested(ArtistSchema())

bowie = dict(name="David Bowie")
album = dict(artist=bowie, title="Hunky Dory", release_date=date(1971, 12, 17))

schema = AlbumSchema()
result = schema.dump(album)
pprint(result, indent=2)
# { 'artist': {'name': 'David Bowie'},
#   'release_date': '1971-12-17',
#   'title': 'Hunky Dory'}
```

## Rxpy

Rxpy는 ReactiveX의 파이썬 구현체이다.

`pip install rx`로 설치. `rxpy`가 아니다.

### Rxpy example

https://www.tutorialspoint.com/rxpy/rxpy_concurrency_using_scheduler.htm

위 문서에서 제공하는 예제이다.

다음 코드는 rxpy를 사용하지만 병럴처리를 하지 않는 코드이다.

```python
import random
import time
import rx
from rx import operators as ops
def adding_delay(value):
   time.sleep(random.randint(5, 20) * 0.1)
   return value
# Task 1
rx.of(1,2,3,4,5).pipe(
   ops.map(lambda a: adding_delay(a))
).subscribe(
   lambda s: print("From Task 1: {0}".format(s)),
   lambda e: print(e),
   lambda: print("Task 1 complete")
)
# Task 2
rx.range(1, 5).pipe(
   ops.map(lambda a: adding_delay(a))
).subscribe(
   lambda s: print("From Task 2: {0}".format(s)),
   lambda e: print(e),
   lambda: print("Task 2 complete")
)
input("Press any key to exit\n")
```

rxpy를 사용하더라도 쓰레드를 사용하지 않으면 병렬처리 되지 않는다. 결과를 보면 다음과 같다:

```bash
From Task 1: 1
From Task 1: 2
From Task 1: 3
From Task 1: 4
From Task 1: 5
Task 1 complete
From Task 2: 1
From Task 2: 2
From Task 2: 3
From Task 2: 4
Task 2 complete
```

이 코드는 [CurrentThreadScheduler](https://rxpy.readthedocs.io/en/latest/reference_scheduler.html#rx.scheduler.CurrentThreadScheduler)를 사용하여 처리한다. 즉 하나의 스레드만 쓴다.

**병렬처리 하기**

```python
import multiprocessing
import time
from threading import current_thread

import rx
from rx import operators as ops
from rx.scheduler.threadpoolscheduler import ThreadPoolScheduler

# calculate cpu count, using which will create a ThreadPoolScheduler
thread_count = multiprocessing.cpu_count()
thread_pool_scheduler = ThreadPoolScheduler(thread_count)
print('CPU count is {0}'.format(thread_count))


def asyn(inp):
    return rx.from_callable(
        lambda: adding_delay(inp),
        scheduler=thread_pool_scheduler,
    )


def adding_delay(value):
    time.sleep(3)
    return value


def generate_nums():
    for i in range(25):
        yield i


def print_t(it):
    print(f'{current_thread().name}: {it}')


rx.from_iterable(generate_nums())\
    .pipe(
        ops.flat_map(asyn),
        ops.do_action(
            on_next=print_t,
            on_completed=lambda: print_t('process done'),
        ),
    )\
    .run()


print_t('program done')
```

`run()`으로 프로세스 종료를 기다릴 수 있다. `subscribe()` 사용하면 스레드를 기다리지 않고 즉시 끝난다.

위 코드는 cpu 수인 12개 쓰레드로 25개의 아이템을 처리하는 예제다.
각 아이템마다 3초 대기하므로, 12개의 쓰레드가 병렬처리하여 총 9초가 소요되어야 한다.

```bash
❯ time python test.py
CPU count is 12
ThreadPoolExecutor-0_0: 0
ThreadPoolExecutor-0_3: 3
ThreadPoolExecutor-0_2: 2
ThreadPoolExecutor-0_5: 5
ThreadPoolExecutor-0_7: 7
ThreadPoolExecutor-0_9: 9
ThreadPoolExecutor-0_10: 10
ThreadPoolExecutor-0_1: 1
ThreadPoolExecutor-0_4: 4
ThreadPoolExecutor-0_8: 8
ThreadPoolExecutor-0_11: 11
ThreadPoolExecutor-0_6: 6             # 여기서 3s
ThreadPoolExecutor-0_2: 13
ThreadPoolExecutor-0_5: 14
ThreadPoolExecutor-0_7: 15
ThreadPoolExecutor-0_3: 12
ThreadPoolExecutor-0_9: 16
ThreadPoolExecutor-0_10: 17
ThreadPoolExecutor-0_4: 19
ThreadPoolExecutor-0_0: 21
ThreadPoolExecutor-0_8: 20
ThreadPoolExecutor-0_1: 18
ThreadPoolExecutor-0_11: 22
ThreadPoolExecutor-0_6: 23            # 여기서 6s
ThreadPoolExecutor-0_5: 24
ThreadPoolExecutor-0_5: process done
MainThread: program done
python test.py  0.06s user 0.03s system 0% cpu 9.169 total
```

`ThreadPoolExecutor-0_N` 이름으로 0~11, 총 12개의 쓰레드가 보인다.
주석으로 표기한 지점에서 3초, 6초 소요되었다. 마지막 24번까지 9초.


RXPY 예제 프로젝트를 만들었다: https://github.com/edunga1/practice-rxpy \
docker로 실행해볼 수 있다.

## redis-py

https://github.com/redis/redis-py

### redis connection을 전역 생성 vs 요청마다 생성

SO [Python Redis connection should be closed on every request? (flask)](https://stackoverflow.com/questions/18022767/python-redis-connection-should-be-closed-on-every-request-flask/18024593) 질문이다.

redis connection을 전역으로 하나만 생성해서 필요한 곳에서 import 하여 사용할 지, 매 요청마다 생성하고 닫을 지에 대한 질문이다.

전자처럼 Top level 객체는 [Node.js](./nodejs.md)나 [python](./python.md)에서는 일반적인 방법이다.
[Spring Framework](./spring-framework.md)의 경우 주입에 대한 문제에서 자유로우니 Bean으로 생성하고 프레임워크를 통해 주입받는 것이 일반적이다.
그래서 node나 python을 처음 접하는 경우 의존 문제에 대해 난해할 수 있다.
DI 라이브러리 사용하지 않고 이상적인 코드를 작성하려고 하면 인스턴스 생성하다가 지치게 된다.

어쨌든 질문에 대한 답은 `redis-py`가 connection pool을 관리하기 때문에 후자를 선택하더라도 우려하는 성능 문제는 없다고 한다.

`redis-py`제작자의 추천은 Global Instance를 가지고 사용하는 것:

> a. create a global redis client instance and have your code use that.
> b. create a global connection pool and pass that to various redis instances throughout your code.

[google groups에서 제작자의 원문](https://groups.google.com/g/redis-db/c/m9k2DN7GX-M/m/5i5HtXkbeBYJ?pli=1)을 볼 수 있다.

## Django Web Framework

### `OneToOneField` vs `ForeignKeyField`

둘 다 related_name으로 역참조 할 수 있지만, `ForeignKey` 는 `QuerySet`을 반환하므로 `None` 체크를 하지 않아도 된다.
반면에 `OneToOneField`는 `RelatedObjectDoesNotExist` 예외가 발생한다.

따라서 좀 더 유연한 `ForeignKey` 를 사용하려고 했지만, `ForeignKey` + `unique` 또는 `primary_key` 속성을 사용하면 서버 시작 시 `Setting unique=True on a ForeignKey has the same effect as using a OneToOneField` warning을 출력한다.

이 주의 문구에 대해서 이미 [djangoproject.com](http://djangoproject.com)에 보고되어 있다.

[Misleading Warning "HINT: ForeignKey(unique=True) is usually better served by a OneToOneField."](https://code.djangoproject.com/ticket/26044)

답변은 "설정을 통해 주의 문구를 감춰라" 라는 뉘앙스라 매우 불편한 부분.

### 복합키를 ForeignKey로 사용하는 방법 찾기

아직 해결하지 못했다.

`source_type='order', source_id=1234`와 같이 복합키의 `source_type`에 따라 관계되는 테이블이 달라진다.
`source_id`는 관계 대상의 ID다.

방법을 찾지 못해서 직접 prefetch하는 함수를 만드는 등, 복잡하게 처리하고 있다.

[django-composite-foreignkey](https://pypi.org/project/django-composite-foreignkey/)

2년동안 관리되지 않은 저장소. 이거 사용할 수 있을까?

[Get ContentType id in Django for generic relation](https://stackoverflow.com/questions/12716970/get-contenttype-id-in-django-for-generic-relation)

`GenericForeignKey`와 `ForeignKey(ContentType) + choices`를 사용하면 될까?

`source_type` 이 `trade | order`로 테이블 이름 조합으로만 저장된다.
원하는 포맷으로 저장할 수 있어야 한다.

## 디버깅

```python
import pdb; pdb.set_trace()
```

위 코드로 breakpoint를 설정할 수 있다.

```bash
(Pdb) ?

Documented commands (type help <topic>):
========================================
EOF    bt         cont      enable  jump  pp       run      unt
a      c          continue  exit    l     q        s        until
alias  cl         d         h       list  quit     step     up
args   clear      debug     help    n     r        tbreak   w
b      commands   disable   ignore  next  restart  u        whatis
break  condition  down      j       p     return   unalias  where

Miscellaneous help topics:
==========================
exec  pdb

Undocumented commands:
======================
retval  rv
```

자주 사용하는 명령어:

- `?` 도움말
- `l` 코드를 출력한다. 라인 번호를 인자로 받으며, 인자가 없으면 현재 라인을 출력한다.
    - python 2에서는 `l` 연속 호출 시 다음 페이지를 출력해서, `l .` 처렴 명시적으로 현재 라인을 출력했던 거 같다.
- `c` 계속 진행한다.
- `q` 종료한다.
- `n` 다음 라인까지 진행한다.

디버깅 명령어는 코드의 요소 이름과 충돌할 수 있는데, 이럴 때는 `!`를 붙여서 사용한다: `!l .`

디버깅할 때 `dir()`, `type()`는 특히 자주 사용한다.

`dir()` 객체의 속성을 출력한다.

```python
(Pdb) dir(datetime)
['__add__', '__class__', '__delattr__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__ne__', '__new__', '__radd__', '__reduce__', '__reduce_ex__', '__repr__', '__rsub__', '__setattr__', '__sizeof__', '__str__', '__sub__', '__subclasshook__', 'astimezone', 'combine', 'ctime', 'date', 'day', 'dst', 'fromordinal', 'fromtimestamp', 'hour', 'isocalendar', 'isoformat', 'isoweekday', 'max', 'microsecond', 'min', 'minute', 'month', 'now', 'replace', 'resolution', 'second', 'strftime', 'strptime', 'time', 'timetuple', 'timetz', 'today', 'toordinal', 'tzinfo', 'tzname', 'utcfromtimestamp', 'utcnow', 'utcoffset', 'utctimetuple', 'weekday', 'year']
```

`type()` 객체의 타입을 출력한다.

```python
(Pdb) type(datetime.now())
<type 'datetime.datetime'>
```
