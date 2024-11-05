import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { LuArrowRight } from "react-icons/lu";
// eslint-disable-next-line react/prop-types
export default function CardAktivitas({ title, description, image, price }) {
  return (
    <Card
      sx={{
        width: { xs: 200, md: 350, lg: 371 },
        borderRadius: { xs: 3, md: 3, lg: 5 },
        transition: "transform 0.2s, box-shadow 0.2s", // Transisi untuk efek
        "&:hover": {
          transform: "translateY(-4px)", // Naik sedikit
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Bayangan lebih dalam
        },
      }}
    >
      <CardActionArea>
        <CardMedia component="img" image={image} alt={title} />
        <CardContent
          sx={{
            height: { xs: 125, sm: 160, md: 160, lg: 180 },
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
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
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

              marginBottom: { lg: 2 },
              display: { xs: "none", lg: "block" },
            }}
          >
            {description}
          </Typography>

          <div className="flex items-center md:mb-4 mt-auto">
            <div className="mt-auto">
              <p className="text-[0.5rem] md:text-[0.7rem] md:font-normal">
                Dari
              </p>
              <p className="text-[0.8rem] sm:text-base font-semibold md:text-sm lg:text-base lg:font-bold">
                IDR {price}
              </p>
            </div>
            <div className="flex items-center ml-auto mt-2">
              <div className="py-2 px-2  rounded-full md:px-3 md:py-3 bg-button text-white md:rounded-full md:ml-2 lg:ml-2 lg:py-3 lg:px-3 items-center">
                <LuArrowRight className="lg:text-sm" />
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
