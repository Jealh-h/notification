// const chalk = require('chalk');
// process node的全局变量
const cp = require('child_process');
console.log("\x1B[33m%s\x1B[0m", "hello");
function test() {
    return new Promise((resolve, reject) => {

    });
}
test();

let subprocess = cp.spawn(`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`, [
    "-EncodedCommand",
    'cwB0AGEAcgB0ACAAaAB0AHQAcAA6AC8ALwBiAGEAaQBkAHUALgBjAG8AbQA='
    // 'start http://baidu.com'
], {
    windowsVerbatimArguments: true
})
// 不让子线程阻止主线程的事件循环
subprocess.unref();

let encodedArguments = ['start', 'http://baidu.com'];
let target = Buffer.from(encodedArguments.join(' '), 'utf16le').toString('base64');
let target2 = Buffer.from('whoami ', 'utf16le').toString('base64');
console.log(target, '\n', target2);

// [
//     '-NoProfile',
//     '-NonInteractive',
//     '–ExecutionPolicy',
//     'Bypass',
//     '-EncodedCommand',
// ]

