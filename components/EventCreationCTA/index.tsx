import React from "react";
import Link from "next/link";
import { CalendarIcon } from "@heroicons/react/outline";

function EventCreationCTA() {
  return (
    <div className="bg-gray-200 py-10 px-6 text-center flex flex-col items-center sm:flex-row sm:justify-between sm:px-12 xl:px-36 xl:justify-center">
      <div className="mb-6 sm:mb-0">
        <h2 className="text-2xl font-bold mb-2">
          Create an event with Eventastic
        </h2>
        <p className="text-gray-700">
          Got a show, event, activity or a great experience? Partner with us &
          get listed on Eventastic.
        </p>
      </div>
      <a
        href="/"
        className="flex items-center bg-yellow-400 text-gray-800 text-lg font-semibold py-2 px-4 rounded-full hover:bg-yellow-500 transition duration-300"
      >
        <CalendarIcon className="h-6 w-6 mr-2" />
        Create Event
      </a>
    </div>
  );
}

export default EventCreationCTA;
