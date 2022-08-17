import { INIT_ARTIST, SET_AR_OFFSET, SET_ARTISTS, SET_AR_TOTAL } from "./constants";
import {getAllArtists, getHotArtists} from "@/api/artist";

//初始化歌手
export const initArtist = ()=>{
    return { type: INIT_ARTIST };
}
//获取分类歌手
export const setArtists = (_id,_offset,_limit,_name)=>{
    const action = (_artist,_offset)=>{
        return { type: SET_ARTISTS, artists: _artist, offset: _offset };
    }
    const action2 = (_total)=>{
        return { type: SET_AR_TOTAL, total: _total };
    }
    return (dispatch,getState)=>{
        const { total } = getState().get("artist");

        function fn(_http=Promise.resolve("ok"),prop=[]) {
            _http(...prop).then(res=>{
                if(res.code === 200){
                    dispatch(action(res.artists,_offset));
                    res.more && dispatch(action2(total+30));
                }
            })
        }

        const name = (_name===undefined?"-1":_name);
        const option = (_id===undefined?"0000":_id);
        switch (option) {
            case "0000":
                fn(getHotArtists,[_offset,_limit]);
                break;
            case "signed":
                fn(getAllArtists,[_offset,_limit,-1,-1,name]);
                break;
            case "1000":
                fn(getAllArtists,[_offset,_limit,1,7,name]);
                break;
            case "1001":
                fn(getAllArtists,[_offset,_limit,2,7,name]);
                break;
            case "1002":
                fn(getAllArtists,[_offset,_limit,3,7,name]);
                break;
            case "2000":
                fn(getAllArtists,[_offset,_limit,1,96,name]);
                break;
            case "2001":
                fn(getAllArtists,[_offset,_limit,2,96,name]);
                break;
            case "2002":
                fn(getAllArtists,[_offset,_limit,3,96,name]);
                break;
            case "3000":
                fn(getAllArtists,[_offset,_limit,1,8,name]);
                break;
            case "3001":
                fn(getAllArtists,[_offset,_limit,2,8,name]);
                break;
            case "3002":
                fn(getAllArtists,[_offset,_limit,3,8,name]);
                break;
            case "4000":
                fn(getAllArtists,[_offset,_limit,1,16,name]);
                break;
            case "4001":
                fn(getAllArtists,[_offset,_limit,2,16,name]);
                break;
            case "4002":
                fn(getAllArtists,[_offset,_limit,3,16,name]);
                break;
            case "5000":
                fn(getAllArtists,[_offset,_limit,1,0,name]);
                break;
            case "5001":
                fn(getAllArtists,[_offset,_limit,2,0,name]);
                break;
            case "5002":
                fn(getAllArtists,[_offset,_limit,3,0,name]);
                break;
        }
    }
}
//设置分页
export const setArtistOffset = (_id,_offset,_name)=>{
    const action = (_offset)=>{
        return { type: SET_AR_OFFSET, offset: _offset };
    }
    return (dispatch,getState)=>{
        const { artists } = getState().get("artist");

        (artists[_offset] === undefined) && dispatch(setArtists(_id,_offset,30,_name));

        dispatch(action(_offset));
    }
}