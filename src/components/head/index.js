import React, {memo, useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, NavLink, useLocation} from "react-router-dom";
import Css from "./index.module.css";
import UserList from "../userList";
import MyModal from "../myModal";
import {setLogin} from "../myModal/register/store/actions";

function Head(props) {
    const { userId, _setLogin } = props;
    const location = useLocation();
    const [isNav, setIsNav] = useState(true);

    useEffect(()=>{
        const names = ["my","follow","product","musician","download","user"];
        const name = location.pathname.split("/")[1];
        setIsNav(!names.includes(name));
    },[location])

    return (
        <div className={["cnt",Css.head].join(" ")}>
            {/*dingbu */}
            <div className={["b_box",Css.topCnt].join(" ")}>
                <div className={["clearFix m_auto",Css.top].join(" ")}>
                    <Link to={"/"} className={["d_block float_l o_hide text_a_c",Css.logo].join(" ")}>网易云音乐</Link>
                    <ul className={["float_l",Css.topNav].join(" ")}>
                        <li className={"float_l"}><NavLink to={"/discover/"} className={({ isActive })=>["d_block text_a_c",(isActive?Css.active:null)].join(" ")}>
                            发现音乐</NavLink></li>
                        <li className={"float_l"}><NavLink to={"/my"} className={({ isActive })=>["d_block text_a_c",(isActive?Css.active:null)].join(" ")}>
                            我的音乐</NavLink></li>
                        <li className={"float_l"}><NavLink to={"/follow"} className={({ isActive })=>["d_block text_a_c",(isActive?Css.active:null)].join(" ")}>
                            关注</NavLink></li>
                        <li className={"float_l"}><NavLink to={"/product"} className={({ isActive })=>["d_block text_a_c",(isActive?Css.active:null)].join(" ")}>
                            商城</NavLink></li>
                        <li className={"float_l"}><NavLink to={"/musician"} className={({ isActive })=>["d_block text_a_c",(isActive?Css.active:null)].join(" ")}>
                            音乐人</NavLink></li>
                        <li className={"float_l"}><NavLink to={"/download"} className={({ isActive })=>["d_block text_a_c",(isActive?Css.active:null)].join(" ")}>
                            下载客户端
                            <i className={["iconfont",Css.hot].join(" ")}>&#xe610;</i>
                        </NavLink></li>
                    </ul>
                    <div className={["float_r text_a_c",Css.login].join(" ")}>
                        {
                            userId === null ? <span className={"d_block"} onClick={()=>_setLogin(true)}>登录</span> : <UserList/>
                        }
                        <MyModal/>
                    </div>
                    <a className={["b_box float_r",Css.creator].join(" ")} href="https://music.163.com/login?targetUrl=%2Fcreatorcenter"
                       target={"_blank"}>创作者中心</a>
                    <div className={["float_r",Css.search].join(" ")}>
                        <span className={"iconfont icon-sousuo d_block"}>
                           <input type="text" placeholder={"音乐/视频/电台/用户"}/>
                       </span>
                    </div>
                </div>
            </div>
            {/*taber*/}
            <div className={[Css.taber,(isNav ? "d_none" : null)].join(" ")}> </div>
            {/*导航*/}
            <div className={["b_box",(isNav ? null : "d_none"),Css.navCnt].join(" ")}>
                <div className={["clearFix o_hide m_auto",Css.nav].join(" ")}>
                    <ul className={"clearFix"}>
                        <li className={"float_l"}><NavLink to={"/discover/"} className={({ isActive })=>["d_block",(isActive ? Css.active2 : null)].join(" ")}>
                            <span className={"d_l_b"}>推荐</span></NavLink></li>
                        <li className={"float_l"}><NavLink to={"/discover/toplist"} className={({ isActive })=>["d_block",(isActive ? Css.active2 : null)].join(" ")}>
                            <span className={"d_l_b"}>排行榜</span></NavLink></li>
                        <li className={"float_l"}><NavLink to={"/discover/playlist"} className={({ isActive })=>["d_block",(isActive ? Css.active2 : null)].join(" ")}>
                            <span className={"d_l_b"}>歌单</span></NavLink></li>
                        <li className={"float_l"}><NavLink to={"/discover/djradio"} className={({ isActive })=>["d_block",(isActive ? Css.active2 : null)].join(" ")}>
                            <span className={"d_l_b"}>主播电台</span></NavLink></li>
                        <li className={"float_l"}><NavLink to={"/discover/artist/"} className={({ isActive })=>["d_block",(isActive ? Css.active2 : null)].join(" ")}>
                            <span className={"d_l_b"}>歌手</span></NavLink></li>
                        <li className={"float_l"}><NavLink to={"/discover/album"} className={({ isActive })=>["d_block",(isActive ? Css.active2 : null)].join(" ")}>
                            <span className={"d_l_b"}>新碟上架</span></NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { userId } = state.get("user");
    return { userId };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setLogin(_login){
            dispatch(setLogin(_login));
        }
    }
}

export default connect(mapState,mapDispatch)(memo(Head));