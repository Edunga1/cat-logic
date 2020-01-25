---
id: page-95
time: 2019-10-22 23:53:42
tags: nodejs, python
---
# NodeJS data validation

웹 서버를 작성할 때, 요청 데이터를 수동으로 검증하는 일은 너무 피곤하다.

Python Django는 자체적으로 Form 클래스를 제공한다:

https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Forms

Django Form은 정말 다양한 필드를 지원한다.

Python Flask는 WTForm 또는 Marshmallow을 사용한다:

https://github.com/wtforms/wtforms

https://github.com/marshmallow-code/marshmallow

WTForm이 경량 하게 사용할 수 있었고, Marshmallow는 사용해보지 않았다.
Marshmallow는 Django의 Form과 영속성을 결합한 Model Form과 비슷한 기능을 지원하는 거 같다.

NodeJS는 아직까지 사용해본 적이 없다.
이때까지 수동으로 처리해왔는데, 그래서 너무 힘들었다.
그래서 이런거도 해보려다가 말았었다:

https://github.com/Edunga1/grooming-type-checker

expressjs나 다른 프레임워크는 어떻게 처리하는지 찾아보니 Joi를 사용하는가 보다.
사실 Joi는 hapijs의 생태계에서 개발되었다.

> The most powerful schema description language and data validator for JavaScript.

라고 한다. hapijs에 종속되지 않아서 어느 곳에서나 사용할 수 있다.
