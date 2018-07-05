# var foo = (bar = 1, bar + 1);

```javascript
var foo = (bar = 1, bar + 1);
console.log(bar); // 1
console.log(foo); // 2
```

`bar = 1` 이후 `bar + 1`의 반환.

`Array.prototype.reduce` 같은 메서드에서 유용하다.
