import React from "react";
import Css from "./index.module.css";
import Title from "../../../components/title";

export default function Notify(props) {
    return (
        <div className={Css.notify}>
            <Title title={"通知"}/>
        </div>
    )
}