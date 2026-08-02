const MobileBookingBar = ({ price, onBookClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 flex justify-between items-center z-10 lg:hidden md:hidden">
      <div className="text-sm">
        Mulai dari
        <div className="text-lg font-extrabold">
          IDR {Number(price).toLocaleString("id-ID")}
        </div>
      </div>
      <button
        onClick={onBookClick}
        className="py-2 px-4 bg-hitam rounded-md text-white"
      >
        Pesan Sekarang
      </button>
    </div>
  );
};

export default MobileBookingBar;
