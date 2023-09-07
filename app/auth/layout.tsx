import React, { FC } from "react";
import Image from "next/image";

import image3 from "../../public/image3.gif";
import Navbar from "@/components/Navbar";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage?: StaticImageData; // Use 'StaticImageData' type from Next.js Image component
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, backgroundImage }) => {
  return (
    <>
      <Navbar className="my-4" />{" "}
      <section className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4 py-6 bg-gray-100 mt-4">
        {" "}
        <div className="fixed inset-0 bg-black z-0">
          {/* Conditionally render the background image */}
          {backgroundImage && (
            <Image
              height={900} // Half of the original height (1800 / 2)
              width={505} // Half of the original width (1010 / 2)
              className="object-cover h-full w-full"
              src={backgroundImage}
              alt=""
            />
          )}
        </div>
        <div
          style={{ position: "relative", zIndex: 1 }}
          className="w-full max-w-md md:max-w-xl"
        >
          {children}
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
