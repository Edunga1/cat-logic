# Cherry Pick

**현재 브랜치**에서 **다른 커밋**을 가져오는 기능.
당연히 새로운 커밋을 만드는 행위이기 때문에 해시가 바뀐다.

아마도 Git 기본 기능은 아니다.

사용법:
```
git cherry-pick <commit-hash>
```

Conflict 일어나는 경우 rebase 처럼 merge 기회가 주어진다.

Hotfix를 갈라진 브랜치에 각각 적용시키기에 좋다.
