import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWisata = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");
  const [facility, setFacility] = useState("");
  const [price, setPrice] = useState("");
  const [daerahId, setDaerahId] = useState("");
  const [facilitiesArray, setFacilitiesArray] = useState([]);
  const [mainImage, setMainImage] = useState(null); // Gambar utama
  const [gallery, setGallery] = useState([]); // Semua gambar
  const [previewMainImage, setPreviewMainImage] = useState(""); // Preview gambar utama
  const [daerahList, setDaerahList] = useState([]); // Menyimpan daftar daerah
  const navigate = useNavigate();

  // Ambil daftar daerah dari API
  useEffect(() => {
    const fetchDaerah = async () => {
      try {
        const response = await axios.get("http://localhost:5000/daerah");
        setDaerahList(response.data);
      } catch (error) {
        console.error("Error fetching daerah data", error);
      }
    };

    fetchDaerah();
  }, []);

  // Menghandle input fasilitas
  const handleFacilities = (e) => {
    const facilitiesInput = e.target.value;
    setFacility(facilitiesInput);
    setFacilitiesArray(
      facilitiesInput.split(",").map((facility) => facility.trim())
    );
  };

  // Memilih gambar utama
  const loadMainImage = (e) => {
    const image = e.target.files[0];
    setMainImage(image);
    setPreviewMainImage(URL.createObjectURL(image));
  };

  // Memilih gambar untuk gallery
  const loadAllImages = (e) => {
    const images = Array.from(e.target.files); // Pastikan ini mengubah file menjadi array
    setGallery(images);
  };

  const saveWisata = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("detail", detail);
    formData.append("description", description);
    formData.append("facility", facilitiesArray.join(","));
    formData.append("price", price);
    formData.append("daerah_id", daerahId);

    // Menambahkan gambar utama
    if (mainImage) {
      formData.append("image", mainImage);
    }

    // Menambahkan gambar tambahan (gallery)
    gallery.forEach((image) => {
      formData.append("gallery", image);
    });

    try {
      await axios.post("http://localhost:5000/wisata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/wisatalist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Tambah Data Wisata
        </h2>

        <form onSubmit={saveWisata}>
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
              required
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
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              onChange={handleFacilities}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter facilities separated by commas"
              required
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
              required
            />
          </div>

          {/* Daerah Select Input */}
          <div className="mb-4">
            <label
              htmlFor="daerah_id"
              className="block text-sm font-medium text-gray-700"
            >
              Daerah
            </label>
            <select
              id="daerah_id"
              name="daerah_id"
              value={daerahId}
              onChange={(e) => setDaerahId(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Daerah</option>
              {daerahList.map((daerah) => (
                <option key={daerah.id} value={daerah.id}>
                  {daerah.name}
                </option>
              ))}
            </select>
          </div>

          {/* Main Image Input */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Main Image
            </label>
            <input
              type="file"
              onChange={loadMainImage}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {previewMainImage && (
              <div className="mt-2">
                <h4>Preview Main Image:</h4>
                <img
                  src={previewMainImage}
                  alt="Main Image Preview"
                  className="mt-2 w-1/3 rounded-md"
                />
              </div>
            )}
          </div>

          {/* All Images Input (Multiple) */}
          <div className="mb-4">
            <label
              htmlFor="gallery"
              className="block text-sm font-medium text-gray-700"
            >
              All Images
            </label>
            <input
              type="file"
              multiple
              onChange={loadAllImages}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWisata;
