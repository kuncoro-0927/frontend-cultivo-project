import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WisataList = () => {
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteWisata = async (wisataId) => {
    try {
      await axios.delete(`http://localhost:5000/wisata/${wisataId}`);
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch data wisata dari API
  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const response = await axios.get("http://localhost:5000/wisata");
        setWisata(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchWisata();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Daftar Wisata</h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">No</th>
              <th className="py-2 px-4 border-b text-left">Nama Wisata</th>
              <th className="py-2 px-4 border-b text-left">Daerah</th>
              <th className="py-2 px-4 border-b text-left">Harga</th>
              <th className="py-2 px-4 border-b text-left">Fasilitas</th>
              <th className="py-2 px-4 border-b text-left">Gambar Utama</th>
              <th className="py-2 px-4 border-b text-left">Gambar Lainnya</th>
              <th className="py-2 px-4 border-b text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wisata.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.daerah.name}</td>
                <td className="py-2 px-4 border-b">{item.price}</td>
                <td className="py-2 px-4 border-b">{item.facility}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    // Gambar Utama
                    src={`http://localhost:5000/images/${item.image}`} // Pastikan gambar utama menggunakan URL lengkap
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {/* Gambar Lainnya */}
                  <div className="grid grid-cols-2 gap-2">
                    {item.gallery.split(", ").map((image, idx) => (
                      <img
                        key={idx}
                        // Gambar Lainnya
                        src={`http://localhost:5000/images/${image}`} // Pastikan gambar tambahan juga menggunakan URL lengkap
                        alt={`additional ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/editwisata/${item.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteWisata(item.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <Link
            to="/addwisata"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Tambah Wisata
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WisataList;
