import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

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
  availableSeat: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
}

const EventTable = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://eventastic-ol7zwytd3q-as.a.run.app/api/v1/events/organizer/20");
        const data = await response.json();
        setEvents(data.data.events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id: number) => {
    // Handle edit event logic here
    console.log("Edit event with id:", id);
  };

  const handleDelete = (id: number) => {
    // Handle delete event logic here
    console.log("Delete event with id:", id);
  };

  const handleCreate = () => {
    // Handle create event logic here
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events</h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
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
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event) => (
            <tr key={event.id}>
              <td className="py-2 px-4 border-b">{event.title}</td>
              <td className="py-2 px-4 border-b">{event.description}</td>
              <td className="py-2 px-4 border-b">
                {new Date(event.eventDate).toLocaleDateString()} {event.startTime}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(event.id)}
                  className="text-yellow-500 hover:text-yellow-700 mr-2"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default EventTable;