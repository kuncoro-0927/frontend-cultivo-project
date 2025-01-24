/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { instance } from "../utils/axios";
import { IoClose } from "react-icons/io5";
import { Modal, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-d
import { TextField } from "@mui/material";

export default function ModalSearch({ isOpen, handleClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [agrotourismList, setAgrotourismList] = useState([]);
  const [filteredAgrotourism, setFilteredAgrotourism] = useState([]);
  const [regions, setRegions] = useState([]); // State for regions
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch agrotourism data and regions from API
  useEffect(() => {
    if (isOpen) {
      const fetchRegions = async () => {
        try {
          const response = await instance.get("/daerah"); // API endpoint for regions
          setRegions(response.data.data); // Save regions to state
        } catch (error) {
          console.error("Error fetching regions data", error);
        }
      };

      const fetchAgrotourismData = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/agrotourism");
          setAgrotourismList(response.data.data);
          setFilteredAgrotourism(response.data.data);
        } catch (error) {
          console.error("Error fetching agrotourism data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRegions();
      fetchAgrotourismData();
    }
  }, [isOpen]);

  // Filter agrotourism based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAgrotourism(agrotourismList);
    } else {
      setFilteredAgrotourism(
        agrotourismList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, agrotourismList]);

  // Navigate to the detail page of the selected agrotourism
  const handleSelect = (item) => {
    onSelect(item); // Call the onSelect callback
    navigate(`/wisata/detail/${item.id}`); // Navigate to the detail page
    handleClose(); // Close the modal after selection
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 5,
          width: { xs: "350px", sm: "550px" },
          maxWidth: "100%",
          maxHeight: { xs: "70vh", md: "90vh" },
        }}
      >
        <div className="p-5 md:p-7 h-screen">
          <div className="flex mb-4 items-center gap-10">
            <div className="w-full">
              <TextField
                fullWidth
                label="Cari Agrotourism"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black !important", // Mengatur warna teks input menjadi hitam
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important", // Mengatur warna border menjadi hitam
                  },
                  "& .MuiInputLabel-root": {
                    color: "black !important", // Mengatur warna label menjadi hitam
                    fontSize: { xs: "0.875rem", md: "0.9rem" },
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black !important", // Menghindari label berwarna biru saat fokus
                  },
                }}
              />
            </div>
            <button onClick={handleClose} className="text-2xl ml-auto ">
              <IoClose />
            </button>
          </div>

          {/* Tampilkan daftar daerah sebelum pencarian */}
          {/* Tampilkan daftar daerah hanya jika searchTerm kosong */}
          {searchTerm === "" && !loading ? (
            <>
              <p className="font-bold mb-4 col-span-2">
                {" "}
                {/* col-span-2 untuk membuat teks lebar sesuai dengan kolom grid */}
                Temukan destinasi agrowisata anda di:
              </p>
              <ul className="max-h-[320px] text-hitam2 grid md:grid-cols-2 overflow-y-auto">
                {regions.map((region) => (
                  <li
                    key={region.id} // Pastikan key menggunakan id unik dari region
                    className="p-2 items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      // handle region selection if needed
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={region.url}
                        className="w-16 h-16 object-cover rounded-md"
                        alt=""
                      />
                      <div className="">
                        <p className="font-bold">{region.name}</p>
                        <p className="font-medium text-sm">
                          {" "}
                          {region.provinces}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            // Tampilkan agrotourism hasil pencarian
            <>
              {loading ? (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <p className="font-bold mb-4 col-span-2">
                    {" "}
                    {/* col-span-2 untuk membuat teks lebar sesuai dengan kolom grid */}
                    Pilih tujuan destinasi Agrowisata Anda
                  </p>
                  <ul className="max-h-[450px] md:max-h-[350px] text-hitam2 overflow-y-auto">
                    {filteredAgrotourism.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelect(item)} // Use handleSelect to navigate and close modal
                        className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={item.url_image}
                          className="w-10 rounded-md h-10 object-cover"
                          alt=""
                        />
                        <div className="">
                          <p className="font-bold">{item.name}</p>
                          <p className="font-medium text-sm">
                            {" "}
                            {item.city_name}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
}
