"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import events from "@/utils/event";

type Event = {
  id: number;
  title: string;
  imageUrl: string;
  dateTime: string;
  hostedBy: string;
  location: string;
  totalAttendees: number;
  maxAttendees: number;
  ticketType: string;
  category: string;
};

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const slug = pathname.split("/").pop();
    if (slug) {
      const slugParts = slug.toString().split("-");
      const eventId = parseInt(slugParts[slugParts.length - 1], 10);
      console.log("Slug Parts:", slugParts);
      console.log("Event ID:", eventId);

      if (!isNaN(eventId)) {
        const foundEvent = events.find((event) => event.id === eventId);
        if (foundEvent) {
          const expectedSlug = `${foundEvent.title.replace(/\s+/g, '-').toLowerCase()}-ticket-${foundEvent.id}`;
          if (slug !== expectedSlug) {
            router.replace(`/events/${expectedSlug}`);
          } else {
            setEvent(foundEvent);
          }
        } else {
          router.replace("/404");
        }
      } else {
        router.replace("/404");
      }
    }
  }, [pathname]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const addToCart = () => {
    console.log(`Ticket for event ${event.id} added to cart.`);
  };

  return (
    <div className="pt-36 px-8">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <Image
        src={event.imageUrl}
        alt={event.title}
        width={800}
        height={450}
        className="w-full h-auto mb-4"
      />
      <div className="text-lg space-y-4">
        <p>{event.dateTime}</p>
        <p>Hosted by: {event.hostedBy}</p>
        <p>Category: {event.category}</p>
        <p>
          Attendees: {event.totalAttendees}/{event.maxAttendees}
        </p>
        <p>Ticket Type: {event.ticketType}</p>
      </div>
      <button
        onClick={addToCart}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Add Ticket to Cart
      </button>
    </div>
  );
};

export default EventDetail;