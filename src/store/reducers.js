// combineReducers用于合并多个reducer
import { combineReducers } from 'redux-immutable';

import user from "@/components/myModal/register/store";
import discover from "@/pages/discover/discovers/store";
import artist from "@/pages/discover/artist/store";
import toplist from "@/pages/discover/topList/store";
import playlist from "@/pages/discover/playList/store";
import album from "@/pages/discover/album/store";
import djradio from "@/pages/discover/djRadio/store";

const Reducers = combineReducers({
    user: user,
    discover: discover,
    artist: artist,
    toplist: toplist,
    playlist: playlist,
    album: album,
    djradio: djradio
})
export default Reducers;