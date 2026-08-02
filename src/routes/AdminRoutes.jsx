import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminNavBar from "../component/AdminNavBar";
import Dashboard from "../pages/admin/DashboardAdmin";
import DataAtraksi from "../pages/admin/DataAtraksi";
import EditWisata from "../component/Admin/Modal/EditWisata";
import Order from "../pages/admin/Order";
import DataTicket from "../pages/admin/Ticket/DataTicket";
import Wisata from "../pages/admin/DataAtraksi/Destination";
import Daerah from "../pages/admin/DataAtraksi/City";
import Aktivitas from "../pages/admin/DataAtraksi/Activity";
import DataUsers from "../pages/admin/Users/DataUsers";

function AdminRoutes() {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/data_atraksi"
          element={
            <PrivateRoute requiredRole="admin">
              <DataAtraksi />
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute requiredRole="admin">
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute requiredRole="admin">
              <DataUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/ticket"
          element={
            <PrivateRoute requiredRole="admin">
              <DataTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-atraksi/wisata"
          element={
            <PrivateRoute requiredRole="admin">
              <Wisata />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-atraksi/daerah"
          element={
            <PrivateRoute requiredRole="admin">
              <Daerah />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-atraksi/aktivitas"
          element={
            <PrivateRoute requiredRole="admin">
              <Aktivitas />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/wisata/:wisataId"
          element={
            <PrivateRoute requiredRole="admin">
              <EditWisata />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
