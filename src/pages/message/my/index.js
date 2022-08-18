import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import Title from "@/components/title";
import Empty from "../empty";
import {getMyInfo} from "@/api/user";
import {Pagination} from "antd";

export default function My(props) {
    const [msg, setMsg] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        changePage(1);
    },[])

    function changePage(_page){
        setPage(_page);
        msg[_page-1] === undefined && getMyInfo(_page-1,20).then(res=>{
            if(res.code === 200){
                msg[_page-1] = res.forwards;
                setMsg([...msg]);
                setTotal(res.newCount);
            }
        });
    }

    return (
        <div className={Css.my}>
            <Title title={"我的"}/>
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
                    </ul> : <Empty content={"@"}/>
            }
        </div>
    )
}