import React from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {Outlet} from "react-router";
import Css from "./index.module.css";

function Letter(props) {
    const { id } = useParams();
    const word = ["A","B","C","D","E","F","J","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    return (
        <>
            <ul className={["d_flex_b",Css.word].join(" ")}>
                <li><NavLink to={`/discover/artist/cat/${id}/`} className={({ isActive })=>(isActive?Css.active:null)}>
                    热门</NavLink></li>
                {
                    word.map((item,index)=>{
                        return <li key={index}>
                            <NavLink to={`/discover/artist/cat/${id}/${item.toLowerCase()}`} className={({ isActive })=>(isActive?Css.active:null)}>{item}</NavLink>
                        </li>
                    })
                }
                <li><NavLink to={`/discover/artist/cat/${id}/0`} className={({ isActive })=>(isActive?Css.active:null)}>
                    其他</NavLink></li>
            </ul>
            <Outlet/>
        </>
    )
}

export default Letter;