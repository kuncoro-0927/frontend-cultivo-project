import { Link } from "react-router-dom";
import CardDaerah from "./card/CardDaerah";

const DaerahList = ({ city, variant = "desktop", limit, isLoading, className }) => {
  const source = Array.isArray(city) ? city : [];
  const items = typeof limit === "number" ? source.slice(0, limit) : source;

  const defaultClass =
    variant === "desktop"
      ? "hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-5"
      : "carousel-item gap-3";

  return (
    <div className={className ?? defaultClass}>
      {items.map((daerahItem) => (
        <Link key={daerahItem.id} to={`/wisata/daerah/${daerahItem.id}`}>
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
