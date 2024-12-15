/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
//import DeleteIcon from "@mui/icons-material/Delete";
import { instance } from "../../../utils/axios";
import { showSnackbar } from "../../../component/CustomSnackbar";
import { IoWarningOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const DeleteButton = ({ wisataId, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // Panggil showSnackbar saat modal terbuka
    showSnackbar(
      "Peringatan: Data pesanan dan tiket dengan wisata ini juga akan terhapus",
      "warning"
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/agrotourism/${wisataId}`);
      showSnackbar(response.data.msg, "success");
      onDeleteSuccess(); // Callback untuk refresh daftar wisata
    } catch (error) {
      console.error("Error saat menghapus data:", error);
      showSnackbar("Gagal menghapus data", "error");
    } finally {
      handleClose(); // Tutup modal setelah selesai
    }
  };

  return (
    <>
      <MdDelete
        className="cursor-pointer hover:text-red-500"
        onClick={handleOpen}
      />

      <Dialog className="w-[550px] mx-auto" open={open} onClose={handleClose}>
        <DialogTitle>Hapus Wisata</DialogTitle>
        <DialogContent className="text-base gap-2 mx-4 flex items-center">
          <IoWarningOutline className="text-4xl" /> Apakah Anda yakin ingin
          menghapus data ini?
        </DialogContent>

        <DialogActions className="mb-2 mx-2">
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
