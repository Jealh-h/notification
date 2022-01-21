var express = require('express');
var router = express.Router();
const UserDAO = require('../DAO/user.js');
const TaskDAO = require('../DAO/task.js');
const urlConfig = require('../configs/urlConfig');
const userDao = new UserDAO();
const taskDao = new TaskDAO();
const github = require('../configs/OAuth-github');
const frontConfig = require('../configs/urlConfig');
const axios = require('axios');

async function signIn(userInfoResponse) {
    // 查看数据库，如果没有则创建该用户的信息
    let result = await userDao.findOne({ 'id': userInfoResponse["data"]["id"] })
    console.log("findOneresult----:", result);
    if (!result) {
        // 数据库里面没有该用户
        // 写入用户信息
        let userinfo = {
            "login": userInfoResponse["data"]["login"],
            "name": userInfoResponse["data"]["name"],
            "id": userInfoResponse["data"]["id"],
            "avatar_url": userInfoResponse["data"]["avatar_url"],
        };
        userDao.create(userinfo);
    }
}
router.get('/gh-login', function (req, res) {
    res.redirect(github.oauth_url + "?client_id=" + github.client_id + `&scope=${github.scope}` + `&redirect_uri=${github.readirect_uri}`);
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
        headers: {
            accept: "application/json"
        }
    }).catch((error) => {
        if (error.request) {
            console.log(error.request);
        }
    })
    if (!tokenResponse || tokenResponse.error) {
        // res.end('请重试');
        res.redirect(urlConfig.FE_INDEX)
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
            }
        })
        await signIn(userInfoResponse);
        // 设置cookie其中包含用户信息
        res.cookie('userid', userInfoResponse["data"]["id"], { maxAge: 604800, httpOnly: true });
        res.status(200);
        res.redirect(urlConfig.FE_INDEX);
    }
})

router.get('/getUserInfo', function (req, res) {
    console.log("getuserinfo:", req.headers);
    res.end("this is getUserInfo")
})
module.exports = router;

