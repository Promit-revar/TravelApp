"use client";
import React, { FC, useEffect, useState } from "react";
import city from "../../public/images/city.png";
import { getUserTrips, getNotes } from "../../lib/action";
import { Mail, Phone, FileSpreadsheet, Pencil, Trash } from "lucide-react";
import moment from "moment";
import classes from "../../styles/components/ListViewItem.module.scss";
import Chat from "../Chat";
import UserTripComponent from "./UserTripsComponent";
import NotesComponent from "./Note";
import DocumentComponent from "./Document";
import ChatComponent from "./Chat"
import { InfinitySpin } from "react-loader-spinner";
interface propsData {
  showDetails: any;
  clientDetailsData: any;
  return_date: any;
  date: any;
  profile: string;
}

const Details: FC<propsData> = ({
  clientDetailsData,
  showDetails,
  return_date,
  date,
  profile
}) => {
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  switch (showDetails) {
    case "trips":
      
        getUserTrips(clientDetailsData.email,"")
          .then((data) => {
            setUserTrips(data.data.data.paginated_data);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      return (
        <>
        {isLoading && <div style={{ display: 'flex',justifyContent:"center", alignItems:"center"}}><InfinitySpin color="#009688"/></div> }
        {!isLoading && <ul>{userTrips.map((trip,i) =>(
          <li key={i}>
            <UserTripComponent tripDetails={trip} />
          </li>
          ))}
        </ul>}
        </>
      );
    case "notes":
      return <NotesComponent tripId={clientDetailsData._id} userId={clientDetailsData.user_id}/>
    // case "document":
    //   return <DocumentComponent tripId={clientDetailsData._id} userData = {JSON.parse(localStorage.getItem('userData'))}  />
    case "chat":
      return <ChatComponent tripId ={clientDetailsData._id} user={clientDetailsData.first_name} profile={profile}/>
    default:
      return (
        <table className=" w-[95vw] lg:w-[73vw]">
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Destination:</td>
            <td className="px-4 py-2">{clientDetailsData?.destination}</td>
          </tr>
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Number of Travellers:</td>
            <td className="px-4 py-2">{clientDetailsData?.no_of_travellers}</td>
          </tr>
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Travel Type:</td>
            <td className="px-4 py-2">{clientDetailsData?.travel_type}</td>
          </tr>
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Date of Travel:</td>
            <td className="px-4 py-2">{date}</td>
          </tr>
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Date of return:</td>
            <td className="px-4 py-2">{return_date}</td>
          </tr>
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Flight type:</td>
            <td className="px-4 py-2">{clientDetailsData?.flight_type}</td>
          </tr>
          <tr className=" w-full border-b-2 border-[#AEABAB]-400">
            <td className="px-4 py-2">Hotel booked:</td>
            <td className="px-4 py-2">{clientDetailsData?.book_hotel}</td>
          </tr>
        </table>
      );
  }
  return <></>;
};

export default Details;
