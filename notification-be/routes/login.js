var express = require('express');
var router = express.Router();
const UserDAO = require('../DAO/user.js');
const urlConfig = require('../configs/urlConfig');
const userDao = new UserDAO();
const github = require('../configs/OAuth-github');
const constName = require('../configs/constans');
const axios = require('axios').default;
const utils = require('../utils/util');
console.log(github.readirect_uri);
// github登录时走一遍注册流程
async function signIn(userInfoResponse) {
    // 查看数据库，如果没有则创建该用户的信息
    let result = await userDao.findOne({ 'id': userInfoResponse["data"]["id"] })
    let userinfo = {
        "login": userInfoResponse["data"]["login"],
        "name": userInfoResponse["data"]["name"],
        "id": userInfoResponse["data"]["id"],
        "avatar_url": userInfoResponse["data"]["avatar_url"],
    };
    if (!result) {
        // 数据库里面没有该用户
        // 写入用户信息
        userDao.create(userinfo);
    }
    return userinfo;
}
router.get('/gh-login', function (req, res) {
    try {
        res.redirect(github.oauth_url + "?client_id=" + github.client_id + `&scope=${github.scope}` + `&redirect_uri=${github.readirect_uri}`);
    } catch (error) {
        res.json({
            data: "登录失败，请检查网络",
            status: "FALSE"
        })
    }
});

// github授权回调 第一次授权的回调
router.get('/github/oauth/callback', async function (req, res, next) {
    const { code } = req.query;
    const param = {
        "code": code,
        "client_id": github.client_id,
        "client_secret": github.client_secret,
    }
    // 请求token
    const tokenResponse = await axios({
        method: "post",
        url: "https://github.com/login/oauth/access_token",
        data: param,
        timeout: 12000,
        headers: {
            accept: "application/json"
        }
    }).catch((error) => {
        return null;
    })
    if (!tokenResponse || tokenResponse.error) {
        // res.end('请重试');
        res.redirect(urlConfig.FE_INDEX);
        // res.render('netError', { title: "Network Error" })
    } else {
        // 获取github返回的token
        const { access_token, token_type } = tokenResponse["data"];
        const userInfoResponse = await axios({
            method: "get",
            url: `https://api.github.com/user`,
            headers: {
                accept: "application/json",
                Authorization: `${token_type} ${access_token}`
            }
        }).catch((error) => {
            if (error.request) {
                console.log(error.request);
                console.log('----error request----', userInfoResponse);
            }
        })
        let userInfo = await signIn(userInfoResponse);
        // 设置cookie其中包含用户信息
        res.cookie(constName.USER_ID, userInfoResponse["data"]["id"], { expires: new Date(Date.now() + 7 * 24 * 3600000) })
            .cookie(constName.ACCESS_TOKEM, "Bearer " + utils.getToken(userInfo), { expires: new Date(Date.now() + 7 * 24 * 3600000), httpOnly: true })
        res.status(200);
        res.redirect(urlConfig.FE_INDEX);
    }
})

module.exports = router;

