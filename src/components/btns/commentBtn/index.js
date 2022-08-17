import React, {useEffect, useState} from "react";
import {message} from "antd";
import Css from "./index.module.css";

export default function CommentBtn(props) {
    const { id, count=0 } = props;
    const [flag, setFlag] = useState(0);

    useEffect(()=>{
        const num = parseInt(count);
        if(num>10000){
            setFlag((parseInt(num/10000)+"万+"));
        }else{
            setFlag(num.toString());
        }
    },[])

    function comment(_id) {
        message.success(_id);
    }

    return (
        <a className={["d_l_b o_hide",Css.comment].join(" ")} title={"评论"} href="#" onClick={(e)=>{e.preventDefault(); comment(id);}}>
            <i className={"iconfont"}>&#xe62d;</i>
            <span className={Css.count}>({flag})</span>
        </a>
    )
}