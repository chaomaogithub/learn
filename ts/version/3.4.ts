/**
 * TypeScript 3.4
 * 版本主要更新内容
 * 1、使用 --incremental flag 加快后续构建
 * 2、泛型函数的高阶类型推导
 * 3、ReadonlyArray 和 readonly 元组的改进
 * 4、const 断言
 * 5、将参数转换成析构对象
*/

/**
 * 使用 --incremental flag 加快后续构建
 * TypeScript 3.4 引入了一个名为 --incremental 新的flag，它会提醒TypeScript保存上一次编译中有关项目图的信息。这样下次TypeScript调用
 * --incremental 时，它将使用该信息以最低的成本来进行类型检查
 */