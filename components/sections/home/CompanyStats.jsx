import icon1 from "@/public/svgs/message-thumbs-up.svg";
import icon2 from "@/public/svgs/user-avatar.svg";
import icon3 from "@/public/svgs/analytic.svg";
import icon4 from "@/public/svgs/burj-al-arab.svg";
import Image from "next/image";

const COMPANY_STATS = [
    {
        id: 1,
        icon: icon1,
        title: "95%",
        description: "Satisfaction Rate",
    },
    {
        id: 2,
        icon: icon2,
        title: "5,000+",
        description: "Happy Clients Served",
    },
    {
        id: 3,
        icon: icon3,
        title: "92%",
        description: "Successful Deal Closure Rate",
    },
    {
        id: 4,
        icon: icon4,
        title: "4",
        description: "Major UAE Emirates Covered",
    },
]

export default function CompanyStats() {
    return (
        <section className="section-container">
            <div className="text-center flex flex-col items-center gap-8 mb-12">
            <h3 className="section-sub-heading">Our Stats</h3>
            <div className="flex flex-col items-center">
            <h2 className="text-gold-gradient max-w-[800px] mb-4">Company Stats</h2>
            <div className="h-[4px] w-25 bg-[#B3813D]"/>
            </div>
            <p className="text-md font-medium">We are reliable UAE property experts committed to delivering trusted real estate solutions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {COMPANY_STATS.map((stat) => (
                    <div key={stat.id} className="bg-[#1A1A1A] p-6 rounded-md shadow-[0_4px_8px_0_#D4AF3740]">
                        <div className="bg-[#ba8a44] rounded-sm p-2 w-fit mb-4">
                        <Image src={stat.icon} alt={stat.description} width={24} height={24} />
                        </div>
                        <h3 className="!font-accent text-3xl font-bold mb-1">{stat.title}</h3>
                        <p className="text-md font-medium text-[#E9C349]">{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}