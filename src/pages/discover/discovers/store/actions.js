import { SET_BANNER, SET_HOT_MUSIC, SET_DATE_RECOMMEND } from "./constants";
import {getBanner, getTypesHotSong, getRecommend} from "@/api/discover";

// 获取轮播图
export const setBanner = (fn)=>{
    let action = (_banner)=>{
        return {type: SET_BANNER, banner: _banner};
    }
    return (dispatch,getState)=>{
        getBanner().then(res=>{
            if(res.code === 200){
                fn(res.banners[0].imageUrl);
                dispatch(action(res.banners));
            }
        })
    }
}
// 获取热门推荐分类
export const setHotMusic = ()=>{
    let action = (_hotMusic)=>{
        return {type: SET_HOT_MUSIC, hotMusic: _hotMusic};
    }
    return (dispatch,getState)=>{
        getTypesHotSong().then(res=>{
            if(res.code === 200){
                dispatch(action(res.tags.slice(0,5)));
            }
        })
    }
}
// 获取个性化推荐歌单
export const setDateRecommend = ()=>{
    let action = (recommend)=>{
        return {type: SET_DATE_RECOMMEND, recommend: recommend};
    }
    return (dispatch,getState)=>{
        getRecommend().then(res=>{
            if(res.code === 200){
                dispatch(action(res.recommend.slice(0,3)));
            }
        })
    }
}