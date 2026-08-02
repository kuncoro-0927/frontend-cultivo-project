import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";
import CardImg from "../../../../component/card/CardImg";

const parseGallery = (urlGallery) => {
  if (Array.isArray(urlGallery)) return urlGallery;
  if (typeof urlGallery === "string" && urlGallery.length > 0) {
    return JSON.parse(urlGallery);
  }
  return [];
};

const GallerySection = ({ urlGallery }) => {
  const [open, setOpen] = useState(false);
  const images = parseGallery(urlGallery).slice(0, 4);

  return (
    <>
      <div className="flex-wrap justify-start mt-4 lg:mt-10 gap-4 flex">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="flex justify-center">
              <CardImg img={url.trim()} />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <button
        className="mt-7 text-sm text-hitam underline"
        onClick={() => setOpen(true)}
      >
        Semua gambar
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            margin: 5,
            display: "grid",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "full",
            maxWidth: "full",
            maxHeight: "90vh",
            overflowY: "scroll",
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Semua gambar</h2>
            <button onClick={() => setOpen(false)} className="mt-4 text-3xl">
              <IoClose />
            </button>
          </div>

          <div className="grid grid-cols-1 justify-center mt-10 gap-10">
            {images.length > 0 ? (
              images.map((url, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    className="w-full h-auto max-w-[700px] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                    src={url.trim()}
                    alt=""
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default GallerySection;
