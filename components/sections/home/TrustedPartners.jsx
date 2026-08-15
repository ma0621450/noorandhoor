import partner1 from "@/public/images/landingpage/TrustedPartner1.png";
import partner2 from "@/public/images/landingpage/TrustedPartner2.png";
import partner3 from "@/public/images/landingpage/TrustedPartner3.png";
import partner4 from "@/public/images/landingpage/TrustedPartner4.png";
import partner5 from "@/public/images/landingpage/TrustedPartner5.png";
import Image from "next/image";

const TRUSTED_PARTNERS = [
    {
        image: partner1,
    },
    {
        image: partner2,
    },
    {
        image: partner3,
    },
    {
        image: partner4,
    },
    {
        image: partner5,
    },
]
export default function TrustedPartners() {
    return (
        <section className="section-container">
            <div className="text-center flex flex-col items-center gap-8 mb-12">
            <h3 className="section-sub-heading">Trusted Partners</h3>
            <div className="flex flex-col items-center gap-6">
            <h2 className="text-gold-gradient">Our Valued Business & Property Partners</h2>
            <div className="h-[4px] w-25 bg-[#B3813D]"/>
            </div>
            <p className="text-md font-medium">Our network includes trusted developers and agents, working with Noor & Hoor Properties to deliver reliable real estate solutions.</p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
                {TRUSTED_PARTNERS.map((partner, index) => (
                    <div key={index} className="mx-auto flex w-full max-w-[207px] items-center justify-center">
                        <Image
                          src={partner.image}
                          alt={`Trusted partner ${index + 1}`}
                          width={350}
                          height={350}
                          className="h-auto w-full max-w-full object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}