const express = require('express');
var router = express.Router();
const util = require('../utils/util');
const emailHelper = require('../utils/email');
const redisClient = require('../utils/redis');

/**
 * 生成验证码，uuid
 * 存入redis
 * 发送邮件
 */
router.get('/verifycode', async function (req, res) {
    try {
        const { email } = req.query;
        let code = util.getCode();
        let uuid = util.getUUID();
        // 存redis
        await redisClient.set(uuid, code, 'EX', 900);
        // 发邮件
        emailHelper.sendVerifyCode(email, code);
        res.json({
            data: { uuid },
            status: 'OK'
        })
    } catch (error) {
        res.json({
            data: "获取验证码出错,请稍后再试",
            status: "FALSE"
        })
    }
});



module.exports = router;