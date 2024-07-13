"use client";
import React, { useState } from "react";
import Hero from "./components/Home/Hero";
import Categories from "./components/Home/Categories";
import CallToAction from "@/app/components/Home/CallToAction";
import EventCreationCTA from "@/app/components/Home/EventCreationCTA";
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
