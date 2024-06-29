"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import events from "@/utils/event";
import ImageCard from "@/components/ImageCard";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/outline";

type Event = {
  id: number;
  title: string;
  imageUrl: string;
  dateTime: string;
  hostedBy: string;
  location: string;
  detailLocation: string;
  totalAttendees: number;
  maxAttendees: number;
  ticketType: string;
  prices: {
    name: string;
    price: number;
  }[];
  category: string;
  about: string;
  description: string;
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

      if (!isNaN(eventId)) {
        const foundEvent = events.find((event) => event.id === eventId);
        if (foundEvent) {
          const expectedSlug = `${foundEvent.title.replace(/\s+/g, "-").toLowerCase()}-ticket-${foundEvent.id}`;
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

  const [date, time] = event.dateTime.split("|").map((str) => str.trim());

  const addToCart = () => {
    console.log(`Ticket for event ${event.id} added to cart.`);
  };

  // Function to find minimum price
  const getMinimumPrice = () => {
    let minPrice = Infinity;
    event.prices.forEach((price) => {
      if (price.price < minPrice) {
        minPrice = price.price;
      }
    });
    return minPrice;
  };

  const minimumPrice = getMinimumPrice();

  return (
    <div className="py-7">
      <ImageCard src={event.imageUrl} alt={event.title} />
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        <div className="mt-6 md:flex md:justify-between md:items-start">
          <div className="md:w-2/3 md:pr-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 border-b-2 pb-2">{event.title}</h1>
            <div className="mt-4">
              <p className="text-sm sm:text-base">{date}</p>
              <p className="text-sm sm:text-base">Hosted by: {event.hostedBy}</p>
              <p className="text-sm sm:text-base">Attendees: {event.totalAttendees}/{event.maxAttendees}</p>
              <p className="text-sm sm:text-base">Ticket Type: {event.ticketType}</p>
              
              {event.ticketType !== "Free" && (
                <p className="text-sm sm:text-base">Prices: {event.prices.map((price, index) => (
                  <span key={index}>{price.name} - ${price.price} </span>
                ))}</p>
              )}
              {event.ticketType !== "Free" && (
                <p className="text-sm sm:text-base">Minimum Price: ${minimumPrice}</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">About</h2>
              <p className="text-sm sm:text-base">{event.about}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm sm:text-base whitespace-pre-line">{event.description}</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-4 mb-2">Category</h2>
              <a className="inline-block px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 text-sm sm:text-base">
                {event.category}
              </a>
            </div>
          </div>
          <div className="md:w-1/3 md:mt-0 mt-8 md:px-8 sticky top-16">
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">Hosted by : {event.hostedBy}</p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{date}</p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{time}</p>
            </div>
            <button
              onClick={addToCart}
              className="mt-8 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition text-sm sm:text-base sticky-tickets-button"
            >
              Get tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;