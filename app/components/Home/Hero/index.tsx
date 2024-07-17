"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { debounce } from "lodash";
import placeholders from "@/utils/placeholderevent";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  location: string;
}

const Hero: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async (keyword: string) => {
    if (!keyword) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/events/search?keyword=${keyword}`);
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleChangeDebounce = debounce((value: string) => {
    fetchEvents(value);
  }, 500);

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeDebounce(e.target.value);
  };

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
          <div className="relative w-full md:flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              onChange={handleChange}
              type="text"
              placeholder={placeholders[placeholderIndex]}
              className="w-full text-xl pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="relative mt-4 w-full max-w-lg mx-auto">
          {searchResults.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white rounded-lg shadow-lg text-gray-900">
              {searchResults.map((event) => (
                <li
                  key={event.id}
                  className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  <h3 className="font-bold">{event.title}</h3>
                  <p>{event.location}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;