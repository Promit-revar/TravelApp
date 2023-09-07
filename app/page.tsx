import HomeSlide from "@/components/HomeSlide";
import Navbar from "@/components/Navbar";
import { getHomeData } from "@/lib/action";
import React from "react";
import Login from "./auth/login/page";
const IndexPage = async () => {
  const data = await getHomeData();

  return (
    <div>
      <Navbar />
      {/* landing page */}
      <HomeSlide data={data}  />
      {/* <Login/> */}
    </div>
  );
};

export default IndexPage;