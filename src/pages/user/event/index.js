import React from "react";
import {useParams} from "react-router-dom";
import Css from "./index.module.css";

export default function Event(props) {
    const {id} = useParams();

    return (
        <div className={Css.event}>event,id={id}</div>
    )
}