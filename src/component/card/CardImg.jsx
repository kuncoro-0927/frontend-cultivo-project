/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";

import CardActionArea from "@mui/material/CardActionArea";

export default function CardAktivitas({ img }) {
  return (
    <Card
      sx={{
        width: { xs: 150, sm: 160, md: 160, lg: 180 },
        height: { xs: 110, sm: 120, md: 120, lg: 140 },

        borderRadius: { xs: 3, md: 3, lg: 3 },
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{
            width: { xs: 150, sm: 160, md: 160, lg: 180 },
            height: { xs: 110, sm: 120, md: 120, lg: 140 },
            borderRadius: { xs: 3, md: 3, lg: 3 },
          }}
          image={img} // Pastikan untuk mengatur 'image' dengan prop 'img'
          alt="Gambar Aktivitas" // Tambahkan alt text untuk aksesibilitas
          component="img"
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </CardActionArea>
    </Card>
  );
}
