import { SET_BANNER, SET_HOT_MUSIC, SET_DATE_RECOMMEND } from "./constants";

const iniState = {
    banner: null,
    hotMusic: null,
    recommend: null
};

export default function discover(state=iniState, action) {
    switch (action.type) {
        case SET_BANNER:
            return { ...state, banner: action.banner };
        case SET_HOT_MUSIC:
            return {...state, hotMusic: action.hotMusic};
        case SET_DATE_RECOMMEND:
            return {...state, recommend: action.recommend};
        default:
            return state;
    }
}