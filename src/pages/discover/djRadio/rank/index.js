import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import Css from "./index.module.css";
import {setDjRank, setProgramRank} from "../store/actions";
import Load from "@/components/load";
import DjRank from "@/components/djRank";
import Title from "@/components/title";

function Rank(props) {
    const { djRank, programRank, _setDjRank, _setProgramRank } = props;
    const { cat } = useParams();
    const [data, setData] = useState(null);
    const [flag, setFlag] = useState("");

    useEffect(()=>{
        djRank === null && _setDjRank();
        programRank === null && _setProgramRank();
    },[cat])
    useEffect(()=>{
        if(djRank!==null || programRank!==null){
            if(cat==="dj"){
                setData(djRank);
            }else if(cat==="program"){
                setData(programRank);
            }else{
                setData(null);
            }
            setFlag(cat);
        }
    },[cat,djRank,programRank])

    return (
        <div className={["vessel",Css.rank].join(" ")}>
            <Title title={`${(cat==="dj"?"电台":"节目")} 排行榜`}/>
            {
                (data!==null && flag===cat) ?
                    <ul>
                        {
                            data.map((item,index)=>{
                                return <li key={index}>
                                    <DjRank id={cat==="dj"?item.id:item.program.id} imgUrl={cat==="dj"?item.picUrl:item.program.coverUrl}
                                            tag={item.score} top={index+1}>
                                        <div className={["clearFix",Css.text].join(" ")}>
                                            <div className={["float_l",Css.user].join(" ")}>
                                                {
                                                    cat === "dj" ?
                                                        <Link to={`/user/home/${item.dj.userId}`}>{item.dj.nickname}</Link>
                                                        : <Link to={`/user/home/${item.program.dj.userId}`}>{item.program.dj.nickname}</Link>
                                                }

                                            </div>
                                            <div className={["float_l",Css.dj].join(" ")}>
                                                {
                                                    cat === "dj" ?
                                                        <Link to={`/djradio/${item.id}`}>{item.name}</Link>
                                                        : <Link to={`/program/${item.program.id}`}>{item.program.name}</Link>
                                                }
                                            </div>
                                            <div className={["float_l",Css.tag].join(" ")}>
                                                {
                                                    cat === "dj" ?
                                                        <Link to={`/discover/djradio/${item.categoryId}`}>{item.category}</Link>
                                                        : <Link to={`/discover/djradio/${item.program.radio.categoryId}`}>
                                                            {item.program.radio.category}</Link>
                                                }
                                            </div>
                                        </div>
                                    </DjRank>
                                </li>
                            })
                        }
                    </ul> : <Load/>
            }
        </div>
    )
}

const mapState = (state)=>{
    const { djRank, programRank } = state.get("djradio");
    return { djRank, programRank };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setDjRank(){
            dispatch(setDjRank());
        },
        async _setProgramRank(){
            dispatch(setProgramRank());
        }
    };
}

export default connect(mapState,mapDispatch)(Rank);