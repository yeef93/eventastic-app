"use client";

import CreateEventForm from "@/app/components/Organizer/CreateEventForm";
import ProtectedLayout from "@/app/components/Organizer/ProtectedLayout";

function Edit() {
  <ProtectedLayout>
    <CreateEventForm />
  </ProtectedLayout>;
}

export default Edit;
