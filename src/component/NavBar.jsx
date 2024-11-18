import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../contexts/AuthContext";
export default function NavBar() {
  const { isLoggedIn, user, logout } = useAuth();

  const [navbar, setNavbar] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 50); // Adjust threshold as needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 md:px-7 py-0.5 sm:py-1 transition-colors duration-300 ${
        scrolling ? "shadow-lg bg-white text-black" : "bg-white text-black"
      } z-50`}
    >
      <div className="justify-between px-4 lg:max-w-7xl lg:items-center lg:flex md:px-0">
        <div className="">
          <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
            <div className={`${scrolling ? "scrolled" : ""}`}>
              {/* Logo hanya muncul pada sm dan md jika tidak sedang di-scroll */}
              {!scrolling && (
                <Link
                  to="/"
                  className="block sm:hidden md:hidden lg:hidden" // Logo hanya muncul di sm dan md
                >
                  <img
                    src="/images/logo2.svg"
                    className="w-28 lg:w-32"
                    alt="Logo"
                  />
                </Link>
              )}

              {/* Pencarian hanya muncul jika sudah scroll */}
              <div className="flex items-center">
                {/* Logo selalu muncul di lg dan lebih besar */}
                <Link
                  to="/"
                  className="hidden lg:block sm:block md:block" // Logo hanya muncul di lg dan lebih besar
                >
                  <img src="/images/logo2.svg" className="w-28 " alt="Logo" />
                </Link>
                {scrolling && (
                  <div className="relative mx-3 lg:hidden">
                    <span className="ml-1 sm:ml-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-hover pointer-events-none">
                      <CiSearch className="text-2xl font-bold" />
                    </span>
                    <input
                      type="text"
                      placeholder="Wisata, atraksi, atau aktivitas"
                      className="pl-11 sm:pl-14 text-xs lg:text-base px-6 py-3 md:py-3 text-hover border border-hover rounded-full w-[250px] sm:w-[400px] md:w-[400px] lg:w-[500px] focus:outline-none focus:border-hover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="lg:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
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
            className={`flex-1 justify-start pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="lg:items-center items-baseline lg:px-5 lg:py-4 lg:rounded-full justify-start space-y-8 lg:flex  lg:space-x-4 lg:space-y-0">
              <li className="">
                <NavLink
                  to="/seluruhwisata"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base hover:bg-hover duration-200 "
                      : "text-hitam py-1 px-2 font-medium md:text-sm lg:text-base  hover:text-white hover:py-2 hover:px-4 rounded-full  hover:bg-hitam duration-200  "
                  }
                >
                  Eksplor Destinasi
                </NavLink>
              </li>
              <li className="dropdown dropdown-hover md:mx-0">
                <label
                  tabIndex="0"
                  className="cursor-pointer hover:text-hover flex items-center pl-2 "
                >
                  Aktivitas <IoMdArrowDropdown className="text-2xl" />
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu shadow bg-white rounded-box w-52"
                >
                  <li>
                    <Link
                      to="/aktivitas-1"
                      className="hover:bg-hover hover:text-white"
                    >
                      Aktivitas 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aktivitas-2"
                      className="hover:bg-hover hover:text-white"
                    >
                      Aktivitas 2
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/aktivitas-3"
                      className="hover:bg-hover hover:text-white"
                    >
                      Aktivitas 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="">
                <NavLink
                  to="/bergabung"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base hover:bg-hover duration-200 "
                      : "text-hitam py-1 px-2 font-medium md:text-sm lg:text-base  hover:text-white hover:py-2 hover:px-4 rounded-full  hover:bg-hitam duration-200  "
                  }
                >
                  Bergabung
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/tentang"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base hover:bg-hover duration-200 "
                      : "text-hitam py-1 px-2 font-medium md:text-sm lg:text-base  hover:text-white hover:py-2 hover:px-4 rounded-full  hover:bg-hitam duration-200  "
                  }
                >
                  Tentang
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/kontak"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-hitam py-2 px-4 rounded-full font-medium md:text-sm lg:text-base hover:bg-hover duration-200 "
                      : "text-hitam py-1 px-2 font-medium md:text-sm lg:text-base  hover:text-white hover:py-2 hover:px-4 rounded-full  hover:bg-hitam duration-200  "
                  }
                >
                  Kontak
                </NavLink>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden">
              <Link
                to=""
                className="inline-block w-full px-4 py-2 text-center text-white bg-hitam rounded-full shadow hover:bg-black"
              >
                Masuk
              </Link>
              <Link
                to=""
                className="inline-block w-full px-4 py-2 text-center text-hitam bg-white rounded-full shadow hover:bg-gray-100"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block">
          {isLoggedIn ? (
            <>
              <span className="text-black mr-4 md:text-sm lg:text-base font-medium">
                Welcome, {user?.name}!
              </span>
              <button
                onClick={logout}
                className="px-5 py-2 text-white bg-hitam md:text-sm lg:text-base font-medium rounded-full shadow hover:bg-hover"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/"
                className="text-black mr-4 md:mr-2 md:text-sm lg:text-base font-medium"
              >
                Masuk
              </a>
              <button
                type="submit"
                className="px-5 py-2 text-white bg-hitam md:text-sm lg:text-base font-medium rounded-full shadow hover:bg-hover"
              >
                Daftar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
