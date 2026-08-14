import ContactHero from "@/components/sections/contact/ContactHero";
import ContactMain from "@/components/sections/contact/ContactMain";

export const metadata = {
  title: "Contact Us | Noor and Hoor",
  description:
    "Get in touch with Noor and Hoor Properties. Speak with our General Manager, telecaller, or off-plan specialist in Dubai.",
};

export default function ContactPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#111111]">
      <ContactHero />
      <ContactMain />
    </div>
  );
}
