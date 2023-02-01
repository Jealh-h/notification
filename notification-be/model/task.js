var mongoose = require('mongoose');
const TaskInfoSchema = new mongoose.Schema({
    "title": String,
    "deadline": Date,
    "id": Number,
    "email": String,
    "description": String,
    "status": String,
    "year": Number,
    "month": Number,
    "date": Number,
    "timeStamp": Number
})
// 在连接的数据库中创建task表
var TaskModoel = mongoose.model('task', TaskInfoSchema);
module.exports = TaskModoel;