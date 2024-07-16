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
  seatAvailability: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
}

function UpcomingEvent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Any Category");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>(["Any Category"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all events to populate categories
    const fetchAllEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}/events`);
        const data = await response.json();
        if (data.success) {
          const allEvents: Event[] = data.data.events;
          setEvents(allEvents);
          const categories = ["Any Category", ...new Set(allEvents.map((event) => event.category))];
          setUniqueCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching all events:", error);
      }
    };

    // Fetch upcoming events
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}/events/upcoming?size=6`);
        const data = await response.json();
        if (data.success) {
          setUpcomingEvents(data.data.events);
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
    fetchUpcomingEvents();
  }, [apiUrl]);

  const filterEvents = (event: Event): boolean => {
    const now = new Date();
    const eventDate = new Date(event.eventDate);

    // Filter by category
    if (selectedCategory !== "Any Category" && event.category !== selectedCategory) {
      return false;
    }

    // Check if the event date is in the future
    return eventDate >= now;
  };

  const filteredEvents = upcomingEvents.filter(filterEvents);

  return (
    <>
      <div className="px-4 pt-8 xl:px-40 xl:pt-16">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="flex flex-col lg:flex-row">
            <h2 className="text-xl md:text-2xl font-bold mb-4 lg:mb-0 mr-4">
              Upcoming Events
            </h2>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700"
              >
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
              seatAvailability={event.seatAvailability}
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

export default UpcomingEvent;