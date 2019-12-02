import axios from "axios"
import Vue from 'vue'
import router from './router/index'
const http = axios.create({
    baseURL:'http://localhost:3000/admin/api',
});

//请求头
http.interceptors.request.use((config)=>{
    if (localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }

    return config
},(error)=>{
    return Promise.reject(error)
});

//请求拦截器
http.interceptors.response.use((res)=>{
    return res
},(error)=>{
    //状态不是200的或者大于等于400的错误都会经过这里
    if (error.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:error.response.data.message
        });
        if (error.response.status===401){
            router.push('/login')
        }
    }
    return Promise.reject(error)
});
export default http
