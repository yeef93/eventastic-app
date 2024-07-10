"use client";
import React, { useState, useEffect } from "react";
import EventListCard from "@/components/EventListCard";
import Pagination from "@/components/Pagination"; // Adjust path as needed

interface Event {
  id: number;
  image: {
    imageUrl: string;
  };
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  location: string;
  availableSeat: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const eventsPerPage = 10; // Number of events to fetch per page

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]); // Fetch events whenever currentPage changes

  const fetchEvents = async (page: number) => {
    setLoading(true);
    const url = `${apiUrl}/events?page=${page}&limit=${eventsPerPage}`;
    console.log("Fetching events from:", url); // Log the URL being fetched
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log("Fetched events data:", data);
      setEvents(data.data.events || []);
      setTotalPages(data.data.totalPages || 1);
      setLoading(false);
    } catch (err: any) {
      console.error("Fetching error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-4 md:gap-8 px-2 md:px-4 xl:px-12 py-12">
      {events.map((event) => (
        <EventListCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          image={event.image}
          eventDate={event.eventDate}
          startTime={event.startTime}
          endTime={event.endTime}
          organizer={event.organizer}
          location={event.location}
          availableSeat={event.availableSeat}
          seatLimit={event.seatLimit}
          isFree={event.isFree}
          ticketTypes={event.ticketTypes}
          category={event.category}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Events;