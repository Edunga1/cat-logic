# 보안

소프트웨어와 뗄 수 없는 관계. 사용자, 데이터, 시스템 모든 곳에서 적용된다.

## xz 백도어 이슈

2024년 3월. 압축 라이브러리인 xz 5.6.1 버전에서 백도어의 발견이 보고되었다.

https://boehs.org/node/everything-i-know-about-the-xz-backdoor \
이 글은 백도어의 발견을 최초로 발견한 사람이 타임라인 기반으로 작성한 글이다.

2024년에 발견되었지만, 백도어를 심은 "Jia Tan"은 2021년부터 활동을 시작했다.

이 사건은 사회공학적 공격이라고 할 수 있다. xz라는 리눅스 시스템의 여러 컴포넌트에서 사용되는 범용적인 압축 라이브러리다.
이 도구는 오픈소스로, 메인테이너는 휴식기를 가지고 있었고, "Jia Tan"이 개선사항을 보내며 신뢰를 얻으며 xz의 메인테이너가 되었다.

메인테이너가 되기까지 과정에서 "Jigar Kumar"와 "Dennise Ens"라는 사람이 기존 xz의 유지보수에 대해 기존 메인테이너에게 압박을 가하며 "Jia Tan"이 메인테이너가 되도록 부추겼다.

xz라이브러리 뿐만 아니라 oss-fuzz라는 보안 취약점을 찾아내는 프로젝트에 보안 옵션을 비활성화하는 PR을 보내며 백도어를 심기위한 물밑 작업도 했다.

xz의 GitHub 저장소는 폐쇄되었다. 아카이브가 아닌 삭제처리 되었다.

Homebrew를 사용한다면 의존성의 의존성으로써 xz가 설치되었을 확률이 높다. `xz --version`으로 5.6.1 버전이면 백도어가 있는 버전. `brew upgrade`로 이전 버전으로 다운그레이드 된다.

**흔적**

https://github.com/advisories/GHSA-rxwq-x6h5-x525 \
xz의 백도어 발견을 보고한 GitHub Security Advisory.

https://github.com/google/oss-fuzz/pull/10667 \
이 링크는 23년 7월, "Jia Tan"이 oss-fuzz 프로젝트에 ifuncs를 비활성화하는 Pull Request.\
제목은 `xz: Disable ifunc to fix Issue 60259` 인데, `60259`라는 이슈 번호는 존재하지 않는다. 즉, 마치 필요하여 비활성화하는 것처럼 꾸며냈다.\

https://github.com/google/oss-fuzz/pull/10667#pullrequestreview-1518981986 \
안타깝게도 리뷰어는 `lgtm`(looks good to me)와 함께 승인했다. 백도어 발견 후 리뷰어는 사실 lgtm이 아니었다며 후회의 뜻을 밝혔다.\
(덧글 수정이 있어서, `edited` 텍스트를 눌러 최초 버전을 확인하면 `lgtm`을 볼 수 있다.)

https://github.com/google/oss-fuzz/pull/10667#issuecomment-2027618608 \
> In hindsight, this does not "look good to me" :-)
> We've disabled the projects for now, but will try to explore how this PR could have prevented discovery of this issue.

https://github.com/Homebrew/homebrew-core/commit/87f6efb7e4aea3c4442d50a54451a20e1fbc1a83 \
Homebrew의 xz 패키지의 버전을 5.6.1 -> 5.4.6 다운그레이드하는 커밋. \
덧글에 따르면 macOS에서 문제가 되었다는 보고는 없었다고 한다.
