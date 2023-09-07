"use client";
import { HomeData } from "@/types/homeResultsType";
import React, { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { dummyImages } from "@/constants";
import Weather from "./Weather";
import SearchDialog from "./SearchDialog";

interface AnimatedSlideProps {
  data: HomeData[];
}

const AnimatedSlide: FC<AnimatedSlideProps> = ({ data }) => {
  const {
    location: { videos, images },
  } = data[0];

  const [count, setCount] = useState(data.length);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 5000);
  });

  return (
    <main>
      <AnimatePresence>
        <section className="h-screen w-full relative overflow-hidden">
          {/* backdrop */}
          <div className="absolute inset-0">
            {videos.length != 0 ? (
              <video
                src={videos[0].url}
                className="h-full w-full object-cover"
                autoPlay
                loop
              ></video>
            ) : images.length !== 0 ? (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.5 }}
                transition={{ duration: 40 }}
                className="h-full w-full "
              >
                <Image
                  className="h-full w-full object-cover  -z-0"
                  fill
                  src={images[0].url}
                  alt={images[0].caption}
                />
              </motion.div>
            ) : (
              <div>
                <Image
                  className=" h-full w-full object-cover"
                  src={dummyImages[0]}
                  alt="image"
                  fill
                />
              </div>
            )}
          </div>

          {/* main page */}
          <div className="h-full w-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-12 isolate text-white z-10  bg-gradient-to-b from-black/80 via-black/20 to-black/60 items-center text-center justify-between">
            {/* upper section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-medium sm:text-lg tracking-[1em] md:text-xl uppercase mt-12 mb-4">
                london
              </h2>
              <Weather
                aqi="23"
                condition="Sunny"
                environment=""
                humidity="44"
                temprature="23"
                className="mb-4"
              />
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">
                {data[0].location.itinerary_plan_suggestions[0]}
              </h1>
            </motion.div>

            <div className="space-y-4 max-w-sm w-full">
              <p className="text-lg font-medium md:text-xl">
                Where you want to go?
              </p>
              {/* <SearchDialog /> */}
            </div>
          </div>
        </section>
      </AnimatePresence>
    </main>
  );
};

export default AnimatedSlide;
