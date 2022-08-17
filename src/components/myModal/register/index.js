import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {Button, Checkbox, Form, Input, message} from "antd";
import { useCookies } from "react-cookie";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Css from "./index.module.css";

import {checkCaptcha, checkIsUser, registerUser, sentCaptcha} from "@/api/user";
import {setAccount, setLogin, setUserId} from "./store/actions";
import getInputVal from "@/untils/getInputVal";
import throttle from "@/untils/throttle";
import checkPhone from "@/untils/checkPhone";
import checkPw from "@/untils/checkPw";
import cookieOptions from "@/untils/cookieOptions";
import keepUserLocal from "@/untils/keepUserLocal";
import {setStorage} from "@/untils/handleStorage";

function Register(props) {
    //解析参数
    const { type, setType, _setLogin, _setUserId, _setAccount } = props;
    const location = window.location || location;
    //输入框数据
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pw, setPw] = useState("");
    const [pws, setPws] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [agree, setAgree] = useState(true);
    //输入框状态
    const [nameStatus, setNameS] = useState("");
    const [phoneStatus, setPhoneS] = useState("");
    const [captchaStatus, setCaptchS] = useState("");
    const [pwStatus, setPwStatus] = useState("");
    const [pwsStatus, setPwsStatus] = useState("");
    //输入框提示信息
    const [nameErr, setNameErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [captchaErr, setCaptchaErr] = useState("");
    const [pwErr, setPwErr] = useState("");
    const [pwsErr, setPwsErr] = useState("");
    const [agreeErr, setAgreeErr] = useState("");
    //是否为修改密码
    const [isFix, setIsFix] = useState(false);
    const [cookies, setCookie] = useCookies(["user"]);  //保存cookie

    useEffect(()=>{
        type === 3 && setIsFix(true);
    },[])

    // 检验昵称合法性
    function nameBlur() {
        if(name.length < 3){
            setNameS("error");
            setNameErr("昵称长度(3~6)");
        }else if(pw.search(' ') !== -1){
            setNameS("error");
            setNameErr("昵称不能包含空格");
        }else{
            setNameS("success");
            setNameErr("");
        }
    }
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
    // 检验密码合法性
    function pwsBlur() {
        checkPw(pws).then(res=>{
            setPwsStatus("success");
            setPwsErr("");
        }).catch(err=>{
            setPwsStatus("error");
            setPwsErr(err);
        })
    }
    //获取协议
    function getAgree(e) {
        const val = e.target.checked;
        setAgree(val);
        val ? setAgreeErr("") : setAgreeErr("请勾选协议");
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
    //提交
    function submit() {
        phoneBlur();
        if(agree && (phoneStatus==="success")) {
            // 验证用户是否注册
            checkIsUser(phone).then(res=>{
                if(res.code === 200){
                    pwBlur();
                    pwsBlur();
                    captchaBlur();
                    if((isFix && (res.exist===1)) || (!isFix && (res.exist!==1))){
                        const _name = isFix ? res.nickname : name;
                        if(pw === pws){
                            if(captchaStatus === "success"){
                                checkCaptcha(phone,captcha).then(res=>{
                                    if(!isFix){
                                        captchaBlur();
                                    }
                                    if(!isFix && captchaStatus !== "success")
                                        return;

                                    if(res.code === 200){
                                        registerUser(phone,pw,captcha,_name).then(res=>{
                                            const {userId,nickname} = res.profile;
                                            const token = res.token;
                                            //保存用户信息到state
                                            _setUserId(res.profile.userId);
                                            _setAccount(res.account);
                                            _setLogin(false);
                                            isFix ? message.success("修改成功")
                                                : message.success("注册成功");
                                            //保存用户信息到本地
                                            setCookie("token",token,cookieOptions());
                                            keepUserLocal(userId,phone,pw,nickname);
                                            setStorage("status",true);
                                            //刷新页面
                                            location.reload();
                                        })
                                    }
                                })
                            }
                        }else{
                            setPwsStatus("error");
                            setPwsErr("两次密码输入不一致");
                            message.error("两次密码输入不一致");
                        }
                    }else if(isFix && (res.exist!==1)){
                        message.error("用户未注册");
                    }else if(!isFix && (res.exist===1)){
                        message.error("用户已存在");
                    }else{
                        message.error("err");
                    }
                }
            })
        }
    }

    return (
        <div className={Css.registerCnt}>
            <Form name="register" className={["m_auto",Css.form].join(" ")} preserve={false}>
                {/*用户昵称*/}
                <Form.Item hidden={isFix} hasFeedback validateStatus={nameStatus} help={nameErr}>
                    <Input
                        placeholder="请输入昵称(3~6)"
                        autoComplete={"off"}
                        maxLength={6}
                        showCount
                        value={name}
                        onBlur={nameBlur}
                        onChange={(e)=>getInputVal(e,setName)}
                        prefix={<UserOutlined className="site-form-item-icon" />}/>
                </Form.Item>
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
                {/*密码*/}
                <Form.Item hasFeedback validateStatus={pwStatus} help={pwErr}>
                    <Input
                        type={"password"}
                        placeholder="请输入密码(6~12)"
                        showCount
                        maxLength={12}
                        value={pw}
                        onBlur={pwBlur}
                        onChange={(e)=>getInputVal(e,setPw)}
                        prefix={<LockOutlined className="site-form-item-icon" />} />
                </Form.Item>
                {/*验证密码*/}
                <Form.Item hasFeedback validateStatus={pwsStatus} help={pwsErr}>
                    <Input
                        type={"password"}
                        placeholder="请再次输入密码"
                        showCount
                        maxLength={12}
                        value={pws}
                        onBlur={pwsBlur}
                        onChange={(e)=>getInputVal(e,setPws)}
                        prefix={<LockOutlined className="site-form-item-icon" />} />
                </Form.Item>
                {/*验证码*/}
                <Form.Item hasFeedback validateStatus={captchaStatus} help={captchaErr}>
                    <div className={["d_flex_b",Css.captcha].join(" ")}>
                        <Input
                            placeholder="请输入验证码"
                            maxLength={4}
                            value={captcha}
                            onBlur={captchaBlur}
                            onChange={(e)=>getInputVal(e,setCaptcha)}/>
                        <Button onClick={_sentCaptcha}>发送验证码</Button>
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
                {/*注册*/}
                <Form.Item>
                    <Button className={[Css.register].join(" ")} type={"primary"} shape={"round"} onClick={throttle(submit,1000)}>
                        {
                            isFix ? "点击修改" : "点击注册"
                        }
                    </Button>
                </Form.Item>
            </Form>
            {/*底部链接*/}
            <div className={["d_flex_b",Css.footer].join(" ")}>
                <a href={"#"} onClick={(e)=>{e.preventDefault(); setType(0);}}>
                    <i className={"iconfont"}>&#xe8b5;</i>返回登录</a>
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
    }
}

export default connect(mapState, mapDispatch)(Register);