import React from "react";

const Insights = () => {
  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-xl h-10 my-2 flex items-start justify-around flex-col">
        <h4 className="text-lg font-semibold text-blue-400 ml-3">
          Today total aprroved  Trips : 2
        </h4>
      </div>
      <div className="w-full bg-white shadow-xl rounded-xl h-10 my-2 flex items-start justify-around flex-col">
        <h4 className="text-lg text-blue-400  font-semibold ml-3">
          Monthly total aprrove Trips : 14
        </h4>
      </div>
    </>
  );
};

export default Insights;
