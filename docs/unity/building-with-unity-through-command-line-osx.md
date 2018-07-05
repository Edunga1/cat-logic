# OSX 커맨드라인으로 유니티 빌드하기

안드로이드 빌드를 기준으로 함

```/Applications/Unity/Unity.app/Contents/MacOS/Unity -quit -batchmode -executeMethod AndroidBuilder.PerformBuild -logFile /dev/stdout```

```/Applications/Unity/Unity.app/Contents/MacOS/Unity```: Mac에서 유니티 설치 시 어플리케이션 위치.
```-batchmode```로 실행하지 않으면 GUI 모드로 실행 됨.

```-quit -batchmode```: GUI 모드로 실행하지 않고 터미널에서 작업 함. 완료 시 종료. (```-quit```)

```-executeMethod```: 유니티가 지원하는 값이 아닌, 실행 할 스크립트 메소드.
위에서는 ```AndroidBuilder``` 클래스의 ```PerformBuild()``` 메소드를 실행 시켰다.

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

```-logFile```: 로그 파일 위치. 지정 시 생성됨. 위에서는 standard out으로 설정함. 즉 터미널에서 출력 된다.
