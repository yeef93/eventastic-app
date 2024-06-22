import React from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import EventCard from "@/components/EventCard";

export default function Home() {

  // sample data before integrate
  const events = [
    {
      id: 1,
      title: "Nature Photography Workshop",
      imageUrl: "/images/nature-workshop.jpg",
      dateTime: "Saturday, June 25, 2024 | 10:00 AM - 2:00 PM",
      hostedBy: "Nature Lovers Club",
      totalAttendees: 50,
      maxAttendees:100,
      ticketType: "Free",
    },
    // Add more event objects as needed
  ];


  return <>
  <Hero/>  
  <Categories />
  <div className="flex flex-wrap justify-center gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          imageUrl={event.imageUrl}
          title={event.title}
          dateTime={event.dateTime}
          hostedBy={event.hostedBy}
          totalAttendees={event.totalAttendees}
          maxAttendees={event.maxAttendees}
          ticketType={event.ticketType}
        />
      ))}
    </div>
  </>;
}
