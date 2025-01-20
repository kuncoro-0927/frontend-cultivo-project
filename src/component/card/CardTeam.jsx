/* eslint-disable react/prop-types */
// src/components/CardDaerah.jsx
//import { Link } from "react-router-dom";

import CardActionArea from "@mui/material/CardActionArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function CardTeam({ title, img }) {
  return (
    <>
      <div>
        <CardActionArea>
          <img
            src={img}
            alt="Gambar"
            className="w-[220px] h-[270px] object-cover rounded-lg"
          />

          <div>
            <div>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ marginRight: "0.7rem" }}
              />
              {title}
            </div>

            <div></div>
          </div>
        </CardActionArea>
      </div>
    </>
  );
}
