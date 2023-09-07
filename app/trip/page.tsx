"use client";
import Image from "next/image";
import city from "../../public/images/city.png";
import {
  verifyDocuments,
  getDocuments,
  getSingleUser,
  getSingleTripDetails,
} from "../../lib/action";
import {
  ArrowLeft,
  MapPin,
  UserSquare,
  Ticket,
  Search,
  BellDot,
  Mail,
  Phone,
  FileSpreadsheet,
  Compass,
  UserSquare2,
  MessagesSquare,
  MoreHorizontal,
  Plane,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { any, object } from "zod";
import moment from "moment";
import { getIxigoSearchResults } from "../../lib/action";
import classes from "../../styles/components/ListViewItem.module.scss";
import Details from "../../components/dashboard/Details";
import { useRouter, useSearchParams } from "next/navigation";
import { InfinitySpin } from 'react-loader-spinner'
import profile_image from "../../public/images/profile.png";

interface clientDetailsType{
  going_travel_date: string,
  created_at: string,
  return_travel_date: string,
  name: string,
  from: string,
  destination: string,
  email: string,
  phoneNo: string,

}

const ClientDetails = () => {
  const initialValues = {
    going_travel_date: '',
    created_at: '',
    return_travel_date: '',
    name: '',
    from: '',
    destination: '',
    email: '',
    phoneNo: '',
  
  }
  const [showInput, setShowInput] = useState({ hide: "hidden", width: "0" });
  const [document, setDocument] = useState<any>({});
  const [showDetails, steShowDetails] = useState("");
  const [selectedTab, setSelectedTab] = useState("about"); // Initialize with the default selected tab
  const [clientDetailsData, setClientDetailsData] = useState<clientDetailsType>({...initialValues});
  const params = useSearchParams();
  const router = useRouter();
  const tripId = params.get("tripId");
  const [isLoading, setIsLoading] = useState(true);
  // confirm modal
  const [userProfile, setUserProfile] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    getSingleTripDetails(tripId)
      .then((data) => {
        setIsLoading(false);
        setClientDetailsData(data.data.data.tripData);
        getSingleUser(data.data.data.tripData?.email)
        .then(res=>{
          console.log(res.userData.profile);
          setUserProfile(res.userData?.profile);
        })
        .catch(err=>console.log(err));
      })
      .catch((err) => console.log(err));
    
    // if (userData.isAdmin) {
    //   getDocuments(tripId)
    //     .then((data) => {
    //       setDocument(data?.document);
    //       setStatus(data?.document?.is_verified);
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, []);
  //console.log(clientDetailsData);
  // const handleChange = () => {
  //   verifyDocuments(document._id, {
  //     status: status,
  //     reason: "",
  //   })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };
  const date = clientDetailsData?.going_travel_date
    ? clientDetailsData?.going_travel_date
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/")
    : "-";

    const booking_date = clientDetailsData?.created_at
    ? clientDetailsData?.created_at
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/")
    : "-";
  const return_date = clientDetailsData?.return_travel_date
    ? clientDetailsData?.return_travel_date
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/")
    : "-";

  return (
    <div style={{padding:"2rem"}}>
      <div
        className="my-3"
        onClick={() => {
          if (userData.isAdmin) {
            router.push("/admin/dashboard");
          }
          else {
            router.push("/user/dashboard");
          }
        } }
      >
        <ArrowLeft className="cursor-pointer" />
      </div>
      {!isLoading && <div className=" flex-col flex items-center sm:items-start justify-between sm:flex-row">
          {/* desktop view */}
         {userProfile && <img
            src={userProfile}
            className="rounded-full w-40 h-40 lg:w-62 hidden sm:block"
            alt="user profile" />}
          {!userProfile && <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"    // Increase the width to make the icon larger
        height="48"   // Increase the height to make the icon larger
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rounded-full w-40 h-40 lg:w-62 hidden sm:block border-solid border-2 border-black"   // Adjust the icon's size
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg> }
          {/* desktop view */}
          <div className="flex-col space-y-3 sm:space-y-1 flex w-full pl-0 sm:pl-10 px-3 py-3 lg:w-7/12">
            <div className="py-1 flex-col flex sm:flex-row items-center sm:items-start justify-between lg:justify-normal">
              {/* mobile view */}
              {userProfile && <img
                src={userProfile}
                className="rounded-full w-52 h-52 lg:w-72 block sm:hidden"
                alt="user profile" />}
                {!userProfile && <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"    // Increase the width to make the icon larger
        height="48"   // Increase the height to make the icon larger
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rounded-full p-3 w-52 h-52 lg:w-72 block sm:hidden border-solid border-2 border-black"   // Adjust the icon's size
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg> }
              <h1 className="text-2xl w-52 text-center sm:text-left">
                {clientDetailsData?.name}
              </h1>
              
              {/* mobile view */}
              <div className="text-center text-sx mt-1 pl-0 sm:pl-10 flex">
                <span className="px-1">
                  <MapPin className="w-5" />
                </span>
                <span className="text-sm text-left">
                  From: {clientDetailsData?.from} <br /> To:{" "}
                  {clientDetailsData?.destination}
                </span>
              </div>
            </div>
            <div className=" m-auto sm:m-0 text-center items-center text-sx flex">
              <span>
                <Mail className="w-3" />
              </span>
              <span className="text-xs px-1">{clientDetailsData?.email}</span>
            </div>
            <div className=" text-center justify-between flex-col sm:flex-row lg:justify-normal items-center sm:items-start text-sx flex">
              <span className="flex items-center">
                <Phone className="w-3" />
                <span className="text-xs px-1">{clientDetailsData?.phoneNo}</span>
              </span>
              {/* mobile view */}
              <div className=" py-1 text-center justify-start block lg:hidden">
                <p>Booking Date :{booking_date}</p>
              </div>
              {/* mobile view */}
            </div>
          </div>
          {/* desktop view */}
          <div className=" hidden lg:block my-2 py-2 w-72 text-center">
            <p>Booking Date : {booking_date}</p>
          </div>
          {/* desktop view */}
        </div>}
        {isLoading &&<div style={{ display: 'flex',justifyContent:"center", alignItems:"center"}}><InfinitySpin color="#009688"/></div> }
      {/* options ui */}
      {!isLoading && <div className="w-full text-sm sm:text-base flex mt-10 items-center">
        <ul className="flex  w-1/5 space-x-1 justify-between items-center">
          <li
           
           onClick={() => {
            setSelectedTab("about")
            steShowDetails("about")

        }}
            className={`flex px-[2px] sm:px-2 py-1 rounded-md space-x-1 sm:space-x-2 hover:bg-[#C5BCF4] ${
              selectedTab === "about" ? "bg-[#C5BCF4]" : ""
            }`}
          >
            <p className="hidden sm:block"> About</p>
            <span title="about" className="text-sx sm:text-base">
              <UserSquare2 />
            </span>
          </li>
          <li
            onClick={() => {
              setSelectedTab("trip")
              steShowDetails("trips")

          }}
            className={`flex px-[2px] sm:px-2 py-1 rounded-md space-x-1 sm:space-x-2 hover:bg-[#C5BCF4] ${
              selectedTab === "trip" ? "bg-[#C5BCF4]" : ""
            }`}
          >
            <p className="hidden sm:block"> Trips</p>
            <span title="trips" className="text-sx sm:text-base">
              <Plane />
            </span>
          </li>
          {!userData.isAdmin ? (
            <li
              
            onClick={() => {
              setSelectedTab("notes")
              steShowDetails("notes")

          }}
          className={`flex px-[2px] sm:px-2 py-1 rounded-md space-x-1 sm:space-x-2 hover:bg-[#C5BCF4] ${
            selectedTab === "notes" ? "bg-[#C5BCF4]" : ""
          }`}
            >
              <button className="hidden sm:block"> Notes</button>
              <span title="Notes" className="text-sx sm:text-base">
                <FileSpreadsheet />
              </span>
            </li>
          ) : (
            ""
          )}
          {/* <li
            onClick={() => {
              
                steShowDetails("document");
              
            }}
            className=" flex px-[2px] sm:px-2 py-1 rounded-md space-x-1 sm:space-x-2 hover:bg-[#C5BCF4]"
          >
            <button className="hidden sm:block">
              {" "}
              {userData.isAdmin ? "View " : "Upload "}Document
            </button>
            <span title="Document" className="text-sx sm:text-base">
              <Ticket />
            </span>
          </li> */}
          <li
            onClick={() => {
              setSelectedTab("chat")
              steShowDetails("chat")

          }}
          className={`flex px-[2px] sm:px-2 py-1 rounded-md space-x-1 sm:space-x-2 hover:bg-[#C5BCF4] ${
            selectedTab === "chat" ? "bg-[#C5BCF4]" : ""
          }`}
          >
            <button className="hidden sm:block"> Chat</button>
            <span title="Chat" className="text-sx sm:text-base  ">
              <MessagesSquare />
            </span>
          </li>
          {/* <li>{status}</li>
          {userData.isAdmin ? (
            <li className=" flex px-[2px] sm:px-2 py-1  rounded-md space-x-1 sm:space-x-2 hover:bg-[#C5BCF4]">
              <span className="text-sx relative sm:text-base">
                <MoreHorizontal
                  className="w-6 h-6"
                  onClick={() => steDropDown(!dropDown)}
                />
              
                
                {dropDown && (
                  <ul className="w-48 text-sm right-0 top-10 absolute font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <div className="flex items-center p-3">
                      <input
                        onChange={() => {
                          setStatus("pending");
                          handleChange();
                        }}
                        checked={status === "pending"}
                        id="pending"
                        type="radio"
                        value="pending"
                        name="status"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="pending"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Pending
                      </label>
                    </div>
                    <div className="flex items-center p-3">
                      <input
                        id="reject"
                        type="radio"
                        value="reject"
                        name="status"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => {
                          setStatus("rejected");
                          handleChange();
                        }}
                        checked={status === "rejected"}
                      />
                      <label
                        htmlFor="reject"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Reject
                      </label>
                    </div>
                    <div className="flex items-center p-3">
                      <input
                        id="Approved"
                        type="radio"
                        value="Approved"
                        name="status"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => {
                          setStatus("verified");
                          handleChange();
                        }}
                        checked={status === "verified"}
                      />
                      <label
                        htmlFor="Approved"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Approved
                      </label>
                    </div>
                  </ul>
                )}
                
              </span>
    
            </li> 
          ) : (
            " "
          )}*/}
        </ul>
      </div>}
      {/* end options ui */}

      {!isLoading && <div className="grid  mt-10 gap-4">
        {/* // All details */}
        <Details
          clientDetailsData={clientDetailsData}
          showDetails={showDetails}
          return_date={return_date}
          date={date}
          profile ={userProfile}
        />
        {/* // All details */}
      </div>}
    </div>
  );
};

export default ClientDetails;
