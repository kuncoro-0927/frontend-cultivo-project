const TabButtons = ({ activeTab, onChange }) => {
  return (
    <div className="flex">
      <button
        onClick={() => onChange("tickets")}
        className={`font-bold py-2 px-4 ${
          activeTab === "tickets" ? "border-blue-400 border-b-4" : ""
        }`}
      >
        Tiket Anda
      </button>
      <button
        onClick={() => onChange("reviews")}
        className={`font-bold py-2 px-4 ml-5 ${
          activeTab === "reviews" ? "border-blue-400 border-b-4" : ""
        }`}
      >
        Ulasan Anda
      </button>
    </div>
  );
};

export default TabButtons;
