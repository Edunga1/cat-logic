---
created: 2023-05-10
---
# Windows

내용들은 Windows 10 기준이다.

## Microsoft PowerToys

윈도우 유틸리티 모음 프로그램.
다양한 편의 기능을 제공한다.

https://learn.microsoft.com/en-us/windows/powertoys/

powershell로 설치: `winget install --id Microsoft.PowerToys`

내가 주로 사용하는 기능은:
- [FancyZones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones): 창을 원하는 위치에 배치할 수 있게 해준다. 레이아웃 템플릿을 여러개 만들어서 관리할 수 있는 기능 등.
- [PowerToys Run](https://learn.microsoft.com/en-us/windows/powertoys/run): [Mac OS](./mac-os.md)의 Spotlight 처럼 프로그램 실행, 파일 검색 등을 할 수 있다. (Win + Space)
- [Mouse Utilities](https://learn.microsoft.com/en-us/windows/powertoys/mouse-utilities): 컨트롤 두 번 눌러서 마우스 위치를 강조하거나 색상과 크기를 바꾸는 등 마우스 커서 커스터마이징.
- [Always on Top](https://learn.microsoft.com/en-us/windows/powertoys/always-on-top): 창을 항상 위에 띄워놓을 수 있다.

외에도 여러 파일 이름을 한 번에 변경, 이미지 리사이즈 등 기능이 많다.

가장 유용한 것은 PowerToys Run이다.
윈도우 사용 방식을 크게 바꿔주는 기능이다. 마치 Mac OS 처럼.
기본 기능은 바탕화면이나 시작 메뉴에서 아이콘을 찾지 않고도 파일 검색으로 실행하는 것이다.

이외에도 편의성 기능이 많다.

- `2^16`와 같이 입력할 수 있는, 간단한 계산기 기능을 포함하고 있으며 엔터를 누르면 계산 결과를 클립보드에 복사한다.
- `!!`는 이전에 입력한 내역을 보여준다.
- `<`를 입력하면 현재 실행 중인 프로그램을 보여주는데, 선택하면 해당 프로그램으로 스위칭한다.
  `win + tab`으로 확인 가능한 가상 데스크탑의 창을 검색할 수도 있어서 유용하다. 많은 프로그램을 실행하고 있을 때 편리한 기능이다.
  창 이름을 검색하기 때문에 검색어를 잘 입력하면 빠르게 창을 찾을 수 있다.
- `>`는 `win + r`로 실행하는 Run과 같다. 그래서 `%appdata%`로 접근도 가능하다.

윈도우 프로그램 답지 않게, Mac OS 앱처럼 자동 업데이트를 잘 지원한다.

[오픈소스 프로젝트](https://github.com/microsoft/PowerToys)다.
잘만하면 윈도우 API 사용법을 배울 수 있겠다.

## Batch 파일

윈도우에서 스크립트를 `.bat` 파일로 만들어서 실행할 수 있다.

다음은 2개의 프로그램을 시작하는 예제.

```
start https://poe.game.daum.net/
start "" "C:\Program Files\poe-overlay\poe-overlay.exe"
```

`start`는 프로그램을 실행하는 명령어인데,
- 첫 번째 줄은 열린 웹 브라우저의 탭으로 `https://poe.game.daum.net/`를 연다.
- 두 번째 줄은 2번째 인자의 프로그램을 실행한다. 첫 번째 인자는 창 제목이다.

프로그램을 관리자 권한으로 실행하려면 `powershell`을 사용한다.

```
powershell -Command "Start-Process 'C:\Program Files\poe-overlay\poe-overlay.exe' -Verb RunAs"
```

이렇게하면 배치 파일을 실행할 때 User Account Control 확인 창이 뜬다.

## Installation vs. Portable

윈도우 프로그램의 실행 방식은 크게 설치형과 포터블형으로 나뉜다.

[awakened poe trade](https://snosme.github.io/awakened-poe-trade/download)라는 프로그램에서는 설치 방식에 따라 시작 시간에서 차이가 난다고 한다.

| Download link           | Automatic updates | Startup time |
|-------------------------|-------------------|--------------|
| Windows 10+ (installer) | ✔                 | Fast         |
| Windows 10+ (portable)  | ❌                | Slower       |
| Linux (AppImage)        | ✔                 | n/a          |
| macOS (dmg)             | ❌                | n/a          |

자동 업데이트의 경우 프로그램에 대한 내용이라 실행 방식과는 관련이 없을 듯.