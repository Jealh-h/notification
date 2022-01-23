const jwt = require('jsonwebtoken');
const constName = require('../configs/constans')

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

module.exports = {
    encrypt,
    getToken
}