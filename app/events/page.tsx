"use client";

import React, { useState } from "react";
import FilterComponent from "../components/Events/FilterComponent";
import events from "@/utils/events";
import Pagination from "@/components/Pagination";
import EventListCard from "@/components/EventListCard";

function Events() {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
  });

  const filteredEvents = events.filter((event) => {
    const matchesCategory = filters.category
      ? event.category.includes(filters.category)
      : true;
    const matchesLocation = filters.location
      ? event.location.includes(filters.location)
      : true;
    return matchesCategory && matchesLocation;
  });

  // declare for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 1000; // Assuming you have 100 items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <FilterComponent filters={filters} setFilters={setFilters} />
      <div className="flex flex-col justify-center gap-4 md:gap-8 px-2 md:px-4 xl:px-12 py-12">
        {filteredEvents.map((event) => (
          <EventListCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            imageUrl={event.image.imageUrl}
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
    </div>
  );
}

export default Events;
