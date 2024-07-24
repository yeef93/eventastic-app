"use client";
import React, { useEffect, useState } from "react";
import ProtectedLayout from "@/app/components/Users/ProtectedLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Pagination from "@/components/Pagination"; // Adjust the import path accordingly
import { usePathname } from "next/navigation";

// Define the Event type
type Event = {
  id: number;
  organizer: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  map: string;
  image: {
    id: number;
    imageName: string;
    imageUrl: string;
  };
  eventDate: string;
  startTime: string;
  endTime: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  referralVoucherUsageLimit: number;
  referralVoucherUsageAvailability: number;
  promoPercent: number;
  promoEndDate: string;
  ticketTypes: {
    id: number;
    name: string;
    description: string;
    price: number;
    seatLimit: number;
    seatAvailability: number;
  }[];
  voucher: {
    id: number;
    code: string;
    description: string;
    awardee: string;
    organizer: string;
    eventTitle: string;
    percentDiscount: number;
    useLimit: number;
    useAvailability: number;
    createdAt: string;
    expiresAt: string;
  }[];
};

type Ticket = {
  id: number;
  issuedAt: string;
  attendee: string;
  eventTitle: string;
  ticketType: string;
  ticketCode: string;
};

// Define the Events component
function Events() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<"upcoming" | "past">("upcoming");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eventsPerPage] = useState<number>(6); // Adjust the number of events per page
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const pathname = usePathname();
  const username = pathname.split("/")[2];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/me/events`, {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage.statusMessage || "Failed to fetch events"
          );
        }

        const data = await response.json();
        setEvents(data.data.events);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (session) {
      fetchEvents();
    }
  }, [session, apiUrl]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/me/tickets`, {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage.statusMessage || "Failed to fetch tickets"
          );
        }

        const data = await response.json();
        setTickets(data.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (session) {
      fetchTickets();
    }
  }, [session, apiUrl]);

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) >= new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.eventDate) < new Date()
  );

  const handleTabChange = (tab: "upcoming" | "past") => {
    setCurrentTab(tab);
    setCurrentPage(1); // Reset to the first page when tab changes
  };

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents =
    currentTab === "upcoming"
      ? upcomingEvents.slice(indexOfFirstEvent, indexOfLastEvent)
      : pastEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Count tickets per event
  const countTicketsForEvent = (eventTitle: string) =>
    tickets.filter((ticket) => ticket.eventTitle === eventTitle).length;

  return (
    <ProtectedLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">My Events</h1>
        <p className="mb-4">Events and Tickets</p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-6">
          <button
            className={`px-4 py-2 mr-2 ${
              currentTab === "upcoming"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`px-4 py-2 ${
              currentTab === "past"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("past")}
          >
            Past Events
          </button>
        </div>
        {currentEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <div
                key={event.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <Link
                  href={`/users/${username}/events/${event.title}`}
                  className="block"
                  target="_self"
                >
                  <div
                    className={`relative w-full h-48 ${
                      currentTab === "past" ? "grayscale" : ""
                    }`}
                  >
                    <Image
                      src={event.image.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover object-center"
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                      <LocationMarkerIcon className="w-4 h-4 inline-block mr-1 text-white" />
                      {event.location}
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{event.title}</div>
                    <div className="flex items-center text-base text-gray-600 mt-2">
                      <UserIcon className="w-4 h-4 mr-1 text-purple-700" />
                      <p>{event.organizer}</p>
                    </div>
                    <div className="flex items-center text-base text-gray-600 mt-2">
                      <CalendarIcon className="w-4 h-4 mr-1 text-purple-700" />
                      <p>{formatDate(event.eventDate)}</p>
                    </div>
                    <div className="flex items-center text-base text-gray-600 mt-2">
                      <ClockIcon className="w-4 h-4 mr-1 text-purple-700" />
                      <p>
                        {formatTime(event.startTime)} -{" "}
                        {formatTime(event.endTime)}
                      </p>
                    </div>
                    <div className="flex items-center text-base text-gray-600 mt-2">
                      <LocationMarkerIcon className="w-4 h-4 mr-1 text-purple-700" />
                      <p>{event.venue} </p>
                    </div>
                    <div className="flex items-center text-base text-gray-600 mt-2">
                      <TicketIcon className="w-4 h-4 mr-1 text-purple-700" />
                      <p>Total Tickets: {countTicketsForEvent(event.title)}</p>

                      <a
                        href={`/users/${username}/events/${event.title}`}
                        rel="noopener noreferrer"
                        className="text-purple-700 underline ml-2"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {event.category}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No events available.</p>
        )}
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              (currentTab === "upcoming"
                ? upcomingEvents.length
                : pastEvents.length) / eventsPerPage
            )}
            onPageChange={paginate}
          />
        </div>
      </div>
    </ProtectedLayout>
  );
}

export default Events;
