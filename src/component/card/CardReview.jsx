/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Rating from "@mui/material/Rating";

export default function CardReview({ content, name, wisata }) {
  return (
    <Card
      sx={{
        width: { xs: 300, sm: 350, md: 350, lg: 350 },
        borderTopRightRadius: { xs: 3, md: 3, lg: 15 },
        borderTopLeftRadius: { xs: 3, md: 3, lg: 15 },
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        paddingBottom: 0,
        marginBottom: 7,
        transition: "transform 0.2s, box-shadow 0.2s", // Transisi untuk efek
        "&:hover": {
          transform: "translateY(-4px)", // Naik sedikit
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Bayangan lebih dalam
        },
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Memastikan ada ruang antara elemen
            height: { xs: 250, sm: 290, md: 290, lg: 300 }, // Mengatur tinggi minimum agar konsisten
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="px-5 sm:px-5 py-1.5 md:px-5 lg:px-6">
            <Typography
              component="div"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                fontWeight: "medium",
              }}
            >
              <Rating
                sx={{
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.2rem",
                    md: "1.3rem",
                    lg: "1.9rem",
                  },
                  marginBottom: {
                    xs: "10px",
                    sm: "15px",
                    md: "18px",
                    lg: "20px",
                  },
                }}
                name="read-only"
                value={5}
                readOnly
              />
            </Typography>
            <Typography
              variant=""
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.75rem",
                  md: "0.8rem",
                  lg: "0.8rem",
                },

                display: "block",
              }}
            >
              {content}
            </Typography>
          </div>

          <div className="bg-hitam px-5 py-1.5 md:px-5 lg:px-6">
            <Typography
              sx={{
                width: "100%",
                margin: 0,
                color: "white",
                marginTop: "auto", // Menjaga nama tetap di bawah
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.8rem",
                  md: "0.8rem",
                  lg: "0.8rem",
                },
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                color: "white",

                fontSize: {
                  xs: "0.7rem",
                  sm: "0.8rem",
                  md: "0.8rem",
                  lg: "0.8rem",
                },
              }}
            >
              {wisata}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
