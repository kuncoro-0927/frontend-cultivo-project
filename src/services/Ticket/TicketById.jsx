import { instance } from "../../utils/axios";

export const fetchUserTickets = async () => {
  try {
    const response = await instance.get("/ticket/user");
    return response.data.tickets;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    throw error;
  }
};
