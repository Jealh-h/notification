var express = require('express');

// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://noti_dbma:notification@47.99.199.187/notification');
mongoose.connection.on('open', function () {
    console.log("mongodb connect successfully");
});
mongoose.connection.on('error', function () {
    console.log("mongodb connect fail");
})

const userRouter = require('./routes/user');
var app = express();
app.all('*', (req, res, next) => {
    res.set({
        "content-type": "text/plain",
        "Access-Control-Allow-Origin": "http://localhost:4000",
        "Access-Control-Allow-Credentials": true
    });
    next();
})
app.all('/api', (req, res, next) => {
    // 对api路径下的接口进行token验证
    next();
})
app.use('/api/test', (req, res, next) => {
    res.end('express test');
})
app.use('/cookie', (req, res, next) => {
    res.cookie('cookieTest', "123456");
    res.end('set-cookie success')
})
app.use('/api/user', userRouter);
// 处理404
app.use(function (req, res, next) {
    res.set('status', '404');
    res.end('404');
})
app.listen(3003, () => {
    console.log("server is listening on port 3003");
});
