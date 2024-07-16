"use client";

import CreateEventForm from "@/app/components/Organizer/CreateEventForm";
import ProtectedLayout from "@/app/components/Organizer/ProtectedLayout";

function Create() {
  return (
    <ProtectedLayout>
      <CreateEventForm />
    </ProtectedLayout>
  );
}

export default Create;
