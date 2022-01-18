setTimeout(() => {
    process.send("这是子进程在10s后的会话");
}, 10000)
process.on('message', (msg) => {
    console.log("childThis:", this);
    console.log("this msg from father process:", msg);
})
let i = 0
setInterval(() => {
    console.log("child:", i++);
}, 1000)