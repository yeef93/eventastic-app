"use client";
import React, { useState } from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import CallToAction from "@/components/CallToAction";
import EventCreationCTA from "@/components/EventCreationCTA";
import UpcomingEvent from "./components/Home/UpcomingEvent";
import EventbyLocation from "./components/Home/EventbyLocation";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <UpcomingEvent/>
      <CallToAction/>
      <EventbyLocation/>
      <EventCreationCTA/>
    </>
  );
}
