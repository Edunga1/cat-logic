---
created: 2016-10-18
---
# Unity 3D

게임 엔진 또는 컨텐츠 제작 도구.

유니티는 눈에 보이는대로 사물을 배치하고, 필요한 컴포넌트를 추가함으로써 객체를 확장할 수 있다.
에디터의 기본 기능 뿐 아니라, 사용자들이 만든 플러그인으로 에디터 기능을 확장할 수 있다.

게임 엔진이므로 게임의 필수적인 부분을 제공한다.
게임의 시간을 제어한다거나, 렌더링 정책을 결정하거나, 물리연산을 제공한다.\
[스크립트](https://docs.unity3d.com/ScriptReference/)를 통해 Unity가 제공하는 API를 이용하면 된다.

## VSCode 연동

* [Unity Plugin (Unity Visual Studio Code Integration)](https://github.com/dotBunny/VSCode) 설치
* [VSCode C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) 설치

### IntelliSense 안되는 현상

C# extension 설치 전에는 code highlighting 조차 동작하지 않지만, 설치 후 code highlighting 동작은 하나..
IntelliSense 동작은 하지 않는다. (이미 [plugin 이슈](https://github.com/dotBunny/VSCode/issues/116)로 등록됨)

* Unity: 5.4.0f3
* VSCode C# Extension: 1.3.0
* [.Net Core](https://www.microsoft.com/net/core#macos)

위 스펙 기준 최신 버전(4.4SR1 - 4.4.2.11)의 [Mono Framework](http://www.mono-project.com/) 설치하면 해결.

## MonoBehaviour

### Globals

#### Rigidbody.velocity

물체의 가속도

Rigidbody의 질량(mass)에 영향을 받지 않음

**유니티 매뉴얼에서는 가속도를 수정하는 것은 현실적이지 않은 결과가 나올 수 있으므로 직접 변경하지 말 것을 권고하고 있다.**

> In most cases you should not modify the velocity directly, as this can result in unrealistic behaviour

ref. https://docs.unity3d.com/ScriptReference/Rigidbody-velocity.html

#### Rigidbody.AddForce(Vector3)

물체에 힘 만큼 밀어내는 기능을 함

Rigidbody의 mass에 영향을 받음

#### Input

사용자로부터 입력값을 얻음

Method | Desc
--- | ---
Input.GetAxis("Horizontal") | 키보드 화살표 왼쪽, 오른쪽 키
Input.GetAxis("Vertical") | 키보드 위, 아래 키
Input.GetButtonDown("Fire1") | 마우스 왼쪽 버튼
Input.GetButtonDown("Jump") | 키보드 스페이스 바

#### GameObject

Scene 내에 존재하는 물체들을 획득하는데 사용

Method | Desc
--- | ---
Find(string) | 오브젝트 이름으로 게임 오브젝트를 획득

### Overrides

#### void OnCollisionEnter(Collision)

충돌 시 발생하는 이벤트 함수

다음을 만족해야 충돌 이벤트가 발생한다:

* 두 게임 오브젝트 모두 Collider가 있어야 한다.
* 둘 중 하나는 Rigidbody가 있어야 한다.
* 그리고 Rigidbody를 가진 쪽이 움직여서 서로 만났을 때만 발생한다.

#### void OnTriggerEnter(Collision)

충돌 시 발생하는 이벤트 함수
Is Trigger 허용시 충돌하더라도 물리연산이 일어나지 않는다.

다음을 만족해야 충돌 이벤트가 발생한다:

* 두 게임 오브젝트 모두 Collider가 있어야 한다.
* 둘 중 하나는 Rigidbody가 있어야 한다.
* 둘 중 하나는 Collider 컴포넌트에 Is Trigger 체크되어 있어야 한다.
* 어느 쪽이 움직이더라도 서로 만나면 이벤트가 발생한다.

오브젝트가 많아지는 경우 물리연산이 모두 발생하면 연산이 많아지므로 주로 충돌 여부만 체크할 수
있도록 하기 위해서 사용한다.

## Sprite Packer가 동작하지 않는 현상

**Sprite Packer?**
* Unity 4.6부터 UGUI를 제공한다.
* NGUI는 직접적으로 Atlas 파일을 생성하지만 UGUI에서는 추상적으로 packing.
* UGUI에서 만들어지는 Atlas는 Library/AtlasCache에 생성해 관리한다.

[영상](https://www.youtube.com/watch?v=Pj8Y48ecBZY)을 따라 Atlas를 생성하려고 하였으나 **pack** 버튼을 눌러도 아무 반응이 없음.

**Assets/Resources** 폴더 내에 있는 이미지들은 Atlas를 생성할 수 없음. 이는 의도된 것으로

Resources 폴더 내에 있는 리소스들은 빌드 시 유니티가 자동으로 가져오므로 Atlas를 생성하는 경우 두 번 불러오는 것이므로 의도적으로 막아 놓은 것

ref.
* http://gamedev.stackexchange.com/questions/75716/unity-4-5-sprite-packer-does-not-pack-images-inside-resources-folder
* https://forum.unity3d.com/threads/unity-4-5-sprite-packer-does-not-pack-images-inside-resources-folder.248349/

## OSX 커맨드라인으로 유니티 빌드하기

안드로이드 빌드를 기준으로 함

`/Applications/Unity/Unity.app/Contents/MacOS/Unity -quit -batchmode -executeMethod AndroidBuilder.PerformBuild -logFile /dev/stdout`

`/Applications/Unity/Unity.app/Contents/MacOS/Unity`: Mac에서 유니티 설치 시 어플리케이션 위치.
`-batchmode`로 실행하지 않으면 GUI 모드로 실행 됨.

`-quit -batchmode`: GUI 모드로 실행하지 않고 터미널에서 작업 함. 완료 시 종료. (`-quit`)

`-executeMethod`: 유니티가 지원하는 값이 아닌, 실행 할 스크립트 메소드.
위에서는 `AndroidBuilder` 클래스의 `PerformBuild()` 메소드를 실행 시켰다.

즉, **유니티에서 사용하는 스크립트 언어**로 빌드 정보를 직접 작성해야 한다.

아래는 빌드 스크립트 예시 - C# :

```Csharp
using UnityEditor;

/// <summary>
/// 안드로이드 빌더
/// </summary>
class AndroidBuilder {

    /// <summary>
    /// 파라미터 파싱, 인자에 부여 된 값을 반환
    /// </summary>
    /// <param name="name">인자 이름</param>
    /// <returns>인자의 값, 없는 인자라면 null</returns>
    private static string GetArg(string name) {
        var args = System.Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++) {
            if (args[i] == name && args.Length > i + 1) {
                return args[i + 1];
            }
        }
        return null;
    }

    /// <summary>
    /// 빌드 실행
    /// </summary>
    static void PerformBuild () {
        string output = GetArg("-o");
        output = "./" + (output == null ? "out.apk" : output);
        string[] scenes = {"Assets/Scenes/SceneStart.unity", "Assets/Scenes/SceneGame.unity"};

        BuildPipeline.BuildPlayer(scenes, output, BuildTarget.Android, BuildOptions.None);
    }
}
```

`-logFile`: 로그 파일 위치. 지정 시 생성됨. 위에서는 standard out으로 설정함. 즉 터미널에서 출력 된다.
