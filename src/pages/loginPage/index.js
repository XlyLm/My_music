import React from "react";
import {connect} from "react-redux";
import Css from "./index.module.css";
import {setLogin} from "@/components/myModal/register/store/actions";
// 组件

function LoginPage(props) {
    const { _setLogin } = props;

    return (
        <div className={[Css.login,"vessel"].join(' ')}>
            <div className={[Css.net,"iconfont"].join(' ')}>&#xecc2;</div>
            <div className={Css.btn}>
                <h2>登录网易云音乐</h2>
                <p>查看并管理你收藏的私房音乐，方便地随时随地收听</p>
                <p>
                    <i className={"iconfont"}>&#xeb4d;</i>
                    <i className={"iconfont"}>&#xe92a;</i>
                    <i className={"iconfont"}>&#xe600;</i>
                    <i className={"iconfont"}>&#xe615;</i>
                </p>
                <a href={"#"} onClick={(e)=>{e.preventDefault();_setLogin(true)}}>立即登录</a>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    return {

    }
}
const mapDispatch = (dispatch)=>{
    return {
        async _setLogin(_isLogin){
            dispatch(setLogin(_isLogin));
        }
    }
}

export default connect(mapState, mapDispatch)(LoginPage);