import { post } from "./http";

// 获取新碟
export function getAllAlbums(_area,_offset,_limit) {
    return post("/album/new?area="+ _area + "&offset" + _offset + "&limit=" + _limit);
}
//获取热门新碟
export function getHotAlbums(_offset,_limit) {
    return post("/top/album?type=hot&area=All&offset=" + _offset + "&limit=" + _limit);
}
//获取专辑内容
export function getAlbumInfo(_id) {
   return post(`/album?id=${_id}`);
}