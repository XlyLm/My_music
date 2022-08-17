//1. 先引入axios依赖包
import axios from "axios";
import setUrl from "@/untils/setUrl";
import {message} from "antd";

//2. axios创建对象
const Server = axios.create({
    baseURL: "https://music-xlylm.vercel.app", //管理后台要使用的接口的基地址
    timeout: 0, //超时时间,
    withCredentials: true,
})

//3. 定义前置拦截器，请求拦截器，请求发送出去之前触发的
Server.interceptors.request.use((config) => {
    //config 接口请求的配置信息
    return config;
}, (error) => {
    //报错的是时候抛出一个报错的信息
    return Promise.reject(error);
})

//4. 定义后置拦截器,响应拦截器, 服务器响应回来数据之前触发，
Server.interceptors.response.use((response) => {
    //响应回来的数据操作
    response.data.code !== 200 && message.error(response.message||"error");
    return response.data;
}, (error) => {
    //报错的是时候抛出一个报错的信息
    message.error(error.message||"error");
    return Promise.reject(error);
})

//5. 抛出对象的信息

// get请求
export function get(url) {
    return Server({
        method: "get",
        url: url
    });
}
// post请求
export function post(url) {
    return Server({
        method: "post",
        url: setUrl(url)
    })
}