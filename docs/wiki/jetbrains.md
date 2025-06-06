---
created: 2023-02-04
---
# JetBrains

IntelliJ, DataGrip 등 JetBrains사 제품에 대한 이야기.

JetBrains의 제품은 연간 구독을 구매하면, 해당 시점의 버전은 영구 라이센스로 지급된다.
이를 [perpetual fallback license, 영구 폴백 라이센스](https://sales.jetbrains.com/hc/ko/articles/207240845)라고 한다.
[All Products Pack](https://www.jetbrains.com/all/)을 구매하면 모든 제품의 영구 라이센스를 받을 수 있다.\
2025년 4월, 2025.1 버전 출시와 함께 [All Products Pack 라이센스에 JetbBrains AI가 포함](https://sales.jetbrains.com/hc/en-gb/articles/16544922728466)된다.

IntelliJ 등 몇몇 도구는 Community Edition이라는 무료 버전이 있다.
개발하는데 문제는 없으나, 몇 가지 플러그인이 제한된다.

## IntelliJ

무료 버전과의 가장 큰 차이점은 [Spring Plugin](https://plugins.jetbrains.com/plugin/20221-spring) 등 플러그인의 제한이다.

이 플러그인이 없으면 불편하다.
[Spel](https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html) 파싱하지 않아서 하이라이팅, 자동 완성이 되지 않는다.
pring Bean은 프레임워크에 의해 생성 및 주입되기 때문에, IDE가 unused라고 표시한다.
이 외에도 Bean이나 Spring 기능에 대한 다양한 편리 기능을 사용할 수 없다. 그러나 개발하지 못하는 것은 아니다.

### WSL2에서 Freezing 현상

TL;DR: JetBrains Tool 경로를 Windows Defender의 검사 예외로 추가한다.

* `\\wsl$\Ubuntu`
* `\\wsl.localhost\Ubuntu`
* `C:\Program Files\JetBrains`
* `%LOCALAPPDATA%\JetBrains`
* `%APPDATA%\JetBrains`

---

`scanning files to index` 단계에서 멈추는 증상.

프로그램 자체가 먹통이 되기도 한다.
몇시간 기다려 보았는데, scanning이 너무 오래 걸려서 포기했다.

https://youtrack.jetbrains.com/issue/IDEA-293604/IntelliJ-is-slow-hanging-when-working-with-WSL-filesystem

덧글 중 Windows Security -> Virus & threat protection -> Virus & threat protection settings -> **Real-time protection**

실시간 보호를 끄면 해결된다고 한다.

물론, 임시방편이고 TL;DR의 IntelliJ 관련 폴더를 검사 예외로 추가하면 해결된다.

![windows defender exclusions](res/windows-defender-exclusions.png)

### WSL2에서 annotation processor로 생성된 파일을 인식하지 못하는 현상

https://youtrack.jetbrains.com/issue/IDEA-264036

querydsl q-class를 생성하는데, 생성된 파일을 인식하지 못하는 현상.
테스트나 실행도 잘 되지만, 에디터에서는 에러로 표시되어 불편하다.

```kotlin
sourceSets.main.get().java.srcDirs(
    "build/generated",
    "build/generated/sources/annotationProcessor",
)
```

`build.gradle.kts`에 위와 같이 설정하면 IntelliJ가 인식은 하지만, macOS 또는 WSL가 아닌 환경에서는 추가 설정없이 잘 인식했었다.

### .http 파일 사용하기

https://www.jetbrains.com/help/idea/exploring-http-syntax.html

`.http` 확장자 파일을 열면 에디터 내에서 http 요청을 보낼 수 있다.
또한 헤더 정보나 curl 파싱 등 편리한 기능이나 응답 결과를 전역 변수로 저장하고,
전역 변수를 다른 요청의 파라미터로 전달도 가능하다(api chaining)

버전마다 기능 제공이 조금씩 달라지는 듯 하다. 여기 내용은 2021.1.3 버전에 대한 내용임.

#### 전역 변수로 API간 Chaining 하기

다음은 토큰 생성 API로 토큰을 저장하고, 다른 API에 사용하는 예시다.

응답 구조는 다음과 같다고 가정한다:
```json
{
  "token": "AA86811JjjaCD43"
}
```

`.http` file:

```
### 토큰 생성 API
POST http://localhost:5000/generate-token

> {%
client.global.set("mtoken", response.body.token)
%}

### 상품 조회 API
GET http://localhost:5000/my-products
X-APP-TOKEN: {{mtoken}}
```

`{% ... %}` 구문으로 호출 후에 대한 javascript 코드를 작성하고,
`{{VARIABLE}}` 구문으로 전역 변수에 접근한다.

스크립트 구문을 http 요청 전에 두면 호출 전에 대한 처리도 가능하다.

#### Swagger와 OpenAPI 스키마를 이용한 자동 완성

[2023 버전부터](https://www.jetbrains.com/idea/whatsnew/2023-2/) request body의 자동 완성도 제공한다.

![jetbrain schema completion](https://www.jetbrains.com/idea/whatsnew/2023-2/img/2_Swagger_and_OpenAPI_schemas_in_the_HTTP_Client.png)

enum의 경우 특정 값만 받는 필드도 자동완성 된다.
다만 enum class는 enum 이름을 자동 완성하기 때문에 `@JsonValue`으로 역직렬화할 변수를 변경해도 enum 이름을 자동 완성했다.

이 기능이 도입되면서 insomnia, postman과 비교했을 때 접근성 말고는 뚜렷한 장점이 없었는데,
이제 intellij 만의 특별한 장점이 생겼다.

### Scratches

프로젝트 생성 없이 간단하게 코드를 실행할 수 있는 파일을 scratch라 한다.
위 단락의 `.http` 파일도 scratch로 생성해서 관리하면 어느 프로젝트에서나 파일을 열어서 실행할 수 있다.

구글 드라이브나 드랍박스 등 클라우드에 연동해서, 집에서나 회사에서나 접근 가능한 나만의 코드 조각 저장소로 가꾸는 방법도 좋다.

scratch 파일은 현재 프로젝트의 모듈을 기반으로 설정할 수 있다.(jvm 기반 언어라면 classpath를 현재 프로젝트로 설정한다.)
이 말은 현재 프로젝트나 프로젝트가 참조하는 라이브러리의 모듈을 불러올 수 있다는 것이다.
그래서 특정 프로젝트 기반으로 만든 scratch를 다른 프로젝트에서 열면 심볼을 못 찾을 수도 있다.

`command + shift + n`으로 생성할 수 있고, Project View의 가장 하단에 `Show Scratch Files` -> `Scratches`에서 생성한 파일을 확인할 수 있다.
Package View에서는 `Scratches`가 보이지 않는다.

`Show Scratch Files` 기능으로 새 창에서 파일 목록을 볼 수 있고, 파일 내용 검색도 가능하다.
나는 Scratch 파일을 자주 사용하고 많이 관리하고 있어서, `option + s`로 단축키를 지정해서 사용하고 있다.

## DataGrip

MySQL Workbench, Sequel Pro 등 몇 가지 무료 데이터베이스 클라이언트를 사용해 보았지만, 유료인 DataGrip이 가장 편리했다.
쿼리 실행하는 데 있어서 실수할 여지를 줄여주는지, 쿼리 결과가 보기 편한지, 데이터 입력 및 추출이 편한지 등을 고려한 선택이다.
그런 면에서 Workbench는 좋은 선택인데, 문제는 크래시 등 불안정한 면이 있는데 업데이트가 잘 이루어지지 않는다.

### keymaps

이 설정은 `2024.1` 버전 기준이다.
이전 버전에서는 `Attach Data Source` 대신 `Attach Session`을 사용했다.

| name                                         | shortcut  | note                                                                   |
| :------------------------------------------- | :-------- | :--------------------------------------------------------------------- |
| Database Tools and SQL -> Attach Data Source | `opt` `o` | staging, prod, local 등 접속 환경의 변경이 잦은 경우 유용              |
| Database Tools and SQL -> Transpose          | `opt` `t` | 열과 행 반전. 컬럼이 많은 경우 보기 편리                               |
| Other -> Pin Active Tab                      | `opt` `p` | 탭 고정. 탭 여러개를 비교를 자주할 때 유용                             |
| Main Menu -> Navigate -> File Structure      | `opt` `l` | (쿼리 결과에서) 컬럼 목록 및 이동. 컬럼이 많은 경우 검색으로 이동 가능 |

```xml
<keymap version="1" name="macOS copy" parent="Mac OS X 10.5+">
  <action id="Console.Jdbc.ChooseDataSource">
    <keyboard-shortcut first-keystroke="alt o" />
  </action>
  <action id="Console.TableResult.Transpose">
    <keyboard-shortcut first-keystroke="alt t" />
  </action>
  <action id="FileStructurePopup">
    <keyboard-shortcut first-keystroke="meta f12" />
    <keyboard-shortcut first-keystroke="alt l" />
  </action>
  <action id="PinActiveEditorTab" />
  <action id="PinActiveTabToggle">
    <keyboard-shortcut first-keystroke="alt p" />
  </action>
  <action id="PinToolwindowTab" />
</keymap>
```

위 설정을 `~/Library/Application\ Support/JetBrains/DataGrip{version}/keymaps`에 `name.xml` 파일로 두면, 프로그램 내에서 keymap 이름으로 찾을 수 있다.

### Live Templates

Live Template은 Snippet의 일종이다.
기본으로 제공되는 `sel`, `lim`을 특히 자주 사용한다.

에디터에 `sel`만 입력하면 `select * from |;` 코드를 자동 완성하고, `|`에 커서가 가면서 테이블 이름 목록을 보여준다.
설정 -> Editor -> Live Templates 메뉴에서 확인하고, 관리할 수 있다.

`sel`의 경우 다음과 같이 작성되어 있다:

```
select * from $table$$END$;
```

`$text$`가 예약어인데, `$table$`은 테이블 목록을 보여주기 위함이고,
`$END$`는 입력란을 모두 채웠을 때 이동 할 커서 위치이다.

응용하면 여러가지 편리한 템플릿을 만들 수 있다.

- `last`: `select * from $table$ order by 1 desc$END$;`
- `where`: `select * from $table$ where $END$;`
- `source`: `select * from $table$ where source_type = '$value1$' and source_id = $value2$$END$;`

`source`는 source id, type 구조로 복합키를 많이 사용해서 만들었다.

## IntelliJ IDEA, DataGrip 버전을 fallback 버전으로 다운그레이드했다.

회사 라이센스가 만료되어 `2022.3` 버전에서 `2021.1` 버전으로 돌아갔다.
구매 요청하면 되지만, [perpetual 라이센스](https://sales.jetbrains.com/hc/en-gb/articles/207240845-What-is-a-perpetual-fallback-license)를 제공해서 사용하겠다 했다.
경험해보고 만족하면 개인적으로도 구매할 수 있을 거 같고, 최신 버전 사용하지 못한다고 해서 개발을 못한다고 생각하면 그건 또 자존심 상할 문제다.

어쨌든.. 다운그레이드했고, 몇가지 문제점은 있었다.

8개월 정도 사용했고, 커밋할 때 마다 매번 모두 검사하는 불편함은 있지만, 개발하는데 지장은 없다.

### IntelliJ scratches 폴더 미인식

[scratches](https://www.jetbrains.com/help/idea/scratches.html) 폴더를 내가 별도 설정하여 쓰고 있다.

구글 드라이브의 공유 폴더였고, 간단한 코드 조각들을 집, 회사 모두에서 쉽게 볼 수 있게하는 것이 목적이었다.
당시 kotlin 입문한 상황이라 이는 공부하는데 매우 유용한 방식이었다.

`Edit Custom Properties` 기능으로 `idea.scratch.path/scratches` 프로퍼티에 경로를 설정하였으나 먹히지 않았다.

해당 변수는 `2021.2` 버전부터 추가된 것으로 추정하고 있다.

`2021.2` 이전 버전에서는 `idea.scratch.path` 이 프로퍼티에 `scratches` 디렉토리가 있는 폴더의 경로로 설정해야 한다.

### 프로젝트 열면 즉시 멈추거나 꺼지는 문제

처음에는 라이센스 문제인 줄 알았다. 현재 fallback license를 삭제하고 free tier로 하면 되었기 때문.

정확한 문제는 fallback license를 사용하기 위해서 로그인하고, 로그인한 계정을 동기화하면서 발생했다.

플러그인을 동기화하면서 문제가 되었는데, 플러그인 중 [Spring Initializr and Assistant](https://plugins.jetbrains.com/plugin/18622-spring-initializr-and-assistant)을 제거하니까 해당 증상이 사라졌다.

아무튼 IntelliJ에서는 어떤 이유로 종료된 것인지 메시지 없이 종료되기 때문에 찾기 어려웠다.
특히 문제가된 플러그인은 직접 설치한 것은 아닌 것으로 기억한다.

### DataGrip 디렉토리 추가 안 됨

scratches 폴더 추가하는 것처럼 쿼리를 모아놓은 폴더를 추가하여 사용 중이다.
`Attach directory to project` 메뉴로 그냥 추가하면 된다. 문제는 해당 기능을 눌러도 아무 반응이 없다.

아직 이유를 찾지 못했지만, 새로운 프로젝트를 추가하여 재현해보면 잘 됐다. 그래서 거기다 추가하고 connection 정보도 옮겨서 사용했다.

이 문제도 메뉴를 선택해도 무반응이며, 에러 메시지도 없다.

