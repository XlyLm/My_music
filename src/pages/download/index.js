import React from "react";
import { connect } from "react-redux";
import Css from "./index.module.css";
// actions

export default function Download(props) {
    return (
        <div className={Css.download}>
            <div className={Css.downloadCnt}>
                <div className={Css.pc}>
                    <div className={Css.title}>在电脑上听</div>
                    <div className={Css.pcImg}>
                        <img src={"https://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0"} alt="pic"/>
                    </div>
                    <div className={Css.method}>
                        <span className={"iconfont"}>&#xe63d; Mac App Stor</span>
                        <span className={"iconfont"}>&#xe738; Windows</span>
                    </div>
                    <a className={Css.btn} href={"#"} onClick={(e)=>{e.preventDefault()}}>下载电脑端</a>
                </div>
                <div className={Css.mobile}>
                    <div className={Css.title}>在手机上听</div>
                    <div className={Css.mobileImg}>
                        <img src={"https://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0"} alt="pic"/>
                    </div>
                    <div className={Css.method}>
                        <span className={"iconfont"}>&#xe63d; App Stor</span>
                        <span className={"iconfont"}>&#xe602; Android</span>
                    </div>
                    <a className={Css.btn} href={"#"} onClick={(e)=>{e.preventDefault()}}>下载移动端</a>
                </div>
            </div>
        </div>
    )
}