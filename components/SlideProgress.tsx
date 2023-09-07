"use client";
import React, { FC } from "react";

interface SlideProgressProps {
  slideCount: number;
}

const SlideProgress: FC<SlideProgressProps> = ({ slideCount }) => {
  return (
    <div className="flex items-center gap-2 shrink-0 h-0.5 w-full absolute z-50 top-4 px-4">
      {Array(slideCount)
        .fill("")
        .map((_, i) => (
          <div key={i} className="w-full bg-white h-0.5 rounded-full"></div>
        ))}
    </div>
  );
};

export default SlideProgress;
