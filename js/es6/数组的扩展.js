// =======================================================
const log = console.log

// 1、扩展运算符
console.log(...[1, 2, 3])
// 1 2 3


console.log(1, ...[2, 3, 4], 5)

// 1 2 3 4 5

// 该运算符主要用于函数调用

function push(array, ...items) {
    array.push(...items)

    console.log(array)
}

push([1, 2], [3, 4], [5, 6])
// [ 1, 2, [ 3, 4 ], [ 5, 6 ] ]

// 如果扩展运算符后面是一个空数组，则不产生任何效果。

console.log([...[], 1])
// [1]

// 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

// (...[1, 2])
// Uncaught SyntaxError: Unexpected number

// console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

// console.log(...[1, 2])
// 1 2



// 替代函数的 apply 方法
// 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr3 = [0, 1, 2];
let arr4 = [3, 4, 5];
arr3.push(...arr4);

console.log(arr3)


// 复制数组
console.log('=======复制数组======')
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
console.log(a1) // [1, 2]


const a3 = [1, 2]
const a4 = [ ...a3 ]

a4[0] = 2

console.log(a3)

// 也可以

const [...a5] = a1;

console.log(a5)


// 合并数组
// const arr1 = ['a', 'b'];
// const arr2 = ['c'];
// const arr3 = ['d', 'e'];

// ES5 的合并数组
// arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
// [...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

// 与解构赋值结合
log('============ 与解构赋值结合 =============')
const [first, ...rest] = [1, 2, 3, 4, 5];
log(first) // 1
log(rest)  // [2, 3, 4, 5]


//  字符串
// 扩展运算符还可以将字符串转为真正的数组
log([...'hello'])
// [ "h", "e", "l", "l", "o" ]

// 上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
log('x\uD83D\uDE80y'.length) // 4
log([...'x\uD83D\uDE80y'].length) // 3


// 2.Array.from()
log('======= Array.from() =======')
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和
// 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
log([].slice.call(arrayLike)); // ['a', 'b', 'c']

// ES6的写法
log(Array.from(arrayLike)); // ['a', 'b', 'c']

// 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
log(Array.from('hello'))
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
log(Array.from(namesSet)) // ['a', 'b']

// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
/**
 * 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
 * Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
 * 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
 */

log(Array.from({ length: 3 }));
// [ undefined, undefined, undefined ]
// 上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。


// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

log(Array.from([1, 2, 3], (x) => x * x))
// [1, 4, 9]


/**
 * Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，
 * 可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
 */
function countSymbols(string) {
    return Array.from(string).length;
}


// 3.Array.of()
log('======= Array.of() =======')
// Array.of方法用于将一组值，转换为数组。
log(Array.of(3, 11, 8)) // [3,11,8]
log(Array.of(3)) // [3]
log(Array.of(3).length) // 1

// 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
log(Array()) // []
log(Array(3)) // [, , ,]
log(Array(3, 11, 8)) // [3, 11, 8]

// Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

log(Array.of()) // []
log(Array.of(undefined)) // [undefined]
log(Array.of(1)) // [1]
log(Array.of(1, 2)) // [1, 2]

// Array.of方法可以用下面的代码模拟实现。
function ArrayOf() {
    return [].slice.call(arguments)
}

console.log(ArrayOf(1, 1, 3))




// 4.数组实例的 copyWithin()
log('======= 数组实例的 copyWithin() =======')
// 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），
// 然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

// Array.prototype.copyWithin(target, start = 0, end = this.length)
/**
它接受三个参数。

target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
*/
let arr4_1 = [1, 2, 3, 4, 5]

arr4_1.copyWithin(0, 3)
log(arr4_1)
// [4, 5, 3, 4, 5]




// 5.数组实例的find()和findIndex()
log('======= 数组实例的find()和findIndex() =======')
// 数组实例的find方法，用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
// 如果没有符合条件的成员，则返回undefined。
log([1, 4, -5, 10].find((n) => n < 0))
// -5
// find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
log([1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
})) // 2

// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
function f(v){
    return v > this.age;
}
let person = {name: 'John', age: 20};
log([10, 12, 26, 15].find(f, person));    // 26


// 另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。

log([NaN].indexOf(NaN))
// -1

log([NaN].findIndex(y => Object.is(NaN, y)))
// 0


// 6.数组实例的fill
log('======= 数组实例的fill =======')
log(['a', 'b', 'c'].fill(7))
// [7, 7, 7]

log(new Array(3).fill(7))
// [7, 7, 7]

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
log(['a', 'b', 'c'].fill(7, 1, 2))
// ['a', 7, 'c']

// 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

let arr7_1 = new Array(3).fill({name: "Mike"});
arr7_1[0].name = "Ben";
log(arr7_1)
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr7_2 = new Array(3).fill([]);
arr7_2[0].push(5);
log(arr7_2)
// [[5], [5], [5]]



// 7.数组实例的 entries()，keys() 和 values()
// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象
// 可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
log('======= 数组实例的 entries()，keys() 和 values() =======')
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1
/*
for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
*/
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"


// 8.数组实例的includes()方法
// 该方法的第二个参数表示搜索的起始位置，默认为0。
// 如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
log('======= 数组实例的includes()方法 =======')
log([1, 2, 3].includes(2))     // true
log([1, 2, 3].includes(4))     // false
log([1, 2, NaN].includes(NaN)) // true

/**
 * indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。
 * 二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
 */
log([NaN].indexOf(NaN))  // -1
log([NaN].includes(NaN))  // true