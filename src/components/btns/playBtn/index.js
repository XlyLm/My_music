import React from "react";
import Css from "./index.module.css";
import {message} from "antd";

export default function PlayBtn(props) {
    const { name="播放", id=0 } = props;

    function play(_id) {
        message.success(_id);
    }
    function add(_id) {
        message.success(_id);
    }

    return <div className={["d_l_b text_a_c o_hide clearFix",Css.playCnt].join(" ")}>
        <a className={["d_block float_l",Css.play].join(" ")} title={name} href="#"onClick={(e)=>{e.preventDefault(); play(id)}}>
            <i className={"iconfont"}>&#xec61;</i>
            <span>{name}</span>
        </a>
        <a className={["d_block float_l",Css.add].join(" ")} title={"添加至播放列表"} href="#"
           onClick={(e)=>{e.preventDefault(); add(id)}}>+</a>
    </div>
}