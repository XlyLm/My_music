import React, {useEffect} from "react";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { message, Badge, Avatar } from "antd";
import {Link, useNavigate} from "react-router-dom";
import Css from "./index.module.css";
import {initUser, setBind, setLevel, setUser, setUserId} from "../myModal/register/store/actions";
import {loginout} from "@/api/user";
import {getUserInfo} from "../../api/user";

function UserList(props) {
    const { user, userId, _initUser, _setUserId, _setUser, _setBind, _setLevel } = props;
    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies(["user"]);

    useEffect(()=>{
        //获取用户信息
        user === null && getUserInfo(userId).then(res=>{
            if(res.code === 200){
                _setUser(res.profile);
                _setLevel(res.level);
                _setBind(res.bindings);
            }
        })
    },[])

    function out() {
        loginout().then(res=>{
            if(res.code === 200){
                message.success("成功退出");
                _initUser();
                _setUserId(null);
                removeCookie("token");
                navigate("/discover",{ replace: true });
            }
        })
    }

    return (
        <div className={[Css.userList].join(" ")}>
            {
                user !== null &&
                    <>
                        <Badge count={ 5 } size={ "small" }>
                            <Avatar src={user.avatarUrl} size="36" alt={"avatar"}/>
                        </Badge>
                        <ul className={["d_none",Css.list].join(" ")}>
                            <li><Link to={`/user/home/${user.userId}`} className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")}>
                                <i className={"iconfont"}>&#xe851;</i>
                                <span>我的首页</span>
                            </Link></li>
                            <li><Link to={"/message/"} className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")}>
                                <i className={"iconfont"}>&#xe60e;</i>
                                <span>我的消息</span>
                            </Link></li>
                            <li><Link to={"/user/level"} className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")}>
                                <i className={"iconfont"}>&#xe629;</i>
                                <span>我的等级</span>
                            </Link></li>
                            <li><Link to={""} className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")}>
                                <i className={"iconfont"}>&#xe83d;</i>
                                <span>vip会员</span>
                            </Link></li>
                            <li><Link to={"/user/update/"} className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")}>
                                <i className={"iconfont"}>&#xe662;</i>
                                <span>个人设置</span>
                            </Link></li>
                            <li><a className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")}
                                   href={"https://music.163.com/st/userbasic/?module=st%2Fuserbasic%2F#/nameverify"} target={"_black"}>
                                <i className={"iconfont"}>&#xe658;</i>
                                <span>实名认证</span>
                            </a></li>
                            <li><a className={["d_block o_hide b_box text_a_l",Css.listItem].join(" ")} href={"#"}
                                   onClick={(e)=>{e.preventDefault();out()}}>
                                <i className={"iconfont"}>&#xe62e;</i>
                                <span>退出</span>
                            </a></li>
                        </ul>
                    </>
            }
        </div>
    )
}

const mapState = (state)=>{
    const { user, userId } = state.get("user");
    return { user, userId };
}
const mapDispatch = (dispatch)=>{
    return {
        async _initUser(){
            dispatch(initUser());
        },
        async _setUserId(_userId){
            dispatch(setUserId(_userId));
        },
        async _setUser(_user){
            dispatch(setUser(_user));
        },
        async _setLevel(_level){
            dispatch(setLevel(_level));
        },
        async _setBind(_bind){
            dispatch(setBind(_bind));
        }
    }
}

export default connect(mapState,mapDispatch)(UserList);