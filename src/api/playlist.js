import { post } from "./http";

// 获取歌单歌曲
export function getSongs(_id,_offset,_limit) {
    return post("/playlist/track/all?id=" + _id + "&limit=" + _limit + "&offset=" + _offset);
}
// 获取歌单评论
export function getComment(_id, _type, _offset,_limit,_sort,_cursor) {
    const flag = _cursor == undefined ? "": `&cursor=${_cursor}`;
    return post("/comment/new?type=" + _type + "&id=" + _id +"&sortType=" + _sort
        + "&pageSize="+ _limit + "&pageNo=" + _offset + flag);
}
// 获取歌单详情
export function getSongsInfo(_id) {
    return post("/playlist/detail?id=" + _id);
}
// 获取分类歌单
export function getTypeSongs(_cat,_offset,_limit) {
    return post("/top/playlist?cat=" + _cat + "&limit=" + _limit + "&offset=" + _offset);
}
// 获取歌单分类
export function getSongsTypes() {
    return post("/playlist/catlist");
}
//获取歌曲详情
export function getSongInfo(_id) {
    return post(`/song/detail?ids=${_id}`);
}
//获取相似歌曲
export function getSimiSong(_id) {
    return post(`/simi/song?id=${_id}`);
}
//获取歌曲评论
export function getSongComt(_id,_offset,_limit) {
    return post(`/comment/music?id=${_id}&offset=${_offset}&limit=${_limit}`);
}