"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import events from "@/utils/events";
import ImageCard from "@/components/ImageCard";
import { CalendarIcon, ClockIcon, LocationMarkerIcon, TicketIcon, UserIcon } from "@heroicons/react/outline";
import ReviewForm from "@/app/components/Events/ReviewForm";
import TicketModal from "@/app/components/Events/TicketModal";

type Event = {
  id: number;
  title: string;
  imageUrl: string;
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
  eventCategory: string;
  description: string;
};

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);
  const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({});
  const handleReviewSubmit = (review: any) => {
    console.log("Review submitted:", review);
  };

  const [isGetTicketModalOpen, setIsGetTicketModalOpen] = useState<boolean>(false);
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
      [ticketType]: Math.max((prevQuantities[ticketType] || 0) - 1, 0),
    }));
  };

  // Sort ticket types by price
  const sortedTicketTypes = [...event.ticketTypes].sort((a, b) => a.price - b.price);

  // Function to find minimum price
  const getMinimumPrice = () => {
    let minPrice = Infinity;
    sortedTicketTypes.forEach((price) => {
      if (price.price < minPrice) {
        minPrice = price.price;
      }
    });
    return minPrice;
  };

  const minimumPrice = getMinimumPrice();

  // Format the date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formattedEventDate = formatDate(event.eventDate);
  const formattedStartTime = formatTime(event.startTime);
  const formattedEndTime = formatTime(event.endTime);

  // Check if the event date has passed
  const eventDate = new Date(event.eventDate);
  const currentDate = new Date();
  const isEventPast = currentDate > eventDate;

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
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Date and time</h2>
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
              <h2 className="text-xl sm:text-2xl font-bold mt-4 mb-2">Category</h2>
              <a className="inline-block px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 text-sm sm:text-base">
                {event.eventCategory}
              </a>
            </div>
          </div>
          <div className="md:w-1/3 md:mt-0 mt-8 md:px-8 sticky top-16">
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2">
              <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
              <p className="whitespace-nowrap">Organize by: {event.organizer}</p>
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
            <div className="mt-4">
              {sortedTicketTypes.map((ticketType) => (
                <div key={ticketType.name} className="mb-4 p-4 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="ticketType"
                        value={ticketType.name}
                        onChange={() => setSelectedTicketType(ticketType.name)}
                        checked={selectedTicketType === ticketType.name}
                        className="mr-2"
                        disabled={isEventPast}
                      />
                      <span className="font-bold text-lg uppercase">{ticketType.name}</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <button
                        onClick={() => decrementQuantity(ticketType.name)}
                        className="px-2 py-1 bg-gray-300 rounded-l text-gray-700"
                        disabled={!selectedTicketType || selectedTicketType !== ticketType.name || isEventPast}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={ticketQuantities[ticketType.name] || 0}
                        readOnly
                        className="w-16 text-center"
                        disabled={!selectedTicketType || selectedTicketType !== ticketType.name}
                      />
                      <button
                        onClick={() => incrementQuantity(ticketType.name)}
                        className="px-2 py-1 bg-gray-300 rounded-r text-gray-700"
                        disabled={!selectedTicketType || selectedTicketType !== ticketType.name || isEventPast}
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
            <button
              onClick={isEventPast ? undefined : openGetTicketModal}
              className={`mt-8 w-full px-4 py-2 ${
                isEventPast ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"
              } text-white rounded transition text-sm sm:text-base sticky-tickets-button`}
              disabled={isEventPast}
            >
              {isEventPast ? "Sales Ended" : "Get tickets"}
            </button>
            {isGetTicketModalOpen && (
              <TicketModal onClose={closeGetTicketModal} event={event} />
            )}
          </div>
        </div>
        {isEventPast && (
          <div className="py-8">
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
