import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import Css from "./index.module.css";
import Title from "@/components/title";
import Empty from "../empty";
import {getCmtInfo} from "@/api/user";
import {connect} from "react-redux";

function Comment(props) {
    const { userId } = props;
    const [msg, setMsg] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        userId !== null && changePage(1);
    },[userId])

    function changePage(_page){
        setPage(_page);
        msg[_page-1] === undefined && getCmtInfo(userId,_page-1,20).then(res=>{
            if(res.code === 200){
                msg[_page-1] = res.comments;
                setMsg([...msg]);
                setTotal(res.total);
            }
        });
    }

    return (
        <div className={Css.cmt}>
            <Title title={"评论"}/>
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
                    </ul> : <Empty content={"评论"}/>
            }
        </div>
    )
}

const mapState = (state)=>{
    const { userId } = state.get("user");
    return { userId };
}
const mapDispatch = (dispatch)=>{
    return { };
}

export default connect(mapState,mapDispatch)(Comment);