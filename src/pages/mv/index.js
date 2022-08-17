import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {Image, Pagination, Tag} from "antd";
import {Link, useParams} from "react-router-dom";
import {getAlikeMv, getMvInfo, getMvUrl} from "@/api/artist";
import Load from "@/components/load";
import CollectBtn from "@/components/btns/collectBtn";
import ShareBtn from "@/components/btns/shareBtn";
import SubscribeBtn from "@/components/btns/subscribeBtn";
import Title from "@/components/title";
import Equip from "@/components/equip";
import changeTime from "@/untils/changeTime";
import {getComment} from "@/api/playlist";
import CommentItem from "@/components/commentItem";

export default function Mv(props) {
    const { id } = useParams();
    const [mv, setMv] = useState(null);
    const [alikeMv, setAlikeMv] = useState(null);
    const [comment, setComment] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [cursor, setCursor] = useState(null);
    const [mvUrl, setMvUrl] = useState("");

    useEffect(()=>{
        setComment([]);
        setCurrent(1);
        setTotal(0);
        setCursor(null);
        //获取mv详情
        getMvInfo(id).then(res=>{
            if(res.code === 200){
                setMv(res.data);
            }
        })
        //获取mv
        getMvUrl(id).then(res=>{
            if(res.code === 200){
                setMvUrl(res.data.url);
            }
        })
        //获取相似mv
        getAlikeMv(id).then(res=>{
            if(res.code === 200){
                setAlikeMv(res.mvs);
            }
        })
        //获取mv评论
        getComment(id,1,1,30,3,cursor).then(res=>{
            if(res.code === 200){
                comment[0] = res.data.comments;
                setComment([...comment]);
                setTotal(res.data.totalCount);
                setCursor(res.data.cursor);
            }
        })
    },[id])

    function change(_page){
        setCurrent(_page);
        comment[_page-1] === undefined && getComment(id,1,_page,30,3,cursor).then(res=>{
            if(res.code === 200){
                comment[_page-1] = res.data.comments;
                setComment([...comment]);
                total === 0 && setTotal(res.data.totalCount);
                setCursor(res.data.cursor);
            }
        })
    }

    return <div className={"vessel clearFix"}>
        {/*左侧mv*/}
        <div className={["float_l",Css.left].join(" ")}>
            {
                mv !== null ?
                    <>
                        {/*mv*/}
                        <div className={Css.mvCnt}>
                            <div className={Css.mvName}>
                                <Tag color="magenta">MV</Tag>
                                <span className={Css.name}>{mv.name}</span>
                                {
                                    mv.artists.map((item,index)=>{
                                        return <Link key={index} to={`/artist/${item.id}`}>{index===0?"":"/"}{item.name}</Link>
                                    })
                                }
                            </div>
                            <div className={["m_auto",Css.mv].join(" ")}>
                                <video src={mvUrl} autoPlay={"autoplay"} controls="controls" width={640} height={360}>
                                    您的浏览器不支持 video 标签。
                                </video>
                            </div>
                            <div className={Css.btn}>
                                <SubscribeBtn id={mv.id} count={mv.subCount}/>
                                <CollectBtn id={mv.id} name={"收藏"}/>
                                <ShareBtn id={mv.id} count={mv.shareCount}/>
                            </div>
                        </div>
                        {/*评论*/}
                        <Title title={"评论"}>
                            <span>共{mv.commentCount}条评论</span>
                        </Title>
                        <div className={Css.cmt}>
                            {
                                comment[current-1] !== undefined ?
                                    <>
                                        <ul className={Css.comment}>
                                            {
                                                comment[current-1].map((item,index)=>{
                                                    return <li key={index}>
                                                        <CommentItem comment={item}/>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        <div className={Css.page}>
                                            <Pagination current={current} onChange={change} total={total} pageSize={30} showSizeChanger={false}/>
                                        </div>
                                    </> : <Load/>
                            }
                        </div>
                    </> : <Load/>
            }
        </div>
        {/*分隔栏*/}
        <div className={["line",Css.line].join(" ")}> </div>
        {/*右侧列表*/}
        <div className={["float_r",Css.right].join(" ")}>
            <div className={Css.mvInfo}>
                <div className={"stitle"}>mv简介</div>
                {
                    mv !== null ?
                        <>
                            <p className={Css.mvTime}>发布时间: {mv.publishTime}</p>
                            <p className={Css.mvPlayCount}>播放次数: {mv.playCount}</p>
                            <p>{mv.desc}</p>
                        </> : <Load/>
                }
            </div>
            <div className={Css.recomment}>
                <div className={"stitle"}>相关推荐</div>
                {
                    alikeMv !== null ?
                        <ul className={Css.alikeMv}>
                            {
                                alikeMv.map((item,index)=>{
                                    return <li key={index} className={"clearFix"}>
                                        <div className={["float_l",Css.alikeImg].join(" ")}>
                                            <Image
                                                width={96}
                                                height={54}
                                                preview={false}
                                                src={item.cover}
                                                fallback="data:image/png;base64,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"
                                            />
                                            <Link to={`/mv/${item.id}`} className={"d_block"}> </Link>
                                        </div>
                                        <div className={Css.content}>
                                            <p className={"font_h"}><Link to={`/mv/${item.id}`} className={Css.mvName}>{item.name}</Link></p>
                                            <p>{changeTime(item.duration)}</p>
                                            <p className={"font_h"}><Link to={`/artist/${item.artistId}`}>{item.artistName}</Link></p>
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
}