/**
 * ==================================
 * 1. RegExp 构造函数
 * 
 */
// ES5 不允许此时使用第二个参数添加修饰符，否则会报错。
var regex = new RegExp(/xyz/, 'i');

/**
 * ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
 * 而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
 */

new RegExp(/abc/ig, 'i').flags
// "i"
// 上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。


/**
 * =============================
 * 2. 字符串的正则方法
 * 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
 * ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
 * String.prototype.match 调用 RegExp.prototype[Symbol.match]
 * String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
 * String.prototype.search 调用 RegExp.prototype[Symbol.search]
 * String.prototype.split 调用 RegExp.prototype[Symbol.split]
 */


/**
 * 3. U修饰符
 * 
 * ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
 */
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true

/**
 * 上面代码中，\uD83D\uDC2A是一个四个字节的 UTF-16 编码，代表一个字符。但是，ES5 不支持四个字节的 UTF-16 编码，
 * 会将其识别为两个字符，导致第二行代码结果为true。加了u修饰符以后，ES6 就会识别其为一个字符，所以第一行代码结果为false。
 * 
 * 一旦加上u修饰符号，就会修改下面这些正则表达式的行为。
 * 
 * (1)点字符
 * 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
 */
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true


/**
 * （2）Unicode 字符表示法
 * 
 * ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。
 */
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true


/**
 * =========================================
 * 4. RegExp.prototype.unicode 属性
 * 
 * 正则实例对象新增unicode属性，表示是否设置了u修饰符。
 */

const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true