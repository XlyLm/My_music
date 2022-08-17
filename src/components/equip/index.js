import React from "react";
import Css from "./index.module.css";

export default function Equip(props) {
    return (
        <div className={Css.equip}>
            <h3 className={"stitle"}>网易云音乐多端下载</h3>
            <ul className={"d_flex_b"}>
                <li><a className={["iconfont",Css.mac].join(" ")} href="https://itunes.apple.com/cn/app/wang-yi-yun-yin-le/id590338362?l=ch">&#xe63d;</a></li>
                <li><a className={["iconfont",Css.windows].join(" ")} href="https://music.163.com/api/pc/download/latest">&#xe738;</a></li>
                <li><a className={["iconfont",Css.Android].join(" ")} href="https://music.163.com/api/android/download/latest2">&#xe602;</a></li>
            </ul>
            <p>同步歌单，随时畅听320k好音乐</p>
        </div>
    )
}