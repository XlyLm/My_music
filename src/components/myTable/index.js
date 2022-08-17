import React from "react";
import Css from "./index.module.css";
import {message} from "antd";
import {Link} from "react-router-dom";
import changeTime from "@/untils/changeTime";
import Controls from "../controls";

export default function MyTable(props) {
    const { songs=[], artist=true, album=true } = props;

    function play(_id) {
        message.success(_id);
    }

    return(
        <table className={["text_a_l",Css.mTable].join(" ")}>
            {/*表头*/}
            <thead>
                <tr>
                    <th className={Css.w1}> </th>
                    <th className={Css.w2}>歌曲标题</th>
                    <th className={Css.w3}>时长</th>
                    {
                        artist && <th className={Css.w4}>歌手</th>
                    }
                    {
                        album && <th className={Css.w5}>专辑</th>
                    }
                </tr>
            </thead>
            {/*列表*/}
            <tbody>
            {
                songs.map((item,index)=>{
                    return <tr key={index}>
                        {/*排行*/}
                        <td><div className={["d_flex_b font_h",Css.rank].join(" ")}>
                            <span>{index+1}</span>
                            <a className={"iconfont"} title={"播放"} href={"#"}
                               onClick={(e)=>{e.preventDefault(); play(item.id);}}>&#xec61;</a>
                        </div></td>
                        {/*标题*/}
                        <td><div className={Css.name}>
                            <span className={"d_l_b font_h"}>
                                <Link to={`/song/${item.id}`}>{item.name}</Link>
                                {
                                    item.alia.length>0 && <span> -({item.alia.join("、")})</span>
                                }
                                {
                                    item.mv !==0 && <Link to={`/mv/${item.mv}`} className={["iconfont",Css.mv].join(" ")}>&#xe62f;</Link>
                                }
                            </span>
                        </div></td>
                        {/*时长*/}
                        <td className={Css.time}>
                            <span>{changeTime(item.dt)}</span>
                            <div>
                                <Controls music={item}/>
                            </div>
                        </td>
                        {/*歌手*/}
                        {
                            artist && <td className={"font_h"}>
                                {
                                    item.ar.map((item2,index2)=>{
                                        return <Link to={`/artist/${item2.id}`} key={index2}>{item2.name}</Link>
                                    })
                                }
                            </td>
                        }
                        {/*专辑*/}
                        {
                            album && <td className={"font_h"}>
                                <Link to={`/album/${item.al.id}`}>{item.al.name}</Link>
                            </td>
                        }
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}