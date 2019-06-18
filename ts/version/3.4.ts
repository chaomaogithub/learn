/**
 * 原文地址：https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/
 * TypeScript 3.4
 * 版本主要更新内容
 * 1、使用 --incremental flag 加快后续构建
 * 2、泛型函数的高阶类型推导
 * 3、ReadonlyArray 和 readonly 元组的改进
 * 4、const 断言
 * 5、将参数转换成析构对象
*/

/**
 * ===================================================================
 * 使用 --incremental flag 加快后续构建
 * TypeScript 3.4 引入了一个名为 --incremental 新的flag，它会提醒TypeScript保存上一次编译中有关项目图的信息。这样下次TypeScript调用
 * --incremental 时，它将使用该信息以最低的成本来进行类型检查
 */


/**
 * 运行tsc默认会被设置，TypeScript会在输出文件夹中查找一个名为.tsbuildinfo的文件，
 * 如果./lib/.tsbuildinfo不存在，它将会生成；如果存在，tsc会使用这个文件进行类型检查，同时更新输出的文件
 * 这些.tsbuildinfo文件可以安全地删除，并且在运行时对我们的代码没有任何影响 - 它们纯粹用于更快地进行编译。
 * 我们也可以将它们命名为我们想要的任何东西，并使用--tsBuildInfoFile标志将它们放在我们想要的任何地方。
 */

// 只要没有其他人尝试写入相同的缓存文件，我们应该能够享受更快的增量冷构建。


 /**
  * 泛型函数的高阶类型推导
  * 此版本在推导方面的有一些改进，其中一大亮点是涉及从其它泛型函数推导类型的函数
  * 考虑以下片段
  */
function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
    return x => g(f(x))
}

/**
 * compose 接受其它两个函数：
 * f 接受类型 A 的一些参数并返回类型 B 的值
 * g 接受类型 f 返回的类型 B 的参数，并返回类型 C 的值
 */
interface Person {
    name: string
    age: number
}

function getDisplayName(p: Person) {
    return p.name.toLocaleLowerCase()
}

function getLength(s: string) {
    return s.length
}


const getDisplayNameLength = compose(
    getDisplayName,
    getLength,
)

// 正常工作返回 'number' 类型
getDisplayNameLength({ name: "Person McPersonface", age: 42 })

// 但是当传奇其它泛型函数时，像compose这样的泛型函数无法生效，比如
interface Box<T> {
    value: T;
}

function makeArray<T>(x: T): T[] {
    return [x];
}

function makeBox<U>(value: U): Box<U> {
    return { value };
}

// has type '(arg: {}) => Box<{}[]>'
const makeBoxedArray = compose(
    makeArray,
    makeBox,
)

makeBoxedArray("hello!").value[0].toUpperCase();
//                                ~~~~~~~~~~~
// error: Property 'toUpperCase' does not exist on type '{}'.

// 这其中会出现推导出错。现在 TypeScript 3.4 在推导返回类型为函数的泛型函数的参数类型时，
// 将根据需要将泛型函数参数中的类型参数传播到生成的函数类型中。也就是说，现在不生成：

// (arg: {}) => Box<{}[]>

// 而是生成：

//<T>(arg: T) => Box<T[]>


/**
 * ===================================================================
 * ReadonlyArray 和 readonly 元组的改进
 * TypeScript 3.4 中使用只读数组类型变得更加容易。
 * ReadonlyArray 类型描述了只能读取的数组，任何引用 ReadonlyArray 的变量都不能增或删，也不能在替换数组元素。
 * TypeScript 3.4 为 ReadonlyArray 引入了一种新的数组类型只读修饰符 readonly，简化了对数组只读的限定：
 */

 function foo(arr: readonly string[]) {
    arr.slice() // okey
    arr.push('hello')  // error
 }

 // 此外，可以使用 readonly 关键字为任何元组类型添加前缀，使其成为只读元组，就像上边说的可以使用数组简写语法一样：

 function foo2(pair: readonly [string, string]) {
    console.log(pair[0]);   // okay
    pair[1] = "hello!";     // error
}

/**
 * const 断言
 * TypeScript 3.4 引入了一个名为 const 断言的文字值结构，它的语法是一个类型断言，用 const 代替类型。
 */

 // Type '10'
let x = 10 as const;

// Type 'readonly [10, 20]'
let y = [10, 20] as const;

// Type '{ readonly text: "hello" }'
let z = { text: "hello" } as const;

z.text = 'sasa' // error


// 在非.tsx文件中，还可以使用尖括号断言语法
// Type '10'
let x = <const>10;

// Type 'readonly [10, 20]'
let y = <const>[10, 20];

// Type '{ readonly text: "hello" }'
let z = <const>{ text: "hello" };





// 此功能意味着一般情况下可以省略原本仅用于提示编译器不可变性的类型：

// Works with no types referenced or declared.
// We only needed a single const assertion.
function getShapes() {
    let result = [
        { kind: "circle", radius: 100, },
        { kind: "square", sideLength: 50, },
    ] as const;
    
    return result;
}

for (const shape of getShapes()) {
    // Narrows perfectly!
    if (shape.kind === "circle") {
        console.log("Circle radius", shape.radius);
    }
    else {
        console.log("Square side length", shape.sideLength);
    }
}

// 请注意，上面不需要类型注释。 const断言允许TypeScript采用表达式的最特定类型。

// 如果你选择不使用TypeScript的枚举结构，它甚至可以在JavaScript表达式中，当做类枚举结构来使用
export const Colors = {
    red: "RED",
    blue: "BLUE",
    green: "GREEN",
} as const;

// or use an 'export default'

export default {
    red: "RED",
    blue: "BLUE",
    green: "GREEN",
} as const;

/**
 * 注意事项
 * 需要注意一点的是，const断言应用于简单的表达式
 */
// Error! A 'const' assertion can only be applied to a
// to a string, number, boolean, array, or object literal.
let a = (Math.random() < 0.5 ? 0 : 1) as const;

// Works!
let b = Math.random() < 0.5 ?
    0 as const :
    1 as const;


// 另一个需要记住的是，const上下文不会立即将表达式转换为完全不可变的
let arr = [1, 2, 3, 4];

let foo3 = {
    name: "foo",
    contents: arr,
} as const;

foo3.name = "bar";   // error!
foo3.contents = [];  // error!

foo3.contents.push(5); // ...works!


/**
 * ===================================================================
 * globalThis 类型检查
 * 在全局范围内访问或声明值有时会非常困难，TypeScript 3.4 支持 ECMAScript 新全局变量 globalThis 类型检查。globalThis 提
 * 供了一种访问全局范围的标准方法，可以在不同的环境中使用。
 */

 // in a global file:

var abc = 100;

// Refers to 'abc' from above.
globalThis.abc = 200;

// 用 let 和 const 声明的全局变量不会出现在 globalThis 上：

let answer = 42;

// error! Property 'answer' does not exist on 'typeof globalThis'.
globalThis.answer = 333333;



/**
 * =================================================
 * 将参数转换为析构对象
 * 有时参数列表会显得笨重，比如以下例子，调用者很容易混淆给定的参数顺序。：
 */
function updateOptions(
    hue?: number,
    saturation?: number,
    brightness?: number,
    positionX?: number,
    positionY?: number,
    positionZ?: number,) {
    
    // ....
}

// 常见的 JavaScript 模式是使用“选项对象”，以便明确命名每个选项，并且顺序无关紧要。这模拟了其它语言称为“命名参数”的功能：
interface Options {
    hue?: number,
    saturation?: number,
    brightness?: number,
    positionX?: number,
    positionY?: number,
    positionZ?: number,
}

function updateOptions2(options: Options = {}) {
    
    // ....
}

// TypeScript 3.4 中实现了一种重构，将现有函数转换为使用这种“命名参数”模式：
function greet(name: string, location: string) {
    console.log(`Hello ${name}!`)
    console.log(`How do you like ${location}`)
}

greet('aaa', 'bbbbb')


// 在存在多个参数的情况下，TypeScript 会提供重构以将参数列表转换为单个析构对象。