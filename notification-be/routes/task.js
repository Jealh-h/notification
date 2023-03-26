const express = require('express');
const taskDao = require('../DAO/task');
var router = express.Router();
// const taskDao = new TaskDAO();
const util = require('../utils/util');
const redisClient = require('../utils/redis');
const scheduler = require('node-schedule');
const emailHelper = require('../utils/email');
const constProper = require('../configs/constans');
const pushProcess = require('../utils/schedulerProcess.js');
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
        data.timeStamp = +new Date(data.deadline)
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
            // let result = await taskDao.create(data);
            // // 设置定时任务
            // scheduler.scheduleJob(new Date(data.deadline), async function (taskinfo) {
            //     const updateStatus = taskDao.update({
            //         _id: taskinfo['_id']
            //     }, { status: constProper.TASK_FINISH })
            //     if (updateStatus?.modifiedCount != 0) {
            //         // 确保任务没有被删除
            //         emailHelper.sendNotification(data.email, data);
            //     }
            // }.bind(null, result));
            pushProcess.send(data);
            res.json({
                data: "添加成功",
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
router.delete('/delete', async (req, res) => {
    try {
        await taskDao.remove({
            _id: req.query?._id
        });
        res.json({
            data: "删除成功",
            status: "OK"
        })
    } catch (error) {
        res.json({
            data: "删除失败,请稍后重试",
            status: "FALSE"
        })
    }
})
router.get('/test', async function (req, res) {
    let result = await taskDao.update({
        id: 123
    }, { status: constProper.TASK_FINISH });
    res.json({
        data: result,
        status: "OK"
    })
})
module.exports = router;