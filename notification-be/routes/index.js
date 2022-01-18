const github = require('../configs/OAuth-github');
const https = require('https');
const axios = require('axios');

const code = [
    "2d0e2407972b3444316a"
]

module.exports = function (app) {
    app.all('*', (req, res, next) => {
        res.set({
            "content-type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        });
        next();
    })
    app.get('/hello', function (req, res) {
        res.send('hello world');
    })
    app.get('/gh-login', function (req, res) {
        res.redirect(github.oauth_url + "?client_id=" + github.client_id + `&scope=${github.scope}` + `&redirect_uri=${github.readirect_uri}`);
    })
    app.get('/api/login/callback', function (req, res) {
        console.log(req.url);
        res.end(req.params.toString())
    })
    // github授权回调 第一次授权的回调
    app.get('/github/oauth/callback', async function (req, res) {
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
        if (tokenResponse.error) {
            res.end('请重试');
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
            res.send(userInfoResponse["data"]);
            // res.redirect('http://localhost:3000');
        }

    })
}