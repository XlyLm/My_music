import { Spin } from 'antd';
import React from "react";
import Css from "./index.module.css";

export default function Load(props) {
    return (
        <div className={["text_a_c d_l_b",Css.load].join(" ")}>
            <Spin size={"large"}/>
        </div>
    )
}