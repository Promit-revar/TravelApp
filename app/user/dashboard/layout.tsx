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

const DashboardLayout = () => {
  const [showClientDetails, setShowClientDetails] = useState<boolean>(false);

  return (
    <>
      <div className="relative">
        <div className="block lg:fixed left-0 top-0 lg:w-1/5 lg:border-r-[1px] lg:border-[#000] h-full px-0 md:px-2 lg:px-4 py-3 justify-between items-start lg:hidden">
          <Sidebar />
        </div>

        <div className="lg:flex h-full px-0 md:px-2 lg:px-2 py-1 items-start backdrop-blur">
          <div
            className={`flex-1 relative -z-10 scroll-hidden ${
              showClientDetails ? "lg:w-4/5" : "lg:w-3/5 mx-auto"
            }`}
          >
            <Dashboard showClientDetails={setShowClientDetails} />
          </div>
          {!showClientDetails && (
            <>
            {/* <div className={`border-l-[1px] space-y-3 hidden border-[#000] lg:w-1/5 m-4 lg:m-2 px-2 lg:px-4 py-3 lg:flex z-[4] bg-white/90  flex-col items-center justify-start ${classes.right_calender}`}>
              <YourProfile />
              <Calendar />
            </div>
             */}
            </>
          )}
        </div>

      
      </div>
    </>
  );
};

export default DashboardLayout;
