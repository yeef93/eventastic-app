import React from "react";
import Image from "next/image";
import { CalendarIcon, TicketIcon, UserIcon } from "@heroicons/react/outline"; // Import CalendarIcon from Heroicons

interface EventProps {
  imageUrl: string;
  title: string;
  dateTime: string;
  hostedBy: string;
  totalAttendees: number;
  maxAttendees:number;
  ticketType: string;
}

function EventCard({
  imageUrl,
  title,
  dateTime,
  hostedBy,
  totalAttendees,
  maxAttendees,
  ticketType,
}: EventProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full sm:w-80 md:w-96 lg:w-96 xl:w-96 mx-auto m-4">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover object-center"
        width={200}
        height={200}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>        
        <p className="text-sm text-gray-600 mt-2">Hosted by: {hostedBy}</p>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
          <p>{dateTime}</p>
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
          <p>{totalAttendees}/{maxAttendees} Attendees</p>
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <TicketIcon className="w-4 h-4 mr-1 text-gray-500" />
          <p>{ticketType}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
