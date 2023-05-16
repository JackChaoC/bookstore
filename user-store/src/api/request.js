import axios from 'axios'
import nprogress from "nprogress";
import "nprogress/nprogress.css"
const service = axios.create({
    // baseURL: 'https://1e8885b5-dec7-4060-8b59-4afdfcc93db4.mock.pstmn.io',
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
    }
})
service.interceptors.request.use(config => {
    nprogress.start()
    let token = sessionStorage.getItem('userToken')
    if(token){
        config.headers.userToken = token;
    }else{
        console.log("请先登录");
    }
    return config
}, (error) => {
    return Promise.reject(error);
})
service.interceptors.response.use(res => {
    nprogress.done()
    return res.data
})
export default service