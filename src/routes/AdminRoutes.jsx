import { Routes, Route } from "react-router-dom";
import AdminNavBar from "../component/AdminNavBar";
import Dashboard from "../pages/admin/DashboardAdmin";
import DataAtraksi from "../pages/admin/DataAtraksi";
import EditWisata from "../component/Admin/Modal/EditWisata";
import Order from "../pages/admin/Order/Order";
import DataTicket from "../pages/admin/Ticket/DataTicket";
import Wisata from "../pages/admin/DataAtraksi/Wisata";
import Daerah from "../pages/admin/DataAtraksi/Daerah";
import Aktivitas from "../pages/admin/DataAtraksi/Aktivitas";
import DataUsers from "../pages/admin/Users/DataUsers";

function AdminRoutes() {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data_atraksi" element={<DataAtraksi />} />
        <Route path="/order" element={<Order />} />
        <Route path="/users" element={<DataUsers />} />
        <Route path="/ticket" element={<DataTicket />} />
        <Route path="/data-atraksi/wisata" element={<Wisata />} />
        <Route path="/data-atraksi/daerah" element={<Daerah />} />
        <Route path="/data-atraksi/aktivitas" element={<Aktivitas />} />
        <Route path="/edit/wisata/:wisataId" element={<EditWisata />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
