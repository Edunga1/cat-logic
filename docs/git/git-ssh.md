---
id: page-24
tags: git
---
# Git ssh

맥에서 Git을 사용하다 보면 특별한 경우가 아닌 이상 한 번 로그인하면 다시 로그인하는 일은 없다.

keychain으로 비밀번호를 관리하는게 아닌가 싶다.

다른 환경에서는 매번 로그인 과정이 필요했다.  

이 때는 github에 ssh public key를 등록하면 된다.

[https://help.github.com/articles/generating-an-ssh-key/](https://help.github.com/articles/generating-an-ssh-key/)

자동 로그인만으로 끝나면 좋겠지만

프로젝트를 `git clone http://....` 로 받았다면 이미 remote url은 http로 되어 있기 때문에

```
git@github.com:<USERNAME>/<REPOSITORY>.git
```

위와 같은 형태로 변경해야 한다.

그렇지 않으면 fetch 등 remote url에 접근할 수 없다.
