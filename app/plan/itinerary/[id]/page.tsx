"use client";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import Weather from "@/components/Weather";
import { Input } from "@/components/ui/input";
import { StateContext } from "@/context/Provider";
import { createPlan, getIxigoSearchResults, getWeather } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useContext } from "react";
import { BsWhatsapp, BsFillChatLeftTextFill, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import { dummyImages } from "@/constants";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { getWeatherCondition } from "@/lib/getWeatherCondition";
interface CreatePlanPageProps {
  params: { id: string };
}

const CreatePlanPage: FC<CreatePlanPageProps> = ({ params: { id } }) => {
  const router = useRouter();
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ["get weather"],
    queryFn: () => getWeather(id),
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["place detail"],
    queryFn: () => getIxigoSearchResults(id),
  });

  const { selectedPlace } = useContext(StateContext);
  return (
    <section className="h-screen w-full bg-gray-100">
      {data && (
        <div className="fixed inset-0 bg-black">
          <Image
            height={1920}
            width={1080}
            className="object cover h-full w-full opacity-75"
            src={`https://plan-cf.ixigo.com/images/${data[0]?.displayname}`}
            alt={data[0]?.displayname}
          />
        </div>
      )}
      <div className="relative">
        <div className="px-4 pt-4 h-64  isolate text-white">
          <Link
            className=" rounded-full text-white p-2 border absolute md:ml-8 md:mt-6"
            href="/"
          >
            <ArrowLeft size={20} />
          </Link>

          <p className="text-3xl md:text-4xl font-serif uppercase tracking-widest mt-5 text-center">
            {data && data[0]?.displayname?.split(",")[0]}
          </p>
          {weatherLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            weather && (
              <div
                className={cn(
                  "flex items-center gap-4 md:gap-6 lg:gap-8 sm:text-lg md:text-xl md:tracking-[4px] tracking-wider justify-center text-white"
                )}
              >
                <span className="flex items-center gap-2">
                  {weather?.weather} {weather?.temperature}&deg;C
                  {/* <Cloudy /> */}
                </span>

                <span className="h-4 w-0.5 bg-white"></span>

                <span className="flex gap-2 items-center">
                  <span
                    className={cn(
                      "py-1 px-2 rounded-lg",
                      getWeatherCondition(weather!.aqi)?.background
                    )}
                  >
                    AQI {weather?.aqi}
                  </span>
                  <span>{getWeatherCondition(weather!.aqi)?.condition}</span>
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* share buttons */}
      {/* <div className="absolute md:flex flex-col gap-4 text-white right-8 bottom-28 hidden">
        <a
          className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-600"
          href=""
        >
          <span className="sr-only">message</span>
          <BsFillChatLeftTextFill size={25} />
        </a>
        <a
          className="h-12 w-12 flex items-center justify-center rounded-full bg-sky-400"
          href=""
        >
          <span className="sr-only">twitter</span>
          <BsTwitter size={25} />
        </a>
        <a
          className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500"
          href=""
        >
          <span className="sr-only">whatsapp</span>
          <BsWhatsapp size={25} />
        </a>
      </div> */}

      {/* chat input */}

      <Chat destinationId={id} />
    </section>
  );
};

export default CreatePlanPage;
