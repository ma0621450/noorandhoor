import PropertyForm from "@/components/admin/properties/PropertyForm";

export const metadata = {
  title: "Edit property",
};

export default async function EditPropertyPage({ params }) {
  const { id } = await params;
  return <PropertyForm propertyId={id} />;
}
