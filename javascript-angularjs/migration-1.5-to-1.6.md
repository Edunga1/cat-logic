# Migrating 1.5 to 1.6

## Component

Lifecycle이 생겼다.

컴포넌트의 컨트롤러 내에서 this.$onInit을 구현하면(함수) 컴포넌트가 초기화 될 때 호출된다.
이 방법으로 tabs를 구현한 공식 예제:

https://docs.angularjs.org/guide/component

Intercomponent Communication 단락 참조

## $http

이제 success, error가 아니라 then, catch를 사용한다. 더 이상 $q.defer()로 wrapping 할 필요가 없다.

