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
    const {data,status} = response
    if(status === 200){
        return Promise.resolve(data)
    }else{
        return Promise.reject()
    }
    //正常请求
}, error => {
    if (error.code === 'ECONNABORTED')
        console.log("连接超时")
    else
        console.log("连接出错")
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
