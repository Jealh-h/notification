const TaskDAO = require('./DAO/task');
const taskDao = new TaskDAO();
const scheduler = require('node-schedule');

const taskArray = [];
process.on('message', async (msg) => {
    taskArray.push(JSON.parse(msg));
    while (taskArray.length) {
        // 添加task
        const data = taskArray.shift();
        const result = await taskDao.create(data);
        // 设置定时任务
        scheduler.scheduleJob(new Date(data.deadline), function (taskinfo) {
            emailHelper.sendNotification(data.email, data);
            taskDao.update({
                _id: taskinfo['_id']
            }, { status: constProper.TASK_FINISH })
        }.bind(null, result))
    }
})