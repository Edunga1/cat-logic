---
created: 2023-10-27
---
# Markdown

텍스트 기반 마크업 언어.

## Writerside App

Jetbrains의 문서 작성 도구.

https://www.jetbrains.com/writerside/

마크다운을 제공하지만 Writerside 만의 기능이 꽤 많다.
2023년 10월 기준으로 얼리 엑세스지만, 앞으로도 EAP나 무료 버전이 제공된다고 한다.
다음은 FAQ 중:

> *Writerside의 가격은 어떻게 되나요?*
> Writerside는 현재 얼리 액세스 프로그램으로 배포되고 있으며 완전 무료입니다.
>
> Writerside가 출시된 후에도 무료 버전이나 EAP 프로그램이 지속적으로 제공될 예정이므로 계속 무료로 도구를 사용할 수 있습니다.

테마와 레이아웃이 Jetbrain의 공식 문서과 같아서 퀄리티가 기본적으로 좋다.

에디터에서 작성하면 미리보기를 제공하는데, 로컬 호스팅하여 보여준다.

파일이 로컬에 저장은 되지만, [Git 저장소와 연동하는 것을 권장하고 있다](https://www.jetbrains.com/idea/guide/tutorials/creating-a-project-from-github/the-git-tool-window/).

## Marksman - Language Server for Markdown

Marksman은 markdown 파일을 위한 [Language Server](./language-server-protocol.md)이다.

https://github.com/artempyanykh/marksman

할 수 있는 것:

- 헤더 `#` 기반 textobject 지원한다. 따라서 `#`을 기준으로 블록을 처리하거나, 심볼 검색할 수 있다.
- 내부 문서 링크를 지원한다. 링크 문서로 이동하거나, 미리보기를 제공한다.
- 위키 링크 `[[...]]`, 마크다운 링크 `[ref]: http://example.com "Title"`를 지원한다.

[상대 경로를 자동 완성하지 못하는 문제](https://github.com/artempyanykh/marksman/issues/182)가 있다.
항상 프로젝트 루트 기준으로 링크 완성을 해준다.