import { get, post } from "./http";
import { MD5 } from "crypto-js";

// 发送验证码    captcha     Captcha
export function sentCaptcha(_phone) {
    return post("/captcha/sent?phone=" + _phone);
}
// 验证验证码
export function checkCaptcha(_phone, _captcha) {
    return post("/captcha/verify?phone=" + _phone + "&captcha=" + _captcha);
}
// 验证用户是否注册
export function checkIsUser(_phone) {
    return post("/cellphone/existence/check?phone=" + _phone);
}
// 用户登录
export function loginByPW(_phone, _pw) {
    return post("/login/cellphone?phone=" + _phone + "&md5_password=" + MD5(_pw).toString());
}
export function loginByCaptcha(_phone, _captcha) {
    return post("/login/cellphone?phone=" + _phone + "&captcha=" + _captcha);
}
// 验证昵称合法性
export function checkNickname(_nickname) {
    return post("/nickname/check?nickname=" + _nickname);
}
// 用户注册/密码修改
export function registerUser(_phone, _pw, _captcha, _nickname) {
    return post("/register/cellphone?phone=" + _phone + "&password=" + _pw + "&captcha=" + _captcha + "&nickname=" + _nickname);
}
// 获取用户详细信息
export function getUserInfo(_id) {
    return post("/user/detail?uid=" + _id);
}
// 获取账号信息
export function getAccount() {
    return post("/user/account");
}
// 用户登录状态
export function loginStatus() {
    return post("/login/status");
}
// 退出登录
export function loginout() {
    return post("/logout");
}
// 获取用户level
export function getLevel() {
    return post("/user/level");
}
// 获取签到信息
export function getSigns() {
    return post("/signin/progress");
}
// 签到
export function onSign() {
    return post("/daily_signin");
}
//获取用户关注列表
export function getFollows(_id) {
    return post(`/user/follows?uid=${_id}`);
}
//获取用户动态
export function getUserTrend(_id) {
    return post(`/user/event?uid=${_id}`);
}
//获取用户收藏信息
export function getUserCollect() {
    return post(`/user/subcount`);
}
//获取用户歌单
export function getUserSongs(_id) {
    return post(`/user/playlist?uid=${_id}&offset=0&limit=100`);
}
//收藏的歌手列表
export function getCollectArtist() {
    return post(`/artist/sublist`);
}
//收藏的mv列表
export function getCollectMv() {
    return post(`/mv/sublist`);
}
//电台订阅列表
export function getSubDj() {
    return post(`/dj/sublist`);
}
//获取@消息
export function getMyInfo(_offset,_limit) {
    return post(`/msg/forwards?offset=${_offset}&limit=${_limit}`);
}
//获取私信内容
export function getPrivateInfo(_offset,_limit) {
    return post(`/msg/private?offset=${_offset}&limit=${_limit}`);
}
//获取通知内容
export function getNotifyInfo(_offset,_limit) {
    return post(`/msg/notices?offset=${_offset}&limit=${_limit}`);
}
export function getCmtInfo(_id,_offset,_limit) {
    return post(`/msg/comments?uid=${_id}&offset=${_offset}&limit=${_limit}`);
}