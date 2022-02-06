var express = require('express');
var router = express.Router();
const UserDAO = require('../DAO/user.js');
const userDao = new UserDAO();
const constProper = require('../configs/constans');

const utils = require('../utils/util');

router.get('/getUserInfo', async function (req, res) {
    try {
        const { id } = utils.getTokenInfo(req);
        const userinfo = await userDao.findOne({ id: id });
        res.end(JSON.stringify({
            data: userinfo,
            status: "OK"
        }))
    } catch (error) {
        res.end(JSON.stringify({
            data: "获取用户信息失败,请重试",
            status: "ERROR"
        }));
    }
})
router.get('/exit', function (req, res) {
    try {
        res.clearCookie(constProper.ACCESS_TOKEM);
        res.clearCookie(constProper.USER_ID)
        res.json({
            data: 'success',
            status: "OK"
        })
    } catch (error) {
        res.json({
            status: 'FALSE',
            data: "后端报错"
        })
    }
})
module.exports = router;

