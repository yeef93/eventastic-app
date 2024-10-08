"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import EventDetailSkeleton from "@/components/Skeleton/EventDetailSkeleton";
import ReviewList from "@/app/components/Events/ReviewList";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Event = {
  id: number;
  title: string;
  image: {
    imageUrl: string;
  };
  eventDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  location: string;
  venue: string;
  map: string;
  availableSeat: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    id:number;
    name: string;
    price: number;
    promoPrice: number;
  }[];
  category: string;
  description: string;
  promoPercent?: number;
  promoEndDate?: string;
};

type SelectedTicketType = {
  id:number;
  name: string;
  price: number;
  promoPrice: number;
} | null;


function EventDetail() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const pathname = usePathname();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<SelectedTicketType>(null);
  const [ticketQuantities, setTicketQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [isGetTicketModalOpen, setIsGetTicketModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const slug = pathname.split("/").pop();
      if (slug) {
        const slugParts = slug.split("-");
        const eventId = parseInt(slugParts[slugParts.length - 1], 10);

        if (!isNaN(eventId)) {
          try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/events/${eventId}`);
            if (!response.ok) {
              throw new Error("Failed to fetch event details");
            }
            const data = await response.json();
            // console.log("Fetched event data:", data);

            // Update to correctly access imageUrl from image object
            if (data.data.image && data.data.image.imageUrl) {
              console.log("Event image URL:", data.data.image.imageUrl);
            } else {
              console.log("No image data found for this event");
            }

            setEvent(data.data);
          } catch (error) {
            console.error("Error fetching event:", error);
            setError("Failed to fetch event details");
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    fetchEvent();
  }, [pathname, apiUrl]); // Include apiUrl in the dependency array

  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No event details available.</p>;
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
  
  const calculateDiscountedPrice = (price: number) => {
    if (event.promoPercent && event.promoEndDate) {
      const promoEndDate = new Date(event.promoEndDate);
      if (currentDate <= promoEndDate) {
        return price - (price * event.promoPercent) / 100;
      }
    }
    return price;
  };

  const getTotalPrice = () => {
    if (selectedTicketType && ticketQuantities[selectedTicketType.name]) {
      const ticket = sortedTicketTypes.find(
        (ticket) => ticket.name === selectedTicketType.name
      );
      if (ticket) {
        return (
          calculateDiscountedPrice(ticket.price) *
          ticketQuantities[selectedTicketType.name]
        );
      }
    }
    return 0;
  };

  const totalTicketPrice = getTotalPrice();

  const handleReviewSubmit = (review: any) => {
    console.log("Review submitted:", review);
  };

  const openGetTicketModal = () => {
    const ticket = sortedTicketTypes.find(
      (t) => t.name === selectedTicketType?.name
    );
    if (ticket) {
      setSelectedTicketType({
        ...selectedTicketType!,
        promoPrice: calculateDiscountedPrice(ticket.price),
      });
    }
    setIsGetTicketModalOpen(true);
  };
  const closeGetTicketModal = () => setIsGetTicketModalOpen(false);

  const handleGetTotalPrice = () => {
    return totalTicketPrice;
  };

  const isGetTicketsButtonDisabled =
    !selectedTicketType ||
    (selectedTicketType && ticketQuantities[selectedTicketType.name] || 0) <= 0;

  

  return (
    <div className="py-7">
      {event.image && (
        <ImageCard src={event.image.imageUrl} alt={event.title} />
      )}
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
                <p className="mr-2">
                  {event.venue}, {event.location}
                </p>
                <Link
                  href={event.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  maps
                </Link>
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
            <div className="flex items-center text-sm sm:text-base text-gray-600 mt-2 pb-4 border-b-2 border-dashed">
              <TicketIcon className="w-4 h-4 mr-1 text-gray-500" />
              {event.isFree ? <p>Free</p> : <p>Paid</p>}
            </div>
            {!isEventPast && (
              <div>
                <div className="mt-10 text-gray-600">
                  {sortedTicketTypes.map((ticketType) => {
                    const discountedPrice = calculateDiscountedPrice(
                      ticketType.price
                    );
                    return (
                      <div
                        key={ticketType.name}
                        className={`mb-4 p-4 border rounded ${
                          selectedTicketType?.name === ticketType.name
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
                              onChange={() => setSelectedTicketType(ticketType)}
                              checked={selectedTicketType?.name === ticketType.name}
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
                                selectedTicketType.name !== ticketType.name ||
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
                                selectedTicketType.name !== ticketType.name
                              }
                            />
                            <button
                              onClick={() => incrementQuantity(ticketType.name)}
                              className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                              disabled={
                                !selectedTicketType ||
                                selectedTicketType.name !== ticketType.name ||
                                isEventPast
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className=" flex flex-col items-end">
                        {discountedPrice === ticketType.price ? (
                          <p className="text-sm font-semibold sm:text-base text-gray-700">
                            {ticketType.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        ) : (
                          <>
                          <p className="text-sm sm:text-base text-gray-700">
                            <span className="line-through mr-2 text-gray-500">
                            {ticketType.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 2,
                            })}
                            </span>                            
                          </p>
                          <p className="text-sm font-semibold sm:text-base text-gray-700">
                            <span>{discountedPrice.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 2,
                            })}</span>
                          </p>
                          </>                          
                        )}
                        </div>                        
                      </div>
                    );
                  })}
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
              onClick={
                isGetTicketsButtonDisabled || isEventPast
                  ? undefined
                  : openGetTicketModal
              }
              className={`mt-8 w-full px-4 py-2 ${
                isGetTicketsButtonDisabled || isEventPast
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-700"
              } text-white rounded transition text-sm sm:text-base sticky-tickets-button`}
              disabled={isGetTicketsButtonDisabled || isEventPast}
            >
              {isEventPast ? "Sales Ended" : "Get tickets"}
            </button>
            {isGetTicketModalOpen && !isEventPast && (
              <TicketModal
              isOpen={isGetTicketModalOpen}
              onClose={closeGetTicketModal}
              selectedTicketType={selectedTicketType}
              ticketQuantities={ticketQuantities}
              handleQuantityChange={handleQuantityChange}
              handleGetTotalPrice={handleGetTotalPrice}              
              event={event}
            />
            )}
          </div>
        </div>
        {isAuthenticated || isEventPast && (
          <div className="py-8">
            <ReviewForm eventId={event.id} onSubmit={handleReviewSubmit} />
          </div>
        )}
        {isEventPast && (
          <div className="py-8">
            <ReviewList eventId={event.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetail;
