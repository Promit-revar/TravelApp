"use client";
import { getIxigoSearchResults } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { FC, useState, useEffect } from "react";
import Step0 from "./components/Step0";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
// import { useRouter } from "next/navigation";
import Step4 from "./components/Step4";
import Link from "next/link";
import { X } from "lucide-react";

interface PlanDetailsProps {
  searchParams: { q: string };
}

const PlanDetails: FC<PlanDetailsProps> = ({ searchParams: { q } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search: any = searchParams.get("q");

  const [step, setStep] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["get Image data"],
    queryFn: () => getIxigoSearchResults(search),
  });

  console.log("data details", data);

  if (!search) {
    router.push("/");
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center  px-4 py-12 bg-gray-100">
      {data && (
        <div className="fixed inset-0 bg-black">
          {data[0] && (
            <Image
              height={1920}
              width={1080}
              className="object-cover h-full w-full opacity-75"
              src={`https://plan-cf.ixigo.com/images/${data[0]?.displayname}`}
              alt={data[0]?.displayname}
            />
          )}
        </div>
      )}

      <div className="bg-white py-6 px-4 rounded-xl border-1 w-full max-w-lg md:px-8 md:py-12 isolate relative">
        <Link
          className="absolute right-4 top-4 p-1 rounded-full text-white bg-gray-800 hover:bg-gray-800/95 transition-colors"
          href={"/"}
        >
          <X size={20} />
        </Link>
        {step == 0 && <Step0 step={step} setStep={setStep} />}
        {step == 1 && <Step1 step={step} setStep={setStep} />}
        {step == 2 && <Step2 step={step} setStep={setStep} />}
        {step == 3 && (
          <Step3 step={step} setStep={setStep} destination={search} />
        )}
        {step == 4 && <Step4 destination={search} />}
      </div>
    </div>
  );
};

export default PlanDetails;
