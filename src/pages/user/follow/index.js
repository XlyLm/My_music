import React from "react";
import {useParams} from "react-router-dom";
import Css from "./index.module.css";

export default function Follow(props) {
    const { id } = useParams();
    return (
        <div className={Css.follow}>follow, id={id}</div>
    )
}