import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="bg-hijau-muda text-hitam  mt-7 lg:mt-20 mx-4 md:mx-7 rounded-2xl md:rounded-3xl mb-4 ">
        <div className="py-5 mx-4 md:mx-6 lg:mx-14 sm:mt-7 md:mt-10">
          <div className="sm:flex justify-between sm:mt-3 md:mt-5">
            <div className="space-y-1 sm:space-y-2 md:space-y-2">
              <Link to="/">
                <h2 className="text-base font-bold lg:text-2xl">Cultivo</h2>
              </Link>
              <p className="text-xs lg:text-base">
                Temukan berbagai kegiatan Agrowisata <br />
                di Indonesia bersama Cultivo.
              </p>
            </div>
            <div className="mt-8 sm:mt-0 md:mt-0 text-sm font-semibold flex justify-between md:justify-end sm:gap-10 md:gap-10 lg:gap-24 ">
              <ul className="space-y-2">
                <li className="font-bold md:text-base ">Cultivo</li>
                <li>
                  <Link
                    to="/tentang"
                    className="font-normal lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-hitam text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]"
                  >
                    Tentang kami
                  </Link>
                </li>
                <li className="font-normal text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]">
                  <Link
                    to="/kontak"
                    className="font-normal lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-hitam text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="font-bold md:text-base">Aktivitas</li>
                <li>
                  <Link
                    to="/aktivitas/edukasi"
                    className="font-normal lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-hitam text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]"
                  >
                    Edukasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aktivitas/perkebunan"
                    className="font-normal lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-hitam text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]"
                  >
                    Perkebunan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aktivitas/alam"
                    className="font-normal lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-hitam text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]"
                  >
                    Wisata alam
                  </Link>
                </li>
              </ul>

              <ul className="space-y-2">
                <li className="font-bold md:text-base ">Hubungi kami</li>
                <li className="font-normal text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]">
                  official.cultivo@gmail.com
                </li>
                {/* <li className="font-normal text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem]">
                  08777564646
                </li> */}
              </ul>
            </div>
          </div>
          <div className="mt-14 flex justify-between items-center">
            <p className="text-[0.6rem] md:text-[0.8rem] font-semibold">
              Copyright 2024 Cultivo. All Rights Reserved.
            </p>
            <div className="flex justify-between items-center gap-2 sm:gap-4 sm:text-[1.5rem] md:text-[1.5rem] lg:text-[2rem] md:gap-5">
              <FaInstagram />
              <FaTiktok />
              <FaXTwitter />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
