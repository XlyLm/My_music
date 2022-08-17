import React, {useState} from "react";
import Css from "./index.module.css";
import {connect} from "react-redux";
import {Avatar, Input, message} from "antd";
import { UserOutlined } from '@ant-design/icons';
import getInputVal from "../../untils/getInputVal";
import {setLogin} from "../myModal/register/store/actions";

function MyComment(props) {
    const { id, type, user, _setLogin } =props;
    const { TextArea } = Input;
    const [value, setValue] = useState("");

    function say() {
        if(value !== ""){
            message.success(value);
            setValue("");
        }
    }
    function isLogin(e) {
        if(user===null){
            message.warning("你还未登录。无法使用该功能，请前往登录",0.6,()=>_setLogin(true));
            e.target.blur();
        }
    }

    return (
        <div className={["clearFix o_hide",Css.comment].join(" ")}>
            <Avatar className={"float_l"} src={user!==null ? user.avatarUrl : null} shape="square" size={50} icon={<UserOutlined />}/>
            <div className={Css.textCtn}>
                <div className={Css.text}>
                    <TextArea
                        showCount
                        value={value}
                        maxLength={140}
                        placeholder={"评论"}
                        style={{
                            height: 50,
                        }}
                        onFocus={isLogin}
                        onChange={(e)=>getInputVal(e,setValue)}/>
                </div>
                <div className={Css.btn}>
                    <i className={"iconfont"}>&#xe75a;</i>
                    <i className={"iconfont"}>@</i>
                    <a className={["d_block text_a_c",Css.say].join(" ")} href="#" onClick={(e)=>{e.preventDefault(); say();}}>
                        评论
                    </a>
                </div>
                <div className={Css.flog}> </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { user } = state.get("user");
    return { user };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setLogin(_isLogin){
            dispatch(setLogin(_isLogin));
        }
    };
}

export default connect(mapState,mapDispatch)(MyComment);