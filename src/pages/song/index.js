import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Image, message, Tag} from "antd";
import Css from "./index.module.css";
import Equip from "@/components/equip";
import {getSimiSong, getSongComt, getSongInfo} from "@/api/playlist";
import Load from "@/components/load";
import Title from "@/components/title";
import CommentItem from "@/components/commentItem";
import PlayBtn from "@/components/btns/playBtn";
import CollectBtn from "@/components/btns/collectBtn";
import ShareBtn from "@/components/btns/shareBtn";
import DownloadBtn from "@/components/btns/downloadBtn";
import CommentBtn from "@/components/btns/commentBtn";
import {localDate} from "@/untils/formatDate";

function Songs(props) {
    const {id} = useParams();
    const [simi, setSimi] = useState(null);
    const [song, setSong] = useState(null);
    const [comment, setComment] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        // 获取相似歌曲
        getSimiSong(id).then(res=>{
            if(res.code === 200){
                setSimi(res.songs);
            }
        })
        // 获取歌曲信息
        getSongInfo(id).then(res=>{
            console.log(res);
            if(res.code === 200){
                setSong(res.songs[0]);
            }
        })
        //获取歌曲评论
        getSongComt(id,0,50).then(res=>{
            if(res.code === 200){
                setComment(res.comments);
                setTotal(res.total);
            }
        })
    },[id])

    function play(_id) {
        message.success(_id);
    }
    function add(_id) {
        message.success(_id);
    }

    return (
        <div className={"vessel"}>
            {/*左侧歌曲*/}
            <div className={["float_l",Css.left].join(" ")}>
                {
                    song !== null ?
                        <>
                            <div className={["clearFix",Css.infoCnt].join(" ")}>
                                <div className={["float_l",Css.imgCnt].join(" ")}>
                                    <img src={song.al.picUrl} className={["align",Css.img].join(" ")} alt="pic"/>
                                </div>
                                <div className={Css.info}>
                                    <div className={Css.name}>
                                        <div className={Css.tag}>
                                            <Tag color="#cd201f">歌曲</Tag>
                                        </div>
                                        <div className={["word_w",Css.ne].join(" ")}>{song.name}</div>
                                    </div>
                                    <p className={"font_h"}>
                                        <span>歌手:</span>
                                        <Link to={`/artist/${song.ar[0].id}`}>{song.ar[0].name}</Link>
                                    </p>
                                    <p className={"font_h"}>
                                        <span>所属专辑:</span>
                                        <Link to={`/album/${song.al.id}`}>{song.al.name}</Link>
                                    </p>
                                    <p className={"font_h"}>
                                        <span>发布时间:</span>
                                        <span>{localDate(song.publishTime)}</span>
                                    </p>
                                    <div className={Css.btns}>
                                        <PlayBtn id={song.id}/>
                                        <CollectBtn id={song.id} name={"收藏"}/>
                                        <ShareBtn id={song.id} name={"分享"}/>
                                        <DownloadBtn id={song.id}/>
                                        <CommentBtn id={song.id} count={total}/>
                                    </div>
                                </div>
                            </div>
                            {/*评论*/}
                            <Title title={"歌曲评论"}><span>共 {total} 条评论</span></Title>
                            <div className={["stitle",Css.small].join(" ")}>
                                最新 { total>50 ? 50 : total } 条
                            </div>

                            {
                                comment !== null &&
                                    <ul>
                                        {
                                            comment.map((item,index)=>{
                                                return <li key={index}>
                                                    <CommentItem comment={item}/>
                                                </li>
                                            })
                                        }
                                    </ul>

                            }
                        </> : <Load/>
                }
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧列表*/}
            <div className={["float_r",Css.right].join(" ")}>
                <div className={Css.simi}>
                    <div className={["stitle"].join(" ")}>相似歌曲</div>
                    {
                        simi !== null ?
                            <ul>
                                {
                                    simi.map((item,index)=>{
                                        return <li key={index} className={"clearFix"}>
                                            <div className={"float_l"}>
                                                <p className={"font_h"}>
                                                    <Link to={`/song/${item.id}`}>{item.name}</Link>
                                                </p>
                                                <p className={"font_h"}>
                                                    <Link to={`/artist/${item.artists[0].id}`}>{item.artists[0].name}</Link>
                                                </p>
                                            </div>
                                            <div className={["float_r d_flex_b",Css.btns1].join(" ")}>
                                                <a className={"iconfont"} href="#" onClick={(e)=>{e.preventDefault();
                                                    play(item.id)}} title={"播放"}>&#xec61;</a>
                                                <a className={"iconfont"} href="#" onClick={(e)=>{e.preventDefault();
                                                    add(item.id)}} title={"添加"}>&#xe609;</a>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
                <Equip/>
            </div>
        </div>
    )
}

export default Songs;