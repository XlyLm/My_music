import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {message} from "antd";
import Css from "./index.module.css";
import {setBind, setLevel, setSigns, setUser} from "../myModal/register/store/actions";
import {onSign} from "@/api/user";
import {getUserInfo} from "@/api/user";

function UserInfo(props) {
    const { user, level, signs, _setSigns } = props;

    useEffect(()=>{
        // 获取签到信息
        signs === null && _setSigns();
    },[])

    function toSign() {
        onSign().then(res=>{
            if(res.code === 200){
                message.success("签到成功");
                _setSigns();
            }
        })
    }

    return (
        user !==null &&
        <div className={["c_box",Css.userInfo].join(" ")}>
            <div className={"clearFix"}>
                <Link to={"/user/home/"+user.userId} className={["float_l c_box",Css.head].join(" ")}>
                    <img className={"d_block"} src={user.avatarUrl} alt="pic"/></Link>
                <div className={["float_l",Css.user].join(" ")}>
                    <h4><Link to={"/user/home/"+user.userId}>{user.nickname}</Link></h4>
                    {
                        level !== null && <p><Link to={"/user/level"}>Lv.{level}</Link></p>
                    }
                    <div className={Css.sign}>
                        {
                            signs !== null && (signs.today.todaySignedIn
                                ? <a href="#" onClick={(e)=>e.preventDefault()} className={["d_block text_a_c",Css.isSign].join(" ")}>已签到</a>
                                : <a href="#" onClick={(e)=>{e.preventDefault();toSign()}} className={["d_block text_a_c",Css.notSign].join(" ")}>签到</a>)
                        }
                    </div>
                </div>
            </div>
            <ul className={"d_flex_b"}>
                <li className={"o_hide"}><Link to={"/user/event/"+user.userId}>{user.eventCount} 动态</Link></li>
                <li className={Css.line}> </li>
                <li className={"o_hide"}><Link to={"/user/follows/"+user.userId}>{user.follows} 关注</Link></li>
                <li className={Css.line}> </li>
                <li className={"o_hide"}><Link to={"/user/fans/"+user.userId}>{user.followeds} 粉丝</Link></li>
            </ul>
        </div>
    )
}

const mapState = (state)=>{
    const { user, level, signs } = state.get("user");
    return { user, level, signs };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setSigns(){
            dispatch(setSigns());
        }
    }
}

export default connect(mapState,mapDispatch)(UserInfo);