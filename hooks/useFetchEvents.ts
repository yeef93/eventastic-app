import { useState, useEffect } from "react";

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://eventastic-ol7zwytd3q-as.a.run.app/api/v1/events?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data.data.events);
      setTotalPages(data.data.totalPages);
      setCurrentPage(data.data.currentPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  return {
    events,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
  };
};

export default useFetchEvents;