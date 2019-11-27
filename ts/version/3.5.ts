/**
 * 原文地址：https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/
 * TypeScript 3.5
 * 版本主要更新内容
 */

/**
 * ================================================================
 * Omit helper type
 * 很多时候，我们想要创建一个省略某些属性的对象，TypeScript 内置的 Pick 和 Exclude helper 可以完成类似的功能。
 * 例如，如果我们想要定义一个没有 location 属性的 Person，可以编写以下内容：
 */

type Person = {
    name: string
    age: number
    location: string
}


type RemainingKeys = Exclude<keyof Person, 'location'>

type QuantumPerson = Pick<Person, RemainingKeys>