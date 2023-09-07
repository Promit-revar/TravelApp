import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="px-4 py-3.5 bg-white text-black rounded-full flex items-center gap-2 w-full max-w-xs">
      <Search size={20} />
      <p className=" text-gray-500">Enter your dream destination</p>
    </div>
  );
};

export default SearchBar;
