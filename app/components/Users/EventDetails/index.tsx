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
}

interface EventDetailsProps {
  event: EventDetail;
}

function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-4">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <p>
          <strong>Organizer:</strong> {event.organizer}
        </p>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Venue:</strong> {event.venue}
        </p>
        <p>
          <strong>Date:</strong> {event.eventDate}
        </p>
        <p>
          <strong>Time:</strong> {event.startTime} - {event.endTime}
        </p>
      </div>
    </div>
  );
}

export default EventDetails;