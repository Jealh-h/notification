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

export function sendVerifyCode(userMailAddress) {
    var options = {
        from: "Notification Email Helper",
        to: userMailAddress,
        subject: `[Notification 邮箱验证]`,
        text: `你的邮箱验证码为${123},15分钟内有效`
    }
    smtpTransport.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}
