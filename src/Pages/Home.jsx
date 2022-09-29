import React, {useEffect, useState} from "react";
import Nav from "./Nav/Nav";
import {Mousewheel, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ContactUs from "./Contact/ContactUs";
import "swiper/css";
import "swiper/css/pagination";
import './Home.scss';
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    return (
        <>
            <Nav/>
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                allowTouchMove={false}
                modules={[Mousewheel, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide> <Header/> </SwiperSlide>
                <SwiperSlide> <Main/> </SwiperSlide>
                <SwiperSlide> <ContactUs/> </SwiperSlide>
            </Swiper>
            {
                loading &&
                <div className="spinner_block">
                    <CircularProgress style={{width: 100, height: 100, color: '#E50019'}}/>
                </div>
            }
        </>
    );
}

export default Home;
