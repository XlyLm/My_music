import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Css from "./index.module.css";
import {getUserCollect, getUserSongs} from "../../api/user";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import CaretDownOutlined from "@ant-design/icons/lib/icons/CaretDownOutlined";
// actions

function My(props) {
    const { user } = props;
    const navigate = useNavigate();
    const [artist, setArtist] = useState(0);
    const [songs, setSongs] = useState(0);
    const [dj, setDj] = useState(0);
    const [mv, setMv] = useState(0);
    const [list, setList] = useState(0);
    const [playList, setPlayList] = useState(null);
    const [showS, setShowS] = useState(true);
    const [showL, setShowL] = useState(true);

    useEffect(()=>{
        //获取用户收藏信息
        getUserCollect().then(res=>{
            if(res.code === 200){
                setArtist(res.artistCount);
                setSongs(res.createdPlaylistCount);
                setDj(res.djRadioCount);
                setMv(res.mvCount);
                setList(res.subPlaylistCount);
            }
        })
        //获取用户歌单
        getUserSongs(user.userId).then(res=>{
            if(res.code === 200){
                setPlayList(res.playlist);
                const item = res.playlist.find((item)=>{
                    return item.trackCount > 0;
                });
                navigate(`/my/playlist/${item.id}`,{ replace: true });
            }
        })
    },[])

    function showSongs(){
        setShowS(!showS);
    }
    function showList(){
        setShowL(!showL);
    }

    return (
        <div className={["vessel clearFix",Css.my].join(" ")}>
            {/*左侧导航*/}
            <div className={["float_l",Css.left].join(" ")}>
                {
                    artist>0 && <h3><NavLink to={`/my/artist`} className={({isActive})=>
                        ["d_block",Css.nav,(isActive?Css.active:null)].join(" ")}>我的歌手({artist})</NavLink></h3>
                }
                {
                    mv>0 && <h3><NavLink to={`/my/mv`} className={({isActive})=>
                        ["d_block",Css.nav,(isActive?Css.active:null)].join(" ")}>我的视频({mv})</NavLink></h3>
                }
                {
                    dj>0 && <h3><NavLink to={`/my/djradio`} className={({isActive})=>
                        ["d_block",Css.nav,(isActive?Css.active:null)].join(" ")}>我的电台({dj})</NavLink></h3>
                }
                <div>
                    <a className={["d_block",Css.menu].join(" ")} href="#" onClick={(e)=>{e.preventDefault(); showSongs();}}>
                        {
                            showS ? <CaretDownOutlined /> : <CaretRightOutlined />
                        }
                        创建的歌单({songs})
                    </a>
                </div>
                {
                    (playList !== null && showS) && playList.map((item,index)=>{
                        if(item.userId === user.userId){
                            return <div key={index}>
                                <NavLink to={`/my/playlist/${item.id}`} className={({isActive})=>
                                    ["d_block c_box clearFix",Css.songs,(isActive?Css.active:null)].join(" ")}>
                                    <div className={"float_l"}><img src={item.coverImgUrl} alt="pic"/></div>
                                    <div className={Css.content}>
                                        <p className={"font_h"}>{item.name}</p>
                                        <p className={"font_h"}>{item.trackCount}首</p>
                                    </div>
                                </NavLink>
                            </div>
                        }else{
                            return null;
                        }
                    })
                }
                <div>
                    <a className={["d_block",Css.menu].join(" ")} href="#" onClick={(e)=>{e.preventDefault(); showList();}}>
                        {
                            showL ? <CaretDownOutlined /> : <CaretRightOutlined />
                        }
                        收藏的歌单({list})
                    </a>
                </div>
                {
                    (playList !== null && showL) && playList.map((item,index)=>{
                        if(item.userId !== user.userId){
                            return <div key={index}>
                                <NavLink to={`/my/playlist/${item.id}`} className={({isActive})=>
                                    ["d_block c_box clearFix",Css.songs,(isActive?Css.active:null)].join(" ")}>
                                    <div className={"float_l"}><img src={item.coverImgUrl} alt="pic"/></div>
                                    <div className={Css.content}>
                                        <p className={"font_h"}>{item.name}</p>
                                        <p className={"font_h"}>{item.trackCount}首</p>
                                    </div>
                                </NavLink>
                            </div>
                        }else{
                            return null;
                        }
                    })
                }
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧展示*/}
            <div className={["float_r",Css.right].join(" ")}>
                <Outlet/>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { user } = state.get("user");
    return { user };
}
const mapDispatch = (dispatch)=>{
    return {

    }
}

export default connect(mapState, mapDispatch)(My);