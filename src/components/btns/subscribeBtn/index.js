import React, {useEffect, useState} from "react";
import StarOutlined from "@ant-design/icons/lib/icons/StarOutlined";
import {message} from "antd";
import Css from "./index.module.css";

export default function SubscribeBtn(props) {
    const { id, count=0 } = props;
    const [total, setTotal] = useState(null);

    useEffect(()=>{
        count > 10000 ? setTotal((parseInt(count/1000)+"万+")) : setTotal(count);
    },[id])

    function subscribe(_id) {
        message.success(_id);
    }

    return (
        <a href={"#"} className={["d_l_b",Css.subscribe].join(" ")} onClick={(e)=>{e.preventDefault(); subscribe(id);}}>
            <StarOutlined />
            <span>订阅({total})</span>
        </a>
    )
}