/* eslint-disable react/prop-types */

import { Modal, Box } from "@mui/material";

const OrderSummaryModal = ({
  open,
  onClose,
  wisataName,
  date,
  quantity,
  total,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 className="text-lg font-bold mb-4">Ringkasan Pesanan</h2>
        <p className="mb-2">
          <strong>Nama Wisata:</strong> {wisataName}
        </p>
        <p className="mb-2">
          <strong>Tanggal:</strong>{" "}
          {date ? date.toLocaleDateString() : "Tidak dipilih"}
        </p>
        <p className="mb-2">
          <strong>Jumlah Tiket:</strong> {quantity}
        </p>
        <p className="mb-2">
          <strong>Total Harga:</strong> IDR {total}
        </p>
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="py-2 px-4 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderSummaryModal;
