import { post } from "./http";

//获取dj分类
export function getDjTypes() {
    return post("/dj/catelist");
}
// 获取推荐电台
export function getRecDj() {
    return post("/dj/recommend");
}
// 获取推荐节目
export function getRecProgram() {
    return post("/program/recommend");
}
// 获取电台榜单
export function getDjRank(_limit) {
    return post("/dj/toplist?type=hot&limit=" + _limit);
}
// 获取节目榜单
export function getProgramRank(_limit) {
    return post("/dj/program/toplist?limit=" + _limit);
}
//获取优秀新电台
export function getGoodNewDj() {
    return post("/dj/toplist?type=new&limit=5");
}
//获取推荐分类电台
export function getRecTypeDj(_id) {
    return post("/dj/recommend/type?type=" + _id);
}
//获取分类热门电台
export function getHotTypeDj(_id,_offset,_limit) {
    return post("/dj/radio/hot?cateId=" + _id + "&offset=" + _offset + "&limit=" + _limit);
}
//获取电台个性推荐
export function getPersonDj() {
    return post("/dj/personalize/recommend");
}
//获取电台详情
export function getDjInfo(_id) {
    return post(`/dj/detail?rid=${_id}`);
}
//获取电台节目
export function getDjProgram(_id,_offset,_limit) {
    return post(`/dj/program?rid=${_id}&offset=${_offset}&limit=${_limit}`);
}
//24小时节目榜
export function getRankPro(_limit) {
    return post(`/dj/program/toplist/hours?limit=${_limit}`);
}
//节目详情
export function getProgramInfo(_id) {
    return post(`/dj/program/detail?id=${_id}`);
}
//节目评论
export function getProgramComt(_id,_offset,_limit) {
    return post(`/comment/dj?id=${_id}&offset=${_offset}&limit=&{_limit}`);
}