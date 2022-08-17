import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {useParams} from "react-router-dom";
import {getArTopSongs} from "@/api/artist";
import PlayBtn from "@/components/btns/playBtn";
import CollectBtn from "@/components/btns/collectBtn";
import Load from "@/components/load";
import MyTable from "@/components/myTable";

export default function HotWork(props) {
    const { id } = useParams();
    const [songs, setSongs] = useState(null);

    useEffect(()=>{
        getArTopSongs(id).then(res=>{
            if(res.code === 200){
                setSongs(res.songs);
            }
        })
    },[id])

    return (
        <div className={Css.hotWork}>
            {
                songs !== null ?
                    <>
                        <div className={Css.btns}>
                            <PlayBtn id={0}/>
                            <CollectBtn id={0}/>
                        </div>
                        <MyTable songs={songs}/>
                    </> : <Load/>
            }
        </div>
    )
}