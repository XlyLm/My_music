import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {getHotArtists} from "@/api/artist";
import Load from "../load";
import {Link} from "react-router-dom";

export default function HotArtist(props) {
    const [artist, setArtist] = useState(null);

    useEffect(()=>{
        getHotArtists(0,6).then(res=>{
            if(res.code === 200){
                setArtist(res.artists);
            }
        })
    },[])

    return (
        <div className={Css.artist}>
            <div className={"stitle"}>热门歌手</div>
            {
                artist !== null ?
                    <ul className={"clearFix"}>
                        {
                            artist.map((item,index)=>{
                                return <li key={index} className={"float_l c_box"}>
                                    <div className={Css.head}>
                                        <Link to={`/artist/${item.id}`} className={"d_block"}><img src={item.picUrl} alt="pic"/></Link>
                                    </div>
                                    <p className={"font_h text_a_c"}>
                                        <Link to={`/artist/${item.id}`}>{item.name}</Link>
                                    </p>
                                </li>
                            })
                        }
                    </ul> : <Load/>
            }
        </div>
    )
}