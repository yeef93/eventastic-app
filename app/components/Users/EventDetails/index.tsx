import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

interface EventDetail {
  title: string;
  imageUrl: string;
  organizer: string;
  description: string;
  location: string;
  venue: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  map: string;
  category: string;
}

interface EventDetailsProps {
  event: EventDetail;
}

function EventDetails({ event }: EventDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formattedEventDate = formatDate(event.eventDate);
  const formattedStartTime = formatTime(event.startTime);
  const formattedEndTime = formatTime(event.endTime);

  return (
    <div>
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-4">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="space-y-2 bg-white p-8 rounded">
        <h2 className="text-2xl font-semibold mb-4 border-b-2">
          {event.title}
        </h2>
        <div className=" flex flex-row justify-between text-sm">
          <div>
            <p>
              <strong>Details</strong>
            </p>
            <p>{event.description}</p>
          </div>
          <div className=" px-8">
            <div className="flex items-center text-gray-600 mt-2">
              <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">
                Organize by: {event.organizer}
              </p>
            </div>
            <div className="flex items-center text-gray-600 mt-2">
              <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{formattedEventDate}</p>
            </div>
            <div className="flex items-center text-gray-600 mt-2">
              <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">
                {formattedStartTime} - {formattedEndTime}
              </p>
            </div>
            <div className="flex items-center text-gray-600 mt-2">
              <LocationMarkerIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">
                {event.venue}, {event.location}
              </p>
              <a
                href={event.map}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-2"
              >
                maps
              </a>
            </div>
            <div className=" py-4">
              <a className="inline-block px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 ">
                {event.category}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
