import { INIT_MY, SET_MY_ARTIST, SET_MY_LIST, SET_MY_MV, SET_MY_SONGS, SET_MY_DJ } from "./constants";

const initState = {
    myArtist: null,
    myMv: null,
    mySongs: null,
    myList: null,
    myDj: null
}

export default function (state=initState, action) {
    switch (action) {
        case INIT_MY:
            return { ...initState };
        case SET_MY_ARTIST:
            return { ...state, myArtist: action.myArtist };
        case SET_MY_MV:
            return { ...state, myMv: action.myMv };
        case SET_MY_SONGS:
            return { ...state, mySongs: action.mySongs };
        case SET_MY_LIST:
            return { ...state, myList: action.myList };
        case SET_MY_DJ:
            return { ...state, myDj: action.myDj };
        default:
            return state;
    }
}