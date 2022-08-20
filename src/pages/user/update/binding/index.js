import React, {useEffect, useState} from "react";
import Css from "./index.module.css";
import {connect} from "react-redux";
import {message} from "antd";
import {getBindInfo} from "@/api/user";
import HidePhone from "@/untils/hidePhone";

function Binding(props) {
    const { userId } = props;
    const [phone, setPhone] = useState(null);
    const [binds, setBinds] = useState(null);

    useEffect(()=>{
        setBinds([
            { name: "网易邮箱账号", id: "", icon: <>{"易"}</> },
            { name: "新浪微博", id: "", icon: <>&#xe611;</> },
            { name: "QQ", id: "", icon: <>&#xe60b;</> },
            { name: "微信", id: "", icon: <>&#xe605;</> }
        ]);
        userId !== null && getBindInfo(userId).then(res=>{
            if(res.code === 200){
                setPhone(JSON.parse(res.bindings[0].tokenJsonStr).cellphone);
            }
        })
    },[userId])

    function editPhone(_id) {
        message.success(_id);
    }
    function editPw(_phone) {
        message.success(_phone);
    }
    function bind(_id) {
        message.success(_id);
    }

    return (
        <div className={Css.bind}>
            <div className={["c_box clearFix",Css.binding].join(" ")}>
                <i className={["float_l iconfont d_block text_a_c",Css.tag].join(" ")}>&#xeb4d;</i>
                <div className={["float_l",Css.info].join(" ")}>
                    <h3>手机号</h3>
                    {
                        phone !== null &&
                        <p>
                            使用手机注册: +86 { HidePhone(phone) }
                            <a href="#" onClick={(e)=>{e.preventDefault(); editPhone(userId);}}
                               className={Css.editPhone}
                            >
                                修改
                            </a>
                        </p>
                    }
                </div>
                <a href="#" onClick={(e)=>{e.preventDefault(); editPw(phone)}}
                   className={["float_r d_block text_a_c",Css.editPw].join(" ")}
                >
                    修改密码
                </a>
            </div>

            <div className={Css.desc}>
                绑定帐号后，你可以分享音乐给那边的朋友们，还可以直接用其登录云音乐
            </div>

            <ul className={Css.list}>
                {
                    binds !== null &&
                        binds.map((item,index)=>{
                            return  <li className={"clearFix c_box"} key={index}>
                                <i className={["float_l iconfont d_block text_a_c",Css.tag,Css.otherTag].join(" ")}>{item.icon}</i>
                                <h3 className={["float_l",Css.otherInfo].join(" ")}>
                                    {item.name}
                                </h3>
                                <a href="#" className={["float_r d_block text_a_c",Css.editPw].join(" ")}
                                   onClick={(e)=>{e.preventDefault(); bind(item.id);}}>
                                    <span>+</span>
                                    绑定
                                </a>
                            </li>
                        })
                }
            </ul>
        </div>
    )
}

const mapState = (state)=>{
    const { userId } = state.get("user");
    return { userId };
}
const mapDispatch = (dispatch)=>{
    return {};
}

export default connect(mapState,mapDispatch)(Binding);