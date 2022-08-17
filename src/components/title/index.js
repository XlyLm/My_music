import React from "react";
import {Link} from "react-router-dom";
import Css from "./index.module.css";

export default function Title(props) {
    const { icon=false, title="title", more="", children=null } = props;

    return (
        <div className={[Css.titleCnt,"clearFix"].join(" ")}>
            {
                icon && <i className={["iconfont float_l text_a_c",Css.dot].join(" ")}>&#xe601;</i>
            }
            <span className={["float_l",Css.title].join(" ")}>{title}</span>
            <div className={["float_l",Css.child].join(" ")}>{children}</div>
            {
                more != "" && <Link to={more} className={["float_r",Css.more].join(" ")}>更多 <i className={"iconfont"}>&#xe608;</i></Link>
            }
        </div>
    )
}