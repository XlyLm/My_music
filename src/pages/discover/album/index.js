import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {Outlet} from "react-router";
import {connect} from "react-redux";
import {setHotAlbums} from "./store/actions";
import Css from "./index.module.css";
import Load from "@/components/load";
import Title from "@/components/title";
import DishItem from "@/components/dishItem";

function Album(props) {
    const { hotAlbums, _setHotAlbums } = props;

    useEffect(()=>{
        hotAlbums === null && _setHotAlbums();
    },[])

    return (
        <div className={["vessel",Css.cnt].join(" ")}>
            {
                hotAlbums !== null ?
                    <>
                        <div className={Css.hotAlbums}>
                            <Title title={"热门新碟"}/>
                            <ul className={"clearFix"}>
                                {
                                    hotAlbums.map((item,index)=>{
                                        return <li key={index} className={"float_l c_box"}>
                                            <DishItem dish={item}>
                                                <Link to={`/artist/${item.artist.id}`}>{item.artist.name}</Link>
                                            </DishItem>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className={Css.allAlbums}>
                            <Title title={"全部新碟"}>
                                <>
                                    <Link to={"/discover/album/ALL"}>全部</Link>
                                    <span className={Css.line}>|</span>
                                    <Link to={"/discover/album/ZH"}>华语</Link>
                                    <span className={Css.line}>|</span>
                                    <Link to={"/discover/album/EA"}>欧美</Link>
                                    <span className={Css.line}>|</span>
                                    <Link to={"/discover/album/KR"}>韩国</Link>
                                    <span className={Css.line}>|</span>
                                    <Link to={"/discover/album/JP"}>日本</Link>
                                </>
                            </Title>
                            <Outlet/>
                        </div>
                    </> : <Load/>
            }
        </div>
    )
}

const mapState = (state)=>{
    const { hotAlbums } = state.get("album");
    return { hotAlbums };
}
const mapDispatch = (dispatch)=>{
    return {
        _setHotAlbums(){
            dispatch(setHotAlbums());
        }
    }
}

export default connect(mapState,mapDispatch)(Album);