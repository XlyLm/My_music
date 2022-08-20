import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Css from "./index.module.css";
import {getUserTrend} from "@/api/user";
import Title from "@/components/title";
import Empty from "../empty";

export default function Event(props) {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        getUserTrend(id).then(res=>{
            setEvent(res.events);
            setTotal(res.events.length);
        })
    },[id])

    return (
        <div className={Css.event}>
            <Title title={`动态（${total}）`}/>
            {
                total === 0
                ? <Empty content={"动态"}/>
                : null
            }
        </div>
    )
}