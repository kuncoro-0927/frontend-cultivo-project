import { Link } from "react-router-dom";

const AddressSection = ({ address, gmapsUrl }) => {
  return (
    <>
      <div className="mt-7">
        <h2 className="text-2xl font-extrabold">Alamat</h2>
      </div>
      <p className="mt-5 md:mt-2 text-md sm:text-base lg:text-lg text-hitam lg:max-w-3xl">
        {address}
      </p>
      <Link
        className="text-sm underline hover:text-blue-500 mt-2"
        to={gmapsUrl}
      >
        Lihat di Google Maps
      </Link>
    </>
  );
};

export default AddressSection;
