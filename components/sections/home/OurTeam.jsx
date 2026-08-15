import TeamCard from "@/components/ui/TeamCard";
import team2 from "@/public/images/landingpage/team2.png";
import team3 from "@/public/images/landingpage/team3.png";
import team4 from "@/public/images/landingpage/team4.png";

const TEAM_MEMBERS = [
  {
    id: 2,
    image: team2,
    name: "Shakeeb Ahmed Khan",
    title: "General Manager",
  },
  {
    id: 3,
    image: team3,
    name: "Ayesha saleem",
    title: "Telecaller",
  },
  {
    id: 4,
    image: team4,
    name: "Usman Sarwar",
    title: "Off plan Officer",
  },
];

export default function OurTeam() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center sm:mb-12 lg:mb-16">
        <h2 className="text-gold-gradient">The Minds Behind Our Success</h2>
        <div className="h-[4px] w-25 bg-[#B3813D]" />
        <p className="w-full max-w-[700px] text-sm font-medium text-white sm:text-base">
          Our dedicated professionals are working together to bring you the
          finest real estate opportunities in Dubai.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
