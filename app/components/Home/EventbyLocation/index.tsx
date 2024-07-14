import React, { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import EventCardSkeleton from "@/components/Skeleton/EventCardSkeleton";

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

const days = ["Weekdays", "Today", "Tomorrow", "This Week", "This Month"];

function EventbyLocation() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState("Weekdays");
  const [selectedLocation, setSelectedLocation] = useState("Any Location");
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([
    "Any Location",
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${apiUrl}/events/upcoming?size=6`;
    console.log("Fetching events from:", url); // Log the URL being fetched
    // Fetch events data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const fetchedEvents = data.data.events;
          setEvents(fetchedEvents);

          const locations = [
            "Any Location",
            ...new Set(fetchedEvents.map((event: Event) => event.location)),
          ];
          setUniqueLocations(locations as string[]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, [apiUrl]);

  const filterEvents = (event: Event) => {
    const now = new Date();
    const eventDate = new Date(event.eventDate);

    // Filter by day
    if (selectedDay === "Today") {
      return eventDate.toDateString() === now.toDateString();
    } else if (selectedDay === "Tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      return eventDate.toDateString() === tomorrow.toDateString();
    } else if (selectedDay === "This Week") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    } else if (selectedDay === "This Month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    }

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
            <h2 className="text-xl md:text-2xl font-bold mb-4 lg:mb-0">
              Events Near
            </h2>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700"
              >
                {uniqueLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm font-semibold text-purple-800 relative w-max link mt-4 lg:mt-0">
            <a href={"/events"}>Explore more events &gt; </a>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-green-400"></span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-2 md:px-4 xl:px-28">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              imageUrl={event.image.imageUrl}
              title={event.title}
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
          <div className="flex flex-col items-center justify-center my-8">
            <p className="text-lg font-semibold text-gray-700">
              Sorry, there are no events results that match these filters.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default EventbyLocation;
