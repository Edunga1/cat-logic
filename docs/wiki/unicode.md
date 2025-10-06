---
created: 2022-12-20
---
# Unicode

## NFC, NFD

Normalization Form **C**
Normalization Form **D**

### 조합형 한글, 완성형 한글

1\.

```
그린빌 100 단지 아파트
```

2\.

```
그린빌 100 단지 아파트
```

1, 2는 서로 다른 문자열이다. 같아 보인다면 프로그램이 그렇게 보이도록 출력한 것이다.

[Javascript](./javascript.md) 기준으로 문자열 비교하면 실패한다:

```javascript
'그린빌 100 단지 아파트' == '그린빌 100 단지 아파트'  // false
```

1은 NFD로, 조합하여 완성된 글자처럼 보여주고 있다. 2는 NFC로, 완성된 한글을 그대로 보여주고 있다.

Destructuring하면 자모 분리되어 표현된다:
```javascript
// (25) ['ᄀ', 'ᅳ', 'ᄅ', 'ᅵ', 'ᆫ', 'ᄇ', 'ᅵ', 'ᆯ', ' ', '1', '0', '0', ' ', 'ᄃ', 'ᅡ', 'ᆫ', 'ᄌ', 'ᅵ', ' ', 'ᄋ', 'ᅡ', 'ᄑ', 'ᅡ', 'ᄐ', 'ᅳ']
[...'그린빌 100 단지 아파트']
```

**주의점**
* 사용자 입력을 데이터베이스에 저장할 때 주의해야 한다. 위 비교 예시처럼 비교 불가하기 때문에 NFD 그대로 저장하면 SQL 조건절에서 제대로 검색할 수 없다.
* 정규식에도 제대로 걸리지 않는다. 알려져있는 `/ㄱ-힣/`의 경우, NFD는 걸리지 않는다. white list로 정규식에 해당하는 문자열만 허용하면 의도치 않은 동작이 될 수도 있다.

#### NFD -> NFC 변환

데이터베이스에 저장한다면 NFC 변환하는 것을 고려하자.
예를 들어, 주소를 사용자에게 입력받아 택배사에 예약하는 시스템을 만든다면, 제대로 출력할 수 없을지도 모른다.

언어마다 내장된 라이브러리를 제공한다.

[Python](./python.md):
```python
from unicodedata import normalize

normalize('NFC', u'그린빌')
```

[Javascript](./javascript.md):
```javascript
'그린빌'.normalize('NFC')
```

NFC -> NFD도 가능하다:
```javascript
'그린빌'.normalize('NFD')
```

#### Reference

* https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C_%EB%93%B1%EA%B0%80%EC%84%B1
* https://docs.python.org/3/library/unicodedata.html

## 읽어볼만한 것

- [유니코드 6.0의 이모지 사태](https://j.mearie.org/post/2334141016/emoji-on-unicode-6-0)
- [유니코드 용어집](https://www.unicode.org/glossary)
