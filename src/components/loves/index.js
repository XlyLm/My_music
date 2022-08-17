import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {getUserCollect} from "@/api/user";
import Load from "../load";

export default function Loves(props) {
    const [info, setInfo] = useState(null);

    useEffect(()=>{
        getUserCollect().then(res=>{
            if(res.code === 200){
                setInfo(res);
            }
        });
    },[])

    return (
        <div className={Css.lovesCnt}>
            <div className={["stitle c_box",Css.title].join(" ")}>
                <i className={"d_l_b text_a_c"}>?</i>个性化推荐如何工作
            </div>
            <p className={"word_w"}>它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。</p>
            <p className={"word_w"}>它通过你每一次操作来记录你的口味</p>
            <ul className={Css.loves}>
                {
                    info !== null ?
                        <>
                            <li className={Css.play}>
                                <i className={"iconfont"}>&#xec61;</i>
                                你播放了 <span>{info.subPlaylistCount}</span> 首歌
                            </li>
                            <li className={Css.love}>
                                <i className={"iconfont"}>&#xe607;</i>
                                你喜欢了 <span>{info.programCount}</span> 首歌
                            </li>
                            <li className={Css.collect}>
                                <i className={"iconfont"}>&#xe6db;</i>
                                你收藏了 <span>{info.artistCount}</span> 位歌手
                            </li>
                        </> : <Load/>
                }
            </ul>
            <p>你提供给云音乐的信息越多，它就越了解你的音乐喜好。</p>
        </div>
    )
}