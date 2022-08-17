import React from "react";
import {useParams} from "react-router-dom";
import Css from "./index.module.css";

export default function Home(props) {
    const {id} = useParams();

    return (
        <div className={Css.home}>home,id={id}</div>
    )
}