/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { IoMdCheckmark } from "react-icons/io";
import { instance } from "../../../utils/axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { showSnackbar } from "../../../component/CustomSnackbar";
const EditWisata = ({ wisataId }) => {
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    city_id: "",
    activities_id: "",
    include: "",
    exclude: "",
    description: "",
    price: "",
    address: "",
    url_gmaps: "",
  });
  const [imageName, setImageName] = useState(null);
  const [galleryName, setGalleryName] = useState([]);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Fetch cities and activities
  useEffect(() => {
    const fetchCitiesAndActivities = async () => {
      try {
        const cityResponse = await instance.get("/daerah");
        const activityResponse = await instance.get("/aktivitas");
        setCities(cityResponse.data.data);
        setActivities(activityResponse.data.data);
      } catch (error) {
        console.error("Error fetching cities or activities:", error);
      }
    };
    fetchCitiesAndActivities();
  }, []);

  // Fetch wisata data based on wisataId when modal is opened
  useEffect(() => {
    if (wisataId) {
      const fetchWisataData = async () => {
        try {
          const response = await instance.get(`/agrotourism/${wisataId}`);
          const wisataData = response.data.data[0]; // Ambil objek pertama jika response berupa array

          const validCityId = cities.some(
            (city) => city.id === wisataData.city_id
          )
            ? wisataData.city_id
            : "";
          // Pastikan nilai default tidak undefined
          setFormData({
            name: wisataData.name || "",
            city_id: validCityId || "",
            activities_id: wisataData.activities_id || "",
            include: wisataData.include || "",
            exclude: wisataData.exclude || "",
            description: wisataData.description || "",
            price: wisataData.price || "",
            address: wisataData.address || "",
            url_gmaps: wisataData.url_gmaps || "",
          });

          setOpen(true); // Buka modal setelah data terisi
        } catch (error) {
          console.error("Error fetching wisata data:", error);
        }
      };

      fetchWisataData();
    }
  }, [wisataId, cities]); // Trigger fetching when wisataId changes
  // Trigger fetching only when wisataId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery(files);
    setGalleryName(files.map((file) => file.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("city_id", formData.city_id);
    data.append("activities_id", formData.activities_id);
    data.append("include", formData.include);
    data.append("exclude", formData.exclude);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("address", formData.address);
    data.append("url_gmaps", formData.url_gmaps);
    if (image) data.append("image", image);
    gallery.forEach((file) => data.append("gallery", file));

    try {
      setLoading(true);
      const response = await instance.put(`/agrotourism/${wisataId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSnackbar(response.data.msg, "success");
      showSnackbar(response.data.msg);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Terjadi kesalahan saat memperbarui data";
      setMessage(errorMessage);
      showSnackbar(errorMessage, "error"); // Tampilkan snackbar gagal
    } finally {
      setLoading(false);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
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
            p: 4,
            borderRadius: 2,
            width: "500px",
            maxWidth: "100%",
            maxHeight: "90vh",
            overflowY: "scroll",
          }}
        >
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit Data Wisata</h2>
              <button onClick={handleClose} className=" text-3xl">
                <IoClose />
              </button>
            </div>
            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <div>
                <TextField
                  fullWidth
                  label="Nama Wisata"
                  variant="outlined"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
              </div>

              <div className="mt-3">
                <TextField
                  select
                  label="Kota"
                  name="city_id"
                  value={formData.city_id}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  size="small"
                >
                  <MenuItem value="">Select City</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="mt-3">
                <FormControl className="mt-3" fullWidth>
                  <FormLabel>Aktivitas</FormLabel>
                  <RadioGroup
                    name="activities_id"
                    value={formData.activities_id}
                    onChange={handleInputChange}
                    row
                  >
                    {activities.map((activity) => (
                      <FormControlLabel
                        key={activity.id}
                        value={activity.id}
                        control={<Radio />}
                        label={activity.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="mt-4">
                <TextField
                  label="Include"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  helperText="Pisahkan dengan koma. Contoh: Wifi, Air, listrik"
                  name="include"
                  value={formData.include}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
              </div>
              <div className="mt-4">
                <TextField
                  label="Exclude"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  helperText="Pisahkan dengan koma. Contoh: Wifi, Air, listrik"
                  name="exclude"
                  value={formData.exclude}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
              </div>

              <div className="mt-4">
                <TextField
                  label="Deskripsi"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={4}
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mt-4">
                <TextField
                  label="Harga"
                  variant="outlined"
                  type="text"
                  fullWidth
                  helperText="Contoh: 10000 untuk 10 Ribu"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
              </div>

              <div className="mt-4">
                <TextField
                  label="Alamat Lengkap"
                  variant="outlined"
                  type="text"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
              </div>

              <div className="mt-4">
                <TextField
                  label="URL Google Maps"
                  variant="outlined"
                  type="text"
                  fullWidth
                  name="url_gmaps"
                  value={formData.url_gmaps}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
              </div>

              <div>
                <h1 className="font-medium text-base mb-2 text-gray-700">
                  Gambar Utama
                </h1>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Unggah Gambar
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>
                {imageName && (
                  <div style={{ color: "gray", fontSize: "14px" }}>
                    File yang dipilih: {imageName}
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-medium mb-2 text-base text-gray-700">
                  Galeri
                </h1>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Unggah Galeri
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleGalleryChange}
                    multiple
                  />
                </Button>
                {Array.isArray(galleryName) && galleryName.length > 0 && (
                  <div style={{ color: "gray" }}>
                    {galleryName.map((name, index) => (
                      <div key={index}>File Selected: {name}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-end flex items-center justify-end">
                <button
                  className="text-blue-500 flex items-center gap-2  ml-5 font-semibold mt-5"
                  type="submit "
                  disabled={loading}
                >
                  <IoMdCheckmark /> Simpan
                </button>
              </div>
            </form>
            {/* <button
              onClick={handleClose}
              className="text-red-500  flex items-center gap-2 font-semibold mt-5"
            >
              <IoClose /> Batal
            </button> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditWisata;
