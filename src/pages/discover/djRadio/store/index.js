import { INIT_DJ, SET_GOOD_NEW_DJ, SET_PROGRAM_RANK, SET_DJ_RANK, SET_DJ_OFFSET, SET_DJ_TOTAL,
         SET_DJ_TYPES, SET_DJ_LIST, SET_REC_DJ, SET_REC_PROGROAM } from "./constants";

const initState = {
    djTypes: null,
    recDj: null,
    recProgram: null,
    djRank: null,
    programRank: null,
    goodNewDj: null,
    djList: [],
    offset: 0,
    total: 12
}

export default function djradio(state=initState, action) {
    switch (action.type) {
        case INIT_DJ:
            return { ...state, djList: [], total: 12, offset: 0 };
        case SET_DJ_TYPES:
            return { ...state, djTypes: action.djTypes };
        case SET_REC_DJ:
            return { ...state, recDj: action.recDj };
        case SET_REC_PROGROAM:
            return { ...state, recProgram: action.recProgram };
        case SET_DJ_RANK:
            return { ...state, djRank: action.djRank };
        case SET_PROGRAM_RANK:
            return { ...state, programRank: action.programRank };
        case SET_GOOD_NEW_DJ:
            return { ...state, goodNewDj: action.goodNewDj };
        case SET_DJ_LIST:
            state.djList[action.offset] = action.djList;
            return { ...state, djList: [...state.djList] };
        case SET_DJ_OFFSET:
            return { ...state, offset: action.offset };
        case SET_DJ_TOTAL:
            return { ...state, total: action.total };
        default:
            return state;
    }
}