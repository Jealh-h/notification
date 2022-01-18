const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');

/**
 * abandoned
 */

function watch() {
    const complier = webpack(webpackConfig('development'));
    const watching = complier.watch({
        // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        const info = stats.toJson();
        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
    })
}