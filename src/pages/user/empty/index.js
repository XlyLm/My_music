import React from "react";
import Css from "./index.module.css";

export default function Empty(props) {
    const { content } = props;
    return (
        <div className={Css.empty}>
            <i className={"iconfont"}>&#xe61a;</i>
            <span>还没有 {content}</span>
        </div>
    )
}