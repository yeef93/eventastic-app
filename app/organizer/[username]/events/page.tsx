"use client";

import EventTable from "@/app/components/Organizer/EventTable";
import ProtectedLayout from "@/app/components/Organizer/ProtectedLayout";

function Events() {
  return (
    <ProtectedLayout>
      <EventTable />
    </ProtectedLayout>
  );
}

export default Events;
