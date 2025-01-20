import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";
//import { CiMap } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { Link } from "react-router-dom";
const ModalJoinWithUs = () => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsActive(false);
  };

  const handleButtonClick = () => {
    setIsActive(!isActive);
    handleOpen();
  };

  return (
    <>
      <button
        className={
          isActive
            ? "font-bold md:font-medium text-sm md:text-sm lg:text-base lg:relative lg:shadow-[0_1px_0_0px_black] lg:shadow-b-[2px]shadow-hitam duration-200 flex items-center justify-between w-full"
            : "text-hitam  font-medium text-sm md:text-sm lg:text-base lg:relative lg:duration-200 flex items-center justify-between w-full"
        }
        onClick={handleButtonClick}
      >
        <GoPeople className="text-base mr-2 lg:hidden" />

        <span className="flex-1 text-left text-sm lg:relative lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-hitam">
          Bergabung
        </span>

        <MdKeyboardArrowRight className="text-2xl ml-2 lg:hidden" />
      </button>

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
            borderRadius: 2,
            width: { xs: "350px", sm: "450px" },
            maxWidth: "100%",
            maxHeight: "90vh",
          }}
        >
          <div className="">
            <div className="flex p-4 rounded-t-lg items-center justify-between border-b">
              <h2 className="text-xl font-bold">Bergabung</h2>
              <button onClick={handleClose} className="text-xl">
                <IoClose />
              </button>
            </div>

            <div className="flex justify-center mx-5 items-center py-7">
              <Link
                to="https://forms.gle/zP33i6xGvUppN9649"
                className="border border-gray-400 rounded-xl p-4 w-full"
              >
                Bergabung menjadi mitra Cultivo
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalJoinWithUs;
