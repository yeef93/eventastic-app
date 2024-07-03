import React, { useState } from "react";
import events from "@/utils/events";
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
      <div className="px-4 pt-8 xl:px-40 xl:pt-16">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="flex flex-col lg:flex-row">
            <h2 className="text-xl md:text-2xl font-bold mb-4 lg:mb-0">Events Near</h2>
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
          <p className="text-sm font-semibold text-purple-800 relative w-max link">
            <a href={"/events"}>Explore more events &gt; </a>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-green-400"></span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center xl:px-28 xl:gap-8 md:px-4">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            imageUrl={event.imageUrl}
            title={event.title}
            eventDate={event.eventDate}
            startTime={event.startTime}
            endTime={event.endTime}
            organizer={event.organizer}
            location={event.location}
            availableSeat={event.availableSeat}
            seatLimit={event.seatLimit}
            isFree={event.isFree}
            eventCategory={event.eventCategory}
          />
        ))}
      </div>
    </>
  );
}

export default EventbyLocation;
