import {post} from "./http";

// 获取轮播图
export function getBanner(){
    return post("/banner?type=0");
}
// 获取热门歌单分类
export function getTypesHotSong() {
    return post("/playlist/hot");
}
// 获取推荐歌单
export function getRecSongs(_limit) {
    return post("/personalized?limit=" + _limit);
}
// 获取每日推荐歌单
export function getRecommend(){
    return post("/recommend/resource");
}
// 获取热门电台
export function getHotDj(_offset,_limit) {
    return post("/dj/hot?offset=" + _offset + "&limit=" + _limit);
}
//获取每日推荐歌曲
export function getRecSong() {
    return post("/recommend/songs");
}
