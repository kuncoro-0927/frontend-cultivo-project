import LinearProgress from "@mui/material/LinearProgress";

const RatingDistribution = ({ ratingPercentage }) => {
  return (
    <div>
      {[5, 4, 3, 2, 1].map((number, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="text-sm font-semibold text-hitam2">{number}</span>

          <LinearProgress
            variant="determinate"
            value={ratingPercentage[4 - index]}
            color="inherit"
            sx={{
              width: "270px",
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RatingDistribution;
