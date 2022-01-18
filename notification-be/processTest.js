// const { spawn, fork } = require('child_process');
// const forked = fork('childProcess.js');
// forked.on('message', (msg) => {
//     console.log("fatherThis:", this);
//     console.log('message from child is', msg);
//     forked.send('I have received child msg')
// })
// let i = 0
// setInterval(() => {
//     console.log("father:", i++);
// }, 1000)
const stream = require('stream');
let promiseTaskArr = [];
let p_1 = new Promise((resolve, rej) => {
    setTimeout(() => {
        console.log("1100");
        resolve(1100);
    }, 1100);
})
let p_2 = new Promise((resolve, rej) => {
    setTimeout(() => {
        console.log("1000");
        resolve(1000);
    }, 1000);

})
promiseTaskArr.push(p_1);
promiseTaskArr.push(p_2);
let all = Promise.all(promiseTaskArr);
all.then((result) => {
    console.log(result);
}, (reject) => {
    console.log(reject);
})

const readable = new stream.Writable({
    highWaterMark: 4,
    encoding: 'utf-8',
    objectMode: true
})
readable._write = function (chunk, encoding, cb) {
    console.log(chunk);
}
console.log(readable.write("qwertiyoupalsdk"));
