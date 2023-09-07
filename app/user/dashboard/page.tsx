"use client";

import React, { FC, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ListViewItem from "@/components/ListViewItem";
import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import DashboardLayout from "./layout";
//import ClientDetailsComp from "@/components/dashboard/ClientDetails";
import classes from "../../../styles/pages/dashboard.module.scss";
import TripDetailsComp from "@/components/dashboard/TripDetails";
import profile_image from "../../../public/images/profile.png";
import { Calendar } from "../../../components/ui/calendar";
import { getUserTrips, getNotifications, readNotification } from "@/lib/action";
import Image from "next/image";
import { User2 } from "lucide-react";
import YourProfile from "@/components/ui/YourProfile";
import Spinner from "../../../components/Spinner";
import Link from "next/link";
import qtlogo from "../../../public/qt_logo.png";
// redirect link set 
import { Button } from "../../../components/ui/button"
import {
  X,
  Home,
  Star,
  Settings,
  Compass,
  ScrollText,
  LogOut,
  Wallet,
  CreditCard,
  FileSpreadsheet,
} from "lucide-react";
import {
  BellDot,
  UserSquare,
  Bell,
  Search,
  Menu,
  SlidersHorizontal,
  Grid,
  ListStart,
  ListEnd,
  CalendarDays,
  ArrowDownUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { Button } from "react-day-picker";
import { InfinitySpin } from "react-loader-spinner";
import Notification from "@/components/Notification";
interface clientDetails {
  showClientDetails: any;
}

const PAGE_SIZE = 10;
const Dashboard: FC<clientDetails> = ({ showClientDetails }) => {
  const session = getSession();
  const [listView, setListView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clientDetails, setClientDetails] = useState({});
  const [clientDetailsRecieved, setClientDetailsRecieved] = useState(false);
  const [filterOption, setFilterOption] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [calendarShow, setCalendarShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [tripDetailsData, setTripDetailsData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);

  // show notification
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const router = useRouter();
  const [menu, setMenu] = useState({ h: 0, py: 0 });
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noData, setNoData] = useState(false);


  // notification

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => (
    setModalOpen(false)
  );
  const toggleFilterButtons = () => {
    setShowFilterButtons(!showFilterButtons); // Toggle filter button visibility
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.isAdmin;

  // const handleLogout = () => {
  //   setIsLoading(true);
  //   localStorage.clear();
  //   router.push("/");
  // };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    getNotifications(userData._id)
      .then((data) => {
        setNotifications(data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  setTimeout(()=>{
    getNotifications(userData._id)
      .then((data) => {
        setNotifications(data.result);
      })
      .catch((err) => console.log(err));
  }, 30*1000)
  useEffect(() => {
    let query = null;
    query = "?search=" + searchQuery;
    if (filterOption != "All") {
      query = searchQuery
        ? query + "&" + filterOption + "=true"
        : "?" + filterOption + "=true";
    }
    getUserTrips(userData.email, query)
      .then((data) => {
        //console.log(data.data.data.paginated_data);
        
        if(data.data.data.paginated_data.length){
          setNoData(false);
        }else{
          setNoData(true);
        }
        setIsLoading(false);
        setTripDetailsData(data.data.data.paginated_data); 
        const total = Math.ceil(data.data.data.total_count/PAGE_SIZE);
        
        setTotalPages(total);
      })
      .catch((err) => console.log(err.message));
  }, [searchQuery, filterOption]);

  const handleView = () => {
    setListView(!listView);
  };

  const showClientProfile = (clientDetails: any) => {
    setClientDetails(clientDetails);
    setClientDetailsRecieved(true);
    showClientDetails(true);
  };

  const closeClientProfile = () => {
    showClientDetails(false);
    setClientDetailsRecieved(false);
    setClientDetails(false);
  };

  const handleFilterOption = (option: string) => {
    setFilterOption(option);
    setShowFilterButtons(false); // Close the filter pop-up after selecting an option
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const token = localStorage.getItem('token');
  if(!token){
    router.push("/");
  }
  else if(userData.isAdmin){
    router.push("/unauthorized");
  }
  else{
  return (
    <section className={classes.trip_details}>
      <div className={classes.trip_details__content}>
        <div className="flex items-start justify-between space-y-4 ">


          
          <a 
           href="/">

          <Image
            src={qtlogo}
            className="w-32 lg:w-62 hidden lg:block"
            alt="city"
          />
          </a>
         

          <div>
            <h1 className="font-medium text-3xl sm:text-3xl ml-2 sm:ml-0">
              Hello {userData?.first_name}
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

                                   {/* notification start here....  */}

        <div className="relative inline-flex w-fit">
                <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                  {notifications.length>10?'10+':notifications.length}
                </div>
                &nbsp;
                &nbsp;
                <button
                  type="button"
                  onClick={() => {
                   setProfileShow(false)
                    openModal();
                  }}
                >
                  <Bell size={'28px'} />
                  
                </button>
              </div>
              {modalOpen && (
                <Notification closeModal ={closeModal} notifications={notifications}/>
            )}

            {/* notification end */}

            <div className=" relative flex items-center justify-center w-10 h-10 rounded-full">
            {!userData.profile &&<User2
                onClick={() => {
                  closeModal()
                  setProfileShow(!profileShow)}}
                className=" shadow-lg rounded-full"
              />}
              { userData.profile && <img
                    src={userData.profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                    onClick={() => {
                      closeModal()
                      setProfileShow(!profileShow)}}
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
                    {/* <span className="relative lg:hidden">
                      <CalendarDays
                        onClick={() => setCalendarShow(!calendarShow)}
                      />
                      {calendarShow && (
                        <Calendar className="absolute top-10 right-0 z-40 bg-gray-100 rounded-lg" />
                      )}
                    </span> */}
                  </div>
                </span>
              )}
            </div>
          </div>
          {/* search bar*/}
        </div>

        <div className="flex-flex-row lg:hidden">
          <div className="flex sm:hidden p-2 justify-between items-center">
            {/* {menu.h === 0 ? (
              <Menu onClick={handleMenu} />
            ) : (
              <X onClick={handleMenu} />
            )} */}
          </div>

          <div
            className={`absolute h-${menu.h} top-[90px] overflow-hidden bg-gray-100 md:bg-white md:top-0 z-20 md:relative py-${menu.py}  md:h-full w-full flex-col md:flex-row lg:flex-col md:flex items-start lg:items-start justify-between `}
          >
            <h1 className="font-base px-2 pl-5 text-3xl hidden lg:block"></h1>
            <ul className="h-[40vh] md:h-[65%] w-fit md:w-10/12 flex flex-col md:flex-row lg:flex-col items-start justify-around">
              {isAdmin ? (
                <Link
                  href="/admin/booking"
                  className="hidden lg:w-full hover:bg-[#C5BCF4] flex rounded-full items-center justify-start lg:block"
                >
                  <li className="flex px-4 py-1 items-center justify-center">
                    <Wallet className="w-7 mr-3 ml-2 block md:hidden lg:block" />
                    Bookings
                  </li>
                </Link>
              ) : null}
            </ul>
          </div>
          <hr className="bg-[#AEABAB] h-[1px] mt-2 block lg:hidden" />
        </div>
          <>
            <div className={classes.filters}>
              <div className={classes.filters_headings}>
               
                  <Link
                    href="/user/dashboard"
                    className="hidden lg:w-full  flex rounded-full items-center hover:bg-[#C5BCF4] justify-start lg:block mr-4 px-3"
                  >
                    <li className="flex  py-1 items-center justify-start ">
                      <Home className="w-7 mr-3 ml-2 block md:hidden lg:block" />
                      Home
                    </li>
                  </Link>

                {/* <Link
                  href="#"
                  className="hidden lg:w-full hover:bg-[#C5BCF4] flex rounded-full items-center justify-start lg:block"
                >
                  <li className="flex px-4 py-1 items-center justify-start">
                    <CreditCard className="w-7 mr-3 ml-2 block md:hidden lg:block" />
                    Transactions
                  </li>
                </Link> */}

                <Link
                  href="/pages/ProfilePage"
                  className="hidden lg:w-full  flex rounded-full items-center justify-start hover:bg-[#C5BCF4] lg:block mr-4 px-3"
                >
                  <li className="flex  py-1 items-center justify-start">
                    <Settings className="w-7 mr-3 ml-2 block md:hidden lg:block" />
                    Settings
                  </li>
                </Link>

                {/* <div className="flex items-center justify-between w-1/20">
                
                  <div onClick={handleView}>
                    {!listView && <ListStart />}
                    {listView && <ListEnd  />}
                  </div>
                </div> */}
                {/* Sorting here  */}
                {/* <div className="relative">
                  <button onClick={toggleFilterButtons}>
                    <ArrowDownUp
                      className={showFilterButtons ? "text-blue-500" : ""}
                    />
                  </button>
                  {showFilterButtons && (
                    <div

                    style={{
                      marginTop:'90px',
                      width:'108px'
                    }}
                      className={`absolute ${
                        listView ? "left-0 md:right-0" : "right-0 md:left-0"
                      } -top-10 md:-top-[54px] w-full md:w-auto md:flex-row flex-col space-y-1 md:space-y-0 md:space-x-2 bg-white p-2 rounded-lg shadow-lg`}
                    >
                      <button

                      style={{marginLeft: '-5px'}}
                        className={
                          filterOption === "All" ? "text-blue-500" : ""
                        }
                        onClick={() => handleFilterOption("All")}
                      >
                        All
                      </button>
                      <button
                       style={{marginLeft: '-5px'}}
                        className={
                          filterOption === "Time" ? "text-blue-500" : ""
                        }
                        onClick={() => handleFilterOption("time")}
                      >
                        Time
                      </button>
                      <button
                       style={{marginLeft: '-5px'}}
                        className={
                          filterOption === "Location" ? "text-blue-500" : ""
                        }
                        onClick={() => handleFilterOption("location")}
                      >
                       Location
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
              {/* <div className="flex space-x-4 items-center justify-between w-1/20">
              <button className="hidden lg:w-full hover:bg-[#C5BCF4] flex rounded-full items-center justify-start lg:block">
                  <li className="flex px-4 py-1 items-center justify-start">
                    <LogOut
                      className="w-7  ml-2 block md:hidden lg:block onClick  "
                      onClick={handleLogout}
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
                
              </div> */}

              <div className="flex items-center justify-between w-1/20">
                {/* <p>Booking list</p> &nbsp; */}
                <div onClick={handleView}>
                  {!listView && <ListStart />}
                  {listView && <ListEnd />}
                </div>
              </div>
            </div>
            {!isLoading && tripDetailsData && (
              <TripDetailsComp
                listView={listView}
                filterOption={filterOption}
                showClientProfile={showClientProfile}
                tripDetailsData={tripDetailsData}
              />
            )}
            {noData && <h1 
            style={{
              textAlign: 'center',
              paddingBottom: '2rem',
              paddingTop: '2rem',
              fontSize: '2rem'
            }}>No Trips Found...</h1>}
            {!isLoading && !tripDetailsData && <h1>Your Trips will be visible here...</h1>}
            {isLoading && <div style={{ display: 'flex',justifyContent:"center", alignItems:"center" }}><InfinitySpin color="#009688"/></div>}
          </>
      </div>
      {/* Pagination controls */}
    {  !isLoading && !noData &&  <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => {
            setIsLoading(true);
            
            const query = `?search=${searchQuery}&offset=${currentPage-1}`;
            getUserTrips(userData.email, query)
            .then((data) => {
              //console.log(data.data.data.paginated_data);
              setTripDetailsData(data.data.data.paginated_data);
              //console.log(tripDetailsData);
              setIsLoading(false);
              setCurrentPage(currentPage - 1);
            })
            .catch((err) => console.log(err.message));
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => {
            setIsLoading(true);
            const query = `?search=${searchQuery}&offset=${currentPage+1}`;
            getUserTrips(userData.email, query)
            .then((data) => {
              //console.log(data.data.data.paginated_data);
              setTripDetailsData(data.data.data.paginated_data);
              //console.log(tripDetailsData);
              setIsLoading(false);
              setCurrentPage(currentPage + 1);
            })
            .catch((err) => console.log(err.message));
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>}
    </section>
  );
        }
};

export default Dashboard;
