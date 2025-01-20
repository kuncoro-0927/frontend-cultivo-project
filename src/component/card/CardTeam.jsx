/* eslint-disable react/prop-types */

export default function CardTeam({ title, img, role }) {
  return (
    <div className="relative w-[220px] h-[270px] rounded-lg overflow-hidden shadow-lg group">
      {/* Gambar */}
      <img src={img} alt={title} className="w-full h-full object-cover" />

      {/* Overlay Info */}
      <div className="absolute bottom-0 left-0 w-full  p-2">
        <div className="relative p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-black font-bold text-sm">{title}</h2>
          <p className="text-gray-600 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
