# google-style-guide {#google-style-guide}

| **Google Style Guide** |
| --- |

**HTML / CSS**

1.  다른 파일 include 시 **프로토콜(http, https) 생략**
    *   파일 크기 절감, 혼합 된 콘텐츠 문제 방지
2.  **들여쓰기**는 탭과 공백 혼합 없이 **2-space**
3.  텍스트 / CDATA , CSS 선택자, 속성, 문자열을 제외한 속성 값은 **소문자만 사용**
4.  **불필요한 공백은 사용 금지**
    *   필요와 불필요의 차이를 복잡하게 만듦
5.  character set은 **UTF-8**
6.  주석을 통해 필요한 **코드를 설명하는 것을 권장**
    *   프로젝트의 복잡도에 따라 상이
7.  TODO 주석은 **사용자 이름 또는 메일, 키워드를 포함**
    *   e.g) {# TODO(leenzze): font remove img #}
    *   &lt;!-- TODO: remove optional tags →
8.  **&lt;!DOCTYPE html&gt;** 사용
    *   XHTML 사용 X : 인프라 지원 부족, html보다 최적화를 위해 작은 공간을 제공
    *   빈 값 닫기를 사용하지 않음
        1.  GOOD : &lt;br&gt;
        2.  BAD : &lt;br /&gt;
9.  가능한 **유효한 HTML 사용**
    *   w3c html validator를 사용하면 편리[http://validator.w3.org/nu/](http://validator.w3.org/nu/)
10.  사용 접근성, 코드 재사용 효율의 이유로 **목적에 따라 HTML 사용**
    *   아래 사항이 모두 같은 결과를 나타낸다면 HTML를 사용할 것
        1.  a 링크의 경우 shift 클릭을 통해 새 창에서 열기가 가능하지만 onclick은 불가능
    *   BAD : &lt;div onclick=&quot;goToRecommendations();&quot;&gt;All recommendations&lt;/div&gt;
    *   GOOD : &lt;a href=&quot;recommendations/&quot;&gt;All recommendations&lt;/a&gt;
11.  멀티미디어가 로드되지 않는 경우를 위해 **대체 콘텐츠를 사용**
    *   &lt;img src=&quot;spreadsheet.png&quot; **alt=&quot;Spreadsheet screenshot.&quot;**&gt;
12.  **구조(HTML), 프리젠테이션(CSS), 행동(JS)의 분리**는 유지 보수를 유용케 함
13.  &amp;nbsp; &amp;ldquo; &amp;eur ;&amp;rdquo; 등 **Entity Reference 사용 금지** 특수 문자 그대로 사용
14.  &lt;html&gt;, &lt;head&gt;, &lt;body&gt; 등 **옵션 태그 생략**

| &lt;!DOCTYPE html&gt; |
| --- |

1.  &lt;link&gt;, &lt;script&gt; 의 **type 속성 생략**
    *   BAD : &lt;link rel=&quot;stylesheet&quot; href=&quot;//www.google.com/css/maia.css&quot; type=&quot;text/css&quot;&gt;
    *   GOOD : &lt;link rel=&quot;stylesheet&quot; href=&quot;//[www.google.com/css/maia.css](http://www.google.com/css/maia.css)&quot;&gt;
2.  모든 블록, 리스트, 테이블의 **자식 요소는 들여쓰기**
3.  **큰 따옴표 사용**
    *   &lt;a class=&quot;maia-button maia-button-secondary&quot;&gt;Sign in&lt;/a&gt;
    *   JavaScript 코드와 구분하는데 용이
4.  가능한 유효한 CSS 사용
    *   w3c css validator를 사용하면 편리[http://jigsaw.w3.org/css-validator/](http://jigsaw.w3.org/css-validator/)
5.  **ID와 클래스 이름**은 대부분이 **이해할 수 있고 변경할 수 있고 용도를 반영**하게 작명

| /* BAD */ |
| --- |

1.  **ID와 클래스 이름**은 가능한 **짧되 무엇에 관한 것인지 전달**되어야 함

| /* BAD : 풀 네임은 줄일 수 있음 */ |
| --- |

1.  **ID와 클래스 이름**을 **type selector와 혼용 금지**

| /* BAD */ |
| --- |

1.  **짧게 표현**할 수 있도록 CSS 속성 정의

| /* border 모두를 정의하지 않아도 됨 */ |
| --- |

1.  값이 0이면 **단위 표기를 하지 않음**

| /* 0인 경우 px, %등 단위 생략 */ |
| --- |

1.  -1 ~ 0 사이의 **소숫점은 0을 생략**
    *   e.g) font-size: .8em;
2.  연속되는 **16진수 값인 경우 줄여서 사용**

| /* 두 정의는 같은 의미를 가짐 */ |
| --- |

1.  **접두사를 namespace로 사용**함으로써 이름 충돌을 방지하고 유지 보수가 용이해짐

| .adw-help {} /* AdWords */ |
| --- |

1.  **단어 간 사이는 - (hyphen)**으로 구분

| /* BAD */ |
| --- |

1.  CSS 속성은 **알파벳 순서로 정렬**
    *   -webkit-, -moz-는 접두사는 없다고 보고 분류

| background: fuchsia; |
| --- |

1.  모든 블록 컨텐츠는 **들여쓰기**

| /* 2-space 들여쓰기를 유의하며.. */ |
| --- |

1.  모든 속성의 **선언 후 세미콜론(;)을 사용**

| .test { |
| --- |

1.  선언의 **이름 뒤에는 공백 하나를 둠**

| h3 { |
| --- |

1.  ID와 클래스 **선언 뒤에 공백 하나를 둠**

| /* BAD : 선언 뒤 공백 없음 */ |
| --- |

1.  선택자 간에는 **줄바꿈을 통해 구분**

| /* BAD */ |
| --- |

1.  규칙 사이는 **빈 줄로 구분**

| html { |
| --- |

1.  속성 값에는 큰 따옴표 대신 **작은 따옴표를 사용**, **URI 값(url(..))은 따옴표를 사용 금지**

| /* BAD */ |
| --- |

1.  주석을 사용하여 **그룹 스타일 시트를 나눠 구분**

| /* Header */ |
| --- |

**JAVASCRIPT**

**&lt; Language Rules &gt;**

1.  변수 선언은 **var** 키워드와 함께 선언
    *   ‘use strict’; 사용하면 해석 단계에서 var를 사용하지 않은 변수 사용 시 오류 발생
2.  상수 선언 시 **const 사용 금지** ( IE &lt; 11 지원 x )
3.  변수 할당 시에는 항상 **세미콜론( ; )** 사용
    *   Object : var x = {}**;**
    *   Array : var arr = []**;**
    *   Function : var fn = function() { … }**;**
    *   Closure : function fn() { return function() { … }**;** }
4.  **중첩 함수 사용**하면 유용함
    *   function foo() { **function bar() { … }** }
5.  **블럭 내 함수 선언 금지**, 함수 표현식은 가능
    *   GOOD : if (x) { **var fn = function() { … };** }
    *   BAD : if (x) { function fn() { … } }
6.  기본 타입은 **new 키워드 사용 금지**
    *   BAD : new Boolean(0); // Object를 반환하므로 비교식에서 true
7.  메서드와 속성 선언 방법
    *   **생성자 : function Foo() { this.bar = value; }**
    *   **메서드 : Foo.prototype.bar = function() { … };**
    *   BAD : function Foo() { this.bar = function() { … }; }
8.  **delete 사용 금지**, null 초기화 방식이 더 빠름
    *   delete는 속성을 조작하지만, null 초기화는 다시 할당하므로 더 빠르다
9.  Closure 메모리 누수에 **유의하며 사용**

| // element를 사용하지 않아도 Closure가 참조하므로 GC에 걸리지 않음 |
| --- |

1.  **eval() 사용 금지**
    *   문자열로 함수를 호출할 수 있도록 해주는 함수
    *   보안 문제로 인해 사용 금지
    *   json 객체를 이용하여 대체 가능 arr[‘functionName’]();
2.  **with 사용 금지**

| var map = { x:1, y:2, z:3 }; |
| --- |

*   *   scope chain에 인자를 추가 해주는 기능
    *   모호성 때문에 사용 금지

1.  **this 생성자, 메서드, 클로저 설정에서만 사용**
    *   다른 scope에서 사용하면 모호성 문제 발생
        1.  일반적으로 global object (window)
        2.  콜백 함수라면 caller
        3.  HTML event binding에서는 DOM tree
2.  일반 배열에서 **for-in 사용 금지**
    *   일반 배열이라면 for 사용
        1.  var arr = new Array(10); // for-in loop에서 순회 불가능
    *   arr = [0, 1, 2, 3]; arr.buhu = ‘wine’;for-in : 0, 1, 2, 3 ‘wine’for : 0, 1, 2, 3
3.  **연관 배열 (Associative array) 사용 금지**
    *   일반 배열에 정수가 아닌 값을 key로 사용 금지
    *   대신 Object 사용 할 것
        1.  { ‘peroperty’: ‘value’ }
4.  긴 문자열을 여러 줄에 나눌 때 **한 줄씩** ‘+’ 연산자 이용

| // BAD : whitespace 문제 발생 |
| --- |

| // GOOD : + 연산자와 함께 한 줄씩 표현 |
| --- |

1.  **new Object, new Array 사용 금지**
    *   new Array(x); // x가 number라면 배열 크기로 초기화, 다른 값이라면 값 할당
    *   var a = [x]; var a2 = [x, y, z]; // 이와 같은 방법으로 사용 할 것
    *   var obj = {}; // 오브젝트 초기화
2.  Object.prototype, Array.prototype 등 **내장 오브젝트 prototype 수정 금지**
    *   다른 코드에 영향을 줄 수 있음
3.  **IE를 위한 조건 주석 사용 금지**

| // Runtime 마다 문법이 상이함 |
| --- |

**&lt; Language Rules &gt;**

1.  Naming

| functionNamesLikeThis |
| --- |

*   *   **camelCase 기반**
    *   파일명의 경우 - (hypen)이 들어갈 수 있음
    *   private의 경우 _ (underscore)와 함께 사용
        1.  Google은 variable_ 와 같은 방식으로 사용함
    *   optional parameter (생략할 수 있는 인자, undefined 될 수 있음) 는 ‘opt_’로 시작

1.  **지연 초기화 (Lazy initialize) 사용** 가능
    *   var foo; … … foo = ‘bar’;
2.  **유효 범위를 명확하게 알고 사용** 할 것
    *   일반적으로 window 객체가 scope chain 이지만, 다른 app에서는 아닐 수 있음
    *   먼저 사용하고자 하는 객체가 있는지 확인 후 사용
3.  Code Formatting
    *   **조건문**

| if (something) { |
| --- |

*   *   **초기화**

| // 배열과 오브젝트의 한 줄 초기화 |
| --- |

*   *   함수 인자는 80자 (column)가 넘어가지 않는다면 한 줄에 표기하는 게 좋음
        1.  [https://google.github.io/styleguide/javascriptguide.xml?showone=Code_formatting#Code_formatting](https://google.github.io/styleguide/javascriptguide.xml?showone=Code_formatting#Code_formatting)
    *   길어서 여러 줄에 걸쳐 표기해야 한다면 **들여쓰기를 통해 연관 있는 것끼리 구분**

| someWonderfulHtml = &#039;&#039; + |
| --- |

*   *   **로직상 연관**있는 것 끼리 **빈 줄**로 구분

| doSomethingTo(x); |
| --- |

*   *   **2항, 3항 연산자**

| // 조건부, 반환1, 2 모두 공백으로 구분 |
| --- |

1.  **단항 연산자**에서 **괄호 사용 금지**

| function foo() { |
| --- |

*   *   delete, typeof, void, return, throw, case, in, new 등이 해당됨

1.  큰 따옴표(“) 보다는 **작은 따옴표(‘) 사용**
    *   HTML element 생성하는 코드와 구분 할 수 있어 편리함
2.  주석은 JSDoc 규칙을 따름
    *   모든 tag를 사용하지는 않음
    *   Visual Code 등 IDE에서 JSDoc을 기반으로 함수를 호출할 때 미리보기 가능하여 편리
    *   [https://google.github.io/styleguide/javascriptguide.xml?showone=Code_formatting#Comments](https://google.github.io/styleguide/javascriptguide.xml?showone=Code_formatting#Comments)
3.  Tip and Tricks
    *   비교식
        1.  false : null, undefined, ‘’(빈 문자열), 0
        2.  true : ‘0’, [], {}
        3.  if (x != null) { … } =====&gt; if (x) { … }
        4.  if (y != null &amp;&amp; y != ‘’) ===&gt; if (y) { … }
    *   **3항 연산자(Ternary operator)**로 특정 조건문을 **단순화** 가능

| // 개선 전 |
| --- |

*   *   **&amp;&amp;**와 **||**을 활용하여 조건문 **단순화** 가능

| function foo(opt_win) { | function foo(opt_win) { |
| --- | --- |

| if (node) { | // 단순히 조건부만 합침 |
| --- | --- |
|  | // &amp;&amp;의 활용 |

*   *   **노드 목록 탐색**

| // O(n^2) |
| --- |

1.  추세는 **4-space 들여쓰기**
    *   1.  tab 저장 시 IDE간 들여쓰기가 깨지기도 함
        2.  따라서 실제 파일이 저장될 때는 4-space가 될 수 있도록 권장

**&lt; 언급되지 않은 사항 &gt;**

1.  **exception** : 사용
2.  **custom exception** : 사용
3.  non-standard fetures 보다는 **standars fetures 권장**
    *   GOOD : string.charAt(3);
    *   BAD : string[3];
4.  Multi-level prototype hierarchies : **prototype 재정의 금지로 선호하지 않음**
5.  side-effect 없이 **toString() 재정의**하여 사용
6.  **Visibility (private, protected ...) 주석 표기 권장**
7.  JSdoc에서 표기 권장하는 자료형 목록이 따로 있음
    *   [https://google.github.io/styleguide/javascriptguide.xml?showone=JavaScript_Types#JavaScript_Types](https://google.github.io/styleguide/javascriptguide.xml?showone=JavaScript_Types#JavaScript_Types)
8.  JS를 더 나은 JS로 **Compile 해주는 프레임워크 사용 권장**
