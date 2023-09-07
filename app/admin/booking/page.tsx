"use client";
import {
  Loader,
  CheckCheck,
  X,
  CircleDashed,
  ChevronUp,
  FileSpreadsheet,
  Phone,
  Mail,
  ChevronDown,
  ArrowLeft,
  Search,
  CalendarDays,
  LogOut,
  Wallet,
  CreditCard,
} from "lucide-react";
import qtlogo from "../../../public/qt_logo.png";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import city from "../../../public/images/city.png";
import moment from "moment";
import { getTripDetails } from "@/lib/action";
import classes from "../../../styles/components/ListViewItem.module.scss";
import { Calendar } from "../../../components/ui/calendar";
import { User2 } from "lucide-react";
import YourProfile from "@/components/ui/YourProfile";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";

const Booking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("All");
  const [calendarShow, setCalendarShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const userData = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    getTripDetails('')
      .then((data) => {
        setIsLoading(false);
        // Check if data exists and contains the result array
        if (data?.data?.data?.result) {
          setBookings(data.data.data.result);
        } else {
          setBookings([]); // Set an empty array if data or result is not available
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    router.push("/");
  };
  const token = localStorage.getItem('token');
  if(!token){
    router.push("/");
  }
  else if(!userData.isAdmin){
    router.push("/unauthorized");
  }
  else{
  return (
    <>
    <div className="flex items-start justify-between space-y-4 ">
          <Image
            src={qtlogo}
            className="w-32 lg:w-62 hidden lg:block"
            alt="logo"
          />

          <div>
            <h1 className="font-medium text-3xl sm:text-3xl ml-2 sm:ml-0">
              Hello Admin
            </h1>
            <p className="text-sm sm:text-base py-4 ml-2 sm:ml-0">
              Welcome back!
            </p>
          </div>

          <div className="flex w-8/12 items-center justify-end sm:justify-normal space-x-5 ">
            <div className="flex items-center lg:w-full sm:w-full border-gray-300 border-0 sm:border-2 rounded-full sm:rounded-lg shadow-lg">
              <input
                type="text"
                className={`px-2 w-full hidden  py-1 sm:block rounded-lg border-none outline-none border animate-w `}
                onChange={handleSearch}
              />
              <div className="hidden sm:block">
                <button className="px-1 py-1 sm:px-4 rounded-full sm:rounded-lg bg-white text-white">
                  <Search className="text-gray-400 h-6 " />
                </button>
              </div>
            </div>

            <div className=" relative flex items-center justify-center w-10 h-10 rounded-full">
            {!userData.profile &&<User2
                onClick={() => setProfileShow(!profileShow)}
                className=" shadow-lg rounded-full"
              />}
              { userData.profile && <img
                    src={userData.profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                    onClick={() => setProfileShow(!profileShow)}
                  />}
              {profileShow && (
                <span className="absolute top-12 flex justify-center items-center flex-col space-y-2 z-50 bg-gray-100 p-4 rounded-lg right-0 " style={{backgroundColor:'#fff'}}>
                  <YourProfile />
                  &nbsp;
                  <div className="flex space-x-4 items-center justify-between w-1/20">
                    <button onClick={handleLogout} className="hidden lg:w-full hover:bg-[#C5BCF4] flex rounded-full items-center justify-start lg:block">
                      <li className="flex px-4 py-1 items-center justify-start">
                        <LogOut
                          className="w-7  ml-2 block md:hidden lg:block onClick  "
                        />
                        Logout
                      </li>
                    </button>
                    <span className="relative lg:hidden">
                      <CalendarDays
                        onClick={() => setCalendarShow(!calendarShow)}
                      />
                      {calendarShow && (
                        <Calendar className="absolute top-10 right-0 z-40 bg-gray-100 rounded-lg" />
                      )}
                    </span>
                  </div>
                </span>
              )}
            </div>
          </div>
          {/* search bar*/}
        </div>
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
      {isLoading &&<div style={{ display: 'flex',justifyContent:"center", alignItems:"center"}}><InfinitySpin color="#009688"/></div> }
      {!isLoading  && <><div className="w-full py-4 shadow-xl bg-gray-100 rounded-lg mt-5 flex items-center justify-center">
        <h1>Bookings</h1>
      </div>

      {/* cards */}
      <div className="w-full h-full mt-10">
        {bookings?.length > 0 ? (
          bookings.map((booking, i) => (
            <div key={i} className="bg-white rounded-md shadow-md p-4">
              <div className="flex justify-between items-center cursor-pointer">
                <div className="text-base font-base flex items-center w-11/12 justify-between">
                  {/* booking card */}
                  {/* Image */}
                  {/* <Image
                    src={city}
                    className="rounded-full w-14 h-14 lg:w-62"
                    alt="city"
                  /> */}
                  {/* Image */}
                  {/* name */}
                  <h1 className="w-5/12 px-2 sm:w-1/5 md:w-1/5 lg:w-1/5 text-base  flex justify-start lg:text-lg items-center">
                    {booking?.name}
                  </h1>
                  {/* name */}
                  {/* number */}
                  <div className="w-[170px] hidden space-x-1 sm:flex justify-center items-center">
                    <span className="moverflow-hidden whitespace-nowrap overflow-ellipsis col-span-1">
                      <Phone />
                    </span>
                    <p>{booking?.phoneNo}</p>
                  </div>
                  {/* number */}
                  {/* email */}
                  <div className="hidden space-x-1 mx-4 w-3/12 xl:flex  sm:flex justify-center items-center">
                    <span className="whitespace-nowrap ">
                      <Mail />
                    </span>
                    <p className="w-10/12 truncate  flex items-center justify-start flex-wrap">
                      {booking?.email}
                    </p>
                  </div>
                  {/* email */}
                  <div className="flex w-[90px]  justify-start items-center ">
                    <p className="sm:flex w-[70px]  ">{moment(booking?.going_travel_date).format('h:mm a')}</p>
                    <div className="ml-auto">
                      <span className={classes.notes_wrapper}>
                        <FileSpreadsheet />
                      </span>
                    </div>
                  </div>
                  {/* <h1 className="ml-2" >Approved</h1> */}
                  {/* booking card end */}
                </div>
                {/* <span onClick={() => setHandleOpen(!handleOpen)}>
                  {!handleOpen ? <ChevronUp /> : <ChevronDown />}
                </span> */}
              </div>
              {/* {handleOpen && (
                <div className="text-gray-700 mt-4" id="answer1">
                  <div className="container mx-auto p-6">
                    <div className="flex items-center space-x-4">
                      <span>
                        Pending <div className="flex-1 h-px bg-gray-300"> </div>
                      </span>
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span>
                        Proccess <div className="flex-1 h-px bg-gray-300"> </div>
                      </span>
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span>
                        Aprroved <div className="flex-1 h-px bg-gray-300"> </div>
                      </span>
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span >
                        Cancelled <div className="flex-1 h-px bg-gray-300"> </div>
                      </span>
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          ))
        ) : (
          <h1 
            style={{
              textAlign: 'center',
              paddingBottom: '2rem',
              paddingTop: '2rem',
              fontSize: '2rem'
            }}>No Bookings Found...</h1>
        )}
      </div></>}
      {/* cards */}
    </>
  );
        }
};

export default Booking;
