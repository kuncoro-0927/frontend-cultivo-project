import { Modal, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import instance from "../../../utils/axios";
const TambahWisata = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  // Fetch cities and activities from the backend
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

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGallery(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data
    data.append("name", formData.name);
    data.append("city_id", formData.city_id);
    data.append("activities_id", formData.activities_id);
    data.append("facility", formData.facility);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("address", formData.address);
    data.append("url_gmaps", formData.url_gmaps);

    // Append image and gallery files
    if (image) data.append("image", image);
    gallery.forEach((file) => data.append("gallery", file));

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/cultivo/api/agrotourism",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage("Error uploading data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className=" text-hitam underline" onClick={handleOpen}>
        Tambah Data Wisata
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            margin: 5,
            display: "grid",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "full",
            maxWidth: "full",
            maxHeight: "90vh",
            overflowY: "scroll",
          }}
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Semua Gambar</h2>
              <button onClick={handleClose} className="mt-4 text-3xl">
                <IoClose />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* City Select (Dynamically populated) */}
              <div>
                <label htmlFor="city_id">City</label>
                <select
                  id="city_id"
                  name="city_id"
                  value={formData.city_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activities Select (Dynamically populated) */}
              <div>
                <label htmlFor="activities_id">Activities</label>
                <select
                  id="activities_id"
                  name="activities_id"
                  value={formData.activities_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Activity</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Facility Input */}
              <div>
                <label htmlFor="facility">Facility</label>
                <textarea
                  id="facility"
                  name="facility"
                  value={formData.facility}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Description Input */}
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Price Input */}
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Address Input */}
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* URL Google Maps Input */}
              <div>
                <label htmlFor="url_gmaps">Google Maps URL</label>
                <input
                  type="text"
                  id="url_gmaps"
                  name="url_gmaps"
                  value={formData.url_gmaps}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Image Input */}
              <div>
                <label htmlFor="image">Main Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>

              {/* Gallery Input */}
              <div>
                <label htmlFor="gallery">Gallery Images</label>
                <input
                  type="file"
                  id="gallery"
                  name="gallery"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>

            {/* Message */}
            {message && <div>{message}</div>}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TambahWisata;
