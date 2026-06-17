import Image from "next/image";
import aboutImage from "@/public/images/landingpage/AboutImg.png";
export default function About() {
    return (
        <section className="section-container">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex flex-col gap-4 max-w-xl">
                    <h3 className="section-sub-heading">About Us</h3>
                    <h2 className="text-gold-gradient max-w-full lg:max-w-[440px]">About Noor & Hoor Properties</h2>
                    <div className="h-[4px] w-25 bg-[#B3813D] mb-1" />
                    <p className="max-w-full lg:max-w-[425px] font-medium text-md">Noor & Hoor Properties is a UAE real estate brokerage offering residential, commercial, and off-plan investment solutions across Dubai, Abu Dhabi, Sharjah & Ajman. We deliver guidance, market insight, and end-to-end support for buyers, sellers & investors, ensuring property decisions have long-term value.</p>
                </div>

                <div>
                    <Image
                        src={aboutImage}
                        alt="About Us"
                        width={700}
                        height={700}
                        className="h-auto w-auto mx-auto"
                    />
                </div>

            </div>
        </section>
    );
}