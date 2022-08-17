import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {useParams} from "react-router-dom";
import {getArAlbums} from "@/api/artist";
import Load from "@/components/load";
import DishItem from "@/components/dishItem";
import {localDate} from "@/untils/formatDate";
import {Pagination} from "antd";

export default function AllAlbum(props) {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(12);

    useEffect(()=>{
        setAlbums([]);
        setTotal(12);
        change(current);
    },[id])

    function change(_page) {
        setCurrent(_page);
        albums[_page] === undefined &&
        getArAlbums(id,_page-1,12).then(res=>{
            if(res.code === 200){
                albums[_page] = res.hotAlbums;
                setAlbums([...albums]);
                res.more && setTotal(total+12);
            }
        })
    }

    return (
        <div className={Css.allAlbum}>
            {
                albums[current] !== undefined ?
                    <ul className={["clearFix",Css.list].join(" ")}>
                        {
                            albums[current].map((item,index)=>{
                                return <li key={index} className={"c_box float_l"}><DishItem dish={item}>
                                    <span className={Css.date}>{localDate(item.publishTime)}</span>
                                </DishItem></li>
                            })
                        }
                    </ul> : <Load/>
            }
            <div className={Css.page}>
                <Pagination current={current} onChange={change} total={total} pageSize={12} showSizeChanger={false}/>
            </div>
        </div>
    )
}