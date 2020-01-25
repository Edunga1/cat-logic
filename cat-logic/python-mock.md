---
id: page-83
time: 2019-10-04 14:54:42
tags: python, testing
---

# Python mock

https://docs.python.org/3/library/unittest.mock.html

공식 문서에도 잘 나와있지만, 너무 장황해서 정리.

`pip install mock`으로 설치한다.

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
