"use client";
import Spinner from "@/components/Spinner";
import { StateContext } from "@/context/Provider";
import { getIxigoSearchResults, getWeather } from "@/lib/action";
import { getWeatherCondition } from "@/lib/getWeatherCondition";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useContext, useState } from "react";

interface PlaceProps {
  params: {
    place: string;
  };
}

const suggestions = [
  "🌍🕒 Suggest some must-see spots? 📸",

  "🧳✈️ I am Packing for a getaway. What are the essentials I should carry? 🕶️👒",

  "😋🍴What are some mouth-watering local cuisines I should try? 🍔🍝",

  "🏨 Suggest some adventurous activities? 🧗‍♀️🚴",

  "🚗🗺️ Planning a 3-day road trip. Can you suggest scenic spots? 🌄🛣️",
];

const Place: FC<PlaceProps> = ({ params: { place } }) => {
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ["get weather"],
    queryFn: () => getWeather(place),
  });
  const router = useRouter();
  const { formValues, setFormValues } = useContext(StateContext);
  const [text, setText] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["place detail"],
    queryFn: () => getIxigoSearchResults(place),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormValues({ ...formValues, itineraryPlan: text });
    router.push(`/plan/itinerary/${place}`);
  };

  return (
    <section className="relative h-screen w-full">
      {data && (
        <div className="fixed inset-0 bg-black">
          <Image
            height={1920}
            width={1080}
            className="object-cover h-full w-full opacity-75"
            src={`https://plan-cf.ixigo.com/images/${data[0]?.displayname}`}
            alt={data[0]?.displayname}
          />
        </div>
      )}
      <div className="flex flex-col text-white items-center text-center pt-10 isolate">
        <Link
          href="/"
          className=" rounded-full text-white p-2 border self-start mx-4 sm:mx-6 md:mx-8 lg:mx-10"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="space-y-4 my-6">
          {data && (
            <div>
              <p className="text-lg md:text-xl uppercase tracking-[1em] ">
                Trip ideas for
              </p>
              <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-widest mt-4">
                {data[0]?.displayname.split(",")[0]}
              </h2>
            </div>
          )}

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
        <div className="flex-1 w-full bg-black p-6 rounded-[40px] flex flex-col pb-0 max-w-3xl">
          <div className="pb-4 flex-grow-0">
            <form
              className="bg-white rounded-full overflow-hidden p-1.5 w-full flex items-center"
              onSubmit={handleSubmit}
            >
              <Search size={25} className="text-black mx-2" />
              <input
                type="text"
                className="w-full outline-none text-black"
                placeholder="Plan a trip for me"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-orange-500  font-extrabold py-2 px-4 text-white rounded-full"
              >
                PLAN
              </button>
            </form>
          </div>
          <div className="overflow-y-auto divide-y flex flex-col  h-[15rem] scrollbar-hide divide-white/10">
            {suggestions.map((idea) => (
              <Link
                key={idea}
                href={`/plan/itinerary/${place}`}
                onClick={() =>
                  setFormValues({ ...formValues, itineraryPlan: idea })
                }
              >
                <span className="py-4 items-center flex justify-between">
                  <span>{idea}</span>
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Place;
