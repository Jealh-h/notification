const nodemailer = require("nodemailer");
const constantProper = require('../configs/constans');

// 创建邮件发送账户
const smtpTransport = nodemailer.createTransport({
    host: constantProper.MAIL_HOST,
    service: constantProper.MAIL_SERVICE,
    port: constantProper.MAIL_PORT,
    auth: {
        user: constantProper.MAIL_USER,
        pass: constantProper.MAIL_PASS
    }
})

async function sendVerifyCode(userMailAddress, code) {
    var options = {
        from: "Notification Email Helper<ApFacTes@163.com>",
        to: userMailAddress,
        subject: `Notification 邮箱验证`,
        html: `<p>你的邮箱验证码为<strong>${code}</strong>,15分钟内有效</p>`,
    }
    smtpTransport.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(info);
        }
    })
}
async function sendNotification(userMailAddress, taskinfo) {
    var options = {
        from: "Notification Email Helper<ApFacTes@163.com>",
        to: userMailAddress,
        subject: `Notification 待办通知`,
        html: `
        <section
        style="
          margin: 0 auto;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
          padding: 20px 40px;
          width: 50%;
          border-radius: 10px;
        "
      >
        <span>待办描述信息如下:</span>
        <h2>${taskinfo.title}</h2>
        <p style="font-weight: 800; font-size: large">${taskinfo.description || '无'}</p>
      </section>
        `,
    }
    smtpTransport.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(info);
        }
    })
}
module.exports = {
    sendVerifyCode,
    sendNotification
}
