import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function GetStarted() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h3 className="section-sub-heading">Get Started today</h3>
        <h2 className="text-gold-gradient">speak to our team</h2>
        <div className="h-[3px] w-25 bg-[#B3813D]" />
        <p className="my-2 max-w-full text-base font-normal sm:my-4 sm:max-w-2xl sm:text-lg">
          Whether you&apos;re looking to list your property or need expert
          guidance, our team is here to help
        </p>
        <Button className="w-full gap-2 sm:w-auto">
          Get In Touch
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
