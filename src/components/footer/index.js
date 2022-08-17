import React from "react";
import Css from "./index.module.css";

function Footer(props) {
    return (
        <div className={[Css.footerCnt,"cnt"].join(" ")}>
            <div className={[Css.footer,"clearFix"].join(" ")}>
                <div className={Css.copy}>
                    <p className={Css.link}>
                        <a href="https://st.music.163.com/official-terms/service" target={"_blank"}>服务条款</a>
                        <span className={Css.line}>|</span>
                        <a href="https://st.music.163.com/official-terms/privacy" target={"_blank"}>隐私政策</a>
                        <span className={Css.line}>|</span>
                        <a href="https://st.music.163.com/official-terms/children" target={"_blank"}>儿童隐私政策</a>
                        <span className={Css.line}>|</span>
                        <a href="https://music.163.com/st/staticdeal/complaints.html" target={"_blank"}> 版权投诉</a>
                        <span className={Css.line}>|</span>
                        <a href="http://ir.music.163.com/" target={"_blank"}>投资者关系</a>
                        <span className={Css.line}>|</span>
                        <a href="https://music.163.com/ui/resource" target={"_blank"}>广告合作</a>
                        <span className={Css.line}>|</span>
                        <a href="https://jubao.163.com/" target={"_blank"}>廉正举报</a>
                        <span className={Css.line}>|</span>
                        <a href="https://mp.music.163.com/600948c936c13f4d09752e73/contact-us-web/index.html?source=Music-Main-Station" target={"_blank"}>
                            联系我们</a>
                    </p>
                    <p>
                        <span className={Css.sep}>网易公司版权所有©1997-2022</span>
                        <span>杭州乐读科技有限公司运营: </span>
                        <a href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target={"_blank"}>
                            浙网文[2021] 1186-054号</a>
                    </p>
                    <p>
                        <a className={Css.web} href="https://beian.miit.gov.cn/#/Integrated/index" target={"_blank"}>
                            粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
                        <a className={[Css.police,"iconfont"].join(' ')} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564" target={"_blank"}>
                            &#xe604; 浙公网安备 33010902002564号</a>
                    </p>
                    <p>互联网宗教信息服务许可证: 浙（2022）0000120</p>
                </div>
                <ul className={Css.enter}>
                    <li>
                        <a className={"iconfont"} href={"https://music.163.com/st/ncreator/revenue-plan"} target={"_blank"}>&#xe64a;</a>
                        <div>视频奖励</div>
                    </li>
                    <li>
                        <a className={"iconfont"} href={"https://music.163.com/web/reward"} target={"_blank"}>&#xe692;</a>
                        <div>赞赏</div>
                    </li>
                    <li>
                        <a className={"iconfont"} href={"https://music.163.com/musician/artist"} target={"_blank"}>&#xe61f;</a>
                        <div>独立音乐人</div>
                    </li>
                    <li>
                        <a className={"iconfont"} href={"https://music.163.com/st/userbasic#/auth"} target={"_blank"}>&#xe658;</a>
                        <div>用户验证</div>
                    </li>
                    <li>
                        <a className={"iconfont "} href={"https://web-amped.music.163.com/"} target={"_blank"}>&#xe674;</a>
                        <div>Amped Studio</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Footer;