import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Css from "./index.module.css";
import ErrPage from "../errPage";

function Product(props) {
    return (
        <div className={"vessel"}>
            <ErrPage/>
        </div>
    )
}

export default Product;