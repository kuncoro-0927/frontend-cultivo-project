import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoMdArrowDropdown,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { PiTreeEvergreenLight } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiHeart, CiMap, CiUser, CiLogout } from "react-icons/ci";
import { IoCallOutline, IoTicketOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../contexts/AuthContext";
import ModalJoinWithUs from "./ModalJoinWithUs";
import Avatar from "./Avatar";
import { instance } from "../utils/axios";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const { isLoggedIn, logout } = useAuth();

  const [navbar, setNavbar] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = "hidden"; // Menonaktifkan scroll halaman
    } else {
      document.body.style.overflow = "auto"; // Mengaktifkan scroll halaman lagi
    }
    return () => {
      document.body.style.overflow = "auto"; // Pastikan body kembali normal saat menu tertutup
    };
  }, [navbar]);

  const handleLogout = async () => {
    await logout(); // Panggil fungsi logout
  };

  const [name, setName] = useState("");
  const getUserData = async () => {
    try {
      const response = await instance.get("/user");
      return response.data.data; // Ambil data user dari respons
    } catch (error) {
      throw error.response?.data?.msg || "Terjadi kesalahan server";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setName(data.name);
        console.log(data); // Lakukan sesuatu dengan data user
      } catch (error) {
        console.error(error); // Menangani error
      }
    };

    fetchData();
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 md:px-7 transition-colors duration-300 ${
        scrolling
          ? "shadow-lg bg-white text-black"
          : "bg-white shadow-md text-black"
      } z-50`}
    >
      <div className="justify-between lg:pr-2 lg:ml-0 lg:max-w-7xl lg:items-center lg:flex md:px-0">
        <div className="">
          <div className="flex   items-center justify-between py-3 lg:py-4 lg:block">
            <div className={`${scrolling ? "scrolled" : " lg:ml-0"}`}>
              <div className="flex  ml-3 lg:ml-0 md:ml-0 items-center">
                <Link
                  to="/"
                  className={`${
                    scrolling ? "scrolled hidden lg:block" : " lg:ml-0"
                  }`}
                >
                  <img src="/images/logo2.svg" className="w-28 " alt="Logo" />
                </Link>
                {scrolling && (
                  <>
                    {" "}
                    <div className="relative mx-3 lg:hidden">
                      <span className="ml-1 sm:ml-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-hover pointer-events-none">
                        <CiSearch className="text-2xl font-bold" />
                      </span>
                      <input
                        type="text"
                        placeholder="Wisata, atraksi, atau aktivitas"
                        className="pl-11 sm:pl-14 text-xs lg:text-base px-6 py-2.5 md:py-3 text-hover border border-hover rounded-full w-[250px] sm:w-[400px] md:w-[400px] lg:w-[500px] focus:outline-none focus:border-hover"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="lg:hidden">
              <button
                className="p-2 mr-4 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`p-2 lg:p-0 pb-10 max-h-[90vh] overflow-y-auto lg:overflow-visible lg:block lg:pb-0 lg:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
            // Membatasi tinggi dan menambahkan scroll vertikal
          >
            {" "}
            <div className=" mb-4 space-y-2 lg:hidden">
              {isLoggedIn ? (
                <>
                  <div
                    className="flex mt-3 mx-3 items-center gap-3 cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <Avatar />
                    <span>Hai, {name}!</span>
                  </div>

                  <div className="ml-4 mr-2">
                    <ul className="mt-5 space-y-6">
                      {/* PROFILE */}
                      <li className="">
                        <NavLink
                          to="/account/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-sm md:text-sm flex items-center justify-between text-hitam "
                              : "font-normal text-sm md:text-sm flex items-center justify-between text-hitam"
                          }
                        >
                          <CiUser className="text-base mr-2" />
                          <span className="flex-1">Profile</span>{" "}
                          <MdKeyboardArrowRight className="lg:hidden text-2xl" />{" "}
                        </NavLink>
                      </li>

                      {/* PESAN */}
                      <li className="">
                        <NavLink
                          to="/account/bookings"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-sm md:text-sm flex items-center justify-between text-hitam "
                              : "font-normal text-sm md:text-sm flex items-center justify-between text-hitam"
                          }
                        >
                          <IoTicketOutline className="text-base mr-2" />
                          <span className="flex-1">Pesan</span>{" "}
                          <MdKeyboardArrowRight className="lg:hidden text-2xl" />{" "}
                        </NavLink>
                      </li>
                      {/* WISHLIST */}
                      <li className="">
                        <NavLink
                          to="/account/wishlist"
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-sm md:text-sm flex items-center justify-between text-hitam "
                              : "font-normal text-sm md:text-sm flex items-center justify-between text-hitam"
                          }
                        >
                          <CiHeart className="text-base mr-2" />
                          <span className="flex-1">Wishlist</span>{" "}
                          <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
                        </NavLink>
                      </li>
                      {/* Logout */}
                      <li className="">
                        <button
                          onClick={handleLogout}
                          className="text-hitam font-normal text-sm md:text-sm lg:text-base lg:hover:text-white lg:hover:py-2 lg:hover:px-4 rounded-full lg:hover:bg-hitam duration-200 flex items-center justify-between w-full"
                        >
                          <CiLogout className="text-base mr-2" />
                          <span className="flex-1 text-left">Keluar</span>
                          <MdKeyboardArrowRight className="lg:hidden text-2xl" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="flex mx-3 bg-hijau-muda bg-opacity-40 rounded-lg py-4 px-2 items-end gap-3">
                    <div>
                      <img
                        className="w-36"
                        src="/images/register-mobile.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <div>
                        <span className="text-base font-bold">
                          Daftar sekarang untuk mulai perjalanan di Cultivo!
                        </span>
                      </div>
                      <div className="mt-3 py-2">
                        <Link
                          to="/register"
                          className="px-4 mr-4 py-2 text-white bg-hitam text-sm md:text-sm lg:text-base font-medium rounded-lg shadow hover:bg-hover"
                        >
                          Daftar
                        </Link>
                        <Link
                          to="/login"
                          className="text-black md:mr-2 text-sm md:text-sm lg:text-base font-medium"
                        >
                          Masuk
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="border-b border-gray-400 ml-4 mr-2 my-6 lg:hidden"></div>
            <ul className="lg:items-center ml-4 mr-2 items-baseline lg:px-5 lg:py-4 lg:rounded-full justify-start space-y-6 lg:flex  lg:space-x-1 lg:space-y-0">
              <span className="font-bold text-xl text-hitam lg:hidden">
                Menu
              </span>
              <li className="">
                <NavLink
                  to="/seluruhwisata"
                  className={({ isActive }) =>
                    isActive
                      ? "lg:text-white lg:bg-hitam lg:py-2 lg:px-4 lg:rounded-full font-medium text-sm md:text-sm lg:text-base lg:hover:bg-hover lg:duration-200 flex items-center justify-between"
                      : "text-hitam lg:py-2 lg:px-4 font-medium text-sm md:text-sm lg:text-base lg:hover:text-white lg:hover:py-2 lg:hover:px-4 rounded-full lg:hover:bg-hitam duration-200 flex items-center justify-between"
                  }
                >
                  <CiMap className="text-base mr-2 lg:hidden" />
                  <span className="flex-1">Eksplor Destinasi</span>{" "}
                  <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
                </NavLink>
              </li>

              <li className="dropdown w-full lg:w-auto dropdown-hover md:mx-0">
                <label
                  tabIndex="0"
                  className="cursor-pointer lg:px-4 lg:py-2 text-hitam font-medium text-sm md:text-sm lg:text-base lg:hover:text-white lg:hover:py-2 lg:hover:px-4 rounded-full lg:hover:bg-hitam duration-200 flex items-center justify-between"
                >
                  <PiTreeEvergreenLight className="text-base mr-2 lg:hidden" />
                  <span className="flex-1">Aktivitas</span>
                  <MdKeyboardArrowRight className="lg:hidden text-2xl ml-auto" />{" "}
                  <IoMdArrowDropdown className="text-2xl hidden lg:block" />
                </label>

                {/* Dropdown Menu */}
                <ul
                  tabIndex="0"
                  className="dropdown-content menu shadow bg-white rounded-box w-52"
                >
                  <li>
                    <Link
                      to="/aktivitas/pertanian"
                      className="hover:bg-hover hover:text-white"
                    >
                      Pertanian
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aktivitas/perkebunan"
                      className="hover:bg-hover hover:text-white"
                    >
                      Perkebunan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aktivitas/perikanan"
                      className="hover:bg-hover hover:text-white"
                    >
                      Perikanan
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="">
                <ModalJoinWithUs></ModalJoinWithUs>
              </li>
              <li className="">
                <NavLink
                  to="/tentang"
                  className={({ isActive }) =>
                    isActive
                      ? "lg:text-white lg:bg-hitam lg:py-2 lg:px-4 lg:rounded-full font-medium text-sm md:text-sm lg:text-base lg:hover:bg-hover lg:duration-200 flex items-center justify-between"
                      : "text-hitam lg:py-2 lg:px-4  font-medium text-sm md:text-sm lg:text-base lg:hover:text-white lg:hover:py-2 lg:hover:px-4 rounded-full lg:hover:bg-hitam duration-200 flex items-center justify-between"
                  }
                >
                  <IoIosInformationCircleOutline className="text-base mr-2 lg:hidden" />
                  <span className="flex-1">Tentang</span>{" "}
                  <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/kontak"
                  className={({ isActive }) =>
                    isActive
                      ? "lg:text-white lg:bg-hitam lg:py-2 lg:px-4 lg:rounded-full font-medium text-sm md:text-sm lg:text-base lg:hover:bg-hover lg:duration-200 flex items-center justify-between"
                      : "text-hitam lg:py-2 lg:px-4  font-medium text-sm md:text-sm lg:text-base lg:hover:text-white lg:hover:py-2 lg:hover:px-4 rounded-full lg:hover:bg-hitam duration-200 flex items-center justify-between"
                  }
                >
                  <IoCallOutline className="text-base mr-2 lg:hidden" />
                  <span className="flex-1">Kontak</span>{" "}
                  <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden space-x-2 lg:inline-block">
          {isLoggedIn ? (
            <>
              <div className="relative">
                {/* Avatar and Greeting */}
                <div
                  className="flex hover:bg-gray-300 hover:duration-200 hover:bg-opacity-30 hover:rounded-full hover:p-1.5 p-1.5 items-center gap-3 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {/* <span>Hai, {user?.name}!</span> */}

                  <Avatar />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-sm text-hitam">
                      <li className="">
                        <NavLink
                          to="/account/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "w-full font-extrabold flex items-center px-6 py-4 text-left hover:bg-gray-100"
                              : "w-full flex items-center px-6 py-4 text-left hover:bg-gray-100"
                          }
                        >
                          <CiUser className="text-base mr-2" />
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/account/bookings"
                          className="w-full flex items-center  px-6 py-4 text-left hover:bg-gray-100"
                        >
                          <IoTicketOutline className="text-base mr-2" />
                          Pesan
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/account/wishlist"
                          className="w-full flex items-center  px-6 py-4 text-left hover:bg-gray-100"
                        >
                          <CiHeart className="text-base mr-2" />
                          Wishlist
                        </NavLink>
                      </li>
                      <li>
                        <hr className="my-1" />
                      </li>
                      <li>
                        <button
                          className="w-full flex items-center  px-6 py-4 text-left text-hitam hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          <CiLogout className="text-base mr-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}

                {isOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  ></div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-black mr-4 md:mr-2 md:text-sm lg:text-base font-medium"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-white bg-hitam md:text-sm lg:text-base font-medium rounded-full shadow hover:bg-hover"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
