import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Dropdown, Menu, Pagination, Space} from "antd";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import Css from "./index.module.css";
import {connect} from "react-redux";
import Title from "@/components/title";
import {initSongs, setCats, setSongsOffset, setTypeSongs} from "./store/actions";
import Load from "@/components/load";
import CardItem from "@/components/cardItem";


function PlayList(props) {
    const { typeSongs, cats, offset, subs, total, _initSongs, _setCats, _setSongsOffset } = props;
    const { cat } = useParams();
    const [current, setCurrent] = useState(1);
    const [menu, setMenu] = useState(null);

    useEffect(()=>{
        cats === null && _setCats();
    },[])
    useEffect(()=>{
        _initSongs();
        let flag = (cat == undefined ? "全部" : cat);
        _setSongsOffset(flag,0);
        setCurrent(1);
    },[cat])
    useEffect(()=>{
        if(cats !== null && subs !== null){
            let el = (<Menu items={[
                {
                    label: <div className={Css.bd}>
                        <div className={Css.chooseTitle}>
                            <Link className={"d_block text_a_c"} to={"/discover/playlist"}>全部风格</Link>
                        </div>
                        {
                            Object.keys(cats).map(item=>{
                                return <div className={"clearFix"} key={cats[item]}>
                                    <div className={["float_l text_a_c",Css.type].join(" ")}>{cats[item]}</div>
                                    <div className={Css.content}>
                                        {
                                            subs.map((item2,index)=>{
                                                return item2.category == item ? <React.Fragment key={index}>
                                                    <Link to={`/discover/playlist/${item2.name.replace(/\//,'|')}`}>{item2.name}</Link>
                                                    <span className={Css.line}>|</span>
                                                </React.Fragment> : null
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>,
                    key: 0
                }
            ]}/>);
            setMenu(el);
        }
    },[cats,subs])

    function change(page) {
        let flag = (cat == undefined ? "全部" : cat);
        _setSongsOffset(flag,page-1);
        setCurrent(page);
    }

    return (
        <div className={["vessel",Css.cnts].join(" ")}>
            <Title title={cat == undefined ? "全部" : cat}>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <a className={["d_l_b",Css.choose].join(" ")} href="#" onClick={(e)=>e.preventDefault()}>
                        <Space>
                            选择分类
                            <DownOutlined/>
                        </Space>
                    </a>
                </Dropdown>
            </Title>
            {/*列表*/}
            <div className={Css.sonsCnt}>
                {
                    typeSongs[offset] !== undefined ?
                        <>
                            <ul className={["clearfix",Css.songs].join(" ")}>
                                {
                                    typeSongs[offset].map((item,index)=>{
                                        return <li className={"float_l c_box d_l_b o_hide"} key={index}>
                                            <CardItem id={item.id} path={`/playlist/${item.id}`}
                                                      title={item.name} count={item.playCount} imgUrl={item.coverImgUrl}>
                                                <p className={"font_h"}><Link to={`/playlist/${item.id}`}>{item.name}</Link></p>
                                                <p className={["font_h",Css.user].join(" ")}>
                                                    <span className={Css.by}>by</span>
                                                    <Link to={`/artist/${item.creator.userId}`} className={["d_l_b font_h",Css.name].join(" ")}>
                                                        {item.creator.nickname}
                                                    </Link>
                                                    {
                                                        item.creator.avatarDetail !== null &&
                                                        <img className={Css.flagImg} src={item.creator.avatarDetail.identityIconUrl} alt="pic"/>
                                                    }
                                                </p>
                                            </CardItem>
                                        </li>
                                    })
                                }
                            </ul>
                        </> : <Load/>
                }
                {/*分页*/}
                <div className={Css.page}>
                    <Pagination current={current} onChange={change} total={total} pageSize={40} showSizeChanger={false}/>
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { typeSongs, cats, offset, subs, total } = state.get("playlist");
    return { typeSongs, cats, offset, subs, total };
}
const mapDispatch = (dispatch)=>{
    return {
        async _initSongs(){
            dispatch(initSongs());
        },
        async _setCats(){
            dispatch(setCats());
        },
        async _setSongsOffset(_cat,_offset){
            dispatch(setSongsOffset(_cat,_offset));
        }
    };
}

export default connect(mapState,mapDispatch)(PlayList);