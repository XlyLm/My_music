import { INIT_ALBUM, SET_AL_TOTAL, SET_AL_OFFSET, SET_HOT_ALBUMS, SET_ALL_ALBUMS } from "./constants";
import {getAllAlbums, getHotAlbums} from "@/api/album";

//初始化album
export const initAlbum = ()=>{
    return { type: INIT_ALBUM };
}

//设置所有新碟
export const setAllAlbums = (_area,_offset,_limit)=>{
    const action = (_allAlbums,_offset)=>{
        return { type: SET_ALL_ALBUMS, allAlbums: _allAlbums, offset: _offset };
    }
    const action2 = (_total)=>{
        return { type: SET_AL_TOTAL, total: _total };
    }
    return (dispatch,getState)=>{
        getAllAlbums(_area,_offset,_limit).then(res=>{
            if (res.code === 200){
                dispatch(action(res.albums,_offset));
                dispatch(action2(res.total));
            }
        })
    }
}
//设置热门新碟
export const setHotAlbums = ()=>{
    const action = (_hotAlbums)=>{
        return { type: SET_HOT_ALBUMS, hotAlbums: _hotAlbums };
    }
    return (dispatch,getState)=>{
        getHotAlbums(0,10).then(res=>{
            if (res.code === 200){
                dispatch(action(res.weekData.slice(0,10)));
            }
        })
    }
}
//设置分页
export const setAlbumOffset = (_area,_offset)=>{
    const action = (_offset)=>{
        return { type: SET_AL_OFFSET, offset: _offset };
    }
    return (dispatch,getState)=>{
        const { allAlbums } = getState().get("album");

        (allAlbums[_offset] === undefined) && dispatch(setAllAlbums(_area,_offset,30));

        dispatch(action(_offset));
    }
}