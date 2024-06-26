"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import events from "@/utils/event";

const EventDetail = () => {
  const params = useParams();
  const { id } = params;

  if (!id) {
    console.log("No ID found in path params.");
    return <p>Loading...</p>;
  }

  const eventId = parseInt(id, 10);
  console.log("Event ID:", eventId);

  const event = !isNaN(eventId)
    ? events.find((event) => event.id === eventId)
    : undefined;

  if (!event) {
    console.log("Event not found.");
    return <p>Event not found</p>;
  }

  console.log("Event data:", event);

  return (
    <div className="pt-36">
      <div></div>
      <div>
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={800}
          height={450}
          className="w-full h-auto mb-4"
        />
        <p className="text-lg mb-4">{event.dateTime}</p>
        <p className="text-lg mb-4">Hosted by: {event.hostedBy}</p>
        <p className="text-lg mb-4">Category: {event.category}</p>
        <p className="text-lg mb-4">
          Attendees: {event.totalAttendees}/{event.maxAttendees}
        </p>
        <p className="text-lg mb-4">Ticket Type: {event.ticketType}</p>
      </div>
    </div>
  );
};

export default EventDetail;