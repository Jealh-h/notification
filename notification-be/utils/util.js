const jwt = require('jsonwebtoken');
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

module.exports = {
    encrypt,
    getToken,
    getTokenInfo
}