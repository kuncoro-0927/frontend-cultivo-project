import { TextField } from "@mui/material";

const inputSx = {
  "& .MuiOutlinedInput-root": { color: "black !important" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "black !important" },
  "& .MuiInputLabel-root": { color: "black !important" },
};

const StyledTextField = (props) => (
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    sx={inputSx}
    {...props}
  />
);

export default StyledTextField;
