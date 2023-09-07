"use client";

import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import TripCard from "./TripCard";
import ListViewItem from "../ListViewItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import classes from "../../styles/pages/trip-details.module.scss";
import Insights from "./Insights";
import {ChevronDown} from "lucide-react";

const BASE_URL = process?.env?.NEXT_PUBLIC_API_URL;
interface cardProps {
  listView: any;
  showClientProfile: any;
  filterOption: any; // A
  tripDetailsData: any,
}
const TripDetailsComp: FC<cardProps> = ({
  listView,
  showClientProfile,
  filterOption,
  tripDetailsData,
}) => {
  const handleClientDetails = (details: any) => {
    showClientProfile(details);
  };

  // delete
  const [change , setChange] = useState("")

  useEffect(() => {
  const param = location.pathname
   setChange(param.slice(1,4));
   //console.log(param);
   
  }, []);
  // delete

  // useEffect(() => {
  //   getTripDetails();
  // }, []);

  // const getTripDetails = () => {
  //   const token = localStorage.getItem("token");
  //   const accessToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJuY09qTnZnc05sOTJmSTdlT28zTllYR0RIaFdBMTNhUDZMRnc2aEctcXkxNjg3ODA4NTE2MzkwIiwiaWF0IjoxNjg3ODEzMzEwfQ.LCwgTjvn-lrgiEesWD0kVIghWXJgJ8JgxvKBeO_wbRE";

  //   const url = BASE_URL + "/user-trip-details/list-detail";

  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("response data", response.data);
  //       setTripDetailsData(response?.data?.data?.paginated_data);
  //       // refreshSessionOverview(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };
  //console.log(tripDetailsData);
  const applyFilter = () => {
    switch (filterOption) {
      case "All":
        return tripDetailsData;
      case "Time":
        // Apply filter logic based on Time (replace 'timeProperty' with the actual property that represents time in tripDetailsData)
        return tripDetailsData.filter(
          (item: any) => item.timeProperty === "someValue"
        );
      case "Location":
        // Apply filter logic based on Location (replace 'locationProperty' with the actual property that represents location in tripDetailsData)
        return tripDetailsData.filter(
          (item: any) => item.locationProperty === "someValue"
        );
      default:
        return tripDetailsData;
    }
  };

  if (listView) {
    return(
      <div>
        {/* <Insights /> */}
        {/* <h1 className="text-blue-400 flex items-center justify-center text-xl font-semibold border-2 mt-4 w-fit px-2 rounded-lg" >Recent 5 Bookings  <ChevronDown/></h1> */}
        {applyFilter().map((item: any) => {
            return (
              <div key={item.i_id} className={classes.trip_details_card}>
              <ListViewItem
                tripDetailsData={item}
                showClientProfile={handleClientDetails}
                />
            </div>
          );
        })}
      </div>)
    
  } else {
    return (

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2, 1500: 3 }}
      >
    {/* <Insights /> */}
        {/* <h1 className="text-blue-400 flex items-center justify-center text-xl font-semibold border-2 mt-4 w-fit px-2 rounded-lg" >Recent 5 Bookings  <ChevronDown/></h1> */}
               
        
        <div className={classes.card_container}>
          

            {tripDetailsData?.map((item: any) => {
              return (
                <div key={item.i_id} className={classes.trip_details_card} >
                  <TripCard
                    tripDetailsData={item}
                    showClientProfile={handleClientDetails}
                  />
                </div>
              );
            })}
            </div>
         
      </ResponsiveMasonry>
    );
  }
};

export default TripDetailsComp;
