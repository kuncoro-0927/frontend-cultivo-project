import { useState } from "react";
import { instance } from "../../utils/axios";

function VerifyTicket() {
  const [ticketCode, setTicketCode] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerifyTicket = async () => {
    try {
      const response = await instance.post("/verify-ticket", {
        ticket_code: ticketCode,
      });
      setTicketInfo(response.data);
      setStatusMessage("Ticket is valid");
    } catch (err) {
      setError(err.response.data.error || "An error occurred");
    }
  };

  const handleUseTicket = async () => {
    try {
      const response = await instance.post("/ticket-use", { ticketCode });
      setStatusMessage(response.data.message);
      setTicketInfo((prevState) => ({ ...prevState, status: "used" }));
    } catch (err) {
      setError(err.response.data.error || "An error occurred");
    }
  };

  return (
    <div className="mt-52">
      <h2>Verify Ticket</h2>
      <input
        type="text"
        placeholder="Enter Ticket Code"
        value={ticketCode}
        onChange={(e) => setTicketCode(e.target.value)}
      />
      <button onClick={handleVerifyTicket}>Verify</button>

      {statusMessage && <p>{statusMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {ticketInfo && (
        <div>
          <h3>Ticket Info:</h3>
          <p>
            <strong>Ticket Code:</strong> {ticketInfo.ticket_code}
          </p>
          <p>
            <strong>Ticket Status:</strong> {ticketInfo.ticket_status}
          </p>
          <p>
            <strong>User Name:</strong> {ticketInfo.user_name}
          </p>
          <p>
            <strong>Quantity:</strong> {ticketInfo.quantity}
          </p>
          <p>
            <strong>Agrotourism Name:</strong> {ticketInfo.agrotourism_name}
          </p>
          {ticketInfo.ticket_status === "active" && (
            <button onClick={handleUseTicket}>Use Ticket</button>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyTicket;
