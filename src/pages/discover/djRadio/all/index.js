import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Css from "./index.module.css";
import {setDjRank, setProgramRank, setRecDj, setRecProgram} from "../store/actions";
import Title from "@/components/title";
import Load from "@/components/load";
import DjRank from "@/components/djRank";

function All(props) {
    const { recDj, recProgram, djRank, programRank, _setRecDj, _setRecProgram, _setDjRank, _setProgramRank } = props;

    useEffect(()=>{
        recDj === null && _setRecDj();
        recProgram === null && _setRecProgram();
        djRank === null && _setDjRank();
        programRank === null && _setProgramRank();
    },[])

    return (
        <div className={Css.all}>
            <div className={["d_flex_b",Css.allItem].join(" ")}>
                <div className={Css.list}>
                    <Title title={"推荐电台"}/>
                    {
                        recDj !== null ?
                            <ul>
                                {
                                    recDj.map((item,index)=>{
                                        return <li key={index}>
                                            <DjRank id={item.id} imgUrl={item.picUrl} tag={item.category}
                                                    tagUrl={`/discover/djradio/${item.categoryId}`}>
                                                <p className={["font_h",Css.text].join(" ")}>{item.copywriter}</p>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    <Link to={`/djradio/${item.id}`} className={Css.name}>{item.name}</Link>
                                                </p>
                                            </DjRank>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
                <div className={Css.list}>
                    <Title title={"推荐节目"}/>
                    {
                        recProgram !== null ?
                            <ul>
                                {
                                    recProgram.map((item,index)=>{
                                        return <li key={index}>
                                            <DjRank id={item.id} imgUrl={item.coverUrl} tag={item.radio.category}
                                                    tagUrl={`/discover/djradio/${item.radio.categoryId}`}>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    <Link to={`/program/${item.id}`}>{item.name}</Link>
                                                </p>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    <Link to={`/djradio/${item.radio.id}`} className={Css.name}>{item.radio.name}</Link>
                                                </p>
                                            </DjRank>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
            </div>
            <div className={["d_flex_b",Css.allItem].join(" ")}>
                <div className={Css.list}>
                    <Title path title={"电台排行榜"} more={"/discover/djradio/rank/dj"}/>
                    {
                        djRank !== null ?
                            <ul>
                                {
                                    djRank.slice(0,10).map((item,index)=>{
                                        return <li key={index}>
                                            <DjRank id={item.id} top={index+1} imgUrl={item.picUrl} tag={item.score}>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    {item.name}
                                                </p>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    <Link to={`/discover/djradio/${item.categoryId}`} className={Css.name}>{item.category}</Link>
                                                </p>
                                            </DjRank>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
                <div className={Css.list}>
                    <Title title={"节目排行榜"} more={"/discover/djradio/rank/program"}/>
                    {
                        programRank !== null ?
                            <ul>
                                {
                                    programRank.slice(0,10).map((item,index)=>{
                                        return <li key={index}>
                                            <DjRank id={item.program.id} top={index+1} imgUrl={item.program.coverUrl} tag={item.score}>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    <Link to={`/program/${item.program.id}`}>{item.program.name}</Link>
                                                </p>
                                                <p className={["font_h",Css.text].join(" ")}>
                                                    <Link to={`/djradio/${item.program.radio.id}`} className={Css.name}>{item.program.radio.name}</Link>
                                                </p>
                                            </DjRank>
                                        </li>
                                    })
                                }
                            </ul> : <Load/>
                    }
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { recDj, recProgram, djRank, programRank } = state.get("djradio");
    return { recDj, recProgram, djRank, programRank };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setRecDj(){
            dispatch(setRecDj());
        },
        async _setRecProgram(){
            dispatch(setRecProgram());
        },
        async _setDjRank(){
            dispatch(setDjRank());
        },
        async _setProgramRank(){
            dispatch(setProgramRank());
        }
    }
}

export default connect(mapState,mapDispatch)(All);