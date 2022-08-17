import { INIT_USER, SET_USER, SET_ACCONT, SET_BIND, SET_SIGNS, SET_LEVEL, SETE_LOGIN, SET_FOLLOW, SET_USER_ID } from "./constants";

const initState = {
    login: false,
    user: null,
    account: null,
    bind: null,
    signs: null,
    level: null,
    follow: null,
    userId: null
};

export default function (state = initState, action) {
    switch (action.type) {
        case INIT_USER:
            return initState;
        case SETE_LOGIN:
            return { ...state, login: action.login };
        case SET_USER:
            return { ...state, user: action.user };
        case SET_ACCONT:
            return { ...state, account: action.account };
        case SET_BIND:
            return { ...state, bind: action.bind };
        case SET_LEVEL:
            return { ...state, level: action.level };
        case SET_SIGNS:
            return { ...state, signs: action.signs };
        case SET_FOLLOW:
            return { ...state, follow: action.follow };
        case SET_USER_ID:
            return { ...state, userId: action.userId };
        default:
            return state;
    }
}