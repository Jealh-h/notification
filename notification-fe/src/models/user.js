import axios from '../util/axios';
import config from '../config/url.js';
import { Notification } from '@douyinfe/semi-ui';
import { BaseModel } from '../util/store';

export class UserModel extends BaseModel {
    constructor(data) {
        super(data)
        this.logOut.bind(this);
    }
    logOut() {
        this.data.id = 123456;
        console.log(this);
    }
}
