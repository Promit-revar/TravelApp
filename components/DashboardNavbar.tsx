"use client";

import classes from "../styles/components/DashboardNav.module.scss";
import Image from "next/image";
import React from "react";
import logo from "@/public/qt_logo.png";
import Link from "next/link";
import {
  Facebook,
  Home,
  Instagram,
  Menu,
  Twitter,
  SearchIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";

import { DialogClose } from "@radix-ui/react-dialog";

const DashboardNavbar = () => {
  return (
    <nav
      // style={{ borderBottom: "1px solid #000" }}
      className="fixed top-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex justify-between z-[5] items-center bg-white/90 backdrop-blur"
    >
      <Link href="/">
        <Image
          className="h-8 md:h-10 lg:h-12 w-auto opacity-0 md:opacity-100"
          src={logo}
          alt="logo"
        />
      </Link>

      <Link href="/">
        <Image
          className="h-8  w-auto md:hidden absolute inset-y-0 top-3 left-1/2 -translate-x-1/2"
          src={logo}
          alt="logo"
        />
      </Link>

      {/* for desktop */}

      {/* <div className=" font-medium hidden md:flex  gap-4 lg:gap-6 items-center">
        <form className="max-w-sm w-full flex border items-center rounded-full px-3 py-2.5 bg-white gap-2">
          <input
            className="w-full bg-transparent outline-none "
            type="text"
            placeholder="Search"
          />
          <SearchIcon className="text-black" size={20} />
        </form>
      </div> */}
      {/* for mobile */}

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="top"
            className="flex flex-col  capitalize text-lg pt-12 "
          >
            <DialogClose asChild>
              <Link className="flex items-center gap-4" href="/">
                <Home size={20} />
                Home
              </Link>
            </DialogClose>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
