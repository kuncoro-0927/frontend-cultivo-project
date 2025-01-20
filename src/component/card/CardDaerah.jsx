/* eslint-disable react/prop-types */
// src/components/CardDaerah.jsx
//import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function CardDaerah({ title, img }) {
  return (
    <>
      <Card
        sx={{
          width: { xs: 180, sm: 195, md: 210, lg: 250 },
          borderRadius: { xs: 3, lg: 5 },
          transition: "transform 0.2s, box-shadow 0.2s", // Transisi untuk efek
          "&:hover": {
            transform: "translateY(-4px)", // Naik sedikit
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            sx={{
              height: { xs: 170, sm: 180, md: 185, lg: 250 },
              objectFit: "cover",
            }}
            component="img"
            image={img} // Menggunakan image dari props
            alt={title}
          />
          <CardContent sx={{ maxHeight: { xs: 100, md: 300 } }}>
            <Typography
              gutterBottom
              variant="h4"
              fontFamily="Poppins"
              component="div"
              sx={{
                fontSize: { xs: "0.7rem", md: "1rem" },
                fontWeight: "medium",
                display: "flex",
                alignItems: "center",
              }}
              marginTop={""}
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ marginRight: "0.7rem" }}
              />
              {title}
            </Typography>

            <Typography
              variant=""
              sx={{
                color: "text.secondary",
                fontFamily: "Poppins",
                fontSize: { xs: "0.8rem", md: "0.7rem" },
                display: { xs: "none", md: "block" },
              }}
            ></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
