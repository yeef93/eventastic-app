"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EventTable from "@/app/components/Organizer/EventTable";

function Events() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {

    return (
      <div className=" h-fit">
        <EventTable />
      </div>
    );
  }

  return null;
}

export default Events;
