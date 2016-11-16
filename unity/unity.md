# Unity

## System

* [MonoBehaviour](mono-behaviour.md)

## VSCode와 연동

* [Unity Plugin (Unity Visual Studio Code Integration)](https://github.com/dotBunny/VSCode) 설치
* [VSCode C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) 설치

### intellisense 안되는 현상

C# extension 설치 전에는 code highlighting 조차 동작하지 않지만, 설치 후 code highlighting 동작은 하나..
intellisense 동작은 하지 않는다. (이미 [plugin 이슈](https://github.com/dotBunny/VSCode/issues/116)로 등록됨)

* Unity: 5.4.0f3
* VSCode C# Extension: 1.3.0
* [.Net Core](https://www.microsoft.com/net/core#macos)

위 스펙 기준 최신 버전(4.4SR1 - 4.4.2.11)의 [Mono Framework](http://www.mono-project.com/) 설치하면 해결.
