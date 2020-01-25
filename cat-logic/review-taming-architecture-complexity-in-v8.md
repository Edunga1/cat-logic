---
id: page-93
time: 2019-06-18 19:43:10
---
# Taming architecture complexity in v8

https://theori.io/research/korean/taming-architecture-complexity-in-v8

[원문](https://v8.dev/blog/csa)을 번역한 글.

옛날엔 내장 함수(builtin)가 self-hosted, JS로 작성되기도 했다.
그러다보니 성능 이슈가 있었고, 어셈블리로 다시 작성되었다.

성능은 향상되었으나, 유지보수를 하는데 어려워졌다.

그래서 어셈블리어로 변환해주는 중간 계층을 두었다.
프레임워크처럼 C++ 매크로로 틀에 맞춰 작성하면,
어셈블리 코드로 변환된다.

테스트코드 또한 C++로 작성할 수 있다.

문자열 객체에 길이를 구하는 `GetStringLength` 함수를 작성하는
자세한 예시를 보여주니 좋다.

작성한 C++ 코드의 가독성이 좋아 보인다:

```cpp
TF_BUILTIN(GetStringLength, CodeStubAssembler) {
    Label not_string(this);

    Node* const maybe_string = Parameter(Descriptor::kInputObject);

    GotoIf(TaggedIsSmi(maybe_string), &not_string);

    GotoIfNot(IsString(maybe_string), &not_string);

    Return(LoadStringLength(maybe_string));

    BIND(&not_string);

    Return(UndefinedConstant());
}
```

[견고한 코드를 작성하는 방법](https://medium.com/swlh/1-powerful-way-to-write-robust-code-7c650071fe6b)
글이 생각났다. 진입점은 깔끔하게 유지하기.
