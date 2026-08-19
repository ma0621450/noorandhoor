import BlogForm from "@/components/admin/blogs/BlogForm";

export const metadata = {
  title: "Edit blog",
};

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  return <BlogForm blogId={id} />;
}
