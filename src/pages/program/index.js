import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Image, message, Tag} from "antd";
import Css from "./index.module.css";
import Equip from "@/components/equip";
import {getProgramComt, getProgramInfo, getRankPro} from "@/api/djradio";
import Load from "@/components/load";
import ListItem from "@/components/listItem";
import SubscribeBtn from "@/components/btns/subscribeBtn";
import PlayBtn from "@/components/btns/playBtn";
import CommentBtn from "@/components/btns/commentBtn";
import ShareBtn from "@/components/btns/shareBtn";
import DownloadBtn from "@/components/btns/downloadBtn";
import {localDate} from "@/untils/formatDate";
import changeTime from "@/untils/changeTime";
import Controls from "@/components/controls";
import MyComment from "@/components/myComment";
import Title from "@/components/title";
import CommentItem from "@/components/commentItem";

export default function Program(props) {
    const { id } = useParams();
    const [programs, setPrograms] = useState(null);
    const [info, setInfo] = useState(null);
    const [comment, setComment] = useState(null);

    useEffect(()=>{
        // 获取更多节目
        getRankPro(6).then(res=>{
            if(res.code === 200){
                setPrograms(res.data.list);
            }
        })
        // 获取节目信息
        getProgramInfo(id).then(res=>{
            if(res.code === 200){
                setInfo(res.program);
            }
        })
        //获取节目评论
        getProgramComt(id,0,100).then(res=>{
            console.log(res);
            if(res.code === 200){
                setComment(res.comments);
            }
        })
    },[id])

    function play(_id) {
        message.success(_id);
    }

    return (
        <div className={"vessel clearFix"}>
            {/*左侧节目*/}
            <div className={["float_l",Css.left].join(" ")}>
                {
                    info !== null ?
                        <>
                            {/*节目信息*/}
                            <div className={Css.infoCnt}>
                                <div className={"clearFix"}>
                                    <div className={["float_l",Css.img].join(" ")}>
                                        <Image
                                        width={140}
                                        height={140}
                                        src={info.coverUrl}
                                        fallback="data:image/png;base64,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"
                                    /></div>
                                    <div className={Css.info}>
                                        <div className={Css.name}>
                                            <div className={Css.tag}>
                                                <Tag color="#cd201f">节目</Tag>
                                            </div>
                                            <p className={"word_w"}>{info.name}</p>
                                        </div>
                                        <div className={Css.radio}>
                                            <i className={"iconfont"}>&#xe6ad;</i>
                                            <Link to={`/djradio/${info.radio.id}`}>{info.radio.name}</Link>
                                            <SubscribeBtn id={info.id} count={info.subscribedCount}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={Css.btn}>
                                    <PlayBtn id={info.id}/>
                                    <CommentBtn id={info.id} count={info.commentCount}/>
                                    <ShareBtn id={info.id} count={info.shareCount}/>
                                    <DownloadBtn id={info.id}/>
                                </div>
                                <div className={Css.descCnt}>
                                    <div className={Css.tag}>
                                        <Tag color="red">{info.categoryName}</Tag>
                                    </div>
                                    <div className={Css.bigName}>{info.radio.name} <span>第{info.serialNum}期</span></div>
                                    <div className={Css.time}>{localDate(info.createTime)} 创建</div>
                                    <div className={Css.playCount}>播放 <span>{info.listenerCount}</span> 次</div>
                                </div>
                                <p className={Css.desc}><span>介绍:</span>{info.description}</p>
                            </div>
                            {/*节目歌曲*/}
                            {
                                info.songs !== null &&
                                    <ul className={Css.list}>
                                        <li className={Css.listTitle}>
                                            <div>共有{info.songs.length}首歌</div>
                                        </li>
                                        {
                                            info.songs.map((item,index)=>{
                                                return <li key={index}>
                                                    <div className={["d_flex_b",Css.rank].join(" ")}>
                                                        {index+1}
                                                        <a className={"iconfont"} href="#" onClick={(e)=>{e.preventDefault();
                                                            play(item.id)}}>&#xec61;</a>
                                                    </div>
                                                    <div className={["font_h",Css.songName].join(" ")}>
                                                        <Link to={`/song/${item.id}`}>{item.name}</Link>
                                                    </div>
                                                    <div className={Css.duration}>
                                                        <span>{changeTime(item.duration)}</span>
                                                        <div className={Css.btns}>
                                                            <Controls id={item.id}/>
                                                        </div>
                                                    </div>
                                                    <div className={["font_h",Css.artist].join(" ")}>
                                                        {
                                                            item.artists.map((item2,index2)=>{
                                                                return <Link key={index2} to={`/artist/${item2.id}`}>{item2.name}</Link>
                                                            })
                                                        }
                                                    </div>
                                                    <div className={["font_h",Css.album].join(" ")}>
                                                        <Link to={`/album/${item.album.id}`}>{item.album.name}</Link>
                                                    </div>
                                                </li>
                                            })
                                        }
                                    </ul>
                            }
                            {/*评论*/}
                            <Title title={"评论"}>
                                <span>共{info.commentCount}条评论</span>
                            </Title>
                            <MyComment id={info.id} type={"program"}/>
                            <ul>
                                {
                                    comment !== null &&
                                        comment.map((item,index)=>{
                                            return <li key={index}>
                                                <CommentItem comment={item}/>
                                            </li>
                                        })
                                }
                            </ul>
                        </> : <Load/>
                }
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧列表*/}
            <div className={["float_r",Css.right].join(" ")}>
                <div className={Css.more}>
                    <div className={["stitle",Css.title].join(" ")}>
                        <span>更多节目</span>
                        <Link to={``} className={Css.all}>全部></Link>
                    </div>
                    <ul className={Css.rlist}>
                        {
                            programs !== null ?
                                programs.map((item,index)=>{
                                    return <li key={index}>
                                        <ListItem path={`/program/${item.program.id}`} imgUrl={item.program.coverUrl}>
                                            <p className={"font_h"}>
                                                <Link to={`/program/${item.program.id}`}>{item.program.name}</Link>
                                            </p>
                                            <p className={"font_h"}><span>Vol.{item.rank}</span></p>
                                        </ListItem>
                                    </li>
                                }) : <Load/>
                        }
                    </ul>
                </div>
                <Equip/>
            </div>
        </div>
    )
}