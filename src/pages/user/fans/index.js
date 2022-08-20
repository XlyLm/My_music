import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Css from "./index.module.css";
import Title from "@/components/title";
import {getUserFans} from "@/api/user";
import Empty from "../empty";

export default function Fans(props) {
    const {id} = useParams();
    const [fans, setFans] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        getUserFans(id).then(res=>{
            setFans(res.followeds);
            setTotal(res.followeds.length);
        })
    },[id])

    return (
        <div className={Css.fans}>
            <Title title={`粉丝（${total}）`}/>
            {
                total === 0
                ? <Empty content={"粉丝"}/>
                : null
            }
        </div>
    )
}