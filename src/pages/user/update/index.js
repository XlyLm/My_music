import React from "react";
import Css from "./index.module.css"
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";

export default function Update(props) {
    return (
        <div className={["vessel",Css.update].join(" ")}>
            <div className={Css.title}>个人设置</div>
            <ul className={["clearFix text_a_c",Css.nav].join(" ")}>
                <li className={"float_l"}>
                    <NavLink to={`/user/update/`} className={({isActive})=>
                        ["d_block fl",(isActive?Css.active:"")].join(" ")}>
                        基本设置</NavLink>
                </li>
                <li className={"float_l"}>
                    <NavLink to={`/user/update/binding`} className={({isActive})=>
                        ["d_block",(isActive?Css.active:"")].join(" ")}>
                        绑定设置</NavLink>
                </li>
                <li className={"float_l"}>
                    <NavLink to={`/user/update/setting`} className={({isActive})=>
                        ["d_block",(isActive?Css.active:"")].join(" ")}>
                        隐私设置</NavLink>
                </li>
            </ul>

            <Outlet/>
        </div>
    )
}