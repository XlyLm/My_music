import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {message, Pagination} from "antd";
import Css from "./index.module.css";
import {initAlbum, setAlbumOffset} from "../store/actions";
import Load from "@/components/load";
import DishItem from "@/components/dishItem";
import {setLogin} from "../../../../components/myModal/register/store/actions";

function Show(props) {
    const { user, allAlbums, total, offset, _setLogin, _initAlbum, _setAlbumOffset } = props;
    const { area } = useParams();
    const [current, setCurrent] = useState(1);

    useEffect(()=>{
        _initAlbum();
        let a = (area === undefined ? "ALL" : area);
        _setAlbumOffset(a,0);
        setCurrent(1);
    },[area])

    function change(page) {
        if(user===null){
            message.warning("你还未登录。无法使用该功能，请前往登录",1,()=>_setLogin(true));
            _setLogin(true);
        }else{
            let a = (area === undefined ? "ALL" : area);
            _setAlbumOffset(a,page-1);
            setCurrent(page);
        }
    }

    return (
        <>
            <ul className={["clearFix",Css.list].join(" ")}>
                {
                    allAlbums[offset] !== undefined ?
                        allAlbums[offset].map((item,index)=>{
                            return <li key={index} className={"float_l"}>
                                <DishItem dish={item}>
                                    <Link to={`/artist/${item.artist.id}`}>{item.artist.name}</Link>
                                </DishItem>
                            </li>
                        }) : <Load/>
                }
            </ul>
            <div className={Css.page}>
                <Pagination current={current} onChange={change} total={total} pageSize={30} showSizeChanger={false}/>
            </div>
        </>
    )
}

const mapState = (state)=>{
    const { allAlbums, total, offset } = state.get("album");
    const { user } =  state.get("user");
    return { user, allAlbums, total, offset };
}
const mapDispatch = (dispatch)=>{
    return {
        _setLogin(_isLogin){
            dispatch(setLogin(_isLogin));
        },
        _initAlbum(){
            dispatch(initAlbum());
        },
        _setAlbumOffset(_area,_offset){
            dispatch(setAlbumOffset(_area,_offset));
        }
    };
}

export default connect(mapState,mapDispatch)(Show);