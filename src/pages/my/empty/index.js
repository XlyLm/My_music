import React from "react";
import {Link} from "react-router-dom";
import Css from "./index.module.css";

export default function Empty(props) {
    return (
        <div className={Css.empty}>
            <div className={["clearFix",Css.music].join(" ")}>
                <i className={"iconfont float_l d_block text_a_c"}>&#xe61a;</i>
                <div className={Css.content}>
                    <h2>你还没有收藏或创建过歌单！</h2>
                    <p>马上去 <Link to={"/discover"}>发现音乐</Link></p>
                </div>
            </div>
            <p>
                <i className={"iconfont"}>&#xe851;</i>
                收藏歌单后，你的好友随时随地可以看到你的音乐动态。
            </p>
            <p>
                <i className={"iconfont"}>&#xeb4d;</i>
                下载安装手机版，可以随时随地同步你的私房歌单。
                <Link to={"/download"}>下载客户端</Link>
            </p>
        </div>
    )
}