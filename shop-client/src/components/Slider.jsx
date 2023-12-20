// import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
// import { useState } from "react";
import { sliderItems } from "../utils/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

const Sliders = () => {
  return (
    <div className="mt-5 w-full 2xl:h-[80vh] h-[50vh] flex relative overflow-hidden">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper "
      >
        {sliderItems.map((p) => (
          <>
            <SwiperSlide key={p.img}>
              <div className="relative">
                <img
                  src={p.img}
                  className="z-20 md:h-[50vh] lg:h-[40vh] 2xl:h-[80vh] h-[50vh] w-full object-cover"
                />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
