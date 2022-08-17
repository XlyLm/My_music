import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Image, Pagination, Tag} from "antd";
import Css from "./index.module.css";
import {getComment, getSongs, getSongsInfo} from "@/api/playlist";
import Load from "@/components/load";
import {chinaDate} from "@/untils/formatDate";
import PlayBtn from "@/components/btns/playBtn";
import CollectBtn from "@/components/btns/collectBtn";
import ShareBtn from "@/components/btns/shareBtn";
import DownloadBtn from "@/components/btns/downloadBtn";
import CommentBtn from "@/components/btns/commentBtn";
import Title from "@/components/title";
import MyTable from "@/components/myTable";
import MyComment from "@/components/myComment";
import CommentItem from "@/components/commentItem";
import Equip from "@/components/equip";
import HotSongs from "@/components/hotSongs";

function PlayList(props) {
    const { id } = useParams();
    const [sheet, setSheet] = useState(null);  //歌单信息
    const [songs, setSongs] = useState(null);  //歌单歌曲
    const [comment, setComment] = useState([]);    //歌单评论
    const [love, setLove] = useState(null); //喜欢歌单的人
    const [current, setCurrent] = useState(1);  //分页
    const [total, setTotal] = useState(30); //评论条数

    useEffect(()=>{
        setSheet(null);
        setSongs(null);
        setComment([]);
        setCurrent(1);
        setTotal(30);
        // 获取歌单信息
        getSongsInfo(id).then(res=>{
            if(res.code === 200){
                setSheet(res.playlist);
                setLove(res.playlist.subscribers);
            }
        })
        // 获取歌单歌曲
        getSongs(id,0,10).then(res=>{
            if(res.code === 200){
                setSongs(res.songs);
            }
        })
    },[id])

    useEffect(()=>{
        //获取歌单评论
        sheet !==null && change(1);
    },[sheet])

    function change(page) {
        setCurrent(page);
        comment[page-1] === undefined && getComment(id,2,page,30,2).then(res=>{
            if(res.code === 200){
                comment[page-1] = res.data.comments;
                setComment([...comment]);
                setTotal(res.data.totalCount);
            }
        });
    }

    return (
        <div className={"vessel clearFix"}>
            {/*左侧歌单*/}
            <div className={["float_l",Css.left].join(" ")}>
                {/*歌单信息*/}
                <div className={["clearFix",Css.infoCnt].join(" ")}>
                    {
                        sheet !== null ?
                            <>
                                <div className={["c_box float_l",Css.songsImg].join(" ")}>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={sheet.coverImgUrl}
                                        fallback="data:image/png;base64,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"
                                    />
                                </div>
                                <div className={Css.info}>
                                    {/*标题*/}
                                    <div className={Css.title}>
                                        <div className={"d_l_b"}>
                                            <Tag color="#cd201f">
                                                歌单
                                            </Tag>
                                        </div>
                                        <div className={"word_w"}>{sheet.name}</div>
                                    </div>
                                    {/*创建者*/}
                                    <div className={Css.creator}>
                                        <Link to={`/user/home/${sheet.creator.userId}`} className={Css.head}>
                                            <img style={{"width": "35px","height": "35px"}} src={sheet.creator.avatarUrl} alt="pic"/>
                                        </Link>
                                        <Link to={`/user/home/${sheet.creator.userId}`}>
                                            {sheet.creator.nickname}
                                        </Link>
                                        {
                                            sheet.creator.avatarDetail !== null &&
                                            <img style={{"width": "12px","height": "12px"}} src={sheet.creator.avatarDetail.identityIconUrl} alt="pic"/>
                                        }
                                        <span className={Css.time}>{chinaDate(1512657840645)} 创建</span>
                                    </div>
                                    {/*按钮*/}
                                    <div className={Css.btns}>
                                        <PlayBtn id={sheet.id}/>
                                        <CollectBtn name={sheet.subscribedCount} id={sheet.id}/>
                                        <ShareBtn count={sheet.shareCount} id={sheet.id}/>
                                        <DownloadBtn id={sheet.id}/>
                                        <CommentBtn count={sheet.commentCount} id={sheet.id}/>
                                    </div>
                                    {/*标签*/}
                                    <div className={Css.tag}>
                                        <span>标签:</span>
                                        {
                                            sheet.tags.map((item,index)=>{
                                                return <Tag key={index} color="cyan">{item}</Tag>
                                            })
                                        }
                                    </div>
                                    {/*介绍*/}
                                    <div className={Css.descript}>
                                        <span>介绍:</span>
                                        {sheet.description}
                                    </div>
                                </div>
                            </> : <Load/>
                    }
                </div>
                {/*歌单歌曲*/}
                <div className={Css.songs}>
                    {
                        sheet !== null && <Title title={"歌曲列表"}>
                            <span>{sheet.trackCount} 首歌</span>
                            <div className={["d_l_b",Css.playcount].join(" ")}>播放: <span>{sheet.playCount}</span> 次</div>
                        </Title>
                    }
                    {
                        songs !== null ?
                            <MyTable songs={songs}/> : <Load/>
                    }
                </div>
                {/*歌单评论*/}
                <div className={Css.commentCnt}>
                    {
                        (comment[current-1]!==undefined && sheet!==null) ?
                            <>
                                <Title title={"评论"}>
                                    <span>共 {total} 条评论</span>
                                </Title>
                                <MyComment id={sheet.id} type={"songs"}/>
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
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧列表*/}
            <div className={["float_r",Css.right].join(" ")}>
                <div className={Css.love}>
                    <div className={"stitle"}>喜欢这个歌单的人</div>
                    {
                        love !== null ?
                            <ul className={"clearFix"}>
                                {
                                    love.map((item,index)=>{
                                        return <li key={index} className={"float_l"}>
                                            <Link to={`/user/home/${item.userId}`} className={"d_block"}>
                                                <img src={item.avatarUrl} alt="pic"/>
                                            </Link>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
                <HotSongs/>
                <Equip/>
            </div>
        </div>
    )
}

export default PlayList;