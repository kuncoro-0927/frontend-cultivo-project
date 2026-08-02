import CircularProgress from "@mui/material/CircularProgress";
import StyledTextField from "./StyledTextField";
import { useContactForm } from "../hooks/useContactForm";

const ContactForm = () => {
  const { formData, status, loading, handleChange, handleSubmit } =
    useContactForm();

  return (
    <div className="bg-gray-100 rounded-lg p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Hubungi tim kami</h2>
      <form onSubmit={handleSubmit}>
        {/* Nama Depan dan Belakang */}
        <div className="flex gap-4 mb-4">
          <StyledTextField
            label="Nama depan"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Nama belakang"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <StyledTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={status === "error"}
            helperText={status === "error" ? "Masukkan email yang valid!" : ""}
          />
        </div>

        {/* No Telepon */}
        <div className="mb-4">
          <StyledTextField
            label="No telepon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pesan */}
        <div className="mb-4">
          <StyledTextField
            label="Pesan"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={6}
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-hover text-white px-4 py-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={17} color="inherit" />
            ) : (
              "Masuk"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
