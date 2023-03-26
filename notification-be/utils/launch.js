const taskDao = require('../DAO/task');
const constProper = require('../configs/constans');
const emailHelper = require('./email');
const pushProcess = require('../utils/schedulerProcess.js');

/**
 * 重启程序时需要处理完过期的
 */
function launch() {
  taskDao.findAll({
    status: constProper.TASK_UNDERWAY
  }).then(res => {
    const tasks = res;
    const now = +new Date()
    tasks?.forEach(t => {
      if (new Date(t?.deadline || 0) < now) {
        // 小于当前时间，直接发送邮件。
        emailHelper.sendNotification(t.email, t)
        taskDao.update({
          _id: t?._id
        }, {
          $set: {
            status: constProper.TASK_FINISH
          }
        })
      } else {
        // 设置定时任务
        pushProcess.send(t)
      }
    })
  })
}

module.exports = {
  launch
}