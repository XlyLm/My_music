import { INIT_ALBUM, SET_ALL_ALBUMS, SET_HOT_ALBUMS, SET_AL_OFFSET, SET_AL_TOTAL } from "./constants";

const initState = {
    allAlbums: [],
    hotAlbums: null,
    offset: 0,
    total: 30
}

export default function (state=initState, action) {
    switch (action.type) {
        case INIT_ALBUM:
            return { ...initState, hotAlbums: state.hotAlbums, allAlbums: [] };
        case SET_ALL_ALBUMS:
            state.allAlbums[action.offset] = action.allAlbums;
            return { ...state, allAlbums: [...state.allAlbums] };
        case SET_HOT_ALBUMS:
            return { ...state, hotAlbums: action.hotAlbums };
        case SET_AL_OFFSET:
            return { ...state, offset: action.offset };
        case SET_AL_TOTAL:
            return { ...state, total: action.total };
        default:
            return state;
    }
}