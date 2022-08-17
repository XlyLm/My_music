import React, { memo } from "react";
import { Outlet } from "react-router-dom";

function Discover(props) {
    return (
        <Outlet/>
    )
}
export default memo(Discover);