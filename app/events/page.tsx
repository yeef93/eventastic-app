"use client";

import React, { useState, useEffect } from "react";
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
  availableSeat: number;
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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    locations: [],
    prices: [],
  });

  const eventsPerPage = 10;

  useEffect(() => {
    const fetchEvents = async (page: number, filters: Filters) => {
      setLoading(true);

      const categoryFilter = filters.categories.length > 0 ? `&category=${filters.categories.join(",")}` : "";
      const locationFilter = filters.locations.length > 0 ? `&location=${filters.locations.join(",")}` : "";
      const priceFilter = filters.prices.length > 0
        ? filters.prices.includes("Free") && !filters.prices.includes("Paid")
          ? "&isFree=true"
          : filters.prices.includes("Paid") && !filters.prices.includes("Free")
          ? "&isFree=false"
          : ""
        : "";

      const url = `${apiUrl}/events?page=${page - 1}&limit=${eventsPerPage}&order=eventDate&direction=desc${categoryFilter}${locationFilter}${priceFilter}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.data.events || []);
        setTotalPages(data.data.totalPages || 1);

        // Extract categories and locations from fetched events
        const fetchedCategories = Array.from(
          new Set(data.data.events.map((event: Event) => event.category))
        ) as string[];
        const fetchedLocations = Array.from(
          new Set(data.data.events.map((event: Event) => event.location))
        ) as string[];
        setCategories(fetchedCategories);
        setLocations(fetchedLocations);

        setLoading(false);
      } catch (err: any) {
        console.error("Fetching error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents(currentPage, filters);
  }, [apiUrl, currentPage, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      filters.categories.length === 0 || filters.categories.includes(event.category);
    const locationMatch =
      filters.locations.length === 0 || filters.locations.includes(event.location);
    const priceMatch =
      filters.prices.length === 0 ||
      (filters.prices.includes("Free") && event.isFree) ||
      (filters.prices.includes("Paid") && !event.isFree);
    
    return categoryMatch && locationMatch && priceMatch;
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-row px-2 md:px-4 xl:px-12 py-12">
      <div className="w-1/4 sticky top-20 h-screen bg-white p-4">
        <FilterComponent
          categories={categories}
          locations={locations}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div>
        {loading ? (
          Array.from({ length: eventsPerPage }).map((_, index) => (
            <EventListCardSkeleton key={index} />
          ))
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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