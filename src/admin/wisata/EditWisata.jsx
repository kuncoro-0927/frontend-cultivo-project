/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditWisata = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");
  const [facility, setFacility] = useState("");
  const [price, setPrice] = useState("");
  const [daerahId, setDaerahId] = useState(""); // Untuk memilih daerah_id
  const [daerahList, setDaerahList] = useState([]); // Menyimpan daftar daerah
  const [image, setImage] = useState(""); // Untuk image (gambar utama)
  const [gallery, setGallery] = useState([]);
  const [previewImage, setPreviewImage] = useState(""); // Preview untuk image
  const [previewAllImages, setPreviewAllImages] = useState([]);
  const { id } = useParams(); // ID wisata yang ingin diedit
  const navigate = useNavigate();

  // Base URL untuk gambar
  const imageBaseURL = "http://localhost:5000/images/";

  useEffect(() => {
    getDaerahList();
    getWisataById();
  }, []);

  // Fetch daftar daerah
  const getDaerahList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/daerah");
      setDaerahList(response.data);
    } catch (error) {
      console.error("Error fetching daerah list", error);
    }
  };

  // Fetch data wisata berdasarkan ID
  const getWisataById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/wisata/${id}`);
      const data = response.data;

      setName(data.name);
      setDetail(data.detail);
      setDescription(data.description);
      setFacility(data.facility);
      setPrice(data.price);
      setDaerahId(data.daerah_id); // Set daerah_id yang sudah ada
      setImage(data.image); // Set image yang sudah ada

      if (data.image) {
        setPreviewImage(imageBaseURL + data.image); // Gabungkan base URL dengan nama file
      }

      if (data.gallery) {
        const imagesArray = data.gallery.split(", ");
        setGallery(imagesArray); //
        setPreviewAllImages(imagesArray.map((img) => imageBaseURL + img));
      }
    } catch (error) {
      console.error("Error fetching wisata data", error);
    }
  };

  // Handle image upload (image utama)
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Ambil file pertama
    if (file) {
      setImage(file); // Update file yang di-upload
      setPreviewImage(URL.createObjectURL(file)); // Menampilkan preview gambar baru
    }
  };

  const handleAllImagesChange = (e) => {
    const files = e.target.files;
    setGallery(files);
    const previewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewAllImages(previewUrls); // Menampilkan preview untuk gambar-gambar tambahan
  };

  // Handle form submit (update wisata)
  const updateWisata = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append data lainnya
    formData.append("name", name);
    formData.append("detail", detail);
    formData.append("description", description);
    formData.append("facility", facility);
    formData.append("price", price);
    formData.append("daerah_id", daerahId);

    // Jika ada gambar utama
    if (image) {
      formData.append("image", image);
    }

    if (gallery.length > 0) {
      Array.from(gallery).forEach((file) => {
        formData.append("gallery", file);
      });
    }

    try {
      await axios.patch(`http://localhost:5000/wisata/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Pastikan header ini diatur
        },
      });
      navigate("/wisatalist");
    } catch (error) {
      console.error("Error updating wisata", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Edit Data Wisata
        </h2>

        <form onSubmit={updateWisata}>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Detail Input */}
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-700"
            >
              Detail
            </label>
            <input
              type="text"
              id="detail"
              name="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Facility Input */}
          <div className="mb-4">
            <label
              htmlFor="facility"
              className="block text-sm font-medium text-gray-700"
            >
              Facility
            </label>
            <input
              type="text"
              id="facility"
              name="facility"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Daerah (Daerah_ID) Select */}
          <div className="mb-4">
            <label
              htmlFor="daerah_id"
              className="block text-sm font-medium text-gray-700"
            >
              Select Daerah
            </label>
            <select
              id="daerah_id"
              name="daerah_id"
              value={daerahId}
              onChange={(e) => setDaerahId(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Daerah --</option>
              {daerahList.map((daerah) => (
                <option key={daerah.id} value={daerah.id}>
                  {daerah.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload (Gambar Utama) */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image (Gambar Utama)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>

          {/* All Images Upload */}
          <div className="mb-4">
            <label
              htmlFor="gallery"
              className="block text-sm font-medium text-gray-700"
            >
              All Images (Beberapa Gambar)
            </label>
            <input
              type="file"
              id="gallery"
              name="gallery"
              multiple
              onChange={handleAllImagesChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewAllImages.length > 0 && (
              <div className="mt-2">
                {previewAllImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 mr-2 rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWisata;
