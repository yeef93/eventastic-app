"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import placeholders from "@/utils/placeholderevent";
import { debounce } from "lodash";

function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeDebounce = debounce((value: string) => {
    console.log(value);
  },500)

  return (
    <div
      className="relative bg-cover bg-center h-[75vh]"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/5568795/pexels-photo-5568795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Find Your Next Events</h1>
        <p className="text-lg mb-8">
          Discover events and groups around the world
        </p>
        <div className="w-full max-w-lg mx-auto text-gray-800">
          <div className="relative w-full md:flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
            onChange={(e)=> handleChangeDebounce(e.target.value)}
              type="text"
              placeholder={placeholders[placeholderIndex]}
              className="w-full text-xl pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
