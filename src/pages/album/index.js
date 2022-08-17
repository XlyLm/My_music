import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Image, Pagination, Tag} from "antd";
import Css from "./index.module.css";
import {getAlbumInfo} from "@/api/album";
import Load from "@/components/load";
import {localDate} from "@/untils/formatDate";
import PlayBtn from "@/components/btns/playBtn";
import CollectBtn from "@/components/btns/collectBtn";
import ShareBtn from "@/components/btns/shareBtn";
import DownloadBtn from "@/components/btns/downloadBtn";
import CommentBtn from "@/components/btns/commentBtn";
import Title from "@/components/title";
import MyTable from "@/components/myTable";
import MyComment from "@/components/myComment";
import {getComment} from "@/api/playlist";
import CommentItem from "@/components/commentItem";
import Equip from "@/components/equip";
import {getOfAlbums} from "@/api/artist";
import ListItem from "@/components/listItem";

function Album(props) {
    const {id} = useParams();
    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState(null);
    const [comment, setComment] = useState([]);
    const [current, setCurrent] = useState(1);  //分页
    const [total, setTotal] = useState(0); //评论条数
    const [otherAl, setOtherAl] = useState(null);   //其他专辑

    useEffect(()=>{
        getAlbumInfo(id).then(res=>{
            if(res.code === 200){
                setAlbum(res.album);
                setSongs(res.songs);
            }
        })
        //获取专辑评论
        change(1);
    },[id])
    useEffect(()=>{
        album !== null && getOfAlbums(album.artist.id,0,5).then(res=>{
            console.log(res);
            if(res.code === 200){
                setOtherAl(res.hotAlbums);
            }
        })
    },[album])

    function change(page) {
        setCurrent(page);
        comment[page-1] === undefined && getComment(id,3,page,30,2).then(res=>{
            if(res.code === 200){
                comment[page-1] = res.data.comments;
                setComment([...comment]);
                setTotal(res.data.totalCount);
            }
        });
    }

    return (
        <div className={"vessel clearFix"}>
            {/*左侧信息*/}
            <div className={["float_l",Css.left].join(" ")}>
                {/*信息*/}
                <div className={["clearFix",Css.infoCnt].join(" ")}>
                    {
                        album !== null ?
                            <>
                                <div className={["float_l",Css.head].join(" ")}>
                                    <Image
                                        width={170}
                                        height={170}
                                        src={album.picUrl}
                                        fallback="data:image/png;base64,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"
                                    />
                                </div>
                                <div className={Css.info}>
                                    <div className={Css.name}>
                                        <Tag color="#cd201f">
                                            专辑
                                        </Tag>
                                        <h2 className={"font_h"}>
                                            {album.name}
                                        </h2>
                                    </div>
                                    <p className={["font_h",Css.artist].join(" ")}>
                                        <span>歌手:</span>
                                        {
                                            album.artists.map((item,index)=>{
                                                return <Link key={index} to={`/artist/${item.id}`}>{item.name}</Link>
                                            })
                                        }
                                    </p>
                                    <p className={["font_h",Css.date].join(" ")}>
                                        <span>发布时间:</span>
                                        {localDate(album.publishTime)}
                                    </p>
                                    <p className={["font_h",Css.company].join(" ")}>
                                        <span>发行企业:</span>
                                        {album.company}
                                    </p>
                                    <div className={Css.btns}>
                                        <PlayBtn id={album.id}/>
                                        <CollectBtn id={album.id} name={"收藏"}/>
                                        <ShareBtn id={album.id} name={"分享"}/>
                                        <DownloadBtn id={album.id}/>
                                        <CommentBtn id={album.id} count={album.commentCount}/>
                                    </div>
                                </div>
                            </> : <Load/>
                    }
                </div>
                {/*介绍*/}
                {
                    album !== null &&
                    <div className={Css.des}>
                        <h3>专辑介绍:</h3>
                        <p className={"word_w"}>{album.description}</p>
                    </div>
                }
                {/*歌曲*/}
                <div className={Css.songs}>
                    {
                        songs !== null ?
                            <>
                                <Title title={"包含歌曲列表"}>{songs.length} 首歌</Title>
                                <MyTable songs={songs}/>
                            </> : <Load/>
                    }
                </div>
                {/*评论*/}
                <div className={Css.coment}>
                    {
                        album !== null &&
                            <>
                                <Title title={"评论"}>共 {total} 条评论</Title>
                                <MyComment id={album.id} type={"album"}/>
                            </>
                    }
                    {
                        comment[current-1] !== undefined &&
                        <div className={Css.comment}>
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
                        </div>
                    }
                </div>
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧列表*/}
            <div className={["float_r",Css.right].join(" ")}>
                <div className={Css.otherAl}>
                    <div className={["stitle",Css.title].join(" ")}>
                        <h3 className={"d_l_b"}>Ta的其它专辑</h3>
                        {
                            album !== null &&
                            <Link to={`/artist/album/${album.artist.id}`} className={Css.more}>更多></Link>
                        }
                    </div>
                    {
                        otherAl !== null ?
                            <ul className={Css.list}>
                                {
                                    otherAl.map((item,index)=>{
                                        return <li key={index}>
                                            <ListItem path={`/album/${item.id}`} imgUrl={item.picUrl}>
                                                <h3 className={"font_h"}><Link to={`/album/${item.id}`}>{item.name}</Link></h3>
                                                <p className={"font_h"}>{localDate(item.publishTime)}</p>
                                            </ListItem>
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

export default Album;