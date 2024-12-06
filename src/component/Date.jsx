import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calendar = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Pilih Tanggal</h1>
      <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      {selected && (
        <p className="mt-4 text-green-700">
          Tanggal terpilih: {selected.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default Calendar;
