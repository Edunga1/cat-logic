---
created: 2023-10-27
---
# Markdown

텍스트 기반 마크업 언어.

## Marksman

Marksman은 markdown 파일을 위한 [Language Server](./language-server-protocol.md)이다.

https://github.com/artempyanykh/marksman

할 수 있는 것:

- Heading을 symbol로 등록한다. 그래서 에디터로 문서를 이동하거나 검색할 수 있다.
    - 이 기능은 문서를 찾을 때 매우 편리한데, 문서 내용을 검색하는 대신 제목(heading)으로 검색할 수 있어서 문서 찾기가 쉽다.
    예를 들어 링크에서 `Go to Definition`을 하면 해당 제목으로 이동하고, 링크 생성할 때 제목(`#` 포함)을 자동 완성해준다.
- 내부 문서 링크를 지원한다. 링크 문서로 이동하거나, 미리보기를 제공한다.
- 위키 링크 `[[...]]`, 마크다운 링크 `[ref]: http://example.com "Title"`를 지원한다.

[상대 경로를 자동 완성하지 못하는 문제](https://github.com/artempyanykh/marksman/issues/182)가 있다.
항상 프로젝트 루트 기준으로 링크 완성을 해준다.

한글이 포함되면 링크 자동완성을 못하는 문제가 있다.\
예를 들어 `한글 [link]()` 중 소괄호 내에서 자동완성이 안된다. `한글 [link](` 중에서는 된다.

### 상대 경로 자동 완성 불가 문제

내부 문서 링크 시 `[title](./docs/wiki/foo.md)`와 같이 상대 경로를 자동 완성하지 않는 문제.

https://github.com/artempyanykh/marksman/issues/182

항상 절대 경로를 기준으로 자동 완성한다.
자동 완성 목록엔 `docs/wiki/foo.md`로 보여주지만, 실제 삽입 시엔 `/docs/wiki/foo.md`로 삽입된다.
반면 Wiki 링크 스타일은 잘 동작하는데, 보여주는 것(`foo`)과 삽입하는 것(`[[foo]]`)이 일치한다.

Marksman의 심볼 참조는 잘 동작해서, vim에서 `ctrl-]`로 이동은 된다.
하지만 markdown 도구들, wiki.vim을 주로 사용하는데 wiki.vim은 절대 경로 링크를 지원하지 않는다.

이 문제는 23년 3월에 보고되어, 26년 1월에도 해결되지 않은 오래된 문제다.

## Vim 관련

[Vimwiki](/docs/wiki/vimwiki.md)에서 Text Object를 제공한다.
예를 들어 `vaH`는 하위 제목까지 포함한 내용을 선택한다.
즉, Vimwiki로 마크다운 유틸 플러그인으로써 사용해도 좋다.

## Writerside App

JetBrains의 문서 작성 도구.

https://www.jetbrains.com/writerside/

마크다운을 제공하지만 Writerside만의 기능이 꽤 많다.

Standalone 앱으로 제공되었다가, [2025년 3월 20일을 끝](https://blog.jetbrains.com/writerside/2025/03/sunsetting-writerside-ide)으로 플러그인 형태로만 제공한다.

테마와 레이아웃이 JetBrains의 공식 문서과 같아서 퀄리티가 기본적으로 좋다.

에디터에서 작성하면 미리보기를 제공하는데, 로컬 호스팅하여 보여준다.

파일이 로컬에 저장은 되지만, [Git 저장소와 연동하는 것을 권장하고 있다](https://www.jetbrains.com/idea/guide/tutorials/creating-a-project-from-github/the-git-tool-window/).

아래는 2023년 10월 기준으로 작성된 FAQ.
얼리 액세스지만, 앞으로도 EAP나 무료 버전이 제공된다고 했었다.

> *Writerside의 가격은 어떻게 되나요?*
> Writerside는 현재 얼리 액세스 프로그램으로 배포되고 있으며 완전 무료입니다.
>
> Writerside가 출시된 후에도 무료 버전이나 EAP 프로그램이 지속적으로 제공될 예정이므로 계속 무료로 도구를 사용할 수 있습니다.
