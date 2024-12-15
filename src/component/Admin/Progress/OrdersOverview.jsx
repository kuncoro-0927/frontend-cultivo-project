/* eslint-disable react/prop-types */
import { LinearProgress, Box, Typography } from "@mui/material";

const ProgressBar = ({ percentage }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          marginTop: 0,
          height: 10,
          borderRadius: 5,
          flexGrow: 1, // Agar LinearProgress mengisi ruang yang tersedia
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginLeft: 2, fontSize: 10 }}
      >
        {percentage}%
      </Typography>
    </Box>
  );
};

export default ProgressBar;
