import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import Css from "./index.module.css";
import Title from "@/components/title";
import MessageBtn from "@/components/btns/messageBtn";
import Empty from "../empty";
import {getPrivateInfo} from "@/api/user";

export default function Private(props) {
    const [msg, setMsg] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        changePage(1);
    },[])

    function changePage(_page){
        setPage(_page);
        msg[_page-1] === undefined && getPrivateInfo(_page-1,20).then(res=>{
            if(res.code === 200){
                msg[_page-1] = res.msgs;
                setMsg([...msg]);
                setTotal(res.newMsgCount);
            }
        });
    }

    return (
        <div className={Css.pravite}>
            <Title title={"私信"}>
                <div className={["d_l_b",Css.btn].join(" ")}>
                    <MessageBtn />
                </div>
            </Title>
            {
                total > 0
                    ? <ul className={Css.list}>
                        {
                            msg[page-1] !== undefined
                                ? msg[page-1].map((item,index)=>{
                                    return <li key={index} className={"c_box"}>

                                    </li>
                                }) : null
                        }
                        {
                            total > 20 &&
                            <div className={Css.page}>
                                <Pagination current={page} onChange={changePage} total={total} pageSize={20} showSizeChanger={false}/>
                            </div>
                        }
                    </ul> : <Empty content={"私信"}/>
            }
        </div>
    )
}