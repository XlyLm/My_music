import React, { useEffect, useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import Css from "./index.module.css";
import ErrPage from "../errPage";

function Musician(props) {
    return (
        <div className={"vessel"}>
            <ErrPage/>
        </div>
    )
}

export default Musician;