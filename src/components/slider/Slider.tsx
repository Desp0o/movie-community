import { useEffect, useRef, useState } from "react";
import SliderCard from "./SliderCard";
import "./slider.css";
import "./styles.css";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Make sure you import the correct type from Swiper

const cardArray = [
    {
        author: "despo",
        title: "card 1"
    },
    {
        author: "koka",
        title: "card 2"
    },
    {
        author: "vajika",
        title: "card 3"
    },
    {
        author: "despo",
        title: "card 1"
    },
    {
        author: "koka",
        title: "card 2"
    },
    {
        author: "vajika",
        title: "card 3"
    },
    {
        author: "despo",
        title: "card 1"
    },
    {
        author: "koka",
        title: "card 2"
    },
    {
        author: "vajika",
        title: "card 3"
    },
    {
        author: "despo",
        title: "card 1"
    },
    {
        author: "koka",
        title: "card 2"
    },
    {
        author: "vajika",
        title: "card 3"
    }
];

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(3);
    //eslint-disable-next-line
    const swiperRef = useRef<any>(null);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(activeIndex);
        }
    }, [activeIndex]);

    return (
        <div className="Slider">
            <p className="Slider_title">Popular quizzes</p>
            <Swiper
                ref={swiperRef}
                effect={'coverflow'}
                grabCursor={false}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                initialSlide={activeIndex}
                allowTouchMove={false}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {cardArray.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SliderCard authorName={item.author} title={item.title} heightProp={""} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="slider_dots">
                <span className={activeIndex === 3 ? "sliderDot_single activeDot" : "sliderDot_single"} onClick={() => goToSlide(3)} />
                <span className={activeIndex === 4 ? "sliderDot_single activeDot" : "sliderDot_single"} onClick={() => goToSlide(4)} />
                <span className={activeIndex === 5 ? "sliderDot_single activeDot" : "sliderDot_single"} onClick={() => goToSlide(5)} />
            </div>
        </div>
    );
};

export default Slider;
