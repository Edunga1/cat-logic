# NodeJS 상호 참조 문제

**Foo.js**:
```javascript
var Bar = require('./Bar');
console.log('Foo', Bar.CONT);

module.exports = class Foo {

    static get CONT() {
        return 'foo';
    }
}
```

**Bar.js**:
```javascript
var Foo = require('./Foo');
console.log('Bar', Foo.CONT);

module.exports = class Bar {

    static get CONT() {
        return 'bar';
    }
}
```

**app.js**:
```javascript
var Foo = require('./Foo');
var Bar = require('./Bar');
```

**Result**:
```bash
$ node app.js
Bar undefined
Foo bar
```

```Foo.js```와 ```Bar.js```는 서로 상호 참조를 하고 있다.

상호 참조를 하면 한 쪽 모듈은 ```require('...')``` 빈 오브젝트(```{}```)를 반환한다.
모듈을 찾지 못하는 것과는 다른 상황.

```Bar.js:19```는 ```{}.Cont```을 하고 있는 상황이다.
