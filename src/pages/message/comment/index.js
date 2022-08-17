import React from "react";
import Css from "./index.module.css";
import Title from "../../../components/title";

export default function Comment(props) {
    return (
        <div className={Css.cmt}>
            <Title title={"评论"}/>
        </div>
    )
}