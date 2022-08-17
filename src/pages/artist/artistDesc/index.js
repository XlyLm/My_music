import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {useParams} from "react-router-dom";
import {getAtistDesc} from "@/api/artist";
import Load from "@/components/load";

export default function ArtistDesc(props) {
    const { id } = useParams();
    const [desc, setDesc] = useState(null);
    const [intro, setIntro] = useState(null);

    useEffect(()=>{
        getAtistDesc(id).then(res=>{
            if(res.code === 200){
                setDesc(res.briefDesc);
                setIntro(res.introduction);
            }
        })
    },[id])

    return (
        <div className={Css.descCnt}>
            {
                desc !== null ?
                    <>
                        <div className={Css.desc}>
                            <h3>
                                <i className={["d_l_b",Css.tag].join(" ")}> </i>
                                歌手简介
                            </h3>
                            <p className={"word_w"}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {desc}
                            </p>
                        </div>
                        {
                             intro !== null && intro.map((item,index)=>{
                                 return <div className={Css.intro} key={index}>
                                     <h3>{item.ti}</h3>
                                     <p className={"word_w"}>
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         {item.txt}
                                     </p>
                                 </div>
                             })
                        }
                    </> : <Load/>
            }
        </div>
    )
}