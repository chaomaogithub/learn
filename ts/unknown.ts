/**
 * TypeScript 3.0 引入了新的unknown 类型，它是 any 类型对应的安全类型。
 * unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。
 * 而在对 any 类型的值执行操作之前，我们不必进行任何检查。
 */

 // any 类型
 let value: any;

 value = true;             // OK
 value = 42;               // OK
 value = "Hello World";    // OK
 value = [];               // OK
 value = {};               // OK
 value = Math.random;      // OK
 value = null;             // OK
 value = undefined;        // OK
 value = new TypeError();  // OK
 value = Symbol("type");   // OK
 
/**
 * any 类型本质上是类型系统的一个逃逸舱。作为开发者，这给了我们很大的自由：
 * TypeScript允许我们对 any 类型的值执行任何操作，而无需事先执行任何形式的检查。
 * 
 * 在上述例子中，变量 value 被定义成类型 any。也是因此，TypeScript 认为以下所有操作都是类型正确的：
 */

let value2: any;

value2.foo.bar;  // OK
value2.trim();   // OK
value2();        // OK
new value2();    // OK
value2[0][1];    // OK


// unknown 类型
// 就像所有类型都可以被归为 any，所有类型也都可以被归为 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）。

let value3: unknown;

value3 = true;             // OK
value3 = 42;               // OK
value3 = "Hello World";    // OK
value3 = [];               // OK
value3 = {};               // OK
value3 = Math.random;      // OK
value3 = null;             // OK
value3 = undefined;        // OK
value3 = new TypeError();  // OK
value3 = Symbol("type");   // OK

// 当我们尝试将类型为 unknown 的值赋值给其他类型的变量时会发生什么？

let value4: unknown;

let value11: unknown = value4;   // OK
let value12: any = value4;       // OK
let value13: boolean = value4;   // Error
let value14: number = value4;    // Error
let value15: string = value4;    // Error
let value16: object = value4;    // Error
let value17: any[] = value4;     // Error
let value18: Function = value4;  // Error

/**
 * unknown 类型只能被赋值给 any 类型和 unknown 类型本身。直观的说，这是有道理的：只有能够保存任意类型值的容器才能保存 unknown 类型的值。
 * 毕竟我们不知道变量 value 中存储了什么类型的值。
 */

let value5: unknown;

value5.foo.bar;  // Error
value5.trim();   // Error
value5();        // Error
new value5();    // Error
value5[0][1];    // Error

// 将 value 变量类型设置为 unknown 后，这些操作都不再被认为是类型正确的。通过改变 any 类型到 unknown 类型，
// 我们的默认设置从允许一切翻转式的改变成了几乎什么都不允许。

/**
 * 这是 unknown 类型的主要价值主张：TypeScript 不允许我们对类型为 unknown 的值执行任意操作。
 * 相反，我们必须首先执行某种类型检查以缩小我们正在使用的值的类型范围。
 */


// 对 unknown 类型使用类型断言

// 如果要强制编译器信任类型为 unknown 的值为给定类型，则可以使用类似这样的类型断言：

const value6: unknown = "Hello World";
const someString: string = value6 as string;
const otherString = someString.toUpperCase();  // "HELLO WORLD"

/**
 * 请注意，TypeScript 事实上未执行任何特殊检查以确保类型断言实际上有效。类型检查器假定你更了解并相信你在类型断言中使用的任何类型都是正确的。
 * 如果你犯了错误并指定了错误的类型，这很容易导致在运行时抛出错误：
 */
const value7: unknown = 42;
const someString2: string = value7 as string;
const otherString2 = someString2.toUpperCase();  // BOOM
/**
 * 这个 value 变量值是一个数字, 但我们假设它是一个字符串并使用类型断言 value as string。所以请谨慎使用类型断言！
 */