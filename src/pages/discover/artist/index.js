import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {Outlet} from "react-router";
import Css from "./index.module.css";
import Title from "@/components/title";
import {initArtist} from "./store/actions";
import {connect} from "react-redux";
import Load from "@/components/load";

function Artist(props) {
    const { _initArtist } = props;
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [title, setTitle] = useState("推荐歌手");

    useEffect(()=>{
        let arr = [
            {
                title: "华语",
                content: [{name:"华语男歌手",id:1000},{name:"华语女歌手",id:1001},{name:"华语组合/乐队",id:1002}]
            },
            {
                title: "欧美",
                content: [{name:"欧美男歌手",id:2000},{name:"欧美女歌手",id:2001},{name:"欧美组合/乐队",id:2002}]
            },
            {
                title: "日本",
                content: [{name:"日本男歌手",id:3000},{name:"日本女歌手",id:3001},{name:"日本组合/乐队",id:3002}]
            },
            {
                title: "韩国",
                content: [{name:"韩国男歌手",id:4000},{name:"韩国女歌手",id:4001},{name:"韩国组合/乐队",id:4002}]
            },
            {
                title: "其他",
                content: [{name:"其他男歌手",id:5000},{name:"其他女歌手",id:5001},{name:"其他组合/乐队",id:5002}]
            }
        ]
        setList(arr);
    },[])
    useEffect(()=>{
        _initArtist();
        let title = "";
        switch (id) {
            case "signed":
                title = "入驻歌手";
                break;
            case "1000":
                title = "华语男歌手";
                break;
            case "1001":
                title = "华语女歌手";
                break;
            case "1002":
                title = "华语组合/乐队";
                break;
            case "2000":
                title = "欧美男歌手";
                break;
            case "2001":
                title = "欧美女歌手";
                break;
            case "2002":
                title = "欧美组合/乐队";
                break;
            case "3000":
                title = "日本男歌手";
                break;
            case "3001":
                title = "日本女歌手";
                break;
            case "3002":
                title = "日本组合/乐队";
                break;
            case "4000":
                title = "韩国男歌手";
                break;
            case "4001":
                title = "韩国女歌手";
                break;
            case "4002":
                title = "韩国组合/乐队";
                break;
            case "5000":
                title = "其他男歌手";
                break;
            case "5001":
                title = "其他女歌手";
                break;
            case "5002":
                title = "其他组合/乐队";
                break;
            default:
                title = "推荐歌手";
        }
        setTitle(title);
    },[id])

    return (
        <div className={"vessel clearFix"}>
            {/*左侧导航*/}
            <div className={["float_l",Css.left].join(" ")}>
                <div className={Css.list}>
                    <h3>推荐</h3>
                    <ul>
                        <li><NavLink to={"/discover/artist/"} className={
                            ({ isActive })=>{
                                return  isActive ? Css.active : null;
                            }}>
                            推荐歌手</NavLink></li>
                        <li><NavLink to={"signed"} className={
                            ({ isActive })=>{
                                return  isActive ? Css.active : null;
                            }}>
                            入驻歌手</NavLink></li>
                    </ul>
                </div>
                {
                    list !== null ? list.map((item,index)=>{
                        return <div className={Css.list} key={index}>
                            <h3>{item.title}</h3>
                            <ul>
                                {
                                    item.content.map((item2,index2)=>{
                                        return <li key={index2}>
                                            <NavLink to={`cat/${item2.id}/`} className={
                                                ({ isActive })=>{
                                                    return  isActive ? Css.active : null;
                                                }}>
                                                {item2.name}</NavLink>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    })  : <Load/>
                }
            </div>
            {/*分隔栏*/}
            <div className={["line",Css.line].join(" ")}> </div>
            {/*右侧列表*/}
            <div className={["float_r",Css.right].join(" ")}>
                <Title title={title}/>
                <Outlet/>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    return {  };
}
const mapDispatch = (dispatch)=>{
    return {
        _initArtist(){
            dispatch(initArtist());
        }
    }
}

export default connect(mapState,mapDispatch)(Artist);