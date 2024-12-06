import DashboardAttendant from "../pages/Attendant/DashboardAttendant";
import NavBar from "../component/NavBar";
import VerifyTicket from "../pages/Attendant/TesTicket";
import { Routes, Route } from "react-router-dom";
function AttendantRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<DashboardAttendant />} />
        <Route path="/tiket" element={<VerifyTicket />} />
      </Routes>
    </>
  );
}

export default AttendantRoutes;
