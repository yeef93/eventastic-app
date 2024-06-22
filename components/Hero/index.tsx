"use client"
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import placeholders from "@/utils/placeholderevent";

function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

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
        <p className="text-lg mb-8">Discover events and groups around the world</p>
        <div className="w-full max-w-lg mx-auto text-gray-800">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select Location</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
            </select>
            <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
