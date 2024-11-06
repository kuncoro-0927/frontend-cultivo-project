import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const DaerahList = () => {
  const [daerah, setDaerah] = useState([]);

  useEffect(() => {
    getDaerah();
  }, []);
  const getDaerah = async () => {
    const response = await axios.get("http://localhost:5000/daerah");
    setDaerah(response.data);
  };

  const deleteDaerah = async (daerahId) => {
    try {
      await axios.delete(`http://localhost:5000/daerah/${daerahId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-20">
      <Link to="/adddaerah"> tambah daerah</Link>
      <h1 className="text-2xl font-semibold mb-4">Daftar Daerah</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {daerah.map((daerah) => (
          <div
            key={daerah.id}
            className="bg-white border rounded-lg shadow-md overflow-hidden"
          >
            <img
              className="w-full h-40 object-cover"
              src={daerah.url}
              alt={daerah.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{daerah.name}</h2>
              <div className="flex justify-between mt-2">
                <Link
                  to={`/editdaerah/${daerah.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteDaerah(daerah.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaerahList;
