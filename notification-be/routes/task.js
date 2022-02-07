const express = require('express');
const TaskDAO = require('../DAO/task');
var router = express.Router();
const taskDao = new TaskDAO();
const util = require('../utils/util');
const redisClient = require('../utils/redis');
const scheduler = require('node-schedule');
const emailHelper = require('../utils/email');
const constProper = require('../configs/constans');
const taskHandleProcess = require('../index');
router.get('/querytask', async (req, res) => {
    try {
        const cookieData = util.getTokenInfo(req);
        const { currentPage, pageSize } = req.query;
        // const data = await taskDao.findAll({
        //     id: cookieData.id
        // })
        const data = await taskDao.findByOrder({
            id: cookieData.id
        }, { deadline: "desc" }, currentPage, pageSize);
        res.json({
            data: data,
            status: "OK"
        });
    } catch (error) {
        console.log(error);
        res.json({
            data: constProper.BACK_ERROR,
            status: 'FALSE'
        })
    }
});
router.post('/addtask', async (req, res) => {
    try {
        const tokenData = util.getTokenInfo(req);
        const { uuid, verifyCode } = req.body;
        const data = { ...req.body, ...tokenData };
        data.year = new Date(data.deadline).getFullYear();
        data.month = new Date(data.deadline).getMonth();
        data.date = new Date(data.deadline).getDate();
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
            taskHandleProcess.send(JSON.stringify(data));
            // let result = await taskDao.create(data);
            // // 设置定时任务
            // scheduler.scheduleJob(new Date(data.deadline), function (taskinfo) {
            //     emailHelper.sendNotification(data.email, data);
            //     taskDao.update({
            //         _id: taskinfo['_id']
            //     }, { status: constProper.TASK_FINISH })
            // }.bind(null, result))
            res.json({
                data: result,
                status: "OK"
            })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/total', async (req, res) => {
    try {
        const cookieData = util.getTokenInfo(req);
        const itemNumber = await taskDao.findTotalNumber({
            id: cookieData.id
        })
        res.json({
            data: itemNumber,
            status: "OK"
        })
    } catch (error) {
        res.json({
            data: '后端错误',
            status: "FALSE"
        })
    }
})
router.get('/monthdata', async (req, res) => {
    try {
        const { id } = util.getTokenInfo(req);
        const { month, year } = req.query;
        const monthData = await taskDao.findAll({
            id: id,
            month: month,
            year: year
        })
        res.json({
            data: monthData,
            status: "OK"
        })
    } catch (error) {
        res.json({
            data: "获取月视图失败,请稍后重试",
            status: "FALSE"
        })
    }
});
module.exports = router;