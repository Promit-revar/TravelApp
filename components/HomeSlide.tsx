"use client";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade, Pagination } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import SingleSlide from "./SingleSlide";
import { HomeData } from "@/types/homeResultsType";

interface HomeSlidesProps {
  data: HomeData[];
}

const HomeSlide: FC<HomeSlidesProps> = ({ data }) => {
  return (
    <div className="h-screen w-full">
      <Swiper
        className="h-full w-full "
        autoplay={{
          delay: 5000,
        }}
        fadeEffect={{
          crossFade: true,
        }}
        effect={"fade"}
        modules={[Autoplay, EffectFade, Pagination]}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <SingleSlide data={item} homeData={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlide;
