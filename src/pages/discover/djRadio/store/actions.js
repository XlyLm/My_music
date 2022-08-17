import { INIT_DJ, SET_DJ_TOTAL, SET_DJ_OFFSET, SET_DJ_LIST, SET_PROGRAM_RANK, SET_DJ_RANK,
        SET_REC_PROGROAM, SET_REC_DJ, SET_DJ_TYPES, SET_GOOD_NEW_DJ} from "./constants";
import {
    getDjRank,
    getDjTypes, getGoodNewDj,
    getHotTypeDj,
    getProgramRank,
    getRecDj,
    getRecProgram,
    getRecTypeDj
} from "@/api/djradio";

//初始化dj
export const initDj = ()=>{
    return { type: INIT_DJ };
}
//设置dj分类
export const setDjTypes = ()=>{
    const action = (_djTypes)=>{
        return { type: SET_DJ_TYPES, djTypes: _djTypes };
    }
    return (dispatch,getState)=>{
        getDjTypes().then(res=>{
            if(res.code === 200){
                dispatch(action(res.categories.slice(0,18)));
            }
        })
    }
}
//设置推荐dj
export const setRecDj = ()=>{
    const action = (_recDj)=>{
        return { type: SET_REC_DJ, recDj: _recDj };
    }
    return (dispatch,getState)=>{
        getRecDj().then(res=>{
            if(res.code === 200){
                dispatch(action(res.djRadios));
            }
        })
    }
}
//设置推荐节目
export const setRecProgram = ()=>{
    const action = (_recProgram)=>{
        return { type: SET_REC_PROGROAM, recProgram: _recProgram };
    }
    return (dispatch,getState)=>{
        getRecProgram().then(res=>{
            if(res.code === 200){
                dispatch(action(res.programs));
            }
        })
    }
}
//设置dj排行
export const setDjRank = ()=>{
    const action = (_djRank)=>{
        return { type: SET_DJ_RANK, djRank: _djRank };
    }
    return (dispatch,getState)=>{
        getDjRank(100).then(res=>{
            if(res.code === 200){
                dispatch(action(res.toplist));
            }
        })
    }
}
//设置节目排行
export const setProgramRank = ()=>{
    const action = (_programRank)=>{
        return { type: SET_PROGRAM_RANK, programRank: _programRank };
    }
    return (dispatch,getState)=>{
        getProgramRank(100).then(res=>{
            if(res.code === 200){
                dispatch(action(res.toplist));
            }
        })
    }
}
//设置新秀电台
export const setGoodNewDj = ()=>{
    const action = (_goodNewDj)=>{
        return { type: SET_GOOD_NEW_DJ, goodNewDj: _goodNewDj };
    }
    return (dispatch,getState)=>{
        getGoodNewDj().then(res=>{
            if(res.code === 200){
                dispatch(action(res.toplist));
            }
        })
    }
}
//获取dj列表
export const setDjList = (_id,_type,_offset,_limit)=>{
    const action = (_djList,_offset)=>{
        return { type: SET_DJ_LIST, djList: _djList, offset: _offset };
    }
    const action2 = (_total)=>{
        return { type: SET_DJ_TOTAL, total: _total };
    }
    return (dispatch,getState)=>{
        const { total } = getState().get("djradio");
        const http = (_type ? getRecTypeDj(_id) : getHotTypeDj(_id,_offset,_limit));
        http.then(res=>{
            if(res.code === 200){
                dispatch(action(res.djRadios,_offset));
                if(res.count !== undefined){
                    dispatch(action2(res.count));
                } else{
                    dispatch(action2(12));
                }
            }
        })
    }
}
//设置分页
export const setDjOffset = (_id,_type,_offset)=>{
    const action = (_offset)=>{
        return { type: SET_DJ_OFFSET, offset: _offset };
    }
    return (dispatch,getState)=>{
        const { djList } = getState().get("djradio");

        (djList[_offset] === undefined) && dispatch(setDjList(_id,_type,_offset,12));

        dispatch(action(_offset));
    }
}