// React基础组件以及函数方法
import React, { memo, lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useCookies } from "react-cookie";
import { BackTop, message } from "antd";
import './App.css';
import store from "./store";
import Routes from "./routes";
import {getStorage} from "./untils/handleStorage";
import {loginStatus} from "./api/user";
import {setAccount, setUserId} from "./components/myModal/register/store/actions";
//组件
const Head = lazy(()=>import("@/components/head"));
const Footer = lazy(()=>import("@/components/footer"));

function App(props) {
    const { dispatch } = store;
    const [cookies,setCookies] = useCookies(["user"]);
    // 根据登录状态决定登录
    useEffect(()=>{
        const status = getStorage("status");
        if((status !== "false") && (status !== "") && (cookies.token != null)){
            loginStatus().then(res=>{
                if(res.data.code === 200 && res.data.profile !== null){
                    dispatch(setUserId(res.data.profile.userId));
                    dispatch(setAccount(res.data.account));
                }else{
                    message.error("登录失败");
                }
            })
        }else{
            message.warning("您还未登录,请前往登录");
        }
    },[])

    return (
        <Provider store={store}>
            {/*头部导航*/}
            <Head/>
            {/*页面主体路由*/}
            <div className={"cnt app"}>
                <Routes/>
            </div>
            {/*页底网站信息*/}
            <Footer/>
            {/*回到顶部按钮*/}
            <BackTop visibilityHeight={105} duration={60}>
                <div className={"toTop"}>TOP</div>
            </BackTop>

            {/*<button className={"btn-1"} onClick={()=>{*/}
            {/*    console.log(...store.getState())*/}
            {/*}}>获取state</button>*/}
        </Provider>
    )
}

export default memo(App);