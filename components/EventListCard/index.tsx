"use client";
import React from "react";
import Image from "next/image";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  TagIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

interface EventProps {
  id: number;
  image: {
    imageUrl: string;
  };
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
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

function EventListCard({
  id,
  image,
  title,
  description,
  eventDate,
  startTime,
  endTime,
  location,
  availableSeat,
  seatLimit,
  isFree,
  ticketTypes,
  category,
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

  const getTicketInfo = (isFree: boolean, ticketTypes: { price: number }[]) => {
    if (isFree) {
      return "Free";
    }
    if (!Array.isArray(ticketTypes) || ticketTypes.length === 0) {
      return "No tickets available";
    }
    const minPrice = Math.min(...ticketTypes.map((ticket) => ticket.price));
    return `${minPrice.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })}`;
  };

  return (
    <Link
      href={`/events/${title.replace(/\s+/g, "-").toLowerCase()}-ticket-${id}`}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-4">
        <div className="w-full md:w-60 h-48 md:h-72">
          {image?.imageUrl && (
            <Image
              src={image.imageUrl}
              alt={title}
              className="object-cover object-center w-full h-full"
              width={200}
              height={200}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 p-4 flex flex-col justify-center">
          <div>
            <div className="uppercase tracking-wide text-lg text-purple-700 font-bold">
              {title}
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              {truncateText(description, 200)}
            </p>
          </div>
          <div className="pt-4">
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
              <p>{seatLimit - availableSeat} Attendees</p>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <TagIcon className="w-4 h-4 mr-1 text-purple-700" />
              <p>{category}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-xl p-4 font-semibold text-purple-700 xl:border-l-2 border-dashed w-48">
          {isFree ? (
            <p>Free</p>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm font-normal">Starts from</p>
              <p>{getTicketInfo(isFree, ticketTypes)}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default EventListCard;
