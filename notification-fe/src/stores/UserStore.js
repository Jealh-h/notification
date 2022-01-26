import { makeAutoObservable, action } from "mobx";
import axios from '../util/axios';
import config from '../config/url';

class UserStore {
    userinfo = {
        "login": '',
        "name": 'jealh',
        "id": '',
        "avatar_url": '',
    }
    isloading = false;
    constructor() {
        makeAutoObservable(this, {
            setName: action
        });
    }
    async login() {
        let res = await axios.get('/api/user/login');
        if (res.status) {
            this.userinfo = res.data;
        }
    }

    async logout() {
        let res = await axios.get(`${config.api}/api/user/logout`);
        // TODO删除token
    }

    async getUserinfo() {
        let res = await axios.get(`${config.api}/api/user/getUserInfo`);
        console.log("GET_USER_INFO", res);
    }
}
export default new UserStore();