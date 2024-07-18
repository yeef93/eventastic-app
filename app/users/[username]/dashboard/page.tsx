"use client";

import ProtectedLayout from "@/app/components/Users/ProtectedLayout";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Dashboard() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [points, setPoints] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/me/points`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch points");
        }
        const data = await response.json();
        setPoints(data.data.points);
      } catch (err: any) {
        console.error("Fetching points error:", err);
        setError(err.message);
      }
    };

    const fetchTickets = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/me/tickets`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTotalTickets(data.data.length);
        const eventTitles = new Set(
          data.data.map((ticket: any) => ticket.eventTitle)
        );
        setTotalEvents(eventTitles.size);
      } catch (err: any) {
        console.error("Fetching tickets error:", err);
        setError(err.message);
      }
    };

    fetchPoints();
    fetchTickets();
  }, [apiUrl]);

  const formatPoints = (points: number) => {
    return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 2 }).format(
      points
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProtectedLayout>
      <div>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
              <CurrencyDollarIcon className="w-6 h-6 mr-1 text-yellow-500"></CurrencyDollarIcon>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white">Points</p>
              <p className="text-lg font-semibold text-white">Rp. {formatPoints(points)}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-purple-500 bg-blue-100 rounded-full">
              <CalendarIcon className="w-6 h-6 mr-1 text-purple-500"></CalendarIcon>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white">
                Total Events
              </p>
              <p className="text-lg font-semibold text-white">{totalEvents}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-emerald-500 to-lime-600 rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
              <TicketIcon className="w-6 h-6 mr-1 text-green-500"></TicketIcon>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white">
                Total Tickets
              </p>
              <p className="text-lg font-semibold text-white">{totalTickets}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

export default Dashboard;
