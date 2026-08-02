import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";
export function useBookings() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTickets = async () => {
    try {
      const response = await instance.get("/ticket/user");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return { tickets, loading };
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};
