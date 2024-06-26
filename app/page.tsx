import React from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import EventCard from "@/components/EventCard";
import events from "@/utils/event";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <div className="flex flex-wrap justify-center xl:px-28 xl:gap-10 md:px-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            imageUrl={event.imageUrl}
            title={event.title}
            dateTime={event.dateTime}
            hostedBy={event.hostedBy}
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