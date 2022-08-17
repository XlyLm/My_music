import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {message} from "antd";
import Load from "@/components/load";
import Css from "./index.module.css";
import {getSongs} from "@/api/playlist";
import Controls from "@/components/controls";

export default function RankItem(props) {
    const { songs } = props;
    const [list, setList] = useState(null);

    useEffect(()=>{
        list === null && getSongs(songs.id,0,10).then(res=>{
            if(res.code === 200){
                setList(res.songs);
            }
        })
    },[])

    function play(_id) {
        message.success(_id);
    }
    function collect(_id) {
        message.success(_id);
    }

    return (
        <dl className={["float_l",Css.list].join(" ")}>
            <dt className={["c_box clearFix",Css.listHead].join(" ")}>
                <div className={["float_l",Css.listImg].join(" ")}>
                    <Link className={"d_block"} to={`/discover/toplist/${songs.id}`}><img src={songs.coverImgUrl} alt="pic"/></Link>
                </div>
                <div className={["float_l",Css.listTitle].join(" ")}>
                    <p className={"fontHide"}><Link to={`/discover/toplist/${songs.id}`}>{songs.name}</Link></p>
                    <div className={Css.headCtrl}>
                        <a className={"iconfont"} href="#" onClick={(e)=>{e.preventDefault(); play(songs.id);}}
                           title={"播放"}>&#xec61;</a>
                        <a className={"iconfont"} href="#" onClick={(e)=>{e.preventDefault(); collect(songs.id);}}
                           title={"收藏"}>&#xe6db;</a>
                    </div>
                </div>
            </dt>
            <dd>
                <ol className={Css.listCnt}>
                    {
                        list !== null ? list.map((item,index)=>{
                            return <li className={"clearFix"} key={index}>
                                <div className={["float_l d_flex_b",Css.rank,index<3?Css.good:null].join(" ")}>
                                    <span>{index+1}</span>
                                    <a className={"iconfont"} href="#" title={"播放"}
                                       onClick={(e)=>{e.preventDefault(); play(item.id);}}>&#xec61;</a>
                                </div>
                                <p className={["font_h float_l",Css.songname].join(" ")}>
                                    <Link to={`/song/${item.id}`}>{item.name}</Link>
                                </p>
                                <div className={Css.songCtl}>
                                    <Controls music={item}/>
                                </div>
                            </li>
                        }) : <Load/>
                    }
                </ol>
                <div className={["text_a_r",Css.all].join(" ")}>
                    <Link className={"iconfont"} to={`/discover/toplist/${songs.id}`}>查看全部&#xe88e;</Link>
                </div>
            </dd>
        </dl>
    )
}