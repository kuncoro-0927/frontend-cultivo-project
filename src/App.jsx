import NavBar from "./component/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import Aktivitas from "./pages/Aktivitas";
import Kontak from "./pages/Kontak";
import DaerahWisata from "./pages/DaerahWisata";
import DaerahDetail from "./pages/DaerahDetail";
import WisataDetail from "./pages/WisataDetail";
import Footer from "./component/Footer";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Review from "./component/Review";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";
import Dashboard from "./pages/admin/DashboardAdmin";
import AdminNavBar from "./component/AdminNavBar";
import DataAtraksi from "./pages/admin/DataAtraksi";
function App() {
  const { user } = useAuth();
  return (
    <>
      {user?.role === "admin" ? <AdminNavBar /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aktivitas" element={<Aktivitas />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/seluruhwisata" element={<DaerahWisata />} />
        <Route path="/wisata/daerah/:daerahId" element={<DaerahDetail />} />
        <Route path="/wisata/detail/:id" element={<WisataDetail />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private route untuk admin */}
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
