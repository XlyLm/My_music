import { INIT_USER, SET_USER, SET_ACCONT, SET_BIND, SET_SIGNS, SET_LEVEL, SETE_LOGIN, SET_FOLLOW, SET_USER_ID } from "./constants";
import {getLevel, getSigns} from "@/api/user";
import {message} from "antd";
import {getFollows} from "../../../../api/user";

// 初始化state
export const initUser = ()=>{
    return { type: INIT_USER };
}
//登录弹窗
export const setLogin = (_login)=>{
    return { type: SETE_LOGIN, login: _login };
}
// 获取用户信息
export const setUser = (_user)=>{
    return { type: SET_USER, user: _user };
}
// 获取账号信息
export const setAccount = (_account)=>{
    return { type: SET_ACCONT, account: _account };
}
// 获取用户绑定信息
export const setBind = (_bind)=>{
    return { type: SET_BIND, bind: _bind };
}
// 获取用户等级
export const setLevel = (_level)=>{
    return { type: SET_LEVEL, level: _level }
}
// 获取用户签到信息
export const setSigns = ()=>{
    let action = (_signs)=>{
        return { type: SET_SIGNS, signs: _signs };
    }
    return (dispatch,getState)=>{
        getSigns().then(res=>{
            if(res.code === 200){
                dispatch(action(res.data));
            }
        })
    }
}
//获取 用户关注
export const setFollow = (_id)=>{
    const action = (_follow)=>{
        return { type: SET_FOLLOW, follow: _follow };
    }
    return (dispatch,getState)=>{
        getFollows(_id).then(res=>{
            if(res.code === 200){
                dispatch(action(res.follow));
            }
        })
    }
}
//展示用户信息
export const setUserId = (_userId)=>{
    return { type: SET_USER_ID, userId: _userId };
}