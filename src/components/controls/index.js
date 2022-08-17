import React from "react";
import Css from "./index.module.css";
import {message} from "antd";

export default function Controls(props) {
    const { music={id:0} } = props;
    
    // 添加至播放列表
    function add(_id) {
        message.success(_id);
    }
    //收藏
    function collect(_id) {
        message.success(_id);
    }
    //分享
    function shar(_id) {
        message.success(_id);
    }
    //下载
    function download(_id) {
        message.success(_id);
    }

    return (
        <div className={Css.ctrls}>
            <a className={"iconfont"} title={"添加至播放列表"} href={"#"}
               onClick={(e)=>{e.preventDefault(); add(music.id);}}>&#xe609;</a>
            <a className={["iconfont",Css.doc].join(" ")} title={"收藏"}
               onClick={(e)=>{e.preventDefault(); collect(music.id);}}>&#xe6db;</a>
            <a className={"iconfont"} title={"分享"}
               onClick={(e)=>{e.preventDefault(); shar(music.id);}}>&#xe683;</a>
            <a className={"iconfont"} title={"下载"}
               onClick={(e)=>{e.preventDefault(); download(music.id);}}>&#xe606;</a>
        </div>
    )
}