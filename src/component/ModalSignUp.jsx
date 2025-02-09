/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";

import { Modal, Box } from "@mui/material";
import { MdOutlineEmail } from "react-icons/md";
//import { CiMap } from "react-icons/ci";

import { Link } from "react-router-dom";

const ModalSignUp = ({ open, handleClose }) => {
  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/cultivo/api/auth/google`;
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            width: { xs: "350px", sm: "450px" },
            maxWidth: "100%",
            maxHeight: "90vh",
          }}
        >
          <div className="">
            <button
              onClick={handleClose}
              className="text-2xl flex p-4  justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-2  rounded-t-lg border-b">
              <h2 className="text-2xl font-extrabold text-hitam2">
                Daftar dulu ya!
              </h2>
              <p>Daftar dulu yuk, biar perjalanan di Cultivo makin seru!</p>
            </div>

            <div className="flex justify-center mx-5 items-center pt-7">
              <button
                onClick={handleGoogleLogin}
                className="border flex items-center hover:border-hitam2 duration-300 justify-between border-gray-400 rounded-xl px-6 py-4 w-full"
              >
                Lanjutkan dengan Google
                <img className="w-[25px]" src="/images/google.svg" alt="" />
              </button>
            </div>
            <div className="flex justify-center mx-5 items-center pb-7 mt-5">
              <Link
                to="/register"
                className="border flex items-center hover:border-hitam2 duration-300 justify-between border-gray-400 rounded-xl px-6 py-4 w-full"
              >
                Lanjutkan dengan email
                <MdOutlineEmail className="text-2xl" />
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalSignUp;
