/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
//import ButtonMobile from "../ButtonMobile";
import ButtonUtama from "../ButtonUtama";

export default function CardAktivitas({
  title,
  description,
  image,
  price,
  path,
}) {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: { xs: 270, md: 350, lg: 371 },
          borderRadius: { xs: 3, md: 3, lg: 5 },
          transition: "transform 0.2s, box-shadow 0.2s", // Transisi untuk efek
          "&:hover": {
            transform: "translateY(-4px)", // Naik sedikit
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Bayangan lebih dalam
          },
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="" image={image} alt={title} />
          <CardContent
            sx={{
              height: { xs: 125, sm: 140, md: 160, lg: 180 },
              paddingY: { lg: 2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              fontFamily="Poppins"
              component="div"
              sx={{
                fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
                fontWeight: "medium",
                marginTop: { xs: 1, md: 0.5, lg: 1 },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant=""
              sx={{
                color: "text.secondary",
                fontFamily: "Poppins",
                fontSize: { xs: "0.5rem", md: "0.7rem" },
                display: { xs: "none", lg: "block" },
                marginTop: { xs: 1, md: 0.5, lg: 1 },
              }}
            >
              {description}
            </Typography>

            <div className="flex items-center mt-4 md:mb-4">
              <div className="mt-auto">
                <p className="text-[0.5rem] md:text-[0.7rem] md:font-normal">
                  Dari
                </p>
                <p className="text-[0.9rem] sm:text-base font-semibold md:text-sm lg:text-base">
                  IDR {price}
                </p>
              </div>
              <ButtonUtama />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
