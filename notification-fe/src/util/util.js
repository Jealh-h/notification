
export function validateEmailRule(email) {
    var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(email);
}

export function isLogin() {
    let cookie = document.cookie || "";
    let reg = /(.*)=.*/i;
    let tokenReg = /(ACCESS_TOKEN)/g;
    return cookie && tokenReg.test(reg.exec(cookie)[1]);
}