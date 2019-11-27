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

// 通过--config指定执行的文件是哪一个
1) 就是默认引用base 传入模式
2) 分别引入dev prod

// webpack merge 用来合并配置文件
// 如果是开发环境要使用webpack-dev-server
// webpack-dev-server 是在内存中打包，不会产生实体文件


// 自动生成html文件并且引入打包后的js内容


// 先解析css
// css-loader 会解析css语法  style-loader 会将解析的css 变成style标签插入到页面中
// loader的执行顺序 默认是从下往上执行  从右边往左边
// 解析css 需要两个loader  css-loader + style-loader

// 预处理器 .scss node-sass sass-loader
           .less  less  less-loader
           .stylus  stylus stylus-loader

// 图片 + icon
// js


// react + vue