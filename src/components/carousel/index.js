import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import Css from "./index.module.css";
import {setBanner} from "@/pages/discover/discovers/store/actions";
import defaultImg from "@/assets/img/carousel.png";


function NextArrow(props) {
    const { slider } = props;
    function slickNext() {
        slider.slickNext();
    }

    return <div className={["iconfont text_a_l",Css.next].join(" ")}
                onClick={slickNext}>&#xe88e;</div>
}
function PrevArrow(props) {
    const { slider } = props;
    function slickPrev() {
        slider.slickPrev();
    }
    
    return <div className={["iconfont text_a_r",Css.prev].join(" ")}
                onClick={slickPrev}>&#xe8b5;</div>
}

function Carousel(props) {
    const { banner,_setBanner } = props;
    const [setting, setSetting] = useState({});
    const [bgImg,setBgImg] = useState(defaultImg);  //轮播图背景图state
    const [slider, setSlider] = useState(null);

    useEffect(()=>{
        setSetting({
            className: [Css.wrapper].join(" "),
            dots: true,
            fade: true,
            infinite: true,
            lazyLoad: true,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: true
        })
        banner === null ? _setBanner(setBgImg) : setBgImg(banner[0].imageUrl);
    },[])

    return (
        <div className={Css.carouselCnt} style={{"backgroundImage": "url("+bgImg + (banner===null ? ")" : "?imageView&blur=40x20)")}}>
            <div className={["b_box m_auto",Css.wrapCnt].join(" ")}>
                {
                    banner === null ? <div className={Css.wrapImg}><img src={defaultImg} alt="pic"/></div>
                        : <Slider ref={c => (setSlider(c))} {...setting}
                                  nextArrow={<NextArrow slider={slider}/>}
                                  prevArrow={<PrevArrow slider={slider}/>}
                                  afterChange={(index)=>setBgImg(banner[index].imageUrl)}>
                            {
                                banner.map((item,index)=><div className={Css.wrapImg} key={index}><img src={item.imageUrl} alt="pic"/></div>)
                            }
                        </Slider>
                }
                <div className={Css.download}>
                    <Link to={"/download"} className={"d_block"}>下载客户端</Link>
                    <p className={"text_a_c"}>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                </div>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { banner } = state.get("discover")
    return { banner };
}
const mapDispatch = (dispatch)=>{
    return {
        async _setBanner(_setBgImg){
            dispatch(setBanner(_setBgImg));
        }
    }
}

export default connect(mapState,mapDispatch)(Carousel);