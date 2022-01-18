const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');


// function build() {
//     const compiler = webpack(webpackConfig);
//     return new Promise(function (resolve, reject) {
//         compiler.run(function (err, stas) {
//             if (stas.hasErrors) {
//                 console.log(err, stas);
//                 // throw Error("build时出错了:" + err?.message);
//             } else {
//                 reject("编译时没有错误");
//             }
//             compiler.close(function (closeErr) {
//                 // print.warn("关闭webpack编译器时出现错误:" + closeErr);
//             })
//         })
//     })
// }
// build();
const complier = webpack(webpackConfig('production'));
complier.run((err, stats) => {
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