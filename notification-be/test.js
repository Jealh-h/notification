const jwt = require('jsonwebtoken');
let token = jwt.sign({
    data: "123",
}, 'secret', { expiresIn: 5 });
console.log(token);
// const sleep = (ms) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms)
//     })
// }
/**
 * errors:
 * TokenExpiredError:过期
 * JsonWebTokenError:token错误
 * NotBeforeError
 */
try {
    let decoded = jwt.verify(token, 'secret');
    console.log(decoded);
} catch (error) {
    console.log(error.name);
}
// setTimeout(() => {

// }, 10000)
