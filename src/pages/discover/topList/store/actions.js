import { INIT_TOPLIST, SET_TO_COMMENT, SET_TO_OFFSET, SET_TO_RANK, SET_TO_SONGS, SET_TO_TOTAL, SET_TO_CURSOR, SET_TO_GOOD_COMMENT } from "./constants";
import {getTopList} from "@/api/toplist";
import {getComment, getSongs} from "@/api/playlist";

// 初始化数据
export const initToplist = ()=>{
    return { type: INIT_TOPLIST };
}
// 获取排行榜
export const setTopRank = ()=>{
    const action = (_rank)=>{
        return {type: SET_TO_RANK, rank: _rank};
    }
    return (dispatch,getState)=>{
        getTopList().then(res=>{
            if(res.code === 200){
                dispatch(action(res.list));
            }
        })
    }
}
// 设置当前歌单歌曲
export const setTopSongs = (_id)=>{
    const action = (_songs)=>{
        return { type: SET_TO_SONGS, songs: _songs };
    }
    return (dispatch,getState)=>{
        getSongs(_id,0,100).then(res=>{
            if(res.code === 200){
                dispatch(action(res.songs));
            }
        })
    }
}
//
export const setgdComment = (_id)=>{
    const action = (_gdComment)=>{
        return { type: SET_TO_GOOD_COMMENT, gdComment: _gdComment };
    }
    return (dispatch,getState)=>{
        getComment(_id,2,1,10,2).then(res=>{
            if(res.code === 200){
                dispatch(action(res.data.comments));
            }
        })
    }
}
// 设置当前歌单评论
export const setComment = (_id, _type, _offset,_limit,_sort)=>{
    const action = (_comment,_offset)=>{
        return { type: SET_TO_COMMENT, comment: _comment, offset: _offset };
    }
    const action3 = (_total)=>{
        return { type: SET_TO_TOTAL, total: _total };
    }
    const action4 = (_cursor)=>{
        return { type: SET_TO_CURSOR, cursor: _cursor };
    }
    return (dispatch,getState)=>{
        const { cursor } = getState().get("toplist");
        getComment(_id, _type, _offset+1,_limit,_sort,cursor).then(res=>{
            if(res.code === 200){
                dispatch(action(res.data.comments,_offset));
                dispatch(action3(res.data.totalCount));
                dispatch(action4(res.data.cursor));
            }
        })
    }
}
// 设置页数偏移量
export const setTopOffset = (_id, _offset)=>{
    let action = (_offset)=>{
        return { type: SET_TO_OFFSET, offset: _offset };
    }
    return (dispatch,getState)=>{
        let { comment } = getState().get("toplist");

        (comment[_offset] === undefined) && dispatch(setComment(_id, 2, _offset,30,3));

        dispatch(action(_offset));
    }
}