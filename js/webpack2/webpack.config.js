const path = require('path')


const glob = require('glob')


glob.sync('./src/**/*', { nodir: true })

module.exports = (env) => {
    return {
        mode: env,
        entry: './src/index.js'
    }
}