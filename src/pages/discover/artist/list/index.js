import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Outlet} from "react-router";
import {connect} from "react-redux";
import {Pagination} from "antd";
import Css from "./index.module.css";
import {initArtist, setArtistOffset} from "../store/actions";
import Load from "@/components/load";

function List(props) {
    const { artists, total, offset, _initArtist, _setArtistOffset } = props;
    const { id, letter } = useParams();
    const [current, setCurrent] = useState(1);

    useEffect(()=>{
        _initArtist();
        _setArtistOffset(id,0,letter);
        setCurrent(1);
    },[id,letter])

    function change(_page) {
        setCurrent(_page);
        _setArtistOffset(id,_page-1,letter);
    }

    return (
        <div className={Css.listCnt}>
            {
                artists[offset] !== undefined ?
                    <ul className={Css.list}>
                        {
                            artists[offset].map((item,index)=> {
                                return <li key={index} className={"c_box d_l_b o_hide"}>
                                    <Link to={`/artist/${item.id}`} className={"d_block"}><img src={item.picUrl} alt="pic"/></Link>
                                    <p>
                                        <Link to={`/artist/${item.id}`}>{item.name}</Link>
                                        <i className={"iconfont"}>&#xe6dd;</i>
                                    </p>
                                </li>
                            })
                        }
                    </ul> : <Load/>
            }
            <div className={Css.page}>
                <Pagination current={current} onChange={change} total={total} pageSize={30} showSizeChanger={false}/>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { artists, total, offset } = state.get("artist");
    return { artists, total, offset };
}
const mapDispatch = (dispatch)=>{
    return {
        _initArtist(){
            dispatch(initArtist());
        },
        _setArtistOffset(_id,_offset,_name){
            dispatch(setArtistOffset(_id,_offset,_name));
        }
    };
}

export default connect(mapState,mapDispatch)(List);