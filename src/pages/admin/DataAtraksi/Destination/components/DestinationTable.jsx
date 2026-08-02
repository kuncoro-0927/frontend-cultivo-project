import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import DeleteButton from "../../../../../component/Admin/Modal/DeleteAgrotourism";
import { truncateDescriptionByChar } from "../../../../../utils/textHelpers";

const columns = [
  { label: "Nama Wisata", width: "w-[200px]" },
  { label: "Kota", width: "w-[110px]" },
  { label: "Aktivitas", width: "w-[130px]" },
  { label: "Tiket", width: "w-[100px]" },
  { label: "Alamat", width: "w-[270px]" },
  { label: "Include", width: "w-[130px]" },
  { label: "Exclude", width: "w-[130px]" },
  { label: "Aksi", width: "w-[100px] mr-0" },
];

const WisataTable = ({ items, onEdit, onDeleteSuccess }) => {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="rounded-full bg-blue-50 font-bold px-3 my-3 flex items-center justify-between">
          {columns.map((col) => (
            <div
              key={col.label}
              className={`${col.width} border-blue-gray-100 bg-blue-gray-50/50 p-4`}
            >
              {col.label}
            </div>
          ))}
        </div>
      </div>

      {items.length > 0 ? (
        items.map((agro) => (
          <div key={agro.id} className="flex items-center justify-between">
            <div className="rounded-full border border-gray-200 px-3 shadow-md my-2 flex items-center justify-between">
              <div className="p-4 w-[200px] max-w-xl">{agro.name}</div>
              <div className="p-4 w-[110px] max-w-xl">{agro.city_name}</div>
              <div className="p-4 w-[130px] max-w-xl">{agro.activity_name}</div>
              <div className="p-4 w-[100px] max-w-xl">{agro.price}</div>
              <div className="p-4 w-[270px] max-w-xl">
                {truncateDescriptionByChar(agro.address, 30)}
              </div>
              <div className="p-4 w-[130px] max-w-xl">
                {truncateDescriptionByChar(agro.include, 10)}
              </div>
              <div className="p-4 w-[130px] max-w-xl">
                {truncateDescriptionByChar(agro.exclude, 10)}
              </div>
              <div className="p-4 text-base flex items-center gap-2">
                <MdRemoveRedEye />
                <button className="hover:text-blue-500" onClick={() => onEdit(agro.id)}>
                  <MdEdit />
                </button>
                <DeleteButton wisataId={agro.id} onDeleteSuccess={onDeleteSuccess} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center">No matching records found.</div>
      )}
    </div>
  );
};

export default WisataTable;