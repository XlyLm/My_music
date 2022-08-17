import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {getTypeSongs} from "@/api/playlist";
import Load from "../load";
import ListItem from "../listItem";
import {Link} from "react-router-dom";

export default function HotSongs(props) {
    const [songs, setSongs] = useState(null);

    useEffect(()=>{
        getTypeSongs("全部",0,5).then(res=>{
            if(res.code === 200){
                setSongs(res.playlists);
            }
        })
    },[])

    return (
        <div className={Css.songs}>
            {
                songs !== null ?
                    <ul>
                        {
                            songs.map((item,index)=>{
                                return <li key={index} className={Css.item}>
                                    <ListItem path={`/playlist/${item.id}`} imgUrl={item.coverImgUrl}>
                                        <p className={"font_h"}>
                                            <Link to={`/playlist/${item.id}`} className={Css.name}>{item.name}</Link>
                                        </p>
                                        <p className={"font_h"}>
                                            <span className={Css.by}>by</span>
                                            <Link to={`/user/home/${item.creator.userId}`}>{item.creator.nickname}</Link>
                                            {
                                                item.creator.avatarDetail !== null &&
                                                <img className={Css.tag} src={item.creator.avatarDetail.identityIconUrl} alt="pic"/>
                                            }
                                        </p>
                                    </ListItem>
                                </li>
                            })
                        }
                    </ul> : <Load/>
            }
        </div>
    )
}