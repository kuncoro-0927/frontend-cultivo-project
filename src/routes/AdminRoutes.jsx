import { Routes, Route } from "react-router-dom";
import AdminNavBar from "../component/AdminNavBar";
import Dashboard from "../pages/admin/DashboardAdmin";
import DataAtraksi from "../pages/admin/DataAtraksi";
import EditWisata from "../component/Admin/Modal/EditWisata";
//import Dashboard from "../pages/admin/DashboardAdmin";
function AdminRoutes() {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data_atraksi" element={<DataAtraksi />} />
        <Route path="/edit/wisata/:selectedRowId" element={<EditWisata />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
