import { INIT_TOPLIST, SET_TO_TOTAL, SET_TO_SONGS, SET_TO_RANK, SET_TO_OFFSET, SET_TO_COMMENT, SET_TO_CURSOR, SET_TO_GOOD_COMMENT } from "./constants";

const initState = {
    rank: null,
    songs: null,
    comment: [],
    offset: 0,
    total: 30,
    cursor: null,
    gdComment: null
}

export default function toplist(state=initState, action) {
    switch (action.type) {
        case INIT_TOPLIST:
            return { ...initState, rank: state.rank, comment: [] };
        case SET_TO_RANK:
            return { ...state, rank: action.rank };
        case SET_TO_SONGS:
            return { ...state, songs: action.songs };
        case SET_TO_COMMENT:
            state.comment[action.offset] = action.comment;
            return { ...state, comment: [...state.comment] };
        case SET_TO_OFFSET:
            return { ...state, offset: action.offset };
        case SET_TO_TOTAL:
            return { ...state, total: action.total };
        case SET_TO_CURSOR:
            return { ...state, cursor: action.cursor };
        case SET_TO_GOOD_COMMENT:
            return { ...state, gdComment: action.gdComment };
        default:
            return state;
    }
}