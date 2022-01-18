const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const cp = require('child_process');

const app = express();
const webpackConfig = require('../config/webpack.config.js');
const config = webpackConfig('development')
const complier = webpack(config);

// 告知express使用webpack-dev-middleware,
// 并设置webpack.config配置文件作为基础配置
app.use(
    webpackDevMiddleware(complier, {
        publicPath: config.output.publicPath,
    })
)
// 热模块替换
app.use(require("webpack-hot-middleware")(complier));

let port = config.devServer.port ?? 3000;

try {
    app.listen(port, function () {
        console.log("The aplication listening on port 3000,\x1B[34m%s\x1B[0m", "http://localhost:3000");
        if (config.devServer.open) {
            openBrowser(`http://localhost:${port}`);
        }
    });
} catch (err) {
    console.log(err);
}

function openBrowser(url) {
    // 使用base64编码的指令
    let command = Buffer.from(`start ${url}`, 'utf16le').toString('base64');
    let subprocess = cp.spawn(`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`, [
        '-EncodedCommand',
        command
    ])
    subprocess.unref();
}

