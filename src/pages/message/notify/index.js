import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import Css from "./index.module.css";
import Title from "@/components/title";
import Empty from "../empty";
import {getNotifyInfo} from "@/api/user";

export default function Notify(props) {
    const [msg, setMsg] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(20);

    useEffect(()=>{
        changePage(1);
    },[])

    function changePage(_page){
        setPage(_page);
        msg[_page-1] === undefined && getNotifyInfo(_page-1,20).then(res=>{
            if(res.code === 200){
                msg[_page-1] = res.notices;
                setMsg([...msg]);
                res.more && setTotal(total+20);
            }
        });
    }

    return (
        <div className={Css.notify}>
            <Title title={"通知"}/>
            {
                (msg.length>0 && msg[0].length>0)
                    ? <ul className={Css.list}>
                        {
                            msg[page-1] !== undefined
                                ? msg[page-1].map((item,index)=>{
                                    return <li key={index} className={"c_box"}>

                                    </li>
                                }) : null
                        }
                        {
                            msg > 20 &&
                            <div className={Css.page}>
                                <Pagination current={page} onChange={changePage} total={total} pageSize={20} showSizeChanger={false}/>
                            </div>
                        }
                    </ul> : <Empty content={"通知"}/>
            }
        </div>
    )
}