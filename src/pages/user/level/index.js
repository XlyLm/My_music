import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import {Tooltip} from "antd";
import Css from "./index.module.css";
import Load from "@/components/load";
import {getLevel} from "@/api/user";


export default function Level(props) {
    const [level, setLevel] = useState(null);

    useEffect(()=>{
        getLevel().then(res=>{
            console.log(res);
            if(res.code === 200){
                setLevel(res.data);
            }
        })
    },[])

    return (
        <div className={["vessel",Css.levelCnt].join(" ")}>
            {
                level !== null ?
                    <>
                        {/*当前等级*/}
                        <div className={Css.curLevel}>
                            <div className={Css.level}>当前等级: <span>Lv.{level.level}</span></div>
                            <div className={Css.progressCnt}>
                                <div className={["clearFix",Css.progress].join(" ")}>
                                    {
                                        [0,1,2,3,4,5,6,7,8,9,10].map((item,index)=>{
                                            return <span key={index} className={["d_l_b float_l",Css.first].join(" ")}>
                                                        <i className={["d_block text_a_c",Css.flag,
                                                            (level.level===index ? Css.active : null)].join(" ")}>{item}</i>
                                                </span>
                                        })
                                    }
                                </div>
                                <div className={Css.slider} style={{"width": `${11+83.2*level.level}px`}}> </div>
                            </div>
                            <div className={Css.update}>等级数据每天下午2点更新</div>
                        </div>
                        {/*等级权限*/}
                        <div className={Css.curPower}>
                            <div className={Css.power}>当前等级特权:</div>
                            {
                                level.info !== ""
                                    ? <div className={Css.info}>{level.info}</div>
                                    : <div className={Css.info}>没有任何特权，加油升级哦!</div>
                            }
                            <div className={Css.detail}>
                                <Link to={`/user/level/detail`}>了解等级特权></Link>
                            </div>
                        </div>
                        {/*下一等级*/}
                        <div className={Css.nextLv}>
                            <div className={Css.next}>
                                距离下一个等级:
                                <span>LV.{level.level+1}</span>
                                <Tooltip color={"white"} placement={"bottom"} overlayClassName={Css.card}
                                    title={
                                        <div style={{"color": "#666"}}>
                                            <p>听歌量是指累计播放的歌曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。</p>
                                            <p>登录天数是指使用云音乐的天数，在多端同时使用不会被重复计算。</p>
                                        </div>
                                    }
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </div>
                            <div className={Css.other}>
                                <span>听歌:</span>
                                <div className={Css.barCnt}>
                                    <div className={Css.bar}
                                         style={{"width": `${(level.nowPlayCount/level.nextPlayCount)*100}%`}}
                                    > </div>
                                </div>
                                <span>还需听歌{level.nextPlayCount - level.nowPlayCount}首</span>
                            </div>
                            <div className={Css.other}>
                                <span>登录:</span>
                                <div className={Css.barCnt}>
                                    <div className={Css.bar}
                                         style={{"width": `${(level.nowLoginCount/level.nextLoginCount)*100}%`}}
                                    > </div>
                                </div>
                                <span>还需登录{level.nextLoginCount - level.nowLoginCount}天</span>
                            </div>
                        </div>
                    </> : <Load/>
            }
        </div>
    )
}