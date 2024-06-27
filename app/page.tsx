"use client";
import React, { useState } from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import EventCard from "@/components/EventCard";
import events from "@/utils/event";
import CallToAction from "@/components/CallToAction";
import EventCreationCTA from "@/components/EventCreationCTA";

const uniqueCategories = [
  "Any Category",
  ...new Set(events.map((event) => event.category)),
];
const days = ["Weekdays", "Today", "Tomorrow", "This Week", "This Month"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Any Category");
  const [selectedDay, setSelectedDay] = useState("Weekdays");

  const filterEvents = (event: {
    dateTime: string | number | Date;
    category: string;
  }) => {
    const now = new Date();
    const eventDate = new Date(event.dateTime);

    // Filter by category
    if (
      selectedCategory !== "Any Category" &&
      event.category !== selectedCategory
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
      <Hero />
      <Categories />
      <div className="xl:px-40 xl:pt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <div className="flex space-x-4">
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
      <CallToAction/>
      <EventCreationCTA/>
    </>
  );
}
