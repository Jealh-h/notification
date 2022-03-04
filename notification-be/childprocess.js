const mongoose = require('mongoose');
const taskDAO = require('./DAO/task');
const urlConfigs = require('./configs/urlConfig');
const scheduler = require('node-schedule');
const constProper = require('./configs/constans');
const emailHelper = require('./utils/email.js')
mongoose.connect(urlConfigs.MONGODB_CONNECTION_URL);

process.on('message', (msg) => {
    addTask(msg);
})
async function addTask(data) {
    let result = await taskDAO.create(data);
    scheduler.scheduleJob(new Date(data.deadline), async function (taskinfo) {
        const updateStatus = taskDAO.update({
            _id: taskinfo['_id']
        }, { status: constProper.TASK_FINISH })
        if (updateStatus?.modifiedCount != 0) {
            // 确保任务没有被删除
            emailHelper.sendNotification(data.email, data);
        }
    }.bind(null, result));
}