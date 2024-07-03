"use client";

import React, { useState } from "react";
import FilterSidebar from "../components/Events/FilterSidebar";
import EventCard from "@/components/EventCard";
import events from "@/utils/events";
import Pagination from "@/components/Pagination";

function Events() {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
  });

  const filteredEvents = events.filter((event) => {
    const matchesCategory = filters.category
      ? event.eventCategory.includes(filters.category)
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
    // Handle data fetching or state updates here based on the new page
  };

  return (
    <div className="flex">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-2 md:px-4 xl:px-6 py-8">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            imageUrl={event.imageUrl}
            dateTime={event.dateTime}
            organizer={event.organizer}
            location={event.location}
            availableSeat={event.availableSeat}
            seatLimit={event.seatLimit}
            isFree={event.isFree}
            eventCategory={event.eventCategory}
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
