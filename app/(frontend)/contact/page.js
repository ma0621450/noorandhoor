import PropertyHero from "@/components/common/PropertyHero";
import ContactMain from "@/components/sections/contact/ContactMain";

export const metadata = {
  title: "Contact Us | Noor and Hoor",
  description:
    "Get in touch with Noor and Hoor Properties. Speak with our General Manager, telecaller, or off-plan specialist in Dubai.",
};

export default function ContactPage() {
  return (
    <>
      <PropertyHero variant="contact" />
      <ContactMain />
    </>
  );
}
