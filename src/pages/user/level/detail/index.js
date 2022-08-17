import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Css from "./index.module.css";

export default function Detail(props) {
    const [powers, setPowers] = useState([]);

    useEffect(()=>{
        setPowers([
            { grad: "Lv.1", power: ["5G音乐云盘免费容量","黑名单上限20"] },
            { grad: "Lv.2", power: ["20G音乐云盘免费容量","黑名单上限20"] },
            { grad: "Lv.3", power: ["40G音乐云盘免费容量","黑名单上限20","云音乐商城满100减3元优惠券","价值50云贝"] },
            { grad: "Lv.4", power: ["40G音乐云盘免费容量","黑名单上限20"] },
            { grad: "Lv.5", power: ["40G音乐云盘免费容量","黑名单上限20","云音乐商城满100减6元优惠券","价值100云贝"] },
            { grad: "Lv.6", power: ["60G音乐云盘免费容量","黑名单上限40"] },
            { grad: "Lv.7", power: ["60G音乐云盘免费容量","黑名单上限80","云音乐商城满100减9元优惠券","价值400云贝"] },
            { grad: "Lv.8", power: ["60G音乐云盘免费容量","黑名单上限100"] },
            { grad: "Lv.9", power: ["60G音乐云盘免费容量","黑名单上限120","云音乐商城满100减12元优惠券","价值1200云贝"] },
            { grad: "Lv.10", power: ["100G音乐云盘免费容量","黑名单上限140"] }
        ])
    },[])

    return (
        <div className={["vessel",Css.detail].join(" ")}>
            <div className={["d_flex_b",Css.title].join(" ")}>
                <h2>等级特权</h2>
                <Link to={`/user/level`}>查看我的特权></Link>
            </div>
            <div className={Css.powers}>
                <div className={Css.tip}>
                    <span className={Css.grad}>等级</span>
                    <span className={Css.power}>特权</span>
                </div>
                <ul className={Css.list}>
                    {
                        powers.map((item,index)=>{
                            return <li key={index}>
                                <span className={Css.grad}>{item.grad}</span>
                                {
                                    item.power.map((item2,index2,arr)=>{
                                        return <React.Fragment key={index2}>
                                                <span className={Css.power}>{item2}</span>
                                                {
                                                    index2 < arr.length-1 && <span className={Css.point}> </span>
                                                }
                                            </React.Fragment>

                                    })
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}