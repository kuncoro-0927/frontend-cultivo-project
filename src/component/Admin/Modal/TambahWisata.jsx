import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { IoMdCheckmark } from "react-icons/io";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { instance } from "../../../utils/axios";
const TambahWisata = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageName, setImageName] = useState(null);
  const [galleryName, setGalleryName] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    city_id: "",
    activities_id: "",
    facility: "",
    description: "",
    price: "",
    address: "",
    url_gmaps: "",
  });

  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    data.append("facility", formData.facility);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("address", formData.address);
    data.append("url_gmaps", formData.url_gmaps);

    if (image) data.append("image", image);
    gallery.forEach((file) => data.append("gallery", file));

    try {
      setLoading(true);
      const response = await instance.post("/agrotourism", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage("Error uploading data");
      console.error(error);
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
      <Button
        variant="contained"
        component="span"
        sx={{
          marginBottom: 1,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        onClick={handleOpen}
      >
        + Data Wisata
      </Button>

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
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Tambah Data Wisata</h2>
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
                  label="Fasilitas"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  helperText="Pisahkan dengan koma. Contoh: Wifi, Air, listrik"
                  name="facility"
                  value={formData.facility}
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
                  onClick={handleClose}
                  className="text-red-500  flex items-center gap-2 font-semibold mt-5"
                >
                  <IoClose /> Batal
                </button>
                <button
                  className="text-blue-500 flex items-center gap-2  ml-5 font-semibold mt-5"
                  type="submit "
                  disabled={loading}
                >
                  <IoMdCheckmark /> Simpan
                </button>
              </div>
            </form>

            {message && <div>{message}</div>}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TambahWisata;
