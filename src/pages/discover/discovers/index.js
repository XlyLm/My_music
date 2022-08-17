import React, {useEffect, useState, Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Slider from "react-slick";
import Css from "./index.module.css";
import Carousel from "@/components/carousel";
import Title from "@/components/title";
import ListItem from "@/components/listItem";
import CardItem from "@/components/cardItem";
import DishItem from "@/components/dishItem";
import {setDateRecommend, setHotMusic} from "./store/actions";
import {setTopRank} from "../topList/store/actions";
import {getHotDj, getRecSongs} from "@/api/discover";
import Load from "@/components/load";
import Calender from "@/components/calendar";
import UserInfo from "@/components/userInfo";
import RankItem from "./rankItem";
import {setLogin} from "@/components/myModal/register/store/actions";
import {setHotAlbums} from "../album/store/actions";
import {getAllArtists} from "@/api/artist";

function NextArrow(props) { //轮播控件
    const { slider } = props;
    function slickNext() {
        slider.slickNext();
    }

    return <div className={["iconfont text_a_c",Css.next].join(" ")}
                onClick={slickNext}>&#xe8b5;</div>
}
function PrevArrow(props) { //轮播控件
    const { slider } = props;
    function slickPrev() {
        slider.slickPrev();
    }

    return <div className={["iconfont text_a_c",Css.prev].join(" ")}
                onClick={slickPrev}>&#xe8b5;</div>
}

function Discover(props) {
    const { hotMusic, recommend, hotAlbums, rank, user, _setLogin, _setHotMusic, _setDateRecommend, _setHotAlbums, _setTopRank } = props;   //参数解析
    const [recSongs,setRecSongs] = useState(null);  //推荐歌单state
    const [artist, setArtist] = useState(null); //入驻歌手
    const [hotDj, setHotDj] = useState(null);    //热门电台
    const [slider, setSlider] = useState(null); //新碟
    const settings = {      //新碟轮播配置
        infinite: true,
        speed: 1000,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 5,
        slidesToScroll: 5,
        pauseOnHover: true
    };

    useEffect(()=>{
        // 获取热门歌单分类
        hotMusic === null && _setHotMusic();
        // 获取推荐歌单
        recSongs === null && getRecSongs(8).then(res=>{
            if(res.code === 200){
                setRecSongs(res.result);
            }
        });
        // 获取新碟
        hotAlbums === null && _setHotAlbums();
        // 获取排行榜
        rank === null && _setTopRank();
        // 获取入驻歌手
        artist === null && getAllArtists(0,5,-1,-1,-1).then(res=>{
            if(res.code === 200){
                setArtist(res.artists);
            }
        });
        // 获取热门电台
        hotDj === null && getHotDj(0,5).then(res=>{
            if(res.code === 200){
                setHotDj(res.djRadios);
            }
        });
    },[rank,hotMusic,hotDj,hotAlbums,artist,_setHotAlbums,_setHotMusic,_setTopRank])

    useEffect(()=>{
        // 获取每日推荐歌单
        user !== null && recommend === null && _setDateRecommend();
    },[user,recommend,_setDateRecommend])

    return (
        <div className={Css.discoverCnt}>
            <Carousel/>
            <div className={"vessel clearfix"}>
                {/*左侧布局*/}
                <div className={["float_l",Css.left].join(" ")}>
                    {/*热门推荐*/}
                    <div className={Css.hotRec}>
                        {/*标题*/}
                        <Title icon={true} title={"热门推荐"} more={"/discover/playlist"}>
                            {
                                hotMusic !== null && hotMusic.map((item,index,arr)=>{
                                    if(index === arr.length-1){
                                        return <Link to={"/discover/playlist/"+item.name} key={index}>{item.name}</Link>
                                    }
                                    return <Fragment key={index}>
                                        <Link to={"/discover/playlist/"+item.name}>{item.name}</Link>
                                        <span className={Css.line}>|</span>
                                    </Fragment>
                                })
                            }
                        </Title>
                        {/*列表*/}
                        <ul className={["clearFix",Css.hotBody].join(" ")}>
                            {
                                recSongs !== null ? recSongs.map((item,index)=>{
                                    return <li key={index} className={"float_l c_box o_hide"}>
                                        <CardItem id={item.id}
                                            path={`/playlist/${item.id}`}
                                            imgUrl={item.picUrl}
                                            count={item.playCount}
                                            title={item.name}>
                                            <p className={["word_w",Css.hotText].join(" ")}>
                                                <Link to={`/playlist/${item.id}`}>{item.name}</Link>
                                            </p>
                                        </CardItem>
                                    </li>
                                })  : <Load/>
                            }
                        </ul>
                    </div>
                    {/*个性化推荐*/}
                    {
                        user !== null &&
                        <div className={Css.recommend}>
                            {/*标题*/}
                            <Title icon={true} title={"个性化推荐"}/>
                            {/*列表*/}
                            <ul className={["clearFix",Css.reBody].join(" ")}>
                                {/*日历*/}
                                <li className={"float_l c_box o_hide"}>
                                    <Link to={"/discover/recommend"}><Calender/></Link>
                                    <p className={Css.reText}>
                                        <Link to={"/discover/recommend"}>每日歌曲推荐</Link>
                                    </p>
                                    <p className={Css.small}>根据你的口味生成，</p>
                                    <p className={Css.small}>每天6:00更新</p>
                                </li>
                                {/*列表*/}
                                {
                                    recommend !== null ? recommend.map((item,index)=>{
                                        return <li key={index} className={"float_l c_box"}>
                                            <CardItem id={item.id}
                                                      path={`/playlist/${item.id}`}
                                                      imgUrl={item.picUrl}
                                                      title={item.name}
                                                      count={item.playcount}>
                                                <p className={["word_w",Css.reText].join(" ")}>
                                                    <Link to={`/playlist/${item.id}`}>{item.name}</Link></p>
                                            </CardItem>
                                        </li>
                                    }) : <Load/>
                                }
                            </ul>
                        </div>
                    }
                    {/*新碟*/}
                    <div className={Css.newDish}>
                        {/*标题*/}
                        <Title icon={true} title={"新碟上架"} more={"/discover/album"}/>
                        <div className={Css.dishs}>
                            {
                                hotAlbums !== null ?
                                    <Slider ref={c => (setSlider(c))} {...settings}
                                            nextArrow={<NextArrow slider={slider}/>}
                                            prevArrow={<PrevArrow slider={slider}/>}>
                                        {
                                            hotAlbums.map((item,index)=>{
                                                return <div className={Css.dish} key={index}>
                                                    <DishItem dish={item}>
                                                        <Link to={`/artist/${item.artist.id}`}>{item.artist.name}</Link>
                                                    </DishItem>
                                                </div>
                                            })
                                        }
                                    </Slider> : <Load/>
                            }
                        </div>
                    </div>
                    {/*榜单*/}
                    <div className={Css.rank}>
                        <Title icon={true} title={"榜单"} more={"/discover/toplist"}/>
                        {/*列表*/}
                        <div className={["clearFix",Css.rankTab].join(" ")}>
                            {
                                rank !== null ? rank.slice(0,3).map((item,index)=>{
                                    return  <RankItem songs={item} key={index}/>
                                }) : <Load/>
                            }
                        </div>
                    </div>
                </div>
                {/*分隔栏*/}
                <div className={["line",Css.lines].join(" ")}> </div>
                {/*右侧布局*/}
                <div className={["float_r",Css.right].join(" ")}>
                    {/*用户信息展示*/}
                    <div className={["c_box",Css.isLogin].join(" ")}>
                        {
                            user === null
                                ? <div className={Css.notLogin}>
                                    <p className={"m_auto"}>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                                    <a className={"d_block m_auto text_a_c"} href="#" onClick={(e)=>{e.preventDefault(); _setLogin(true);}}>
                                        用户登录</a>
                                </div>
                                : <UserInfo/>
                        }
                    </div>
                    {/*入驻歌手*/}
                    <div className={Css.artist}>
                        <div className={["stitle d_flex_b",Css.arTitle].join(" ")}>
                            <span>入驻歌手</span>
                            <Link to={"/discover/artist/signed"} className={"iconfont"}>查看全部&#xe88e;</Link>
                        </div>
                        {/*歌手列表*/}
                        <ul className={Css.arList}>
                            {
                                artist !== null ? artist.map((item,index)=>{
                                    return <li key={index}>
                                        <ListItem path={`/artist/${item.id}`} imgUrl={item.picUrl}>
                                            <p className={"font_h"}>
                                                <Link to={`/artist/${item.id}`} className={Css.name}>{item.name}</Link>
                                            </p>
                                            <p className={"font_h"}>
                                                <span>Sorry!There is nothing!</span>
                                            </p>
                                        </ListItem>
                                    </li>
                                }) : <li key={"li"}><Load/></li>
                            }
                        </ul>
                    </div>
                    {/*热门电台*/}
                    <div className={Css.hotDj}>
                        <div className={"stitle"}>热门电台</div>
                        <ul className={Css.djList}>
                            {
                                hotDj !== null ? hotDj.map((item,index)=>{
                                    return <li key={index}>
                                        <ListItem path={`/djradio/${item.id}`} imgUrl={item.picUrl}>
                                            <p className={"font_h"}>
                                                <Link to={`/djradio/${item.id}`}>{item.name}</Link>
                                            </p>
                                            <p className={"font_h"}>
                                                <span>{item.rcmdtext}</span>
                                            </p>
                                        </ListItem>
                                    </li>
                                }) : <li key={"li"}><Load/></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { hotMusic, recommend } = state.get("discover");
    const { user } = state.get("user");
    const { rank } = state.get("toplist");
    const { hotAlbums } = state.get("album");
    return { hotMusic, recommend, hotAlbums, rank, user };
}
const mapDispatch=(dispatch)=>{
    return {
        async _setHotMusic(){
            dispatch(setHotMusic());
        },
        async _setDateRecommend(){
            dispatch(setDateRecommend());
        },
        async _setHotAlbums(){
            dispatch(setHotAlbums());
        },
        async _setTopRank(rank){
            dispatch(setTopRank());
        },
        async _setLogin(_isLogin){
            dispatch(setLogin(_isLogin));
        }
    }
}

export default connect(mapState,mapDispatch)(Discover);