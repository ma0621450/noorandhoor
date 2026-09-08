import PropertyHero from "@/components/common/PropertyHero";
import ContactMain from "@/components/sections/contact/ContactMain";

export const metadata = {
  title: "Contact Us | Noor and Hoor",
  description:
    "Have questions about buying, selling, renting, or investing in Dubai? Talk to our experts for reliable guidance and support tailored to your needs.",
};

export default function ContactPage() {
  return (
    <>
      <PropertyHero variant="contact" />
      <ContactMain />
    </>
  );
}
