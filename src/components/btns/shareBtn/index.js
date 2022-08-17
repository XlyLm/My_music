import React, {useEffect, useState} from "react";
import {message} from "antd";
import Css from "./index.module.css";

export default function ShareBtn(props) {
    const { id, count=0, name } = props;
    const [flag, setFlag] = useState(0);

    useEffect(()=>{
        const num = parseInt(count);
        if(num>10000){
            setFlag((parseInt(num/10000)+"万+"));
        }else{
            setFlag(num.toString());
        }
    },[])

    function share(_id) {
        message.success(_id);
    }

    return (
        <a className={["d_l_b o_hide",Css.share].join(" ")} href="#" title={"分享"} onClick={(e)=>{e.preventDefault(); share(id);}}>
            <i className={"iconfont"}>&#xe683;</i>
            <span className={Css.count}>{name ||`(${flag})`}</span>
        </a>
    )
}