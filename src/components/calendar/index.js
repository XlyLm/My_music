import React from "react";
import Css from "./index.module.css";
import {Link} from "react-router-dom";
import getWeek from "@/untils/getWeek";

export default function Calender(props) {
    return (
        <div className={["o_hide text_a_c",Css.calender].join(" ")}>
            <div className={Css.week}>{getWeek()}</div>
            <div className={Css.mask}> </div>
            <div className={Css.date}>{new Date().getDate()}</div>
        </div>
    )
}