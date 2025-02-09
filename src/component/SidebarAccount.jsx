import { CiHeart, CiUser, CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PiNotepadThin, PiTicketThin } from "react-icons/pi";
const SidebarAccount = () => {
  const { logout } = useAuth();
  return (
    <div className="mt-[72px] w-44 sm:w-56 md:w-60 lg:w-72 bg-opacity-50 min-h-screen border-r border-hitam">
      <div className="">
        <ul className=" py-5 space-y-6">
          {/* PROFILE */}
          <li className="">
            <NavLink
              to="/account/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-hitam border-r-2 border-hitam hover:bg-gray-200 hover:bg-opacity-40 lg:ml-10 ml-5 md:ml-7 pl-5 lg:pl-10 lg:pr-10 py-3 font-bold text-sm md:text-sm lg:text-base flex items-center justify-between"
                  : "text-hitam hover:bg-gray-200 hover:bg-opacity-40 ml-5 md:ml-7 lg:ml-10 pl-5 lg:pl-10 lg:pr-10 py-3 font-normal text-sm md:text-sm lg:text-base flex items-center justify-between"
              }
            >
              <CiUser className="text-lg mr-2" />
              <span className="flex-1">Profil</span>{" "}
            </NavLink>
          </li>

          {/* PESAN */}
          <li className="">
            <NavLink
              to="/account/bookings"
              className={({ isActive }) =>
                isActive
                  ? "text-hitam border-r-2 border-hitam hover:bg-gray-200 hover:bg-opacity-40 lg:ml-10 ml-5 md:ml-7 pl-5 lg:pl-10 lg:pr-10 py-3 font-bold text-sm md:text-sm lg:text-base flex items-center justify-between"
                  : "text-hitam hover:bg-gray-200 hover:bg-opacity-40 ml-5 md:ml-7 lg:ml-10 pl-5 lg:pl-10 lg:pr-10 py-3 font-normal text-sm md:text-sm lg:text-base flex items-center justify-between"
              }
            >
              <PiTicketThin className="text-lg mr-2" />
              <span className="flex-1">Tiket</span>{" "}
            </NavLink>
          </li>

          {/* WISHLIST */}

          <li className="">
            <NavLink
              to="/account/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-hitam border-r-2 border-hitam hover:bg-gray-200 hover:bg-opacity-40 lg:ml-10 ml-5 md:ml-7 pl-5 lg:pl-10 lg:pr-10 py-3 font-bold text-sm md:text-sm lg:text-base flex items-center justify-between"
                  : "text-hitam hover:bg-gray-200 hover:bg-opacity-40 ml-5 md:ml-7 lg:ml-10 pl-5 lg:pl-10 lg:pr-10 py-3 font-normal text-sm md:text-sm lg:text-base flex items-center justify-between"
              }
            >
              <CiHeart className="text-lg mr-2" />
              <span className="flex-1">Favorit</span>{" "}
            </NavLink>
          </li>

          {/* Ulasan */}

          <li className="">
            <NavLink
              to="/account/review"
              className={({ isActive }) =>
                isActive
                  ? "text-hitam border-r-2 border-hitam hover:bg-gray-200 hover:bg-opacity-40 lg:ml-10 ml-5 md:ml-7 pl-5 lg:pl-10 lg:pr-10 py-3 font-bold text-sm md:text-sm lg:text-base flex items-center justify-between"
                  : "text-hitam hover:bg-gray-200 hover:bg-opacity-40 ml-5 md:ml-7 lg:ml-10 pl-5 lg:pl-10 lg:pr-10 py-3 font-normal text-sm md:text-sm lg:text-base flex items-center justify-between"
              }
            >
              <PiNotepadThin className="text-lg mr-2" />
              <span className="flex-1">Ulasan</span>{" "}
            </NavLink>
          </li>

          {/* Logout */}

          <li className="md:ml-7 sm:ml-5 lg:ml-10">
            <button
              onClick={logout}
              className="text-hitam hover:bg-gray-200 hover:bg-opacity-40 pl-5 lg:pl-10 lg:pr-10 py-3 font-normal text-sm md:text-sm lg:text-base flex items-center justify-between w-full text-left"
            >
              <CiLogout className="text-lg mr-2" />
              <span className="flex-1">Keluar</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAccount;
