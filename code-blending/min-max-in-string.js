/**
 * 2017-02-09
 * 문자열에서 최소값과 최대값을 받아서 출력
 * ex) "1 2 3 4" => "1 4"
 */

var input = '1 2 33 4';
var arr = input.match(/\d+/g).map(n => parseInt(n));
var mm = arr.reduce((r, i) => {
    var min = r[0] < i ? r[0] : i;
    var max = r[1] > i ? r[1] : i;
    return [min, max];
}, [arr[0], arr[0]]);

console.log('input: ', input);
console.log('min: ', mm[0]);
console.log('max: ', mm[1]);

