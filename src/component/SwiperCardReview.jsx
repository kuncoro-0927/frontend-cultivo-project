import CardReview from "./card/CardReview";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "../data_sementara/Testimoni";
import "../assets/styleswiper.css";

export default function SwiperCardReview() {
  return (
    <Swiper
      breakpoints={{
        340: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="max-w-full lg:max-w-full "
    >
      {ServiceData.map((item) => (
        <SwiperSlide
          key={item.title}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardReview
            title={item.title}
            content={item.content}
            name={item.name}
            wisata={item.wisata}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
