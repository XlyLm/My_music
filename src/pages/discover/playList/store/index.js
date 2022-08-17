import { INIT_SONGS, SET_TYPE_SONGS, SET_CATS, SET_SO_OFFSET, SET_SO_TOTAL, SET_SUBS } from "./constants";

const initState = {
    typeSongs: [],
    cats: null,
    subs: null,
    offset: 0,
    total: 40
}

export default function playlist(state=initState, action) {
    switch (action.type) {
        case INIT_SONGS:
            return { ...initState, cats: state.cats, subs: state.subs, typeSongs: [] };
        case SET_TYPE_SONGS:
            state.typeSongs[action.offset] = action.typeSongs;
            return { ...state, typeSongs: [...state.typeSongs] };
        case SET_CATS:
            return { ...state, cats: action.cats };
        case SET_SUBS:
            return { ...state, subs: action.subs };
        case SET_SO_OFFSET:
            return { ...state, offset: action.offset };
        case SET_SO_TOTAL:
            return { ...state, total: action.total };
        default:
            return state;
    }
}