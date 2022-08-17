import React from "react";
import Css from "./index.module.css";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";

export default function Message(props) {
    return (
        <div className={["vessel clearFix",Css.msg].join(" ")}>
            <div className={["float_l",Css.nav].join(" ")}>
                <h2 className={Css.title}>我的消息</h2>
                <ul className={Css.list}>
                    <li>
                        <NavLink to={`/message/`} className={({isActive})=>
                            ["d_block c_box",(isActive?Css.active:"")].join(" ")}>
                            <i className={"iconfont"}>@</i> 我的
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/message/private`} className={({isActive})=>
                            ["d_block c_box",(isActive?Css.active:"")].join(" ")}>
                            <i className={"iconfont"}>&#xe60e;</i> 私信
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/message/comment`} className={({isActive})=>
                            ["d_block c_box",(isActive?Css.active:"")].join(" ")}>
                            <i className={"iconfont"}>&#xe62d;</i> 评论
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/message/notify`} className={({isActive})=>
                            ["d_block c_box",(isActive?Css.active:"")].join(" ")}>
                            <i className={"iconfont"}>&#xeb23;</i> 通知
                        </NavLink>
                    </li>
                </ul>
                <div className={Css.btn}>
                    一键已读
                </div>
            </div>

            <div className={["line",Css.line].join(" ")}> </div>

            <div className={["float_r",Css.content].join(" ")}>
                <Outlet/>
            </div>
        </div>
    )
}