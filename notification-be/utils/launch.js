const taskDao = require('../DAO/task');
const constProper = require('../configs/constans');
const emailHelper = require('./email');

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
      if (t?.status === constProper.TASK_UNDERWAY && new Date(t?.deadline || 0) < now) {
        emailHelper.sendNotification(t.email, t)
        taskDao.update({
          _id: t?._id
        }, {
          $set: {
            status: constProper.TASK_FINISH
          }
        })
      }
    })
  })
}

module.exports = {
  launch
}