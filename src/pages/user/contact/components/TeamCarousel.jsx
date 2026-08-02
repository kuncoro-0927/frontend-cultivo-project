import CardTeam from "../../../../component/card/CardTeam";
import { TeamData } from "../../../../data_sementara/Team";
const TeamCarousel = () => {
  const teamMembers = Array.isArray(TeamData) ? TeamData.slice(0, 6) : [];

  return (
    <>
      <div className="carousel carousel-center max-w-full mt-7 md:mx-0 gap-3 lg:gap-10 lg:mt-16">
        <div className="carousel-item hidden md:hidden lg:flex lg:gap-5">
          {teamMembers.map((member, index) => (
            <CardTeam
              key={index}
              title={member.title}
              img={member.image}
              role={member.role}
            />
          ))}
        </div>
      </div>

      <div className="carousel carousel-center max-w-full space-x-3 py-3 lg:hidden">
        <div className="carousel-item gap-3 px-1">
          {teamMembers.map((member, index) => (
            <CardTeam
              key={index}
              title={member.title}
              img={member.image}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamCarousel;
