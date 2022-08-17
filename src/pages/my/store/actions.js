import { INIT_MY, SET_MY_LIST, SET_MY_SONGS, SET_MY_MV, SET_MY_ARTIST, SET_MY_DJ } from "./constants";

//初始化my
export const initMy = ()=>{
    return { type: INIT_MY };
}
//设置my歌手
export const setMyArtist = (_id)=>{
    const action = (_myArtist)=>{
        return { type: SET_MY_ARTIST, myArtist: _myArtist };
    }
    return (dispatch,getState)=>{

    }
}
//设置my mv
export const setMyMv = (_id)=>{
    const action = (_myMv)=>{
        return { type: SET_MY_MV, myMv: _myMv };
    }
    return (dispatch,getState)=>{

    }
}
//设置my歌单
export const setMySongs = (_id)=>{
    const action = (_mySongs)=>{
        return { type: SET_MY_SONGS, mySongs: _mySongs };
    }
    return (dispatch,getState)=>{

    }
}
//设置my收藏歌单
export const setMyList = (_id)=>{
    const action = (_myList)=>{
        return { type: SET_MY_LIST, myList: _myList };
    }
    return (dispatch,getState)=>{

    }
}
//设置my dj
export const setMyDj = (_id)=>{
    const action = (_myDj)=>{
        return { type: SET_MY_DJ, myDj: _myDj };
    }
    return (dispatch,getState)=>{

    }
}