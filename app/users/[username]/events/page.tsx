"use client";
import React, { useEffect, useState } from "react";
import ProtectedLayout from "@/app/components/Users/ProtectedLayout";
import { useSession } from "next-auth/react";

// Define the Ticket type
type Ticket = {
  id: number;
  issuedAt: string;
  attendee: string;
  eventTitle: string;
  ticketType: string;
  ticketCode: string;
};

// Define the Events component
function Events() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/me/tickets`, {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage.statusMessage || "Failed to fetch tickets"
          );
        }

        const data = await response.json();
        setTickets(data.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (session) {
      fetchTickets();
    }
  }, [session, apiUrl]);

  // Process tickets to group them by event
  const events = tickets.reduce(
    (acc: { [key: string]: Ticket[] }, ticket: Ticket) => {
      if (!acc[ticket.eventTitle]) {
        acc[ticket.eventTitle] = [];
      }
      acc[ticket.eventTitle].push(ticket);
      return acc;
    },
    {}
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events and Tickets</h1>
      {error && <p className="text-red-500">{error}</p>}
      {Object.keys(events).length > 0 ? (
        Object.keys(events).map((eventTitle) => (
          <div key={eventTitle} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{eventTitle}</h2>
            <ul>
              {events[eventTitle].map((ticket) => (
                <li key={ticket.id} className="mb-2 border p-2 rounded">
                  <p>
                    <strong>Attendee:</strong> {ticket.attendee}
                  </p>
                  <p>
                    <strong>Ticket Type:</strong> {ticket.ticketType}
                  </p>
                  <p>
                    <strong>Ticket Code:</strong> {ticket.ticketCode}
                  </p>
                  <p>
                    <strong>Issued At:</strong>{" "}
                    {new Date(ticket.issuedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
}

export default Events;
