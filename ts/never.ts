/**
 * never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
 * 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 * 
 * never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 
 * 即使 any也不可以赋值给never。
 */
function error(message: string): never {
    throw new Error(message);  // 注意：这里是throw出来的，不是return出来的
}

function fail() {
    return error("Something failed");
}

// 无法到终点
function infiniteLoop(): never {
    while (true) {
    }
}

// void是一个类型，只不过是一个空类型，而never表示不会有返回类型，死循环和报错属于此列