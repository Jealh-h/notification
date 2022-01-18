import axios from '../util/axios';
import config from '../config/url.js';
import { Notification } from '@douyinfe/semi-ui';

/**
 * 需要验证验证码
 * @param {object} param 
 * @returns 
 */
async function addNotification(param) {
    // const data = await axios.get(config.api + "/hello");
    // return data;
    Notification.success({
        content: "添加TODO"
    })
};

/**
 * 需要用户识别
 */
async function upDateTaskList() {
    // const data = await axios.get(config.api + "/getAllTask");
    // return data;
    Notification.success({
        content: "添加TODO"
    })
}

async function getToDoList() {
    const data = await axios.get(config.api + "/getToDo");
}
export default {
    addNotification,
    upDateTaskList
};
