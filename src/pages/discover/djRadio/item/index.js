import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Pagination} from "antd";
import Css from "./index.module.css";
import Title from "@/components/title";
import {initDj, setDjOffset, setGoodNewDj} from "../store/actions";
import Load from "@/components/load";

function Item(props) {
    const { goodNewDj, djList, offset, total, _initDj, _setGoodNewDj, _setDjOffset } = props;
    const {id} = useParams();
    const [flag,setFlag] = useState(true);
    const [current, setCurrent] = useState(1);

    useEffect(()=>{
        _initDj();
        goodNewDj === null && _setGoodNewDj();
        _setDjOffset(id,flag,0);
        setFlag(true);
        setCurrent(1);
    },[id])

    function changeFlag(val){
        if(val !== flag){
            _initDj();
            _setDjOffset(id,val,0);
            setFlag(val);
            setCurrent(1);
        }
    }
    function change(_page) {
        setCurrent(_page);
        _setDjOffset(id,flag,_page-1);
    }

    return (
        <div className={Css.item}>
            {/*新秀电台*/}
            <div className={Css.newDjCnt}>
                <Title title={"新秀电台"}/>
                <ul className={[Css.newDj,"clearFix"].join(" ")}>
                    {
                        goodNewDj !== null ? goodNewDj.map((item,index)=>{
                            return <li key={index} className={"float_l"}>
                                <Link to={`/djradio/${item.id}`} className={["d_block",Css.picture].join(" ")}>
                                    <img src={item.picUrl} alt="pic"/>
                                </Link>
                                <h3><Link to={`/djradio/${item.id}`} className={"font_h d_block"}>{item.name}</Link></h3>
                                <p>{item.rcmdtext}</p>
                            </li>
                        }) : <Load/>
                    }
                </ul>
            </div>
            {/*电台列表*/}
            <div className={Css.djListCnt}>
                <Title title={"电台列表"}>
                    <div className={Css.title}>
                        <a className={flag ? Css.active : null} href="#" onClick={(e)=>{e.preventDefault();changeFlag(true)}}>默认电台</a>
                        <span>|</span>
                        <a className={!flag ? Css.active : null} href="#" onClick={(e)=>{e.preventDefault();changeFlag(false)}}>最热电台</a>
                    </div>
                </Title>
                <ul className={[Css.djList,"clearFix"].join(" ")}>
                    {
                        djList[offset] !== undefined ? djList[offset].map((item,index)=>{
                            return <li key={index} className={"clearFix float_l c_box"}>
                                <Link to={`/djradio/${item.id}`} className={["d_block float_l",Css.djImg].join(" ")}>
                                    <img src={item.picUrl} alt="pic"/>
                                </Link>
                                <div className={["float_l",Css.djBody].join(" ")}>
                                    <h3 className={"font_h"}><Link to={`/djradio/${item.id}`}>{item.name}</Link></h3>
                                    <p>
                                        <i className={"iconfont"}>&#xe851;</i>
                                        <Link to={`/user/home/${item.dj.userId}`}>{item.dj.nickname}</Link>
                                    </p>
                                    <p>订阅 {item.subCount} 次</p>
                                </div>
                            </li>
                        }) : <Load/>
                    }
                </ul>
                <div className={Css.page}>
                    <Pagination current={current} onChange={change} total={total} pageSize={12} showSizeChanger={false}/>
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { goodNewDj, djList, offset, total } = state.get("djradio");
    return { goodNewDj, djList, offset, total };
}
const mapDispatch = (dispatch)=>{
    return {
        async _initDj(){
            dispatch(initDj());
        },
        async _setGoodNewDj(){
            dispatch(setGoodNewDj());
        },
        async _setDjOffset(_id,_type,_offset){
            dispatch(setDjOffset(_id,_type,_offset));
        }
    }
}

export default connect(mapState,mapDispatch)(Item);