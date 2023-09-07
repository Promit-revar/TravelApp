"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col space-y-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 font-semibold">
        Sorry Something Went Wrong:(
      </h1>
      <Button variant="destructive" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
};

export default ErrorPage;
