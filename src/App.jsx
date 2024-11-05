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
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aktivitas" element={<Aktivitas />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/seluruhwisata" element={<DaerahWisata />} />
        <Route path="/daerah/:daerahName" element={<DaerahDetail />} />
        <Route path="/wisata/:wisataName" element={<WisataDetail />} />
        <Route path="/wisata/:wisataName" element={<DaerahDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
