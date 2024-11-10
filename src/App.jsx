import NavBar from "./component/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import Aktivitas from "./pages/Aktivitas";
import Kontak from "./pages/Kontak";
import DaerahWisata from "./pages/DaerahWisata";
import DaerahDetail from "./pages/DaerahDetail";
import WisataDetail from "./pages/WisataDetail";
import Footer from "./component/Footer";
import AddDaerah from "./admin/daerah/addDaerah";
import EditDaerah from "./admin/daerah/EditDaerah";
import DaerahList from "./admin/daerah/DaerahList";
import AddWisata from "./admin/wisata/AddWisata";
import WisataList from "./admin/wisata/WisataList";
import EditWisata from "./admin/wisata/EditWisata";
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
        <Route path="/wisata/daerah/:daerahId" element={<DaerahDetail />} />
        <Route path="/wisata/detail/:id" element={<WisataDetail />} />
        {/* <Route path="/wisata/daerah/:daerahId" element={<DaerahDetail />} /> */}
        <Route path="/adddaerah" element={<AddDaerah />} />
        <Route path="/daerahlist" element={<DaerahList />} />
        <Route path="/editdaerah/:id" element={<EditDaerah />} />
        <Route path="/addwisata" element={<AddWisata />} />
        <Route path="/addwisata/:id" element={<AddWisata />} />
        <Route path="/wisatalist" element={<WisataList />} />
        <Route path="/editwisata/:id" element={<EditWisata />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
