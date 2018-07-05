# Johnpapa's AngularJS Style Guide - Component

## 컨트롤러

### [`contollerAs`와 `vm` 사용하기](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y032)

controllerAS + vm 사용하고 `this` 변수에 담고 직접 사용하지 않는다.

```javascript
/* avoid */
function CustomerController() {
    this.name = {};
    this.sendMessage = function() { };
}
```

```javascript
/* recommended */
function CustomerController() {
    var vm = this;
    vm.name = {};
    vm.sendMessage = function() { };
}
```

## 서비스 (service, factory, provider)

### [서비스 코드 작성은 Revealing Module Pattern](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y052)

멤버 변수 및 함수는 상단에 위치하여 바로 구분할 수 있도록한다:
[Revealing Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

1. 이는 서비스가 사용 가능한 정보를 파악하는데 도움을 주고 유닛 테스트 대상이며 Mocking 할 수 있음을 의미한다.
1. 구현 코드가 길어지더라도 스크롤을 내리지 않고 expose 된 기능 및 값을 한눈에 파악할 수 있다.
1. 함수 설정을 쉽게 할 수 있다. 구현 세부사항을 return 아래로, 호추가능한 인터페이스를 위로 두면 읽기 쉽다.

```javascript
/* avoid */
function dataService() {
  var someValue = '';
  function save() {
    /* */
  };
  function validate() {
    /* */
  };

  return {
      save: save,
      someValue: someValue,
      validate: validate
  };
}
```

```javascript
/* recommended */
function dataService() {
    var someValue = '';
    var service = {
        save: save,
        someValue: someValue,
        validate: validate
    };
    return service;

    ////////////

    function save() {
        /* */
    };

    function validate() {
        /* */
    };
}
```
