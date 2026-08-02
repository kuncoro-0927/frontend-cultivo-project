import { FaRegCircleUser } from "react-icons/fa6";

const LoggedInAsBanner = ({ email, onLogout }) => {
  return (
    <div className="bg-hijau-muda text-xs md:text-base grid md:flex items-center justify-between space-x-3 font-normal bg-opacity-30 py-3 px-2 md:px-4 mt-5">
      <FaRegCircleUser className="hidden md:flex" />
      <p className="flex-1">
        Kamu masuk sebagai <span className="font-bold">{email}</span>
      </p>
      <p className="md:text-end mt-1">
        Bukan kamu?{" "}
        <button onClick={onLogout} className="underline font-medium">
          Ganti akun
        </button>
      </p>
    </div>
  );
};

export default LoggedInAsBanner;
