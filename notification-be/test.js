// const jwt = require('jsonwebtoken');
// let token = jwt.sign({
//     data: "123",
// }, 'secret', { expiresIn: 5 });
// console.log(token);
// // const sleep = (ms) => {
// //     return new Promise((resolve, reject) => {
// //         setTimeout(resolve, ms)
// //     })
// // }
// /**
//  * errors:
//  * TokenExpiredError:过期
//  * JsonWebTokenError:token错误
//  * NotBeforeError
//  */
// try {
//     let decoded = jwt.verify(token, 'secret');
//     console.log(decoded);
// } catch (error) {
//     console.log(error.name);
// }
// // setTimeout(() => {

// // }, 10000)
// const redisClient = require('./utils/redis');
// redisClient.get('123');
// async function get() {
//     let res = await redisClient.get('token'); // null
//     let reset = await redisClient.set("token", "token-value")
//     console.log(res, reset);
// }

// get();
const schedule = require('node-schedule');
const date = new Date(2022, 0, 31, 22, 13);

for (let i = 0; i < 10; i++) {
    const job = schedule.scheduleJob(new Date(2022, 0, 31, 22, 15, i), function (y) {
        console.log('hello schedule', i);
    })
}