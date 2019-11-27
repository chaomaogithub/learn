// webpack 是基于nodejs 语法commonjs规范
const path = require('path')

module.exports = {
    mode: 'development', // 当前是开发模式
    entry: path.resolve(__dirname, './src/index.js'), // 写路径都采用绝对路径
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}

// 一般情况下，我们分为两个模式，一个开发模式
// 一个是生产模式
// 基本配置
module.exports = (env) => {
    console.log(env)
}