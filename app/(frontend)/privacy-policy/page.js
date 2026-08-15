import InfoPage from "@/components/ui/InfoPage";

export const metadata = {
  title: "Privacy Policy | Noor & Hoor Properties",
  description:
    "Read the Noor & Hoor Properties privacy policy and learn how we handle personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We may collect information you provide when you contact us, request property details, arrange a viewing, submit an enquiry, or subscribe to communications.",
    ],
    items: [
      "Your name, email address, telephone number, and contact preferences.",
      "Property requirements, budget, preferred location, and enquiry details.",
      "Technical information such as device, browser, IP address, and website usage data.",
      "Any other information you choose to share with our team.",
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      "To respond to enquiries and provide requested property services.",
      "To recommend properties and opportunities relevant to your requirements.",
      "To arrange viewings, calls, and other requested appointments.",
      "To improve our website, communications, and customer experience.",
      "To meet legal, regulatory, and security obligations.",
    ],
  },
  {
    title: "Sharing Your Information",
    paragraphs: [
      "We may share information with property developers, owners, landlords, service providers, and professional advisers when necessary to deliver a service you request. We may also disclose information where required by law or a competent authority.",
      "We do not sell your personal information.",
    ],
  },
  {
    title: "Cookies and Analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to operate correctly, remember preferences, understand website usage, and improve performance. You can control cookies through your browser settings, although disabling some cookies may affect website functionality.",
    ],
  },
  {
    title: "Data Retention and Security",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purpose it was collected, including legal and regulatory requirements. We use reasonable administrative and technical safeguards, but no online system can guarantee absolute security.",
    ],
  },
  {
    title: "Your Choices and Rights",
    paragraphs: [
      "Depending on applicable law, you may ask to access, correct, delete, or restrict the use of your personal information, or withdraw consent for marketing communications. We may need to verify your identity before completing a request.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: [
      "For privacy questions or requests, email Admin@noorandhoorproperties.com or call +971 52 693 8886.",
      "This policy may be updated from time to time. The latest version will always be published on this page. Last updated: 15 August 2026.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      introduction="This policy explains the types of information Noor & Hoor Properties may collect, why we use it, and the choices available to you."
      sections={sections}
    />
  );
}
