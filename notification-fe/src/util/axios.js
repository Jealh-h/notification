import axios from 'axios';
import { Notification } from '@douyinfe/semi-ui';
import configs from '../config/configs';
const instance = axios.create({
    withCredentials: true,
    baseURL: configs.api,
});
instance.interceptors.request.use((requestConfig) => {
    return requestConfig;
}, (error) => {
    // Notification.error({
    //     content: "后端报错",
    //     position: "top"
    // })
});
instance.interceptors.response.use((axiosResponse) => {
    const { data } = axiosResponse;
    if (data.status === 'OK') {
        return data.data;
    } else {
        throw (data.data);
    }
}, (error) => {
    Notification.error({
        content: "后端报错",
        position: "top"
    })
});
export default instance;