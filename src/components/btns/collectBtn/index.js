import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {message} from "antd";

export default function CollectBtn(props) {
    const { name="收藏全部", id=0, visible=true } = props;
    const [flag, setFlag] = useState("");

    useEffect(()=>{
        if(typeof name === "number"){
            if(name > 10000){
                setFlag(`(${parseInt(name/10000)}万+)`);
            }else{
                setFlag(`(${name})`);
            }
        }else{
            setFlag(name);
        }
    })

    function collect(_id) {
        if(visible){
            message.success(_id);
        }
    }

    return <a className={["d_l_b o_hide",Css.collect,(visible?"":Css.normal)].join(" ")} href="#" title={"收藏"}
              onClick={(e)=>{e.preventDefault(); collect(id);}}>
        <i className={["iconfont d_block float_l",Css.icon].join(" ")}>&#xe6db;</i>
        <span className={["d_block float_l",Css.name].join(" ")}>{flag}</span>
    </a>
}