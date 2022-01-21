import axios from 'axios';
import { Notification } from '@douyinfe/semi-ui';
const instance = axios.create({
    withCredentials: true,
});
instance.interceptors.request.use((requestConfig) => {
    console.log("---requestConfig---", requestConfig);
    // do something before request
    return requestConfig;
}, (error) => {
    // Notification.error({
    //     content: "后端报错",
    //     position: "top"
    // })
});
instance.interceptors.response.use((axiosResponse) => {
    console.log("----axiosResponse---", axiosResponse);
    return axiosResponse;
}, (error) => {
    Notification.error({
        content: "后端报错",
        position: "top"
    })
});
export default instance;