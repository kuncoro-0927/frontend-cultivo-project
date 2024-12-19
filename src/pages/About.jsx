import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <div
        className="mx-7 md:mx-10 px-7 lg:h-[600px] xl:h-[300px] h-96 bg-cover bg-center lg:mx-10 rounded-2xl md:rounded-3xl flex items-center justify-center lg:px-12 mt-[66px] sm:mt-[73px]  lg:mt-[72px]"
        style={{ backgroundImage: "url('images/header-about.jpg')" }}
      ></div>

      {/* Konten */}
      <div className="flex flex-col-reverse md:mt-28 md:max-w-2xl lg:max-w-3xl mt-10 lg:mt-32 mx-auto lg:flex md:flex-row items-center md:items-start gap-10">
        {/* Gambar */}
        <img
          className="w-80 h-96 rounded-xl"
          src="/images/cultivo-about.jpg"
          alt="About Image"
        />

        {/* Teks */}
        <div className="text-left mx-10 md:mx-0 mt-14 lg:mt-0 lg:mx-0 text-base flex flex-col gap-5">
          <div className="font-extrabold text-2xl text-gray lg:text-4xl mr-20 text-left md:-mt-28 lg:-mt-16">
            Apa itu Cultivo?
          </div>
          <span className="lg:text-lg md:text-base text-base text-gray">
            Cultivo adalah sebuah platform website yang berfokus pada
            pengembangan dan promosi wisata agrikultur lokal di Indonesia.
          </span>
          <span className="lg:text-lg md:text-base text-base text-gray">
            Website ini bekerja sama dengan berbagai petani lokal, peternakan,
            dan perikanan yang menawarkan pengalaman wisata yang edukatif dan
            interaktif bagi wisatawan.
          </span>
          <span className="lg:text-lg md:text-base text-base text-gray">
            Cultivo menjadi solusi bagi wisatawan yang ingin terhubung dengan
            alam dan belajar lebih dalam tentang sistem agrikultur lokal di
            Indonesia, sambil mendukung ekonomi pedesaan melalui pengalaman
            wisata yang menarik dan informatif.
          </span>
        </div>
      </div>

      {/* <div className="flex flex-col-reverse md:mt-28 md:max-w-2xl lg:max-w-3xl mt-10 lg:mt-32 mx-auto lg:flex md:flex-row items-center md:items-start gap-10">
        Gambar

        Teks
        <div className="text-left mx-10 md:mx-0 mt-14 lg:mt-0 lg:mx-0 text-base flex flex-col gap-5">
          <div className="font-extrabold text-2xl text-gray lg:text-4xl mr-20 text-left md:-mt-28 lg:-mt-16">
            Apa itu Cultivo?
          </div>
          <span className="lg:text-lg md:text-base text-base text-gray">
            Cultivo adalah sebuah platform website yang berfokus pada
            pengembangan dan promosi wisata agrikultur lokal di Indonesia.
          </span>
          <span className="lg:text-lg md:text-base text-base text-gray">
            Website ini bekerja sama dengan berbagai petani lokal, peternakan,
            dan perikanan yang menawarkan pengalaman wisata yang edukatif dan
            interaktif bagi wisatawan.
          </span>
          <span className="lg:text-lg md:text-base text-base text-gray">
            Cultivo menjadi solusi bagi wisatawan yang ingin terhubung dengan
            alam dan belajar lebih dalam tentang sistem agrikultur lokal di
            Indonesia, sambil mendukung ekonomi pedesaan melalui pengalaman
            wisata yang menarik dan informatif.
          </span>
        </div>
        <img
          className="w-80 h-96 rounded-xl"
          src="/images/cultivo-about.jpg"
          alt="About Image"
        />
      </div> */}

      <section className="bg-ghost-white mt-10 px-10 py-10">
        {" "}
        <div className="justify-center flex">
          <h1 className="text-2xl lg:text-4xl text-hitam2 font-extrabold">
            Apa Yang Ada di Cultivo
          </h1>
        </div>
        <div className=" flex items-center justify-center mt-20">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="max-w-xs flex-col flex gap-3 items-center">
              <img
                className="w-14"
                src="/images/e-ticket.png"
                alt="Akses Mudah"
              />
              <h1 className="font-bold text-lg">Pemesanan tiket online</h1>
              <span className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                iure.
              </span>
            </div>
            <div className="max-w-xs flex-col flex gap-3 items-center">
              <img
                className="w-14"
                src="/images/puzzle.png"
                alt="Akses Mudah"
              />
              <h1 className="font-bold text-lg">Beragam agrowisata menarik</h1>
              <span className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                iure.
              </span>
            </div>
            <div className="max-w-xs flex-col flex gap-3 items-center">
              <img
                className="w-14"
                src="/images/diskon.png"
                alt="Akses Mudah"
              />
              <h1 className="font-bold text-lg">Harga terjangkau</h1>
              <span className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                iure.
              </span>
            </div>
            <div className="max-w-xs flex-col flex gap-3 items-center">
              <img
                className="w-14"
                src="/images/collaborate.png"
                alt="Akses Mudah"
              />
              <h1 className="font-bold text-lg">Kolaborasi wisata lokal</h1>
              <span className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                iure.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-blue-50/70 py-14 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="font-extrabold text-2xl lg:text-4xl text-center mb-4">
            Jadi Mitra Pertama Kami
          </div>
          <Link
            to="https://forms.gle/zP33i6xGvUppN9649"
            className="bg-hitam text-lg text-white px-6 mt-10 py-2 lg:py-3 hover:bg-hover hover:-translate-y-2 duration-300 rounded-md"
          >
            Bergabung
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
