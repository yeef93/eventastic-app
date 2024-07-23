"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProtectedLayout from "@/app/components/Users/ProtectedLayout";
import EventDetails from "@/app/components/Users/EventDetails";
import TicketList from "@/app/components/Users/TicketList";
import TabButton from "@/components/TabButton";

interface Ticket {
  id: number;
  issuedAt: string;
  attendee: string;
  eventTitle: string;
  ticketType: string;
  ticketCode: string;
}

interface EventDetail {
  id: number;
  organizer: string;
  imageUrl: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  ticketTypes: Ticket[];
}

function PurchasedEvent() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const title = decodeURIComponent(pathname?.split("/").pop() || ""); // Extract and decode title from the pathname
  const [selectedTab, setSelectedTab] = useState<"details" | "tickets">("details");
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (session) {
      fetchEventDetails();
      fetchTicketList();
    }
  }, [status, session, router, title, apiUrl]);

  const fetchEventDetails = async () => {
    const url = `${apiUrl}/events?title=${encodeURIComponent(title)}`;
    // console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success && data.data.events.length > 0) {
        const event = data.data.events[0];
        setEventDetail({
          id: event.id,
          organizer: event.organizer,
          imageUrl: event.image.imageUrl,
          title: event.title,
          description: event.description,
          location: event.location,
          venue: event.venue,
          eventDate: event.eventDate,
          startTime: event.startTime,
          endTime: event.endTime,
          ticketTypes: event.ticketTypes,
        });
      }
    } catch (error) {
      console.error("Failed to fetch event details:", error);
    }
  };

  const fetchTicketList = async () => {
    const url = `${apiUrl}/users/me/tickets`;
    // console.log(url);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const filteredTickets = data.data.filter(
          (ticket: Ticket) => ticket.eventTitle === title
        );
        setTickets(filteredTickets);
      }
    } catch (error) {
      console.error("Failed to fetch ticket list:", error);
    }
  };

  return (
    <ProtectedLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>
        <p className="mb-4">Events and Tickets</p>

        <div className="border-b border-gray-300 mb-4">
          <div className="flex space-x-4">
            <TabButton
              label="Event Details"
              isActive={selectedTab === "details"}
              onClick={() => setSelectedTab("details")}
            />
            <TabButton
              label="Tickets"
              isActive={selectedTab === "tickets"}
              onClick={() => setSelectedTab("tickets")}
            />
          </div>
        </div>

        {selectedTab === "details" && eventDetail ? (
          <EventDetails event={eventDetail} />
        ) : (
          <TicketList
            tickets={tickets.map((ticket) => ({
              type: ticket.ticketType,
              issuedAt: ticket.issuedAt,
              ticketCode: ticket.ticketCode,
            }))}
          />
        )}
      </div>
    </ProtectedLayout>
  );
}

export default PurchasedEvent;
