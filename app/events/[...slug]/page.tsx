"use client";

import React, { useEffect, useState } from "react";
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
import ReviewDisplay from "@/app/components/Events/ReviewDisplay";

type Event = {
  id: number;
  title: string;
  image: {
    imageUrl: string;
  }[];  
  eventDate: string;
  startTime: string;
  endTime: string;
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
  category: string;
  description: string;
};

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
    null
  );
  const [ticketQuantities, setTicketQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [isGetTicketModalOpen, setIsGetTicketModalOpen] =
    useState<boolean>(false);

  const [reviews, setReviews] = useState([
    { name: "John Doe", text: "Great event!" },
    { name: "Jane Smith", text: "Had a wonderful time!" },
  ]);

  useEffect(() => {
    const slug = pathname.split("/").pop();
    if (slug) {
      const slugParts = slug.split("-");
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
            const minPriceTicket = foundEvent.ticketTypes.reduce(
              (minTicket, ticket) =>
                ticket.price < minTicket.price ? ticket : minTicket,
              foundEvent.ticketTypes[0]
            );
            setSelectedTicketType(minPriceTicket.name);
            setTicketQuantities({ [minPriceTicket.name]: 1 });
          }
        } else {
          router.replace("/404");
        }
      } else {
        router.replace("/404");
      }
    }
  }, [pathname, router]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const handleQuantityChange = (ticketType: string, quantity: number) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketType]: quantity,
    }));
  };

  const incrementQuantity = (ticketType: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketType]: (prevQuantities[ticketType] || 0) + 1,
    }));
  };

  const decrementQuantity = (ticketType: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketType]: Math.max((prevQuantities[ticketType] || 1) - 1, 0),
    }));
  };

  const sortedTicketTypes = [...event.ticketTypes].sort(
    (a, b) => a.price - b.price
  );

  const getTotalPrice = () => {
    if (selectedTicketType && ticketQuantities[selectedTicketType]) {
      const ticket = sortedTicketTypes.find(
        (ticket) => ticket.name === selectedTicketType
      );
      if (ticket) {
        return ticket.price * ticketQuantities[selectedTicketType];
      }
    }
    return 0;
  };

  const totalTicketPrice = getTotalPrice();

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

  const eventDate = new Date(event.eventDate);
  const currentDate = new Date();
  const isEventPast = currentDate > eventDate;

  const handleReviewSubmit = (review: any) => {
    console.log("Review submitted:", review);
  };

  const openGetTicketModal = () => setIsGetTicketModalOpen(true);
  const closeGetTicketModal = () => setIsGetTicketModalOpen(false);

  return (
    <div className="py-7">
      <ImageCard src={event.image.imageUrl} alt={event.title} />
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
              <p className="text-sm sm:text-base">{`${formattedEventDate} | ${formattedStartTime} - ${formattedEndTime}`}</p>
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
            </div>
            <div className="mt-4">
              <p className="text-sm sm:text-base whitespace-pre-line">
                {event.description}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold mt-4 mb-2">
                Category
              </h2>
              <a className="inline-block px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 text-sm sm:text-base">
                {event.category}
              </a>
            </div>
          </div>
          <div className="md:w-1/3 md:mt-0 mt-8 md:px-8 sticky top-16">
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">
                Organize by: {event.organizer}
              </p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">{formattedEventDate}</p>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">
                {formattedStartTime} - {formattedEndTime}
              </p>
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
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2 pb-4 border-b-2 border-dashed">
              <TicketIcon className="w-4 h-4 mr-1 text-gray-500" />
              {event.isFree ? <p>Free</p> : <p>Paid</p>}
            </div>
            {!isEventPast && (
              <div>
                <div className="mt-10 text-gray-600">
                  {sortedTicketTypes.map((ticketType) => (
                    <div
                      key={ticketType.name}
                      className={`mb-4 p-4 border rounded ${
                        selectedTicketType === ticketType.name
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="ticketType"
                            value={ticketType.name}
                            onChange={() =>
                              setSelectedTicketType(ticketType.name)
                            }
                            checked={selectedTicketType === ticketType.name}
                            className="mr-2"
                            disabled={isEventPast}
                          />
                          <span className="font-bold text-lg uppercase">
                            {ticketType.name}
                          </span>
                        </div>
                        <div className="flex items-center ml-4">
                          <button
                            onClick={() => decrementQuantity(ticketType.name)}
                            className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                            disabled={
                              !selectedTicketType ||
                              selectedTicketType !== ticketType.name ||
                              isEventPast
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={ticketQuantities[ticketType.name] || 0}
                            readOnly
                            className="w-16 text-center"
                            disabled={
                              !selectedTicketType ||
                              selectedTicketType !== ticketType.name
                            }
                          />
                          <button
                            onClick={() => incrementQuantity(ticketType.name)}
                            className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                            disabled={
                              !selectedTicketType ||
                              selectedTicketType !== ticketType.name ||
                              isEventPast
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {ticketType.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-xl font-bold">
                    Total Price:{" "}
                    {totalTicketPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={isEventPast ? undefined : openGetTicketModal}
              className={`mt-8 w-full px-4 py-2 ${
                isEventPast
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-700"
              } text-white rounded transition text-sm sm:text-base sticky-tickets-button`}
              disabled={isEventPast}
            >
              {isEventPast ? "Sales Ended" : "Get tickets"}
            </button>
            {isGetTicketModalOpen && !isEventPast && (
              <TicketModal
                onClose={closeGetTicketModal}
                onGetTotalPrice={totalTicketPrice}
                event={event}
              />
            )}
          </div>
        </div>
        {isEventPast && (
          <div className="py-8">
            <ReviewForm onSubmit={handleReviewSubmit} />
            <ReviewDisplay reviews={reviews} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
