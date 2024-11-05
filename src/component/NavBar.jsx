import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
export default function NavBar() {
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
      className={`fixed w-full top-0 md:px-10 py-1 transition-colors duration-300 ${
        scrolling ? "shadow-lg bg-white text-black" : "bg-white text-black"
      } z-50`}
    >
      <div className="justify-between px-4 lg:max-w-7xl md:items-center md:flex md:px-0">
        <div className="">
          <div className="flex items-center justify-between py-3 md:py-4 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold text-black">Cultivo</h2>
            </Link>
            <div className="md:hidden">
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
            className={`flex-1 justify-start pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="lg:items-center items-baseline md:px-5 md:py-4 md:rounded-full justify-start space-y-8 md:flex md:space-x-3 lg:space-x-2 md:space-y-0">
              <li className="text-hitam py-1 px-2 font-medium md:text-sm lg:text-base hover:text-hover ">
                <Link to="/about">Eksplor Destinasi</Link>
              </li>
              <li className="dropdown dropdown-hover mx-2 md:mx-0">
                <label
                  tabIndex="0"
                  className="cursor-pointer hover:text-hover flex items-center"
                >
                  Aktivitas <IoMdArrowDropdown className="text-2xl" />
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu shadow bg-white rounded-box w-52"
                >
                  <li>
                    <Link to="/aktivitas-1" className="hover:bg-gray-200">
                      Aktivitas 1
                    </Link>
                  </li>
                  <li>
                    <Link to="/aktivitas-2" className="hover:bg-gray-200">
                      Aktivitas 2
                    </Link>
                  </li>
                  <li>
                    <Link to="/aktivitas-3" className="hover:bg-gray-200">
                      Aktivitas 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="text-hitam py-1 px-2 font-medium md:text-sm lg:text-base hover:text-hover ">
                <Link to="">Bergabung</Link>
              </li>
              <li className="text-hitam py-1 px-2  font-medium md:text-sm lg:text-base hover:text-hover ">
                <Link to="">Tentang</Link>
              </li>
              <li className="text-hitam py-1 px-2 font-medium md:text-sm lg:text-base hover:text-hover ">
                <Link to="">Kontak</Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 md:hidden">
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
        <div className="hidden space-x-2 md:inline-block">
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
        </div>
      </div>
    </nav>
  );
}
