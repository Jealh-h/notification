const express = require('express');
const TaskDAO = require('../DAO/task');
var router = express.Router();
const taskDao = new TaskDAO();
const util = require('../utils/util');
const redisClient = require('../utils/redis');
const scheduler = require('node-schedule');
const emailHelper = require('../utils/email');
const constProper = require('../configs/constans');
router.get('/querytask', (req, res) => {
    console.log("---querytask---", req.query);
    const data = util.getTokenInfo(req);
    res.json({
        data: data,
        status: "OK"
    });
});
router.post('/addtask', async (req, res) => {
    try {
        const tokenData = util.getTokenInfo(req);
        const { uuid, verifyCode } = req.body;
        const data = { ...req.body, ...tokenData };
        delete data?.uuid;
        delete data?.verifyCode;
        let verifyResult = await redisClient.get(uuid);
        console.log(uuid, verifyResult, verifyCode);
        if (!verifyResult) {
            res.json({
                data: "验证码无效,请重试",
                status: "FALSE"
            })
        } else if (verifyResult != verifyCode) {
            res.json({
                data: "验证码错误",
                status: "FALSE"
            })
        } else {
            let result = await taskDao.create(data);
            // {
            //     title: '测试',
            //     deadline: 2022-02-01T14:30:28.458Z,
            //     id: 65482530,
            //     email: '1620175472@qq.com',
            //     description: '测试啦😁',
            //     status: 'underway',
            //     _id: new ObjectId("61f9422be9c60e0a923adcbe"),
            //     __v: 0
            // }
            // 设置定时任务
            scheduler.scheduleJob(new Date(data.deadline), function (taskinfo) {
                emailHelper.sendNotification(data.email, data);
                taskDao.update({
                    _id: taskinfo['_id']
                }, { status: constProper.TASK_FINISH })
            }.bind(null, result))
            res.json({
                data: result,
                status: "OK"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;