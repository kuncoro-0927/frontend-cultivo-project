const AuthPromoPanel = () => (
  <div className="relative md:block  hidden max-w-xl lg:block shadow-lg overflow-hidden rounded-[30px]">
    {/* Gambar dengan efek sudut melengkung */}
    <div className="relative">
      <img
        src="/images/bg-home-3.jpg"
        alt="Furniture"
        className="lg:h-[600px]  object-cover  "
      />

      {/* Overlay Teks */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white bg-gradient-to-t from-black/60 to-transparent">
        <h2 className="text-2xl font-bold">
          Temukan Agrowisata Terbaik untuk Liburan Anda
        </h2>
        <p className="mt-2 text-sm">
          Kami menawarkan pengalaman agrowisata unik dari berbagai kota di
          Indonesia, dengan aktivitas yang menggabungkan keindahan alam dan
          edukasi.
        </p>

        {/* Badge Section */}
        <div className="mt-5 flex gap-3">
          <span className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-semibold">
            Tiket mudah
          </span>
          <span className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-semibold">
            Eksplor Indonesia
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default AuthPromoPanel;
