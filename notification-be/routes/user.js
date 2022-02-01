var express = require('express');
var router = express.Router();
const UserDAO = require('../DAO/user.js');
const userDao = new UserDAO();

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
module.exports = router;

