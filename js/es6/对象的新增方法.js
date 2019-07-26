// 1. Object.is()

/**
 * ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
 * 它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。
 * JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
 */

/** 
 * ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。
 * Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
 */

Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true


// ES5可以通过下面的代码，部署Object.is
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
      if (x === y) {
        // 针对+0 不等于 -0的情况
        return x !== 0 || 1 / x === 1 / y;
      }
      // 针对NaN的情况
      return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
})

// 2. Object.assign()
// Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。

Object.assign({b: 'c'},
    Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
    })
)
// { b: 'c' }
// 上面代码中，Object.assign要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。

// 属性名为 Symbol 值的属性，也会被Object.assign拷贝。

Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }

// 注意点
// （1）浅拷贝
// Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2

// （2）同名属性的替换
// 对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }


// （3）数组的处理
// Object.assign可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]


// （4）取值函数的处理
// Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

const source = {
    get foo() { return 1 }
};
const target = {};
  
Object.assign(target, source)
// { foo: 1 }


// 4. __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

// __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。


// Object.setPrototypeOf()
// Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。
// 它是 ES6 正式推荐的设置原型对象的方法。

// 格式
// Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

// 上面等同于下面的函数
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}

let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40

// 上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。


// Object.getPrototypeOf() 

// 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
function Rectangle() {
// ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false




// 5. Object.keys()，Object.values()，Object.entries()
// ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]

// Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]

// Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]




// 6. Object.fromEntries()
// Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
  ])
  // { foo: "bar", baz: 42 }

  const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }

// 该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }