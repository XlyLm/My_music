import React, {useEffect, useState} from "react";
import {Link, Outlet, useParams} from "react-router-dom";
import {Avatar, message} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import WeiboCircleOutlined from "@ant-design/icons/lib/icons/WeiboCircleOutlined";
import CheckOutlined from "@ant-design/icons/lib/icons/CheckOutlined";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {connect} from "react-redux";
import Css from "./index.module.css";
import {getUserInfo} from "@/api/user";
import Load from "@/components/load";


function User(props) {
    const { user, level } = props;
    const { id } = useParams();
    const [users, setUsers] = useState(null);
    const [levels, setLevels] = useState(null);

    useEffect(()=>{
        if(user.userId == id){
            setUsers(user);
            setLevels(level);
        }else{
            getUserInfo(id).then(res=>{
                if(res.code === 200){
                    setUsers(res.profile);
                    setLevels(res.level);
                }
            })
        }
    },[id])

    function sentChat(_id) {
        message.success(_id);
    }
    function unFollow(_id) {
        message.success(_id);
    }
    function toFollow(_id) {
        message.success(_id);
    }

    return (
        <div className={["vessel",Css.user].join(" ")}>
            {
                users !== null ?
                    <>
                        <div className={["clearFix",Css.infoCnt].join(" ")}>
                            <div className={["float_l",Css.userImg].join(" ")}>
                                <Avatar shape="square" size={185} icon={<UserOutlined />}
                                    src={users.avatarUrl}/>
                            </div>
                            <div className={Css.userInfo}>
                                <div className={Css.nameCnt}>
                                    <div className={Css.name}>
                                        <h3>
                                            <span>{users.nickname}</span>
                                            <i>Lv.{levels}</i>
                                            <span className={Css.gender}>
                                                {users.gender===1 ? "女" : users.gender===0 ? "男" : null}
                                            </span>
                                            {
                                                user.id !== id &&
                                                <>
                                                    <a href="#" className={["iconfont",Css.chat].join(" ")}
                                                       onClick={(e)=>{e.preventDefault(); sentChat(users.userId);}}>&#xe60e; 发私信</a>
                                                    {
                                                        users.followed
                                                            ? <a href="#" className={Css.followed}
                                                                 onClick={(e)=>{e.preventDefault(); unFollow(users.userId);}}>
                                                                <span className={Css.check}><CheckOutlined />已关注</span>
                                                                <span className={Css.close}><CloseOutlined />取消关注</span>
                                                            </a>
                                                            : <a href="#" className={Css.follow}
                                                                 onClick={(e)=>{e.preventDefault(); toFollow(users.userId);}}>
                                                                <PlusOutlined /> 关注
                                                            </a>
                                                    }
                                                </>
                                            }
                                        </h3>
                                        <div className={Css.userBtn}>
                                            {
                                                id == user.userId
                                                    ? <Link to={`/user/update/`} className={"d_block"}>编辑个人资料</Link>
                                                    : <Link to={`/artist/${users.artistId}`} className={"d_block"}>查看歌手页面</Link>
                                            }
                                        </div>
                                    </div>
                                    {
                                        users.avatarDetail != null &&
                                        <div className={Css.identify}>
                                            <img src={users.avatarDetail.identityIconUrl} alt="pic"/>
                                            <span>{users.description}</span>
                                        </div>
                                    }
                                </div>
                                {
                                    <ul className={Css.data}>
                                        <li className={Css.fst}>
                                            <Link to={`/user/event/${users.userId}`}>{users.eventCount} 动态</Link>
                                        </li>
                                        <li>
                                            <Link to={`/user/follow/${users.userId}`}>{users.follows} 关注</Link>
                                        </li>
                                        <li>
                                            <Link to={`/user/fans/${users.userId}`}>{users.followeds} 粉丝</Link>
                                        </li>
                                    </ul>
                                }
                                <p className={["font_h",Css.title].join(" ")}>
                                    所在地区: <span>{users.province}</span>
                                </p>
                                <p className={["font_h",Css.title].join(" ")}>
                                    社交网络: <span className={Css.icon}><WeiboCircleOutlined /></span>
                                </p>
                            </div>
                        </div>
                        <Outlet/>
                    </> : <Load/>
            }
        </div>
    )
}

const mapState = (state)=>{
    const { user, level } = state.get("user");
    return { user, level };
}
const mapDispatch = (dispatch)=>{
    return {

    }
}

export default connect(mapState, mapDispatch)(User);