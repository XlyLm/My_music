import React from "react";
import Css from "./index.module.css";
import Title from "../../../components/title";

export default function My(props) {
    return (
        <div className={Css.my}>
            <Title title={"我的"}/>
        </div>
    )
}