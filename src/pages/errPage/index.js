import React from "react";
import { Button, Result } from "antd";
import {useNavigate} from "react-router-dom";

export default function ErrPage(props) {
    const navigate = useNavigate();

    function backPage() {
        navigate(-1);
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={backPage}>返回上个页面</Button>}
        />
    )
}