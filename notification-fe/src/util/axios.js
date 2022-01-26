import axios from 'axios';
import { Notification } from '@douyinfe/semi-ui';
const instance = axios.create({
    withCredentials: true,
});
instance.interceptors.request.use((requestConfig) => {
    console.log("---requestConfig---", requestConfig);
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
        return axiosResponse;
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