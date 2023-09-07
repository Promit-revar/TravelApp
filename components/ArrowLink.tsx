import React, { FC } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ArrowLinkProps {
  handleClick: () => void;
}

const ArrowLink: FC<ArrowLinkProps> = ({ handleClick }) => {
  return (
    <button
      className="h-10 w-10 flex items-center justify-center rounded-full relative"
      onClick={handleClick}
    >
      <motion.div
        animate={{
          rotate: [0, 45, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 h-full w-full bg-black/10 rounded-full border-2 border-dotted hover:bg-black/20 transition-colors duration-200"
      ></motion.div>
      <div className="h-10 w-10 flex items-center justify-center">
        <ArrowRight className="text-white" size={20} />
      </div>
    </button>
  );
};

export default ArrowLink;
