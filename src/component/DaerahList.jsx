import { Link } from "react-router-dom";
import CardDaerah from "./card/CardDaerah";

const DaerahList = ({
  city,
  variant = "desktop",
  limit,
  isLoading,
  className,
}) => {
  const source = Array.isArray(city) ? city : [];
  const items = typeof limit === "number" ? source.slice(0, limit) : source;

  const wrapperClass =
    variant === "desktop"
      ? "hidden md:hidden lg:grid lg:grid-cols-5 lg:gap-5 lg:w-full"
      : "flex gap-3"; // wrapper mobile: flex biasa, bukan carousel-item

  const itemClass = variant === "mobile" ? "carousel-item w-[160px] flex-shrink-0" : "";

  return (
    <div className={className ?? wrapperClass}>
      {items.map((daerahItem) => (
        <Link
          key={daerahItem.id}
          to={`/wisata/daerah/${daerahItem.id}`}
          className={itemClass}
        >
          <CardDaerah
            title={daerahItem.name}
            img={daerahItem.url}
            isLoading={isLoading}
          />
        </Link>
      ))}
    </div>
  );
};

export default DaerahList;