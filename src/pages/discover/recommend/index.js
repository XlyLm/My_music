import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import Calendar from "@/components/calendar";
import PlayBtn from "@/components/btns/playBtn";
import CollectBtn from "@/components/btns/collectBtn";
import Title from "@/components/title";
import {getRecSong} from "@/api/discover";
import MyTable from "@/components/myTable";
import Load from "@/components/load";
import Loves from "@/components/loves";
import Equip from "@/components/equip";

export default function Recommend(props) {
    const [songs, setSongs] = useState([]);

    useEffect(()=>{
        songs.length < 1 && getRecSong().then(res=>{
            if(res.code === 200){
                setSongs(res.data.dailySongs);
            }
        })
    },[])

    return (
        <div className={["vessel clearFix"].join(" ")}>
            {/*左侧推荐歌曲*/}
            <div className={["float_l",Css.left].join(" ")}>
                {/*横条*/}
                <div className={Css.daily}>
                    <div className={Css.calender}>
                        <Calendar/>
                    </div>
                    <div className={Css.btns}>
                        <PlayBtn/>
                        <CollectBtn/>
                    </div>
                </div>
                {/*歌曲列表*/}
                <div className={Css.songs}>
                    <Title title={"歌曲列表"}>
                        <span className={Css.small}>{songs.length} 首歌</span>
                    </Title>
                    <div className={Css.songList}>
                        {
                            songs.length >0 ? <MyTable songs={songs}/> : <Load/>
                        }
                    </div>
                </div>
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.lines].join(" ")}> </div>

            {/*右侧栏*/}
            <div className={["float_r",Css.right].join(" ")}>
                <Loves/>
                <Equip/>
            </div>
        </div>
    )
}