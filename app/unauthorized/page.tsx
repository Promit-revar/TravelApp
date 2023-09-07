"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const ForbiddenErrorPage = () => {

   const Router = useRouter();
  const handleChange =() =>{
   Router.push('/');
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col space-y-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 font-semibold">
        403 | You are not authorized to view this page
      </h1>
    

      <Button variant="destructive" onClick={handleChange}>
      Return
      </Button>
    </div>
  );
};

export default ForbiddenErrorPage;
