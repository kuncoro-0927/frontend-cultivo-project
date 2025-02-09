/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { instance } from "../../../utils/axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function CreateAgrotourismModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    city_id: "",
    activities_id: "",
    description: "",
    price: "",
    address: "",
    url_gmaps: "",
    image: null,
    gallery: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "gallery") {
        Array.from(value).forEach((file) => data.append(key, file));
      } else {
        data.append(key, value);
      }
    });

    try {
      await instance.post("/agrotourism", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Agrotourism berhasil ditambahkan!");
      handleClose();
    } catch (error) {
      console.error("Error creating agrotourism:", error);
      alert("Gagal menambahkan agrotourism.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Tambah Agrotourism
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nama"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="City ID"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Activities ID"
            name="activities_id"
            value={formData.activities_id}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Deskripsi"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Harga"
            name="price"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="URL Google Maps"
            name="url_gmaps"
            value={formData.url_gmaps}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<CloudUpload />}
            sx={{ my: 2 }}
          >
            Upload Image
            <input
              type="file"
              name="image"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<CloudUpload />}
            sx={{ mb: 2 }}
          >
            Upload Gallery
            <input
              type="file"
              name="gallery"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </Button>
          <Box textAlign="right">
            <Button onClick={handleClose} sx={{ mr: 2 }}>
              Batal
            </Button>
            <Button type="submit" variant="contained">
              Simpan
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
