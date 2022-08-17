import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {Outlet} from "react-router";
import {connect} from "react-redux";
import Css from "./index.module.css";
import {initDj, setDjTypes} from "./store/actions";
import Load from "@/components/load";

function DjRadio(props) {
    const { djTypes, _initDj, _setDjTypes } = props;
    const { id } = useParams();

    useEffect(()=>{
        djTypes === null && _setDjTypes();
    },[])
    useEffect(()=>{
        _initDj();
    },[id])

    return (
        <div className={["vessel",Css.djradio].join(" ")}>
            {
                djTypes !== null ?
                    <>
                        <ul className={["clearFix",Css.types].join(" ")}>
                            {
                                djTypes.map((item,index)=>{
                                    return <li key={index} className={"float_l text_a_c"}>
                                        <Link to={`${item.id}`} className={["d_block",(id==item.id ? Css.active : null)].join(" ")}>
                                            <div className={["c_box m_auto o_hide",Css.typeImg].join(" ")}
                                                 style={{backgroundImage:"url("+item.picWebUrl+")"}}> </div>
                                            <p>{item.name}</p>
                                        </Link>
                                    </li>
                                })
                            }
                        </ul>
                        <Outlet/>
                    </> : <Load/>
            }
        </div>
    )
}

const mapState = (state)=>{
    const { djTypes } = state.get("djradio");
    return { djTypes };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setDjTypes(){
            dispatch(setDjTypes());
        },
        async _initDj(){
            dispatch(initDj());
        }
    }
}

export default connect(mapState,mapDispatch)(DjRadio);