import { post } from "./http";
// 获取所有歌手
export function getAllArtists(_offset,_limit,_type,_area,_name) {
    return post("/artist/list?offset=" + _offset + "&limit="+_limit+"&type="+ _type + "&area=" + _area + "&initial=" + _name);
}
// 获取热门歌手
export function getHotArtists(_offset,_limit) {
    return post("/top/artists?offset=" + _offset + "&limit=" + _limit);
}
//获取歌手专辑
export function getOfAlbums(_id,_offset,_limit) {
    return post(`/artist/album?id=${_id}&offset=${_offset}&limit=${_limit}`);
}
//获取歌手详情
export function getArtistInfo(_id) {
    return post(`/artist/detail?id=${_id}`);
}
//获取歌手热门50首歌
export function getArTopSongs(_id) {
    return post(`/artist/top/song?id=${_id}`);
}
//获取歌手所有专辑
export function getArAlbums(_id,_offset,_limit) {
    return post(`/artist/album?id=${_id}&offset=${_offset}&limit=${_limit}`);
}
//获取歌手mv
export function getArMv(_id) {
    return post(`/artist/mv?id=${_id}`);
}
//获取歌手描述
export function getAtistDesc(_id) {
    return post(`/artist/desc?id=${_id}`);
}
//获取歌手mv详情
export function getMvInfo(_id) {
    return post(`/mv/detail?mvid=${_id}`);
}
//获取形似mv
export function getAlikeMv(_id) {
    return post(`/simi/mv?mvid=${_id}`);
}
//获取mv播放地址
export function getMvUrl(_id) {
    return post(`/mv/url?id=${_id}`);
}