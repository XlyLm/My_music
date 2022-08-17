import React from 'react';
import { Avatar } from 'antd';
import {Link} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import Css from "./index.module.css";

export default function ListItem(props) {
    const { path="", imgUrl="", children=null } = props;

    return (
        <div className={["clearFix",Css.avCnt].join(" ")}>
            <div className={["float_l",Css.avatar].join(" ")}>
                <Link to={path}>
                    <Avatar src={imgUrl} shape="square" alt={"pic"} size={50} icon={<UserOutlined />} />
                </Link>
            </div>
            <div className={Css.content}>
                {children}
            </div>
        </div>
    )
}