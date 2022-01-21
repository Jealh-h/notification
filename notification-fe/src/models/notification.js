import axios from '../util/axios';
import config from '../config/url.js';
import { Notification } from '@douyinfe/semi-ui';
import { BaseModel } from '../util/store';


export class TaskModel extends BaseModel {
    constructor(data) {
        super(data);
    }
    /**
     * 需要验证验证码
     * @param {object} param 
     * @returns 
     */
    async addNotification(param) {
        // const data = await axios.get(config.api + "/hello");
        // return data;
        Notification.success({
            content: "添加TODO"
        })
    };

    /**
     * 需要用户识别
     */
    async upDateTaskList() {
        // const data = await axios.get(config.api + "/getAllTask");
        // return data;
        Notification.success({
            content: "添加TODO"
        })
    }

    async getToDoList() {
        const data = await axios.get(config.api + "/getToDo");
    }

    async getUserInfo() {
        // const data = await axios.get(config.api + "/api/user/getUserInfo");
        const data = await axios.get(config.api + "/cookie");
        console.log(data);
    }
}