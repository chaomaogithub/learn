const path = require('path')
module.exports = {
    mode: 'development',
    devServer: {
        port: 3000,
        compress: true,  // gzip可以
        contentBase: path.resolve(__dirname, '../dist')
    }
}