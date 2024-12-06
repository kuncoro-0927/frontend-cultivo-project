import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditWisata from "../Modal/EditWisata";
import { instance } from "../../../utils/axios";

const WisataTable = () => {
  const [rows, setRows] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedWisata, setSelectedWisata] = useState(null);

  const handleEdit = () => {
    const wisata = rows.find((row) => row.id === selectedRowId);
    setSelectedWisata(wisata);
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      await instance.put(`/agrotourism/${selectedRowId}`, updatedData);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRowId ? { ...row, ...updatedData } : row
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nama Wisata", width: 180 },
    { field: "city_name", headerName: "Kota", width: 130 },
    { field: "activities_name", headerName: "Nama Aktivitas", width: 180 },
    { field: "price", headerName: "Harga", width: 100 },
    { field: "facility", headerName: "Fasilitas", width: 100 },
    { field: "address", headerName: "Alamat", width: 250 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(event) => handleMenuOpen(event, params.row.id)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const handleMenuOpen = (event, id) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRowId(null);
  };

  const fetchWisataData = async () => {
    try {
      const response = await instance.get("/agrotourism");
      if (Array.isArray(response.data.data)) {
        const updatedRows = response.data.data.map((item) => ({
          ...item,
          city_name: item.city_name,
          activities_name: item.activity_name,
        }));
        setRows(updatedRows);
      } else {
        console.error("Data tidak sesuai format");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchWisataData();
  }, []);

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        disablePortal
      >
        <MenuItem
          onClick={() => console.log("Detail untuk ID:", selectedRowId)}
        >
          Detail
        </MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem
          onClick={() => console.log("Hapus untuk ID:", selectedRowId)}
          sx={{ color: "red" }}
        >
          Hapus
        </MenuItem>
      </Menu>
      <EditWisata
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        wisataData={selectedWisata}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};

export default WisataTable;
