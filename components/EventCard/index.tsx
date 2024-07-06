"use client";
import React from "react";
import Image from "next/image";
import {
  CalendarIcon,
  LocationMarkerIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

interface EventProps {
  id: number;
  imageUrl: string;
  title: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  location: string;
  availableSeat: number;
  seatLimit: number;
  isFree: boolean;
  eventCategory: string;
}

function EventCard({
  id,
  imageUrl,
  title,
  eventDate,
  startTime,
  endTime,
  organizer,
  location,
  availableSeat,
  seatLimit,
  isFree,
  eventCategory,
}: EventProps) {
  const formatDateTime = (eventDate: string, startTime: string, endTime: string) => {
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    const eventDateObj = new Date(eventDate);
    const formattedDate = eventDateObj.toLocaleDateString('en-US', dateOptions);

    const startTimeObj = new Date(`${eventDate}T${startTime}`);
    const formattedStartTime = startTimeObj.toLocaleTimeString('en-US', timeOptions);

    const endTimeObj = new Date(`${eventDate}T${endTime}`);
    const formattedEndTime = endTimeObj.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
  };

  return (
    <Link
      href={`/events/${title.replace(/\s+/g, "-").toLowerCase()}-ticket-${id}`}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full sm:w-80 md:w-96 lg:w-96 xl:w-96 mx-auto m-4">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover object-center"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            <LocationMarkerIcon className="w-4 h-4 inline-block mr-1 text-white" />
            {location}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">Hosted by: {organizer}</p>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <CalendarIcon className="w-4 h-4 mr-1 text-purple-700" />
            <p>{formatDateTime(eventDate, startTime, endTime)}</p>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <UsersIcon className="w-4 h-4 mr-1 text-purple-700" />
            <p>
              {seatLimit - availableSeat}/{seatLimit} Attendees
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <TicketIcon className="w-4 h-4 mr-1 text-purple-700" />
            {isFree ? <p>Free</p> : <p>Paid</p>}
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <span className="inline-block bg-green-200 text-gray-800 rounded-full px-3 py-1 text-xs font-semibold mr-2">
              {eventCategory}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;