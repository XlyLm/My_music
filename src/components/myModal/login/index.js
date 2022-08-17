import React, {useState, useEffect, useCallback} from "react";
import {connect} from "react-redux";
import {useCookies} from "react-cookie";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Css from "./index.module.css";

import getInputVal from "@/untils/getInputVal";
import {getStorage, setStorage} from "@/untils/handleStorage";
import checkPw from "@/untils/checkPw";
import checkPhone from "@/untils/checkPhone";
import {checkCaptcha, checkIsUser, loginByCaptcha, loginByPW, sentCaptcha} from "@/api/user";
import debounce from "@/untils/debounce";
import throttle from "@/untils/throttle";
import cookieOptions from "@/untils/cookieOptions";
import keepUserLocal from "@/untils/keepUserLocal";
import {setAccount, setLogin, setUserId} from "../register/store/actions";

function Login(props) {
    //解析参数
    const { setType, _setLogin, _setUserId, _setAccount } = props;
    const location = window.location || location;
    //输入框数据
    const [phone, setPhone] = useState("");
    const [pw, setPw] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [ai, setAi] = useState(false);
    const [agree, setAgree] = useState(true);
    //输入框状态
    const [phoneStatus, setPhoneS] = useState("");
    const [captchaStatus, setCaptchS] = useState("");
    const [pwStatus, setPwStatus] = useState("");
    //输入框提示信息
    const [phoneErr, setPhoneErr] = useState("");
    const [captchaErr, setCaptchaErr] = useState("");
    const [pwErr, setPwErr] = useState("");
    const [agreeErr, setAgreeErr] = useState("");
    //是否为密码登录
    const [isPw, setIsPw] = useState(false);
    const [cookies, setCookie] = useCookies(["user"]);  //保存cookie

    useEffect(()=>{
        //切换密码登录时检验合法性
        if(isPw){
            phoneBlur();
            pwBlur();
        }
    },[isPw])

    // 检验手机号合法性
    function phoneBlur() {
        checkPhone(phone).then(res=>{
            setPhoneS("success");
            setPhoneErr("");
        }).catch(err=>{
            setPhoneS("error");
            setPhoneErr(err);
        })
    }
    // 检验验证码合法性
    function captchaBlur() {
        if (captcha === ""){
            setCaptchS("error");
            setCaptchaErr("验证码不能为空");
        }else if(captcha.length!==4 || (parseInt(captcha) != captcha)){
            setCaptchS("error");
            setCaptchaErr("验证码格式不对");
        } else{
            setCaptchS("success");
            setCaptchaErr("");
        }
    }
    // 检验密码合法性
    function pwBlur() {
        checkPw(pw).then(res=>{
            setPwStatus("success");
            setPwErr("");
        }).catch(err=>{
            setPwStatus("error");
            setPwErr(err);
        })
    }
    //获取自动登录
    function getAi(e) {
        setAi(e.target.checked);
    }
    //获取协议
    function getAgree(e) {
        const val = e.target.checked;
        setAgree(val);
        val ? setAgreeErr("") : setAgreeErr("请勾选协议");
    }
    //改变登录方式
    function setMethods() {
        if(isPw){
            setPw("");
            setPwStatus("");
            setPwErr("");
        }else{
            setCaptcha("");
            setCaptchS("");
            setCaptchaErr("");
            setPhone(getStorage("phone"));
            setPw(getStorage("pw"));
        }
        setIsPw(!isPw);
    }
    //发送验证码
    function _sentCaptcha() {
        phoneBlur();
        if(phoneStatus === "success"){
            sentCaptcha(phone).then(res=>{
                if(res.code === 200){
                    message.success("发送成功");
                }
            })
        }
    }
    //提交信息
    function submit() {
        phoneBlur();
        if(agree && (phoneStatus==="success")){
            // 验证用户是否注册
            checkIsUser(phone).then(res=>{
                if((res.code === 200) && (res.exist === 1)){
                    isPw ? pwBlur() : captchaBlur();
                    // 密码登录
                    if(isPw && (pwStatus==="success")) {
                        loginByPW(phone, pw).then(res => { //登录
                            if (res.code === 200) {
                                // 登录成功
                                const {userId,nickname} = res.profile;
                                const token = res.token;
                                //保存用户信息到state
                                _setUserId(res.profile.userId);
                                _setAccount(res.account);
                                _setLogin(false);
                                //保存用户信息到本地
                                setCookie("token",token,cookieOptions());
                                keepUserLocal(userId,phone,pw,nickname);
                                setStorage("status",ai);
                                //刷新页面
                                location.reload();
                            }
                        })
                    }else if(!isPw && (captchaStatus==="success")){
                        // 验证码登录
                        checkCaptcha(phone,captcha).then(res=>{
                            if(res.code === 200){
                                loginByCaptcha(phone,captcha).then(res=>{
                                    if(res.code === 200){
                                        // 登录成功
                                        const {userId,nickname} = res.profile;
                                        const token = res.token;
                                        //保存用户信息到state
                                        _setUserId(res.profile.userId);
                                        _setAccount(res.account);
                                        //跳转页面
                                        _setLogin(false);
                                        //保存用户信息到本地
                                        setCookie("token",token,cookieOptions());
                                        keepUserLocal(userId,phone,"",nickname);
                                        setStorage("status",true);
                                        location.reload();
                                    }
                                })
                            }
                        })
                    }else{
                        message.warning("请完善信息");
                    }
                }else if(res.exist === -1){
                    message.error("用户不存在");
                }else{
                    message.error("err");
                }
            })
        }
    }

    return (
        <div className={Css.loginCnt}>
            <Form name="login" className={["m_auto",Css.form].join(" ")} preserve={false}>
                {/*手机号*/}
                <Form.Item hasFeedback validateStatus={phoneStatus} help={phoneErr}>
                    <Input
                        placeholder="请输入手机号"
                        autoComplete={"off"}
                        maxLength={11}
                        showCount
                        value={phone}
                        onBlur={phoneBlur}
                        onChange={(e)=>getInputVal(e,setPhone)}
                        prefix={<UserOutlined className="site-form-item-icon" />}/>
                </Form.Item>
                {/*验证码*/}
                <Form.Item hidden={isPw} hasFeedback validateStatus={captchaStatus} help={captchaErr}>
                    <div className={["d_flex_b"].join(" ")}>
                        <Input
                            placeholder="请输入验证码"
                            maxLength={4}
                            value={captcha}
                            onBlur={captchaBlur}
                            onChange={(e)=>getInputVal(e,setCaptcha)}/>
                        <Button onClick={_sentCaptcha}>发送验证码</Button>
                    </div>
                </Form.Item>
                {/*密码登录*/}
                <Form.Item hidden={!isPw} hasFeedback validateStatus={pwStatus} help={pwErr}>
                    <Input
                        type={"password"}
                        placeholder="请输入密码(6~12)"
                        showCount
                        maxLength={12}
                        value={pw}
                        onBlur={pwBlur}
                        onChange={(e)=>getInputVal(e,setPw)}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        suffix={<a href={"#"} onClick={(e)=>{e.preventDefault();setType(3)}}>忘记密码?</a>}/>
                </Form.Item>
                {/*切换登录方式*/}
                <Form.Item className={Css.item}>
                    <div className={["d_flex_b o_hide",Css.methods].join(" ")}>
                        <a href="#" onClick={(e)=>{e.preventDefault();setMethods()}}>{isPw?"验证码登录":"密码登录"}</a>
                        <Form.Item  name={"aiLogin"}>
                            <Checkbox checked={ai} onChange={getAi}>自动登录</Checkbox>
                        </Form.Item>
                    </div>
                </Form.Item>
                {/*协议*/}
                <Form.Item  hasFeedback validateStatus={"error"} help={agreeErr}>
                    <div className={["d_flex_b o_hide",Css.agreement].join(" ")}>
                        <Form.Item  name={"agreement"}>
                            <Checkbox checked={agree} onChange={getAgree}>确定</Checkbox>
                        </Form.Item>
                        <div>
                            <a href="http://st.music.163.com/official-terms/service">《服务条款》</a>
                            <a href="http://st.music.163.com/official-terms/privacy">《隐私政策》</a>
                            <a href="https://st.music.163.com/official-terms/children">《儿童隐私政策》</a>
                        </div>
                    </div>
                </Form.Item>
                {/*登录*/}
                <Form.Item>
                    <Button className={[Css.login].join(" ")} type={"primary"} shape={"round"} onClick={throttle(submit,1000)}>点击登录</Button>
                </Form.Item>
            </Form>
            {/*底部链接*/}
            <div className={["d_flex_b",Css.footer].join(" ")}>
                <a href={"#"} onClick={(e)=>e.preventDefault()}>
                    <i className={"iconfont"}>&#xe8b5;</i>其他方式登录</a>
                <a onClick={(e)=>{e.preventDefault(); setType(2);}} href={"#"}>
                    没有账号？免费注册<i className={"iconfont"}>&#xe88e;</i></a>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    return {};
}

const mapDispatch = (dispatch)=>{
    return {
        async _setUserId(_userId){
            dispatch(setUserId(_userId));
        },
        async _setAccount(_account){
            dispatch(setAccount(_account));
        },
        async _setLogin(_isLogin){
            dispatch(setLogin(_isLogin));
        }
    };
}

export default connect(mapState, mapDispatch)(Login);