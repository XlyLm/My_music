import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useCookies} from "react-cookie";
import Css from "./index.module.css";
import {Modal} from "antd";
import Login from "./login";
import Register from "./register";
import {setLogin} from "./register/store/actions";

function MyModal(props) {
    const { login, _setLogin } = props;
    const [type, setType] = useState(0);
    const [title, setTitle] = useState("");

    useEffect(()=>{
        switch (type) {
            case 0:
                setTitle("手机号登录");
                break;
            case 1:
                setTitle("密码登录");
                break;
            case 2:
                setTitle("快速注册");
                break;
            case 3:
                setTitle("修改密码");
                break;
        }
    },[type])

    function init() {
        setType(0);
        setTitle("手机号登录");
    }

    return (
        <Modal className={Css.modal} title={title} visible={login} centered footer={null} maskClosable={false}
               onCancel={ ()=>_setLogin(false) } bodyStyle={{"padding": "0"}} destroyOnClose afterClose={init}>
            {
                (type===0 || type===1) ? <Login setType={setType}/>
                : ((type===2 || type===3) ? <Register type={type} setType={setType}/> : null)
            }
        </Modal>
    )
}

const mapState = (state)=>{
    const { login } = state.get("user");
    return { login };
}

const mapDispatch = (dispatch)=>{
    return {
        async _setLogin(_isLogin){
            dispatch(setLogin(_isLogin));
        }
    };
}

export default connect(mapState, mapDispatch)(MyModal);