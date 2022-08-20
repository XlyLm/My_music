import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {message} from "antd";
import Css from "./index.module.css";
import UserInfo from "@/components/userInfo";
import {getHotArtists} from "@/api/artist";
import Load from "@/components/load";
import ListItem from "@/components/listItem";
import Title from "@/components/title";
import {setFollow} from "@/components/myModal/register/store/actions";
import {getUserTrend} from "@/api/user";
import {localDate} from "@/untils/formatDate";
// actions

function Follow(props) {
    const { user, follow, _setFollow } = props;
    const [star, setStar] = useState(null);
    const [trend, setTrend] = useState([]);
    const types = {
        "18": "分享单曲",
        "19": "分享专辑",
        "17": "分享电台节目",
        "28": "分享电台节目",
        "22": "转发",
        "39": "发布视频",
        "35": "分享歌单",
        "13": "分享歌单",
        "24": "分享专栏文章",
        "41": "分享视频",
        "21": "分享视频",
        "36" : "分享歌手"
    }

    useEffect(()=>{
        setStar(null);
        getStar();
        follow === null && _setFollow(user.userId);
    },[])
    useEffect(()=>{
        setTrend([]);
        if(follow !== null){
            const arr = [user,...follow];
            arr.forEach(async (item,index)=>{
                await getUserTrend(item.userId).then(res=>{
                    if(res.code === 200){
                        trend.push(...res.events);
                        setTrend([...trend]);
                    }
                })
            });
        }
    },[follow])

    function getStar(){
        let offset = Math.floor(Math.random()*100);
        getHotArtists(offset,5).then(res=>{
            if(res.code === 200){
                setStar(res.artists);
            }
        })
    }
    function toFollow(_id) {
        message.success(_id);
    }
    function toTrend() {
        message.success(user.userId);
    }
    function video() {
        message.success(user.userId);
    }
    function comment(_id) {
        message.success(_id);
    }
    function share(_id) {
        message.success(_id);
    }

    return (
        <div className={["vessel clearFix",Css.follow].join(" ")}>
            {/*左侧动态*/}
            <div className={["float_l",Css.left].join(" ")}>
                <Title title={"动态"}>
                    <div className={Css.btn}>
                        <a href="#" onClick={(e)=>{e.preventDefault(); toTrend();}}>
                            <i className={"iconfont"}>&#xe60a;</i> 发布动态
                        </a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); video();}}>
                            <i className={"iconfont"}>&#xe63b;</i> 发布视频
                        </a>
                    </div>
                </Title>
                <ul className={Css.list}>
                    {
                        trend.length > 0 ?
                            trend.map((item,index)=>{
                                return <li key={index} className={"clearFix"}>
                                    <div className={["float_l",Css.head].join(" ")}>
                                        <Link to={`/user/home/${item.user.userId}`}>
                                            <img src={item.user.avatarUrl} alt="pic"/>
                                        </Link>
                                    </div>
                                    <div className={Css.info}>
                                        <div className={Css.name}>
                                            <Link to={`/user/home/${item.user.userId}`}>{item.user.nickname}</Link>
                                            {
                                                item.user.avatarDetail !== null &&
                                                <img className={Css.tag} src={item.user.avatarDetail.identityIconUrl} alt="pic"/>
                                            }
                                            <span>{types[item.type]}</span>
                                        </div>
                                        <div className={Css.date}>{localDate(item.showTime)}</div>
                                        <div className={Css.title}>{JSON.parse(item.json).msg}</div>
                                        <div className={["clearFix",Css.other].join(" ")}>
                                            <a className={"float_r"} href="#" onClick={(e)=>{e.preventDefault(); comment(item.id);}}>
                                                评论({item.xInfo.info.commentCount})</a>
                                            <span className={"float_r"}>|</span>
                                            <a className={"float_r"} href="#" onClick={(e)=>{e.preventDefault(); share(item.id);}}>
                                                转发({item.xInfo.info.shareCount})</a>
                                            <span className={"float_r"}>|</span>
                                            <a className={"float_r"} href="#" onClick={(e)=>{e.preventDefault(); comment(item.id);}}>
                                                <i className={"iconfont"}>&#xec7f;</i>({item.xInfo.info.likedCount})</a>
                                        </div>
                                    </div>
                                </li>
                            }) : <Load/>
                    }
                </ul>
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧列表*/}
            <div className={["float_r",Css.right].join(" ")}>
                <div className={Css.userInfo}>
                    <UserInfo/>
                </div>
                <div className={Css.star}>
                    <div className="stitle">明星用户</div>
                    {
                        star !== null ?
                            <ul className={Css.starList}>
                                {
                                    star.map((item,index)=>{
                                        return <li key={index}>
                                            <div className={Css.item}>
                                                <ListItem path={`/user/home/${item.accountId}`} imgUrl={item.picUrl}>
                                                    <p className={"font_h"}>
                                                        <Link to={`/user/home/${item.accountId}`}>{item.name}</Link>
                                                    </p>
                                                    <p className={"font_h"}>{item.briefDesc}</p>
                                                </ListItem>
                                            </div>
                                            <a className={["d_block text_a_c o_hide",Css.follow].join(" ")} href="#" title={"关注歌手"}
                                                    onClick={(e)=>{e.preventDefault(); toFollow(item.id);}}>
                                                <span>+</span> 关注
                                            </a>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { user, follow } = state.get("user");
    return { user, follow }
}
const mapDispatch = (dispatch)=>{
    return {
        async _setFollow(_id){
            dispatch(setFollow(_id));
        }
    }
}

export default connect(mapState, mapDispatch)(Follow);