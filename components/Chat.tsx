"use client";
import React, { FC, useContext, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { ArrowDown } from "lucide-react";
import { StateContext } from "@/context/Provider";
import { useRouter } from "next/navigation";
import { createPlan } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { Home } from "lucide-react"; 


interface ChatProps {
  destinationId: string;
}

const Chat: FC<ChatProps> = ({ destinationId }) => {
  const { formValues, selectedPlace } = useContext(StateContext);
  const [text, setText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isInitialLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["create plan", destinationId],
    queryFn: () =>
      createPlan({
        location: destinationId,
        query: text ? text : formValues.itineraryPlan,
      }),
    refetchOnWindowFocus: false,
  });
  const router = useRouter();
  // console.log(isInitialLoading, isRefetching);

  // console.log(data);
  return (
    <div className="border rounded-t-2xl max-w-5xl mx-auto w-full px-4 md:px-8 sm:px-6 md:shadow-2xl bg-white h-[80vh] absolute bottom-0 flex flex-col inset-x-0 ">
     
      
      {isInitialLoading || isRefetching || isError ? (
        <div className="text-lg font-medium py-6 flex flex-row justify-between">
          <div>
           Hold On! We are finding your query!
           </div>
           <div><Home onClick={()=>router.push('/')}/></div> 
        </div>
        
      ) : (
         <div className="flex flex-row justify-between"><div className="text-lg font-medium py-6">{data?.plan.plan_title}</div> <div><Home onClick={()=>router.push('/')}/></div></div>
      )}

      

      <div
        className="space-y-5 flex-1 overflow-y-auto pt-6 pb-36 scrollbar-hide"
        ref={containerRef}
      >
        {isInitialLoading || isRefetching || isError
          ? Array(3)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl w-full p-4 h-44"
                ></div>
              ))
          : data?.plan.schedule.map(({ day, items, tagline, title }, i) => (
              <div className="p-4 bg-gray-100 rounded-xl space-y-2" key={i}>
                <p className="font-semibold">
                  {day}: {title}
                </p>
                <p className="text-sm text-gray-600">{tagline}</p>
                <div className="whitespace-break-spaces text-sm p-4 bg-white rounded-xl shadow-lg space-y-2">
                  {items.map(({ explain, time_slot }) => (
                    <div key={time_slot}>
                      <span className="font-semibold">{time_slot} : </span>
                      <span>{explain}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        <button
          className="bg-white shadow-xl border absolute right-6 md:right-10 z-50 w-fit rounded-full p-2  bottom-24 text-black"
          onClick={() =>
            containerRef.current?.scrollTo({ top: 10000, behavior: "smooth" })
          }
        >
          <ArrowDown size={20} />
        </button>
      </div>
      <div className="absolute right-0 bottom-0 left-0 py-4 px-4 md:px-8 bg-white border-t">
        <ChatInput
          isLoading={isInitialLoading || isRefetching}
          setText={setText}
          text={text}
          handleSubmit={(e) => {
            e.preventDefault();
            setText("");
            if (isInitialLoading || isRefetching) {
              return;
            }
            refetch();
            // console.log("submitted");
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
