import { INIT_SONGS, SET_TYPE_SONGS, SET_CATS, SET_SO_OFFSET, SET_SO_TOTAL, SET_SUBS } from "./constants";
import {getSongsTypes, getTypeSongs} from "@/api/playlist";

//初始化歌单
export const initSongs = ()=>{
    return { type: INIT_SONGS };
}
//设置分类歌单
export const setTypeSongs = (_cat,_offset,_limit)=>{
    const action = (_typeSongs,_offset)=>{
        return { type: SET_TYPE_SONGS, typeSongs: _typeSongs, offset: _offset };
    }
    const action2 = (_total)=>{
        return { type: SET_SO_TOTAL, total: _total };
    }
    return (dispatch,getState)=>{
        getTypeSongs(_cat,_offset,_limit).then(res=>{
            if(res.code === 200){
                dispatch(action(res.playlists, _offset));
                dispatch(action2(res.total));
            }
        })
    }
}
//设置歌单分类
export const setCats = ()=>{
    const action = (_cats)=>{
        return { type: SET_CATS, cats: _cats };
    }
    const action2 = (_subs)=>{
        return { type: SET_SUBS, subs: _subs };
    }
    return (dispatch,getState)=>{
        getSongsTypes().then(res=>{
            if(res.code === 200){
                dispatch(action(res.categories));
                dispatch(action2(res.sub));
            }
        })
    }
}
//设置分页
export const setSongsOffset = (_cat,_offset)=>{
    const action = (_offset)=>{
        return { type: SET_SO_OFFSET, offset: _offset };
    }
    return (dispatch,getState)=>{
        const { typeSongs } = getState().get("playlist");

        (typeSongs[_offset] === undefined) && dispatch(setTypeSongs(_cat,_offset,40));

        dispatch(action(_offset));
    }
}