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
        // xs (extra small devices, phones)
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        // sm (small devices, phones in landscape mode)
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        // md (medium devices, tablets)
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        // lg (large devices, desktops)
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        // xl (extra larg devices, large desktops)
        1200: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="max-w-full lg:max-w-full"
    >
      {ServiceData.map((item, index) => (
        <SwiperSlide
          key={index}
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
