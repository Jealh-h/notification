const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const constName = require('../configs/constans');
const Cookie = require('cookie');

function encrypt() {

}
/**
 * 获取token
 * @param {object} data payload 
 * @returns {string} token
 */
function getToken(data) {
    let token = jwt.sign(data, constName.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token;
}
/**
 * 解析token信息
 * @param {object} req 
 * @returns {object} 解码后的token信息
 */
function getTokenInfo(req) {
    try {
        let cookie = req.headers.cookie;
        cookie = Cookie.parse(cookie);
        const token = cookie[constName.ACCESS_TOKEM].split(' ')[1];
        const data = jwt.verify(token, constName.JWT_SECRET);
        return data;
    } catch (err) {
        console.log('token解密失败');
        return false;
    }
}
/**
 * 获取一个uuid.
 * @returns {string} uuid
 */
function getUUID() {
    return uuid.v4();
}
/**
 * 获取6位验证码
 * @returns {number} verifycode
 */
function getCode() {
    return parseInt(Math.random() * 900000 + 100000)
}
module.exports = {
    encrypt,
    getToken,
    getTokenInfo,
    getCode,
    getUUID
}