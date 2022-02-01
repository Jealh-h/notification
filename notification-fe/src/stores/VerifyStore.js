import axios from '../util/axios';
import { action, makeAutoObservable, runInAction } from "mobx";
import configs from '../config/configs';
import { Notification } from '@douyinfe/semi-ui';

class VerifyCodeStore {
    uuid = ''
    time = '获取验证码'
    disabled = false
    constructor() {
        makeAutoObservable(this, {
            setTimer: action
        });
    }
    async getCodeAndUUid(email) {
        const session = JSON.parse(sessionStorage.getItem(configs.SESSION_NAME));
        let now = new Date().getTime();
        if ((now - session?.timestamp < 1000 * 60)) {
            Notification.warning({ content: "请稍后再获取验证码" });
            return;
        } else {
            const res = await axios.get('/api/verify/verifycode', {
                params: {
                    email: email,
                }
            });
            sessionStorage.setItem(configs.SESSION_NAME, JSON.stringify({
                'session-id': res.uuid,
                'timestamp': new Date().getTime()
            }))
            this.setTimer();
            this.uuid = res.uuid;
            Notification.success({ content: "验证码已发送至邮箱,请查收" });
        }
    }
    setTimer() {
        runInAction(() => {
            this.time = configs.MAIL_COOLDOWN;
            this.disabled = true;
            let timer = setInterval(action(() => {
                if (this.time > 0) {
                    this.time--;
                } else {
                    clearInterval(timer);
                    this.time = '获取验证码';
                    this.disabled = false;
                }
            }), 1000)
        })
    }
}

export default VerifyCodeStore;
