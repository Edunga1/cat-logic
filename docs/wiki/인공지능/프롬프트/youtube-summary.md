# 유튜브 요약

유튜브 영상을 요악하는데 사용하는 프롬프트.

ai studio에서 gemini-2.5-pro, `Grounding with Google search` 옵션을 끄고 사용한다.

```markdown
# 개요
유튜브 영상을 처음부터 끝까지(0초부터 영상 종료 시점까지) 빠짐없이 글로 정리하는 것이 목표입니다. 요약이 누락된 부분이 없도록 영상 전체를 다루었는지 마지막에 반드시 확인해주세요.
영상 ID는 `f4s1h2YETNY` 입니다.

# 출력
- 출력 언어는 한글을 사용합니다.
- 영상과 같은 경험을 위해서 시간 순서로 정리해야 합니다.

## HTML
- HTML 파일로 출력하세요.
- 아래의 **CSS 스타일**을 `<head>` 안의 `<style>` 태그에 포함시켜 주세요.
- 아래의 **HTML 구조**를 따라서 내용을 구성해주세요.

### HTML 구조
- 전체 콘텐츠는 `<div class="container">`로 감싸주세요.
- 영상의 전체 제목은 `<h1>` 태그를 사용합니다.
- 영상의 주요 섹션(주제)은 `<h2>` 태그로 구분합니다. 각 `<h2>` 태그 안에는 해당 섹션으로 바로 이동할 수 있는 유튜브 타임스탬프 링크(`<a>`)를 포함해주세요.
- 본문 내용은 `<p>` 태그를 사용하여 단락으로 나눕니다.
- 화면에 코드와 같은 주요한 텍스트 정보가 포함되어 있으면, `<pre>` 블록을 사용하세요.

### CSS 스타일
```css
<style>
    /* 전체 페이지 레이아웃 */
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        line-height: 1.6;
        color: #e0e0e0;
        background-color: #2c3e50;
        margin: 0;
        padding: 20px;
    }
    /* 콘텐츠를 감싸는 중앙 컨테이너 */
    .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: #34495e;
        padding: 20px 40px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    /* 제목 스타일 */
    h1, h2, h3 {
        color: #1abc9c;
        border-bottom: 2px solid #16a085;
        padding-bottom: 10px;
    }
    h1 {
        text-align: center;
    }
    /* 링크 스타일 */
    a {
        color: #3498db;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    /* 단락 스타일 */
    p {
        margin-bottom: 1.2em;
    }
    /* 코드 블록 스타일 */
    code, pre {
        background-color: #23313f;
        border-radius: 4px;
        font-family: "Fira Code", "Courier New", Courier, monospace;
        padding: 2px 5px;
    }
    pre {
        padding: 15px;
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    /* === 키워드 하이라이트 스타일을 여기에 직접 정의하세요 === */
</style>
```

# 사람이 편하게 읽을 수 있도록 정리하세요
- 주요한 부분은 timestamp를 링크로 추가하세요. 링크는 `https://youtu.be/<video-id>?t=<timestamp>` 구조를 가집니다. t는 초 단위입니다. 모든 링크를 직접 URL로 제공하세요.
- <h2> 태그로 내용을 그룹화 하세요. heading은 내용의 요약을 사용해도 괜찮습니다. 영상에서 그룹화한 내용이 있으면 그걸 사용하세요.
- 화면 내용을 적극적으로 설명하세요. 동영상이 어떤 내용을 담는지 설명하지 말고 영상의 주인처럼 사용자에게 이야기해야 합니다.
- 영상에서 주기적으로 언급되는 중요한 키워드는 <span class="highlight-X"> 태그로 감싸 하이라이트 처리해주세요. (X는 1부터 6까지의 숫자)
CSS 스타일 섹션에 .highlight-X 클래스에 대한 스타일을 직접 정의해주세요.
스타일은 실제 형광펜으로 칠한 것처럼 보이게 합니다. 배경색은 rgba를 사용하여 투명도가 포함된 밝고 선명한 색상을 사용하고, 텍스트 가독성이 유지되도록 합니다.
```
