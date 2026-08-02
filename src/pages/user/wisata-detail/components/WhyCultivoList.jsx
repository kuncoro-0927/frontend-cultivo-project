import { FaCheck } from "react-icons/fa";

const reasons = [
  "Pengalaman yang unik",
  "Edukasi & Rekreasi",
  "Tiket Mudah & Terjangkau",
  "Dukung UMKM Lokal",
  "Agrowisata Ramah Lingkungan",
];

const WhyCultivoList = () => {
  return (
    <div className="mt-10 mb-5 lg:mt-10">
      <h1 className="font-semibold text-lg">Mengapa Cultivo?</h1>
      <div className="space-y-3 mt-5">
        {reasons.map((reason) => (
          <p key={reason} className="flex items-center gap-2">
            <FaCheck /> {reason}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WhyCultivoList;
