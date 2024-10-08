"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventListCard from "@/components/EventListCard";
import EventListCardSkeleton from "@/components/Skeleton/EventListCardSkeleton";
import Pagination from "@/components/Pagination";
import FilterComponent from "../components/Events/FilterComponent";

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
  seatAvailability: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
}

interface Filters {
  categories: string[];
  locations: string[];
  prices: string[];
}

function Events() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    locations: [],
    prices: [],
  });

  const eventsPerPage = 10;

  // Set initial filters based on URL search parameters on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const category = searchParams.get("category");
      if (category) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          categories: [category],
        }));
      }
    }
  }, []);

  useEffect(() => {
    // Fetch events only after a delay to ensure filters are set
    const delayFetch = setTimeout(() => {
      const fetchEvents = async (page: number, filters: Filters) => {
        setLoading(true);

        const categoryFilter =
          filters.categories.length > 0
            ? `&category=${filters.categories.join(",")}`
            : "";
        const locationFilter =
          filters.locations.length > 0
            ? `&location=${filters.locations.join(",")}`
            : "";
        const priceFilter =
          filters.prices.length > 0
            ? filters.prices.includes("Free") &&
              !filters.prices.includes("Paid")
              ? "&isFree=true"
              : filters.prices.includes("Paid") &&
                !filters.prices.includes("Free")
              ? "&isFree=false"
              : ""
            : "";

        const url = `${apiUrl}/events?page=${
          page - 1
        }&limit=${eventsPerPage}&order=eventDate&direction=desc${categoryFilter}${locationFilter}${priceFilter}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          const data = await response.json();
          setEvents(data.data.events || []);
          setTotalPages(data.data.totalPages || 1);
          setLoading(false);
        } catch (err: any) {
          console.error("Fetching events error:", err);
          setError(err.message || "An unknown error occurred");
          setLoading(false);
        }
      };

      fetchEvents(currentPage, filters);
    }, 500); // 500ms delay to ensure filters are set

    return () => clearTimeout(delayFetch);
  }, [apiUrl, currentPage, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ categories: [], locations: [], prices: [] });
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="flex flex-col md:flex-row px-2 md:px-4 xl:px-12 py-12">
        {/* {error} */}
        <div className="w-full md:w-1/4 md:sticky md:top-20 h-auto bg-white p-4">
          <FilterComponent
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            initialFilters={filters}
          />
        </div>
        <div className="w-full md:w-3/4 mt-4 md:mt-0 text-center">
          <div className=" text-sm py-8">Sorry, there are no event results that match these filters.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row px-2 md:px-4 xl:px-12 py-12">
      <div className="w-full md:w-1/4 md:sticky md:top-20 h-auto bg-white p-4">
        <FilterComponent
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          initialFilters={filters}
        />
      </div>
      <div className="w-full md:w-3/4 mt-4 md:mt-0">
        {loading ? (
          Array.from({ length: eventsPerPage }).map((_, index) => (
            <EventListCardSkeleton key={index} />
          ))
        ) : events.length > 0 ? (
          events.map((event) => (
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
              seatAvailability={event.seatAvailability}
              seatLimit={event.seatLimit}
              isFree={event.isFree}
              ticketTypes={event.ticketTypes}
              category={event.category}
            />
          ))
        ) : (
          <div>Sorry, there are no event results that match these filters.</div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Events;
