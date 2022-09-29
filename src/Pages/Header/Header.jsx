import React, {useEffect} from "react";
import "./Header.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {getSliderInfo} from "../Admin/Sliders/SlidersProductSlice";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

const Header = () => {
    const settings = {
        dots: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
    }

    const navigate = useNavigate()

    const {t} = useTranslation();

    const sliderInfo = useSelector(((state) => state.createSliderInfo.getData))

    const dispatch = useDispatch()

    const registerNow = () => {
        navigate('/registration')
    }

    useEffect(() => {
        dispatch(getSliderInfo())
    }, [])

    return (
        <div className="background_main">
            <Slider
                {...settings}
            >
                {sliderInfo.data && sliderInfo.data.map((slider) => {
                    return (
                        <div key={slider.id} className="slide1Block">
                            <div className="slider_component">
                                <div className="titles">
                                    <h1>{slider.text}</h1>
                                    <p>{slider.title}</p>
                                    <button onClick={() => registerNow()}>{t("OrderNow")}</button>
                                </div>
                                <div className="slide_img">
                                    <img src={`http://localhost:3000/${slider.image}`} alt='img'/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Header;
