"use client";
import React, { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import classes from "../../../styles/pages/dashboard.module.scss";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import Dashboard from "./page";
import Image from "next/image";
import YourProfile from "@/components/ui/YourProfile";
import ProfilePage from "./page"

const DashboardLayout = () => {
  const [showClientDetails, setShowClientDetails] = useState<boolean>(false);


  return (
    <>
      <div className="relative -z-40">
        {/* <div className="block lg:fixed left-0 top-0 lg:w-1/5  lg:flex h-full px-0 md:px-2 lg:px-4 py-3 justify-between items-start backdrop-blur ">
          <Sidebar />
        </div> */}

        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "120px",
            overflowY: "auto",
          }}
          className={` w-max-[100vw] no-scrollbar relative -z-10 lg:fixed  scroll-hidden  lg:w-full mx-auto h-full px-4 sm:px-6 py-3 flex justify-between items-start backdrop-blur`}
        >
          <ProfilePage />
        </div>

        {/* {!showClientDetails && (
          <>
           <div className="border-l-[1px] space-y-3 hidden border-[#000] absolute lg:fixed right-0 lg:w-1/5  h-full m-4 lg:m-2 px-2 lg:px-4 py-3 lg:flex z-[4] bg-white/90 backdrop-blur flex-col items-center justify-start">
          <YourProfile />
          <Calendar />
          </div>
          </>
        )} */}
      </div>
    </>
  );
};

export default DashboardLayout;
