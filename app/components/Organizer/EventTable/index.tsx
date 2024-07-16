import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import EventTableSkeleton from "@/components/Skeleton/EventTableSkeleton";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Event {
  id: number;
  image: {
    imageUrl: string;
  };
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  location: string;
  seatAvailability: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
}

function EventTable() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {    
    const token = session?.user?.token; // Get token from session
    const decodedToken = jwt.decode(token || "") as JwtPayload | null;
    const username = decodedToken?.sub; // Extract username from token
    console.log(username);
    if (!username) return; // Early return if username is not available
    const url = `${apiUrl}/events?organizer=${username}&order=eventDate&direction=desc`;    
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEvents(data.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiUrl, session]);

  const handleEdit = (id: number) => {
    console.log("Edit event with id:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete event with id:", id);
  };

  const handleCreate = () => {
    router.push(`${pathname}/create`);
    console.log("Create a new event");
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to format date
  const formatDate = (eventDate: string) => {
    const date = new Date(eventDate);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to format time to 12-hour format with AM/PM
  const formatTime = (timeString: string) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events</h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          <PlusIcon className="mr-2 w-5 h-5" />
          Create Event
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Total Attendees</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        {loading ? (
          <EventTableSkeleton />
        ) : (
          <tbody>
            {currentEvents.map((event) => {
              const totalAttendees = event.seatLimit - event.seatAvailability;
              const isEditable = totalAttendees === 0;

              return (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.title}</td>
                  <td className="py-2 px-4 border-b">{event.description}</td>
                  <td className="py-2 px-4 border-b text-nowrap">
                    {formatDate(event.eventDate)}
                  </td>
                  <td className="py-2 px-4 border-b text-nowrap">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {totalAttendees}
                  </td>
                  <td className="py-2 px-4 border-b text-nowrap">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className={`text-yellow-500 hover:text-yellow-700 mr-2 ${!isEditable && "opacity-50 cursor-not-allowed"}`}
                      disabled={!isEditable}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className={`text-red-500 hover:text-red-700 ${!isEditable && "opacity-50 cursor-not-allowed"}`}
                      disabled={!isEditable}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default EventTable;