import { INIT_ARTIST, SET_ARTISTS, SET_AR_OFFSET, SET_AR_TOTAL } from "./constants";

const initState = {
    artists: [],
    offset: 0,
    total: 30
}

export default function (state=initState, action) {
    switch (action.type) {
        case INIT_ARTIST:
            return { ...initState, artists: [] };
        case SET_ARTISTS:
            state.artists[action.offset] = action.artists;
            return { ...state, artists: [...state.artists] };
        case SET_AR_OFFSET:
            return  { ...state, offset: action.offset };
        case SET_AR_TOTAL:
            return { ... state, total: action.total };
        default:
            return state;
    }
}