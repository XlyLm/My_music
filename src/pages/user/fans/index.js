import React from "react";
import {useParams} from "react-router-dom";
import Css from "./index.module.css";

export default function Fans(props) {
    const {id} = useParams();

    return (
        <div className={Css.fans}>fans,id={id}</div>
    )
}