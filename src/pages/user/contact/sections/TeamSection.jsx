import TeamCarousel from "../components/TeamCarousel";

const TeamSection = () => {
  return (
    <section className="lg:mt-32 2xl:mx-32 mt-20 mx-4 text-hitam2">
      <div className="text-center space-y-2">
        <p className="font-bold">Hubungi kami</p>
        <p className="text-3xl font-extrabold ">Ada yang bisa dibantu?</p>
        <p className="text-sm text-gray-600">
          Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan apa
          pun.
        </p>
      </div>

      <TeamCarousel />
    </section>
  );
};

export default TeamSection;
