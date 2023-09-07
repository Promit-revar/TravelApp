import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import { getIxigoSearchResults } from "../lib/action";
import classes from "../styles/components/ListViewItem.module.scss";
import { Phone, Mail, FileSpreadsheet } from "lucide-react";

// Import Tailwind CSS margin classes
// Make sure the path to the Tailwind CSS file is correct

interface cardProps {
  tripDetailsData: any;
  showClientProfile: any;
}

const ListViewItem: FC<cardProps> = ({
  tripDetailsData,
  showClientProfile,
}) => {
  const [place, setPlace] = useState<any>({});

  useEffect(() => {
    getIxigoSearchResults(tripDetailsData?.destination)
      .then((data) => {
        setPlace({ ...data[0] });
      })
      .catch((err) => console.log(err.message));
  }, []);

  // ${classes.list_view_item}

  return (
    <div
      className="flex justify-between border-b-4 py-2 border-black"
      onClick={() => showClientProfile(tripDetailsData)}
    >
      {/* image */}
      <div className="p-3  w-32">
        <Image
          src={place?.destination_image}
          width={400}
          height={50}
          alt="city"
          className={classes.list_view_item_image}
        />
      </div>
      {/* image */}
      {/* name */}
      <h1 className="w-5/12 sm:w-1/5 md:w-1/5 lg:w-1/5 text-base  flex justify-start lg:text-lg items-center">
        {tripDetailsData?.name}
      </h1>
      {/* name */}
      {/* number */}
      <div className="hidden w-[170px] space-x-1 sm:flex justify-center items-center">
        <span className="moverflow-hidden whitespace-nowrap overflow-ellipsis col-span-1">
          <Phone />
        </span>
        <p>{tripDetailsData?.phoneNo}</p>
      </div>
      {/* number */}
      {/* email */}
      <div className="hidden space-x-1 mx-4 w-3/12 xl:flex  sm:flex justify-center items-center">
        <span className="whitespace-nowrap ">
          <Mail />
        </span>
        <p className="w-10/12 truncate  flex items-center justify-start flex-wrap">
          {tripDetailsData?.email}
        </p>
      </div>
      {/* email */}

      {/* this section is not show in ui */}
      {/* <div className="sm:hidden bg-blue-400 ml-6">
        <div className={`${classes.list_view_item_time} text-sm md:text-base`}>
          {moment(tripDetailsData?.going_travel_date).format("h:mm a")}
        </div>
      </div> */}
      {/* this section is not show in ui */}

      {/* <div className="flex w-[90px]  justify-start items-center ">
        <p className="sm:flex w-[70px]  ">
          {moment(tripDetailsData?.going_travel_date).format("h:mm a")}
        </p>
        <div className="ml-auto">
          <span className={classes.notes_wrapper}>
            <FileSpreadsheet />
          </span>
        </div> 
      </div> */}
    </div>
  );
};

export default ListViewItem;
