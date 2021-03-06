---
id: page-71
time: 2018-07-23 21:59:00
---
# 안정된 의존관계 원칙(Stable Dependencies Principle)

DIP를 지킨다고 모든 의존성을 주입받아야 될까? 그런 클래스가 있다면 너무 사용하기 어려울 것이다.

[엉클 밥의 principles of component design (한글 자막)](https://amara.org/ko/videos/XJGyts0sfDVQ/info/robert-c-martin-principles-of-component-design/)
에서 어떤 클래스를 주입 받아야 하는지 알려준다. 주제는 컴포넌트 설계에 대한 내용이다.
우아한 형제들 기술 블로그 [안정된 의존관계 원칙과 안정된 추상화 원칙에 대하여 - 손권남님](https://woowabros.github.io/study/2018/03/05/sdp-sap.html)
에서는 안정된 의존관계 원칙에 대해서 집중 조명한다.

String 클래스를 주입받아 사용하지는 않는다. 이러한 유틸 클래스를 모두 주입하면 코드의 복잡도는 더욱 증가할 거 같다.

두 글을 읽어보면 '변경되는', '변경되지 않는' 이라는 말이 자주 나온다.
어째서 String 클래스는 변경되지 않는 **안정된** 클래스일까?

일단 *모든 코드는 변경될 수 있으니까, 불안정하다고 봐야겠네* 라고 접근하는 건 아닌게 확실하다.

**변경되지 않는다는 말은 용도가 명확하다**라고 생각하면 이해하면 될 거 같다.
자바스크립트에서 String 클래스의 메서드를 사용하는 이유는 명확해 보인다.
정규식으로 특정 문자열을 뽑아내기 위해서 ```.match()```를 쓰고, 특정 범위를 추출하기 위해서 ```.substr()```를 쓴다.
각각 ```(string, REGEX) => string```, ```(string) => string```이다. 다른 변수가 끼어들만한 것은 없어 보인다.

그러니까 여러개의 정책을 가질 필요가 없어보인다. 단 하나의 정책만 있으면 된다고 생각한다.

불안정한 클래스의 대표적인 예는 [마틴 파울러의 제어의 역전(IoC)에 대한 글](http://gyumee.egloos.com/2512493)이다.
```MovieLister``` 클래스와 ```MovieFinder``` 클래스 관계에 대한 이야기가 나온다.
여기서 ```MovieFinder``` 클래스는 정책을 가진다. 이름 목록을 *텍스트 파일*에서 *데이터베이스*에서 *웹 서비스*에서, 어디서든 가져올 수 있다.
그래서 ```MovieFinder``` 클래스는 추상 클래스가 되어, 내부 구현은 어떻든 이름 목록만 반환하도록 한다.

---

깃북 관리 페이지를 만들어 보려다가 마크다운 파일의 Front Matter를 파싱해야 하는 일이 생겼다.
마침 npm에 좋은 라이브러리가 있어서 가져다 쓰려고 했다. ([front-matter](https://www.npmjs.com/package/front-matter))
이 모듈을 필요로하는 클래스에서 ```require```해서 사용하다가 *외부 라이브러리니까 주입 받아야되지 않을까?* 라고 생각했다.

기나긴 시간동안 고민을 통해... **특정 상황에 따라서 파싱 라이브러리를 바꾸지는 않겠구나** 싶어서 그냥 그대로 두었다.
바꾼다면 라이브러리를 사용하는 클래스를 고치겠구나.
