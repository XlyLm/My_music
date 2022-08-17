import React,{lazy,Suspense} from 'react'
import { useRoutes, Navigate } from "react-router-dom";
import Load from "@/components/load";
//一级路由组件
import ErrPage from "@/pages/errPage";
import IsLogin from "./isLogin";
const Discover = lazy(()=>import("@/pages/discover"));
const My = lazy(()=>import("@/pages/my"));
const Follow = lazy(()=>import("@/pages/follow"));
const Product = lazy(()=>import("@/pages/product"));
const Musician = lazy(()=>import("@/pages/musician"));
const Download = lazy(()=>import("@/pages/download"));
const PlayList = lazy(()=>import("@/pages/playList"));
const DjRadio = lazy(()=>import("@/pages/djRadio"));
const Program = lazy(()=>import("@/pages/program"));
const Album = lazy(()=>import("@/pages/album"));
const Artist = lazy(()=>import("@/pages/artist"));
const Song = lazy(()=>import("@/pages/song"));
const User = lazy(()=>import("@/pages/user"));
const Mv = lazy(()=>import("@/pages/mv"));

//二级路由组件
const Discovers = lazy(()=>import("@/pages/discover/discovers"));
const TopLists = lazy(()=>import("@/pages/discover/topList"));
const PlayLists = lazy(()=>import("@/pages/discover/playList"));
const DjRradios = lazy(()=>import("@/pages/discover/djRadio"));
const Artists = lazy(()=>import("@/pages/discover/artist"));
const Albums = lazy(()=>import("@/pages/discover/album"));
const Recommend = lazy(()=>import("@/pages/discover/recommend"));
const Event = lazy(()=>import("@/pages/user/event"));
const Home = lazy(()=>import("@/pages/user/home"));
const HotWork = lazy(()=>import("@/pages/artist/hotWork"));
const AllAlbum = lazy(()=>import("@/pages/artist/allAlbum"));
const AboutMv = lazy(()=>import("@/pages/artist/aboutMv"));
const ArtistDesc = lazy(()=>import("@/pages/artist/artistDesc"));
const MyEmpty = lazy(()=>import("@/pages/my/empty"));
const MyArtist = lazy(()=>import("@/pages/my/artist"));
const MyDjradio = lazy(()=>import("@/pages/my/djradio"));
const MyMv = lazy(()=>import("@/pages/my/mv"));
const MyPlayList = lazy(()=>import("@/pages/my/playList"));
const Fans = lazy(()=>import("@/pages/user/fans"));
const UserFollow = lazy(()=>import("@/pages/user/follow"));
const Level = lazy(()=>import("@/pages/user/level"));
const Message = lazy(()=>import("@/pages/message"));
const Update = lazy(()=>import("@/pages/user/update"));

//三级路由组件
const Rank = lazy(()=>import("@/pages/discover/djRadio/rank"));
const AlbumsShow = lazy(()=>import("@/pages/discover/album/show"));
const ArtistsList = lazy(()=>import("@/pages/discover/artist/list"));
const ArtistsLetter = lazy(()=>import("@/pages/discover/artist/letter"));
const DjRadiosAll = lazy(()=>import("@/pages/discover/djRadio/all"));
const DjRadiosItem = lazy(()=>import("@/pages/discover/djRadio/item"));
const Detail = lazy(()=>import("@/pages/user/level/detail"));
const BaseInfo = lazy(()=>import("@/pages/user/update/baseInfo"));
const Binding = lazy(()=>import("@/pages/user/update/binding"));
const Setting = lazy(()=>import("@/pages/user/update/setting"));
const MsgComment = lazy(()=>import("@/pages/message/comment"));
const MsgMy = lazy(()=>import("@/pages/message/my"));
const Notify = lazy(()=>import("@/pages/message/notify"));
const Private = lazy(()=>import("@/pages/message/private"));


const routes = [
    {
        path: "/",
        element: <Navigate to={"/discover/"}/>
    },
    {
        path: "/discover",
        element: <Suspense fallback={<Load/>}><Discover/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><Discovers/></Suspense>
            },
            {
                path: "toplist",
                element: <Suspense fallback={<Load/>}><TopLists/></Suspense>
            },
            {
                path: "toplist/:id",
                element: <Suspense fallback={<Load/>}><TopLists/></Suspense>
            },
            {
                path: "playlist",
                element: <Suspense fallback={<Load/>}><PlayLists/></Suspense>
            },
            {
                path: "playlist/:cat",
                element: <Suspense fallback={<Load/>}><PlayLists/></Suspense>
            },
            {
                path: "djradio",
                element: <Suspense fallback={<Load/>}><DjRradios/></Suspense>,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<Load/>}><DjRadiosAll/></Suspense>
                    },
                    {
                        path: ":id",
                        element: <Suspense fallback={<Load/>}><DjRadiosItem/></Suspense>
                    }
                ]
            },
            {
                path: "djradio/rank/:cat",
                element: <Suspense fallback={<Load/>}><Rank/></Suspense>
            },
            {
                path: "artist",
                element: <Suspense fallback={<Load/>}><Artists/></Suspense>,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<Load/>}><ArtistsList/></Suspense>
                    },
                    {
                        path: ":id",
                        element: <Suspense fallback={<Load/>}><ArtistsList/></Suspense>
                    },
                    {
                        path: "cat/:id",
                        element: <Suspense fallback={<Load/>}><ArtistsLetter/></Suspense>,
                        children: [
                            {
                                index: true,
                                element: <Suspense fallback={<Load/>}><ArtistsList/></Suspense>
                            },
                            {
                                path: ":letter",
                                element: <Suspense fallback={<Load/>}><ArtistsList/></Suspense>
                            }
                        ]
                    }
                ]
            },
            {
                path: "album",
                element: <Suspense fallback={<Load/>}><Albums/></Suspense>,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<Load/>}><AlbumsShow/></Suspense>
                    },
                    {
                        path: ":area",
                        element: <Suspense fallback={<Load/>}><AlbumsShow/></Suspense>
                    }
                ]
            },
            {
                path: "recommend",
                element: <IsLogin component={<Suspense fallback={<Load/>}><Recommend/></Suspense>}/>
            }
        ]
    },
    {
        path: "/my",
        element: <IsLogin component={<Suspense fallback={<Load/>}><My/></Suspense>}/>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><MyEmpty/></Suspense>
            },
            {
                path: "artist",
                element: <Suspense fallback={<Load/>}><MyArtist/></Suspense>
            },
            {
                path: "djradio",
                element: <Suspense fallback={<Load/>}><MyDjradio/></Suspense>
            },
            {
                path: "mv",
                element: <Suspense fallback={<Load/>}><MyMv/></Suspense>
            },
            {
                path: "playlist/:id",
                element: <Suspense fallback={<Load/>}><MyPlayList/></Suspense>
            }
        ]
    },
    {
        path: "/follow",
        element: <IsLogin component={<Suspense fallback={<Load/>}><Follow/></Suspense>}/>
    },
    {
        path: "/product",
        element: <Suspense fallback={<Load/>}><Product/></Suspense>
    },
    {
        path: "/musician",
        element: <Suspense fallback={<Load/>}><Musician/></Suspense>
    },
    {
        path: "/download",
        element: <Suspense fallback={<Load/>}><Download/></Suspense>
    },
    {
        path: "/playlist/:id",
        element: <Suspense fallback={<Load/>}><PlayList/></Suspense>
    },
    {
        path: "/djradio/:id",
        element: <Suspense fallback={<Load/>}><DjRadio/></Suspense>
    },
    {
        path: "/program/:id",
        element: <Suspense fallback={<Load/>}><Program/></Suspense>
    },
    {
        path: "/album/:id",
        element: <Suspense fallback={<Load/>}><Album/></Suspense>
    },
    {
        path: "/artist/:id",
        element: <Suspense fallback={<Load/>}><Artist/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><HotWork/></Suspense>,
            }
        ]
    },
    {
        path: "/artist/album/:id",
        element: <Suspense fallback={<Load/>}><Artist/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><AllAlbum/></Suspense>,
            }
        ]
    },
    {
        path: "/artist/mv/:id",
        element: <Suspense fallback={<Load/>}><Artist/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><AboutMv/></Suspense>,
            }
        ]
    },
    {
        path: "/artist/desc/:id",
        element: <Suspense fallback={<Load/>}><Artist/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><ArtistDesc/></Suspense>,
            }
        ]
    },
    {
        path: "/mv/:id",
        element: <Suspense fallback={<Load/>}><Mv/></Suspense>
    },
    {
        path: "/song/:id",
        element: <Suspense fallback={<Load/>}><Song/></Suspense>
    },
    {
        path: "/user",
        element: <IsLogin component={<Suspense fallback={<Load/>}><User/></Suspense>}/>,
        children: [
            {
              index: true,
              element: <ErrPage/>
            },
            {
                path: "home/:id",
                element: <Suspense fallback={<Load/>}><Home/></Suspense>
            },
            {
                path: "event/:id",
                element: <Suspense fallback={<Load/>}><Event/></Suspense>
            },
            {
                path: "fans/:id",
                element: <Suspense fallback={<Load/>}><Fans/></Suspense>
            },
            {
                path: "follow/:id",
                element: <Suspense fallback={<Load/>}><UserFollow/></Suspense>
            }
        ]
    },
    {
        path: "/user/level",
        element: <Suspense fallback={<Load/>}><Level/></Suspense>
    },
    {
        path: "/user/level/detail",
        element: <Suspense fallback={<Load/>}><Detail/></Suspense>
    },
    {
        path: "/user/update",
        element: <Suspense fallback={<Load/>}><Update/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><BaseInfo/></Suspense>
            },
            {
                path: "binding",
                element: <Suspense fallback={<Load/>}><Binding/></Suspense>
            },
            {
                path: "setting",
                element: <Suspense fallback={<Load/>}><Setting/></Suspense>
            }
        ]
    },
    {
        path: "/message",
        element: <Suspense fallback={<Load/>}><Message/></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Load/>}><MsgMy/></Suspense>
            },
            {
                path: "comment",
                element: <Suspense fallback={<Load/>}><MsgComment/></Suspense>
            },
            {
                path: "notify",
                element: <Suspense fallback={<Load/>}><Notify/></Suspense>
            },
            {
                path: "private",
                element: <Suspense fallback={<Load/>}><Private/></Suspense>
            }
        ]
    },
    {
        path: "*",
        element: <ErrPage/>
    }
];

export default function Routes() {
    return useRoutes(routes);
};