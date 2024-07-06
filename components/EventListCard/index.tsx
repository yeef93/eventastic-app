"use client";
import React from "react";
import Image from "next/image";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  TagIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

interface EventProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

function EventListCard({
  id,
  imageUrl,
  title,
  description,
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
  const formatDateTime = (
    eventDate: string,
    startTime: string,
    endTime: string
  ) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const eventDateObj = new Date(eventDate);
    const formattedDate = eventDateObj.toLocaleDateString("en-US", dateOptions);

    const startTimeObj = new Date(`${eventDate}T${startTime}`);
    const formattedStartTime = startTimeObj.toLocaleTimeString(
      "en-US",
      timeOptions
    );

    const endTimeObj = new Date(`${eventDate}T${endTime}`);
    const formattedEndTime = endTimeObj.toLocaleTimeString(
      "en-US",
      timeOptions
    );

    return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
  };

  return (
    <Link
      href={`/events/${title.replace(/\s+/g, "-").toLowerCase()}-ticket-${id}`}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex">
        <div>
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover object-center w-60 h-72"
            width={200}
            height={200}
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-lg text-purple-700 font-bold">
              {title}
            </div>
            <p className="mt-2 text-slate-500">
              {truncateText(description, 200)}
            </p>
          </div>
          <div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <CalendarIcon className="w-4 h-4 mr-1 text-purple-700" />
              <p>{formatDateTime(eventDate, startTime, endTime)}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <LocationMarkerIcon className="w-4 h-4 mr-1 text-purple-700" />
              <p>{location}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <UsersIcon className="w-4 h-4 mr-1 text-purple-700" />
              <p>
                {seatLimit - availableSeat}/{seatLimit} Attendees
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <TagIcon className="w-4 h-4 mr-1 text-purple-700" />
              <p>{eventCategory}</p>
            </div>
          </div>
        </div>
        <div className=" items-center">
          <TicketIcon className="w-4 h-4 mr-1 text-purple-700" />
          {isFree ? <p>Free</p> : <p>Paid</p>}
        </div>
      </div>
    </Link>
  );
}

export default EventListCard;
