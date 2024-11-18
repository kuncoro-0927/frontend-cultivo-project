/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import ButtonMobile from "../ButtonMobile";
import ButtonUtama from "../ButtonUtama";

export default function CardAktivitas({ title, description, image, price }) {
  return (
    <Card
      sx={{
        width: { xs: 220, sm: 265, md: 320, lg: 371 },
        borderRadius: { xs: 3, md: 3, lg: 5 },
        transition: "transform 0.2s, box-shadow 0.2s", // Transisi untuk efek
        "&:hover": {
          transform: "translateY(-4px)", // Naik sedikit
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Bayangan lebih dalam
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: { xs: 125, sm: 140, md: 160, lg: 200 } }}
          image={image}
          alt={title}
        />
        <CardContent
          sx={{
            height: { xs: 125, sm: 130, md: 160, lg: 180 },
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
              fontSize: { xs: "0.5rem", md: "0.7rem", lg: "0.8rem" },
              display: { xs: "none", md: "block" },
              marginTop: { xs: 1, md: 0.5, lg: 1 },
            }}
          >
            {description}
          </Typography>

          <div className="flex items-center mt-2 md:mb-4">
            <div className="mt-auto">
              <p className="text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] md:font-normal">
                Dari
              </p>
              <p className="text-[0.9rem] sm:text-base font-semibold md:text-sm lg:text-base  lg:font-bold">
                IDR {price}
              </p>
            </div>

            <ButtonUtama />

            <ButtonMobile />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
