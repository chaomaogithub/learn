const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    let isDev = env.development

    const base = {
        entry: path.resolve(__dirname, '../src/index.js'),
        module: {
            // 转化什么文件，用什么去转，使用哪些loader
            // loader 写法 [] / {} ''
            // 打包css 还需要处理一下 样式的前缀

            // 解析css的时候，就不能渲染dom
            // css可以并行和js 一同加载 mini-css-extract-plugin
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { // 给loader传递参数
                                // 如果css引入了其他文件 @import
                                importLoaders: 1
                            }
                        } , 'css-loader'
                    ]
                }, { // 匹配到scss结尾的使用scss-loader 来调用node-sass处理sass文件
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../dist')
        },
        plugins: [
            !isDev && new MiniCssExtractPlugin({
                filename: 'css/main.css'
            }),
            // 每次打包之前，先清除dist目录下的文件
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
                minify: !isDev && {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true
                }
            })
        ].filter(Boolean)
    }

    if (isDev) {
        return merge(base, dev)
    } else {
        return merge(base, prod)
    }
}