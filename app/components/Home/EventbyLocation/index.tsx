import React, { useState } from "react";
import events from "@/utils/event";
import EventCard from "@/components/EventCard";

const uniqueLocations = [
  "Any Location",
  ...new Set(events.map((event) => event.location)),
];

function EventbyLocation() {
  const [selectedLocation, setSelectedLocation] = useState("Any Location");

  const filterEvents = (event: { location: string }) => {
    // Filter by location
    if (
      selectedLocation !== "Any Location" &&
      event.location !== selectedLocation
    ) {
      return false;
    }
    return true;
  };

  const filteredEvents = events.filter(filterEvents);

  return (
    <>
      <div className="xl:px-40 xl:pt-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-row">
            <h2 className="text-2xl font-bold">Events Near</h2>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 ml-4"
            >
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>Explore more events &gt; </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center xl:px-28 xl:gap-8 md:px-4">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            imageUrl={event.imageUrl}
            title={event.title}
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
    </>
  );
}

export default EventbyLocation;
