import { makeAutoObservable, action, runInAction } from "mobx";
import React from 'react';
import { IconEmoji } from "@douyinfe/semi-icons";
import { Notification } from "@douyinfe/semi-ui";
import axios from '../util/axios';
import config from '../config/configs';

class UserStore {
    userinfo = {}
    isloading = false;
    constructor() {
        makeAutoObservable(this);
    }
    async login() {
        let res = await axios.get('/api/user/login');
        if (res.status) {
            this.userinfo = res.data;
        }
    }

    async logout() {
        let res = await axios.get(`/api/user/exit`);
        window.location.reload();
    }

    async getUserinfo() {
        try {
            let res = await axios.get(`/api/user/getUserInfo`);
            runInAction(() => {
                this.userinfo = res;
            })
            Notification.info({
                title: `你好,${this.userinfo?.name}`,
                content: "Welcome to the notification",
                duration: 3,
                position: "top",
                icon: <IconEmoji />,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
export default UserStore;