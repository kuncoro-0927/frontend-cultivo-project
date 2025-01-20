import { TeamData } from "../data_sementara/Team";
import CardTeam from "../component/card/CardTeam";
const Kontak = () => {
  return (
    <>
      <section className="mt-32 text-hitam2">
        <div className=" text-center space-y-2">
          <p className="font-bold">Hubungi kami</p>
          <p className="text-3xl font-extrabold ">Ada yang bisa dibantu?</p>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            dolorum!
          </p>
        </div>

        <div className="mt-7 md:mx-0 gap-3 flex flex-wrap lg:gap-10 lg:p-1 lg:mt-16">
          {/* <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(city) &&
              city.slice(0, 4).map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div> */}

          {/* DATA DUMMY SEMENTARA EXHIBITION */}
          <div className="hidden md:hidden lg:flex lg:justify-between lg:w-full lg:gap-3">
            {Array.isArray(TeamData) &&
              TeamData.slice(0, 4).map((daerahItem) => (
                <CardTeam
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                />
              ))}
          </div>
        </div>

        {/* <div className="carousel carousel-center max-w-full space-x-3 px-8 py-3 lg:hidden ">
          <div className="carousel-item gap-3">
            {Array.isArray(city) &&
              city.slice(0, 4).map((daerahItem) => (
                <Link
                  key={daerahItem.id}
                  to={`/wisata/daerah/${daerahItem.id}`}
                >
                  <CardDaerah title={daerahItem.name} img={daerahItem.url} />
                </Link>
              ))}
          </div>
           </div> */}

        <div className="carousel carousel-center max-w-full space-x-3 py-3 lg:hidden ">
          <div className="carousel-item gap-3 px-1">
            {Array.isArray(TeamData) &&
              TeamData.slice(0, 4).map((daerahItem) => (
                <CardTeam
                  key={daerahItem.id}
                  title={daerahItem.title}
                  img={daerahItem.image}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontak;
