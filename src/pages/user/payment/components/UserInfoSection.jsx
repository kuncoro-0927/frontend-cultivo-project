import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Link } from "react-router-dom";

const UserInfoSection = ({ user, isLoggedIn }) => {
  return (
    <div className="mt-10">
      <h1 className="font-extrabold text-2xl">Informasi pengguna</h1>
      <div className="md:flex grid items-center justify-between">
        <p className="text-sm mt-1">
          Perbarui profil Anda jika data tidak lengkap atau terdapat kesalahan.
        </p>

        <Link
          to="/account/profile"
          className="text-sm mt-2 md:mt-0s underline hover:text-blue-500"
        >
          Perbarui
        </Link>
      </div>

      <div className="mt-7 grid md:grid-cols-2 gap-x-5 gap-y-8">
        <TextField
          label="Nama Depan"
          variant="outlined"
          value={isLoggedIn ? user?.firstname : ""}
          disabled
          size="normal"
        />

        <TextField
          label="Nama Belakang"
          variant="outlined"
          value={isLoggedIn ? user?.lastname : ""}
          required
          disabled
          size="normal"
        />

        <TextField
          label="Email"
          variant="outlined"
          value={isLoggedIn ? user?.email : ""}
          required
          disabled
          size="normal"
        />

        <MuiTelInput
          value={isLoggedIn ? user?.phonenumber : ""}
          fullWidth
          label="Nomor Telepon"
          required
          disabled
          defaultCountry="ID"
        />
      </div>
    </div>
  );
};

export default UserInfoSection;
