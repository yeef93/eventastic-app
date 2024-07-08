import React, { useState } from "react";
import events from "@/utils/events";
import EventCard from "@/components/EventCard";

const uniqueCategories = [
  "Any Category",
  ...new Set(events.map((event) => event.eventCategory)),
];
const days = ["Weekdays", "Today", "Tomorrow", "This Week", "This Month"];

function UpcomingEvent() {
  const [selectedCategory, setSelectedCategory] = useState("Any Category");
  const [selectedDay, setSelectedDay] = useState("Weekdays");

  const filterEvents = (event: {
    eventDate: string | number | Date;
    eventCategory: string;
  }) => {
    const now = new Date();
    const eventDate = new Date(event.eventDate);

    // Filter by category
    if (
      selectedCategory !== "Any Category" &&
      event.eventCategory !== selectedCategory
    ) {
      return false;
    }

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

    return true;
  };

  const filteredEvents = events.filter(filterEvents);
  return (
    <>
      <div className="px-4 pt-8 xl:px-40 xl:pt-16">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="flex flex-col lg:flex-row">
            <h2 className="text-xl md:text-2xl font-bold mb-4 lg:mb-0">
              Upcoming Events
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
            ticketTypes={event.ticketTypes}
            eventCategory={event.eventCategory}
          />
        ))}
      </div>
    </>
  );
}

export default UpcomingEvent;
