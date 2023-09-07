"use client";
import React, { FC, useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { updateForm } from "@/store/formSlice";
import Weather from "./Weather";
import ArrowLink from "./ArrowLink";
import SearchDialog from "./SearchDialog";
import SlideProgress from "./SlideProgress";
import { HomeData } from "@/types/homeResultsType";
import { StateContext } from "@/context/Provider";
import { useRouter } from "next/navigation";

interface SingleSlideProps {
  data: HomeData;
  homeData: HomeData[];
}

const SingleSlide: FC<SingleSlideProps> = ({ data, homeData }) => {
  const { selectedPlace, setSelectedPlace } = useContext(StateContext);
  const router = useRouter();
  const form_values = useSelector((state: any) => state.form);
  const dispatch = useDispatch();
  const {
    location: {
      city,
      place,
      state,
      country,
      images,
      videos,
      itinerary_plan_suggestions,
    },
    weatherData: { temperature, condition, humidity },
  } = data;

  return (
    <div
      className="h-screen w-full relative overflow-hidden "
      style={{ height: "100dvh" }}
    >
      <motion.div
        // initial={{ scale: 1 }}
        // animate={{ scale: 1.5 }}
        // transition={{ duration: 20 }}
        className="absolute inset-0"
      >
        {videos.length != 0 ? (
          <video
            src={videos[0].url}
            className="h-full w-full object-cover"
            autoPlay
            loop
          ></video>
        ) : images.length !== 0 ? (
          <Image
            className=" h-full w-full object-cover"
            height={1920}
            width={1080}
            src={images[0].url}
            alt={images[0].caption}
          />
        ) : (
          <Image
            className=" h-full w-full object-cover"
            height={1920}
            width={1080}
            src={""}
            alt="image"
          />
        )}
      </motion.div>

      <div className="isolate h-full w-full flex flex-col items-center text-white bg-gradient-to-b from-black/80 via-black/20 to-black/80 justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mt-24 px-4"
        >
          <p className="text-lg font-medium tracking-[0.5em] md:tracking-[1em] md:text-xl mb-5 uppercase ">
            {place}
          </p>
          <Weather
            aqi="32"
            condition={condition}
            environment="Poor"
            temprature={temperature}
            className="mb-6"
            humidity={humidity}
          />
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-center lg:leading-[1.25]"
            suppressHydrationWarning
          >
            {
              itinerary_plan_suggestions[
                Math.floor(Math.random() * itinerary_plan_suggestions.length)
              ]
            }
          </h1>

          <ArrowLink
            handleClick={() => {
              const updatedForm = {
                destination: data.location,
                passengers_number: 1,
                from: "",
              };

              // setSelectedPlace(data.location);
              // dispatch the updateForm action
              dispatch(updateForm(updatedForm));
              router.push(
                `/plan/details?q=${place && place}${
                  city && city !== place ? "," + city : ""
                }${state && "," + state}${country && "," + country}`
              );
            }}
          />
        </motion.div>

        <div className="flex flex-col text-white items-center w-full ">
          <p className="text-lg  font-medium mb-4">Where do you want to go?</p>
          <SearchDialog initialData={homeData} />
          <p className="text-[10px] text-white text-center mt-6 bg-black/30 w-full py-1.5">
            &copy; Copyright Quantum Travels
          </p>
          {/* <div className="space-x-2">
            <Link href="/auth/login">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                className="bg-transparent hover:bg-white/10 rounded-full"
                variant="outline"
              >
                Register
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleSlide;
