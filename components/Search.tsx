"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setText("");
  };
  return (
    <form
      className="max-w-sm w-full flex items-center rounded-full px-3 py-2.5 bg-white gap-2"
      onSubmit={handleSubmit}
    >
      <SearchIcon className="text-black" size={20} />
      <input
        type="text"
        placeholder="Enter your dream destination"
        className="w-full bg-transparent outline-none "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default Search;
