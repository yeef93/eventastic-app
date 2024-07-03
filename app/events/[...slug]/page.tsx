"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import events from "@/utils/events";
import ImageCard from "@/components/ImageCard";
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";
import ReviewForm from "@/app/components/Events/ReviewForm";
import TicketModal from "@/app/components/Events/TicketModal";

type Event = {
  id: number;
  title: string;
  imageUrl: string;
  dateTime: string;
  organizer: string;
  location: string;
  venue: string;
  availableSeat: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  eventCategory: string;
  description: string;
};

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [event, setEvent] = useState<Event | null>(null);
  const handleReviewSubmit = (review: any) => {
    console.log("Review submitted:", review);
  };

  const [isGetTicketModalOpen, setIsGetTicketModalOpen] =
    useState<boolean>(false);
  const openGetTicketModal = () => setIsGetTicketModalOpen(true);
  const closeGetTicketModal = () => setIsGetTicketModalOpen(false);

  useEffect(() => {
    const slug = pathname.split("/").pop();
    if (slug) {
      const slugParts = slug.toString().split("-");
      const eventId = parseInt(slugParts[slugParts.length - 1], 10);

      if (!isNaN(eventId)) {
        const foundEvent = events.find((event) => event.id === eventId);
        if (foundEvent) {
          const expectedSlug = `${foundEvent.title
            .replace(/\s+/g, "-")
            .toLowerCase()}-ticket-${foundEvent.id}`;
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
    event.ticketTypes.forEach((price) => {
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 border-b-2 pb-2">
              {event.title}
            </h1>
            <div className="mt-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Date and time
              </h2>
              <p className="text-sm sm:text-base">{date}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Location</h2>
              <div className="flex items-center text-sm sm:text-base">
                <p className="mr-2">{event.location}</p>
                <a
                  href={event.venue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  maps
                </a>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Details</h2>
              <p className="text-sm sm:text-base">{event.about}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm sm:text-base whitespace-pre-line">
                {event.description}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold mt-4 mb-2">
                Category
              </h2>
              <a className="inline-block px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 text-sm sm:text-base">
                {event.eventCategory}
              </a>
            </div>
          </div>
          <div className="md:w-1/3 md:mt-0 mt-8 md:px-8 sticky top-16">
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">
                Organize by : {event.organizer}
              </p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{date}</p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{time}</p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <LocationMarkerIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{event.location}</p>
              <a
                href={event.venue}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-2"
              >
                maps
              </a>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <TicketIcon className="w-4 h-4 mr-1 text-gray-500" />
              {event.isFree ? (
                <p>Free</p>
              ) : (
                <p>
                  Start From{" "}
                  {minimumPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>

            <button
              // onClick={addToCart}
              onClick={openGetTicketModal}
              className="mt-8 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition text-sm sm:text-base sticky-tickets-button"
            >
              Get tickets
            </button>
            {isGetTicketModalOpen && (
              <TicketModal onClose={closeGetTicketModal} event={event} />
            )}
          </div>
        </div>
        <div className=" py-8">
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
