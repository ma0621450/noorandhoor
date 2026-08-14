import Hero from "@/components/sections/home/Hero";
import FeaturedProperties from "@/components/sections/home/FeaturedProperties";
import CompanyStats from "@/components/sections/home/CompanyStats";
import TrustedPartners from "@/components/sections/home/TrustedPartners";
import Locations from "@/components/sections/home/Locations";
import OffPlanLaunches from "@/components/sections/home/OffPlanLaunches";
import Developers from "@/components/sections/home/Developers";
import NewProperties from "@/components/sections/home/NewProperties";
import RealEstateDevelopers from "@/components/sections/home/RealEstateDevelopers";
import ClientStories from "@/components/sections/home/ClientStories";
import Testimonials from "@/components/sections/home/Testimonials";
import Commitments from "@/components/sections/home/Commitments";
import OurTeam from "@/components/sections/home/OurTeam";
import Features from "@/components/sections/home/Features";
import Blogs from "@/components/sections/home/Blogs";
import FAQs from "@/components/sections/home/FAQs";
import ListYourProperty from "@/components/sections/home/ListYourProperty";
import GetStarted from "@/components/sections/home/GetStarted";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <CompanyStats />
      <TrustedPartners />
      <Locations />
      <OffPlanLaunches />
      <Developers />
      <NewProperties />
      <RealEstateDevelopers />
      <ClientStories />
      <Testimonials />
      <Commitments />
      <OurTeam />
      <Features />
      <Blogs />
      <FAQs />
      <ListYourProperty />
      <GetStarted />
    </div>
  );
}
