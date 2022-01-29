const express = require('express');
var router = express.Router();
const util = require('../utils/util')

/**
 * 生成验证码，uuid
 * 存入redis
 * 发送邮件
 */
router.get('/verifycode', function (req, res) {
    try {
        const { email } = req.query;
        let code = util.getCode();
        let uuid = util.getUUID();
        res.json({
            data: { uuid },
            status: 'OK'
        })
    } catch (error) {

    }
});

module.exports = router;