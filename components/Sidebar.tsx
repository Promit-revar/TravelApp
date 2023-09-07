import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { X, Menu, LogOut, Wallet, CreditCard, Settings, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import qtlogo from "../public/qt_logo.png";


const Sidebar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState({ h: 0, py: 0 });

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.isAdmin;

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const HomePage = ()=>{
    router.push("/")
  }

  const handleMenu = () => {
    menu.h === 82 ? setMenu({ h: 0, py: 0 }) : setMenu({ h: 82, py: 2 });
  };

  return (
    <>
      <div className="flex md:hidden p-2 justify-between items-center">
        <Image src={qtlogo} className="w-40 block md:hidden sm:block" alt="city" />
        {menu.h === 0 ? (
          <Menu onClick={handleMenu} />
        ) : (
          <X onClick={handleMenu} />
        )}
      </div>
      <div className="hidden md:block " onClick={HomePage}>
        <h1 className="font-base px-2 pl-5 text-3xl">
          <Image src={qtlogo}  className="w-32 lg:w-62" alt="city" />
        </h1>
      </div>

      <div
        className={`absolute h-${menu.h} top-[90px] overflow-hidden bg-gray-100 md:bg-gray-100 md:top-0 z-20 md:relative py-${menu.py} md:h-full w-full flex-col md:flex-row lg:flex-col md:flex items-start lg:items-start justify-between `}
      >
        <ul className="md:w-10/12 w-full flex flex-col md:flex-row lg:flex-col items-start p-8 m-0 lg:hidden">
          {isAdmin ? (
            <Link
              href="/admin/dashboard"
              className="lg:w-full hover:bg-[#C5BCF4] flex items-center rounded-full justify-start py-2"
            >
              <li className="flex px-4 py-0 items-center justify-center">
                <Home className="w-7 mr-3 ml-2 block md:hidden lg:block" />
                Home
              </li>
            </Link>
          ) : (
            <Link
              href="/user/dashboard"
              className="lg:w-full hover:bg-[#C5BCF4] flex items-center rounded-full justify-start py-2"
            >
              <li className="flex px-4 py-0 items-center justify-center">
                <Home className="w-7 mr-3 ml-2 block md:hidden lg:block" />
                Home
              </li>
            </Link>
          )}

          {isAdmin ? (
            <Link
              href="/admin/booking"
              className="hover:bg-[#C5BCF4] lg:w-full flex rounded-full items-center justify-start py-2"
            >
              <li className="flex px-4 py-0 items-center justify-center">
                <Wallet className="w-7 mr-1 ml-2 block md:hidden lg:block" />
                Bookings
              </li>
            </Link>
          ) : null}
          {/* <Link
            href="#"
            className="hover:bg-[#C5BCF4] lg:w-full flex rounded-full items-center justify-start py-2"
          >
            <li className="flex px-4 py-0 items-center justify-start">
              <CreditCard className="w-7 mr-3 ml-2 block md:hidden lg:block" />
              Transactions
            </li>
          </Link> */}

          <Link
            href="/pages/ProfilePage"
            className="hover:bg-[#C5BCF4] lg:w-full flex rounded-full items-center justify-start py-2"
          >
            <li className="flex px-4 py-0 items-center justify-start">
              <Settings className="w-7 mr-3 ml-2 block md:hidden lg:block" />
              Settings
            </li>
          </Link>

          <div className="hover:bg-[#C5BCF4] lg:w-full flex rounded-full items-center justify-start py-2">
          
          <li className="flex px-4 py-0 items-center justify-start">
          
          <button onClick={handleLogout} className="flex flex-row" >
          <LogOut className="w-7 mr-3 ml-2 block md:hidden lg:block" />
            Logout
          </button>
            </li>
        </div>
        </ul>
       
      </div>
      <hr className="bg-[#AEABAB] h-[1px] mt-2 block lg:hidden" />
    </>
  );
};

export default Sidebar;
