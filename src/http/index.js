import axios from 'axios';
import { ToastNotification } from "carbon-components-svelte";

axios.defaults.timeout = 30000;
axios.defaults.timeoutErrorMessage = '连接超时';

// // Request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (config.method === 'post') {
//             config.data = {
//                 param: config.data,
//             };
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );


// Response 拦截器
axios.interceptors.response.use(response => {
    const {data} = response
    //正常请求
    if (data.statusCode === 200) {
        return Promise.resolve(data.content);
        //异常
    }else if(data.statusCode === 500) {
        ElementUI.Message.warning(data.message)
        return Promise.reject(data.message);
    }
}, error => {
    if (error.code === 'ECONNABORTED')
        ToastNotification.Message({ type: "warning", message: "连接超时" })
    else
        ElementUI.Message({ type: "warning", message: error })
    // let { config, status } = error.response
    // let station = config.url.split('/')[1]
    // if (status === 403 && whiteList.indexOf(config.url) === -1) {
    //   ElementUI.Message({ type: "warning", message: 'cookie失效' })
    //   let loginPath = loginTable[station]
    //   router.replace({
    //     path: loginPath,
    //   })
    // }
    return Promise.reject(error);
});

export default axios;
