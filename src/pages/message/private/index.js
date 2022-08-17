import React from "react";
import Css from "./index.module.css";
import Title from "../../../components/title";
import MessageBtn from "../../../components/btns/messageBtn";

export default function Private(props) {
    return (
        <div className={Css.pravite}>
            <Title title={"私信"}>
                <div className={["d_l_b",Css.btn].join(" ")}>
                    <MessageBtn />
                </div>
            </Title>
        </div>
    )
}