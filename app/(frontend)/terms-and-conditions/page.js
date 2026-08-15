import InfoPage from "@/components/ui/InfoPage";

export const metadata = {
  title: "Terms & Conditions | Noor & Hoor Properties",
  description:
    "Review the terms and conditions for using the Noor & Hoor Properties website and services.",
};

const sections = [
  {
    title: "Using This Website",
    paragraphs: [
      "By accessing this website, you agree to these terms and conditions. If you do not agree, please stop using the website. You must use the website only for lawful purposes and must not interfere with its operation or security.",
    ],
  },
  {
    title: "Property Information",
    paragraphs: [
      "Property listings, prices, sizes, availability, payment plans, images, and descriptions are provided for general information. They may be supplied by owners, landlords, developers, or other third parties and may change without notice.",
      "While we aim to keep information accurate, you should independently verify material details before making a decision, signing a document, or transferring funds. Website content does not constitute legal, financial, tax, or investment advice.",
    ],
  },
  {
    title: "Enquiries and Transactions",
    paragraphs: [
      "Submitting an enquiry does not reserve a property or create a binding agreement. Any property transaction is subject to availability, identity and compliance checks, agreed documentation, and the terms signed by the relevant parties.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "The website design, branding, text, graphics, and other original content belong to Noor & Hoor Properties or are used with permission. You may view and print content for personal, non-commercial use, but you may not reproduce, distribute, modify, or commercially exploit it without prior written permission.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "This website may contain links to third-party websites or services. These links are provided for convenience. We do not control and are not responsible for third-party content, availability, security, or privacy practices.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by applicable law, Noor & Hoor Properties is not liable for indirect or consequential loss arising from use of, or reliance on, this website. Nothing in these terms excludes liability that cannot legally be excluded.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these terms to reflect changes to the website, our services, or applicable requirements. Updated terms take effect when published on this page. Last updated: 15 August 2026.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about these terms can be sent to Admin@noorandhoorproperties.com or discussed with our team by calling +971 52 693 8886.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms & Conditions"
      introduction="These terms govern your use of the Noor & Hoor Properties website and the information made available through it."
      sections={sections}
    />
  );
}
