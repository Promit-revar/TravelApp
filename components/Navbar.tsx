"use client";
import Image from "next/image";
import React from "react";
import logo from "@/public/qt_logo.png";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import {
  Facebook,
  Home,
  Instagram,
  Menu,
  Twitter,
  LayoutDashboard,
} from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

const socialLinks = [
  {
    id: 1,
    text: "facebook",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=100093598490302&mibextid=LQQJ4d",
  },
  {
    id: 2,
    text: "instagram",
    icon: Instagram,
    url: "https://instagram.com/quantumtravelai?igshid=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    text: "twitter",
    icon: Twitter,
    url: "https://twitter.com/quantumtravelai",
  },
];

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.isAdmin;

  return (
    <nav className="fixed top-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex justify-between z-[5] items-center bg-white/90 backdrop-blur ">
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
      <div className=" font-medium hidden md:flex gap-4 lg:gap-6 items-center">
        {/* {localStorage.getItem("token") && ( */}
          <Link
            href="/"
            className="text-black hover:text-gray-500 transition-colors duration-300"
          >
            Home
          </Link>
        {/* )} */}

        {!localStorage.getItem("token") && (
          <Link className="text-black" href="/auth/login">
            Login
          </Link>
        )}

        {!localStorage.getItem("token") && (
          <Link className="text-black" href="/auth/register">
            Signup
          </Link>
        )}

        {localStorage.getItem("token") && (
          <Link
            href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
            className="lg:w-full hover:bg-[#C5BCF4] flex items-center rounded-full justify-start"
          >
            <li className="flex px-4 py-1 items-center justify-center">
              <LayoutDashboard size={20} className="lg:hidden"/>
              <span>Dashboard</span>
            </li>
          </Link>
        )}

        {socialLinks.map(({ url, icon: Icon, id, text }) => (
          <a href={url} key={id} aria-label={text} target="_blank">
            <Icon size={20} />
            <span className="sr-only">{text}</span>
          </a>
        ))}
      </div>

      {/* for mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="top"
            className="flex flex-col capitalize text-lg pt-12 flex-wrap"
          >
            {!localStorage.getItem("token") && (
              <SheetClose>
                <Link className="flex items-center gap-4" href="/auth/login">
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              </SheetClose>
            )}

            {!localStorage.getItem("token") && (
              <SheetClose>
                <Link className="flex items-center gap-4" href="/auth/register">
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </SheetClose>
            )}

            {localStorage.getItem("token") && (
              <SheetClose>
                {isAdmin ? (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-4"
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/user/dashboard"
                    className="flex items-center gap-4"
                  >
                    <LayoutDashboard size={20}  />
                    <span>Dashboard</span>
                  </Link>
                )}
              </SheetClose>
            )}

            {/* Add social links */}
            {socialLinks.map(({ icon: Icon, id, text, url }) => (
              <SheetClose key={id}>
                <a
                  className="flex items-center gap-2 capitalize"
                  href={url}
                  target="_blank"
                >
                  <Icon size={20} />
                  <span>{text}</span>
                </a>
              </SheetClose>
            ))}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
