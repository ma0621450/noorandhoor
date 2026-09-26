import DeveloperForm from "@/components/admin/developers/DeveloperForm";

export const metadata = {
  title: "Edit developer",
};

export default async function AdminEditDeveloperPage({ params }) {
  const { id } = await params;
  return <DeveloperForm developerId={id} />;
}
