var mongoose = require('mongoose');
mongoose.connect('mongodb://noti_dbma:notification@47.99.199.187/notification');
console.log('connecting...');
mongoose.connection.on('open', function () {
    console.log("mongodb connect successfully");
});
mongoose.connection.on('error', function () {
    console.log("mongodb connect fail");
})
// var UserModoel = mongoose.model('User', new mongoose.Schema({}));
// UserModoel.findOne(function (error, result) {

// })
