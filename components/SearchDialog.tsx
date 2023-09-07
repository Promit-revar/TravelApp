"use client";
import React, { FC, useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { ChevronLeft, Search, X } from "lucide-react";
import { dummyImages, searchLocations } from "@/constants";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getIxigoSearchResults, getPlaceList, searchPlace } from "@/lib/action";
import Spinner from "./Spinner";
import Image from "next/image";
import { StateContext } from "@/context/Provider";
import { useRouter } from "next/navigation";
import { SearchData } from "@/types/searchResultType";
import { HomeData } from "@/types/homeResultsType";
import { updateForm } from "@/store/formSlice";

interface SearchDialogProps {
  initialData: HomeData[];
}

const SearchDialog: FC<SearchDialogProps> = ({ initialData }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { formValues, setFormValues, setSelectedPlace } =
    useContext(StateContext);
  const [text, setText] = useState("");
  const { data, isLoading, isError, refetch, isRefetching, isInitialLoading } =
    useQuery({
      queryKey: ["search place"],
      queryFn: () => getIxigoSearchResults(text),
      enabled: false,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleClick = (data: SearchData) => {
    const { city, country, state, place, _id } = data;
    setFormValues({
      ...formValues,
      city: city,
      country: country,
      state: state,
      place: place,
      destinationId: _id,
    });
    setSelectedPlace(data);
    // router.push(`/plan/details`);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="max-w-xs w-full" onClick={() => refetch()}>
        <SearchBar />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " />
        <Dialog.Content className="fixed h-screen overflow-y-auto left-[50%] top-[50%] z-50 grid w-full max-w-3xl  translate-x-[-50%] translate-y-[-50%] gap-4 text-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full ">
          <Dialog.Close className="rounded-full bg-transparent hover:bg-white/10 p-2 border w-fit mx-auto">
            <X size={20} />
          </Dialog.Close>
          <Dialog.DialogTitle className="text-xl font-medium text-center">
            Where do you want to go?
          </Dialog.DialogTitle>
          <div className="flex-1 h-[75vh] flex  flex-col">
            <form
              className="p-3.5 mb-4 rounded-full flex items-center gap-2 bg-white"
              onSubmit={handleSubmit}
            >
              <Search className="text-black pointer-events-none" size={20} />
              <input
                type="text"
                className="outline-none placeholder:italic w-full text-black"
                required
                placeholder="Enter your dream destination"
                value={text}
                onChange={(e) => {
                  setText(e.target.value), refetch();
                }}
              />
            </form>

            <ul className=" divide-y divide-white/20 flex-1 overflow-y-auto scrollbar-hide">
              {/* {data?.map(
                  (
                    {
                      cityname,
                      country,
                      destination_image,
                      displayname,
                      loctype,
                      slug,
                    },
                    i,
                    data
                  ) => (
                    <li key={i}>
                      <Link
                        className="flex items-center py-4 gap-2"
                        href={`/plan/details?q=${slug}`}
                      >
                        <div className="bg-white/20 h-20 w-20 rounded-2xl overflow-hidden">
                          <Image
                            className="h-full w-full object-cover"
                            height={200}
                            width={200}
                            src={destination_image}
                            alt={cityname}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-serif text-xl">
                            {displayname.split(",")[0]}
                          </span>
                          <span className="text-gray-400 uppercase tracking-widest text-sm">
                            {displayname.split(",")[1]}
                            {displayname.split(",")[2]}
                          </span>
                        </div>
                      </Link>
                    </li>
                  )
                )} */}

              {/* if there is no input */}
              {text.length == 0 ? (
                initialData.map((e) => {
                  return (
                    <li key={e?.location?._id}>
                      <div
                        className="flex items-center py-4 gap-2 cursor-pointer"
                        onClick={() => {
                          const updatedForm = {
                            destination: e?.location,
                            passengers_number: 1,
                            from: "",
                          };
                          dispatch(updateForm(updatedForm));
                          router.push(
                            `/plan/details?q=${
                              e?.location?.place && e?.location?.place
                            }${
                              e?.location?.city &&
                              e?.location?.city !== e?.location?.place
                                ? "," + e?.location?.city
                                : ""
                            }${e?.location?.state && "," + e?.location?.state}${
                              e?.location?.country && "," + e?.location?.country
                            }`
                          );
                        }}
                        // href={`/plan/details?q=${place}`}
                      >
                        <div className="bg-white/20 h-20 w-20 rounded-2xl overflow-hidden">
                          <Image
                            className="h-full w-full object-cover"
                            height={200}
                            width={200}
                            src={`https://plan-cf.ixigo.com/images/${e?.location?.place}`}
                            alt={e?.location?.city}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-serif text-xl">
                            {e?.location?.place}
                          </span>
                          <span className="text-gray-400 uppercase tracking-widest text-sm">
                            {e?.location?.state && e?.location?.state + ","}
                            {e?.location?.country}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : isInitialLoading || isRefetching ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : data?.length == 0 ? (
                <div className="text-white text-center">
                  Searched Place not found!
                </div>
              ) : (
                data?.map(
                  (
                    {
                      cityname,
                      country,
                      destination_image,
                      displayname,
                      loctype,
                      slug,
                    },
                    i,
                    data
                  ) => (
                    <li key={i}>
                      <div
                        className="flex items-center py-4 gap-2 cursor-pointer"
                        onClick={() => {
                          let full_location = displayname?.split(",");

                          const updatedForm = {
                            destination: {
                              place: full_location[0],
                              city: full_location[0],
                              state: full_location[1],
                              country: full_location[2],
                            },
                            passengers_number: 1,
                            from: "",
                          };

                          dispatch(updateForm(updatedForm));
                          router.push(`/plan/details?q=${displayname}`);
                        }}
                        // href={`/plan/details?q=${displayname}`}
                      >
                        <div className="bg-white/20 h-20 w-20 rounded-2xl overflow-hidden">
                          <Image
                            className="h-full w-full object-cover"
                            height={200}
                            width={200}
                            src={
                              destination_image ||
                              `https://plan-cf.ixigo.com/images/${slug}` ||
                              dummyImages[0]
                            }
                            alt={cityname}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-serif text-xl">
                            {displayname.split(",")[0]}
                          </span>
                          <span className="text-gray-400 uppercase tracking-widest text-sm">
                            {displayname.split(",")[1]}
                            {displayname.split(",")[2]}
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchDialog;
