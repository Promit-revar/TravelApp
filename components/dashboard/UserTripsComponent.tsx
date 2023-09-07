"use client";
import React, { FC, useEffect, useState } from "react";
import { getIxigoSearchResults } from "../../lib/action";
import { Mail, Phone, FileSpreadsheet } from "lucide-react";
import moment from 'moment';
import classes from "../../styles/components/ListViewItem.module.scss";
import Image from "next/image";
interface TripProps {
    tripDetails: any;
}
const UserTripComponent: FC<TripProps> = ({ tripDetails }) => {
    const [place, setPlace] = useState<any>({});
    useEffect(() => {
        getIxigoSearchResults(tripDetails.destination).then((data) => {

        setPlace(data[0]);
        }).catch(err => console.log(err.message));
    }, [tripDetails.destination]);
    console.log(place.destination_image);
    return (
        <div className="flex justify-start border-b-4 py-2 border-gray-300">
            {/* Image */}
            <Image
              src={place?.destination_image}
              className="rounded-full mr-3 w-14 h-14 lg:w-62 sm:block"
              alt="city"
              height={200}
              width={200}
            />
            {/* Image */}
            {/* name */}
            <h1 className="w-5/12 sm:w-1/5 md:w-1/5 lg:w-1/5 text-base  flex justify-start lg:text-lg items-center">
              {tripDetails?.name}
            </h1>
            {/* name */}
            {/* number */}
            <div className="hidden w-[170px] space-x-1 sm:flex justify-center items-center">
              <span className="moverflow-hidden whitespace-nowrap overflow-ellipsis col-span-1">
                <Phone />
              </span>
              <p>{tripDetails?.phoneNo}</p>
            </div>
            {/* number */}
            {/* email */}
            <div className="hidden space-x-1 mx-4 w-3/12 xl:flex  sm:flex justify-center items-center">
              <span className="whitespace-nowrap ">
                <Mail />
              </span>
              <p className="w-10/12 truncate  flex items-center justify-start flex-wrap">
                {tripDetails?.email}
              </p>
            </div>
            {/* email */}
            {/* <div className="flex w-[90px]  justify-start items-center ">
              <p className="sm:flex w-[70px]  ">
                {moment(tripDetails?.going_travel_date).format("h:mm a")}
              </p>
              <div className="ml-auto">
                <span className={classes.notes_wrapper}>
                  <FileSpreadsheet />
                </span>
              </div>
            </div> */}
          </div>
    )
}
export default UserTripComponent;