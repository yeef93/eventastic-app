"use client";

import React, { useState } from "react";
import FilterSidebar from "../components/Events/FilterSidebar";
import EventCard from "@/components/EventCard";
import events from "@/utils/events";

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
            hostedBy={event.hostedBy}
            location={event.location}
            totalAttendees={event.totalAttendees}
            maxAttendees={event.maxAttendees}
            ticketType={event.ticketType}
            category={event.category}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;
