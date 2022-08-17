import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {message} from "antd";

export default function DownloadBtn(props) {
    const { id } = props;

    function download(_id) {
        message.success(_id);
    }

    return (
        <a className={["d_l_b o_hide",Css.download].join(" ")} href="#" title={"下载"} onClick={(e)=>{e.preventDefault(); download(id);}}>
            <i className={"iconfont"}>&#xe606;</i>
            <span className={Css.count}>下载</span>
        </a>
    )
}