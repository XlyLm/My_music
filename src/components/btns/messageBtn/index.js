import React from "react";
import Css from "./index.module.css";
import {message} from "antd";

export default function MessageBtn(props) {
    const { id } = props;
    function msg(_id) {
        message.success(_id);
    }

    return (
        <a href={"#"}
           className={["d_l_b text_a_c",Css.msg].join(" ")}
           onClick={(e)=>{e.preventDefault(); msg(id);}}>
            <i className={"iconfont"}>&#xe60e;</i>
            发送私信
        </a>
    )
}