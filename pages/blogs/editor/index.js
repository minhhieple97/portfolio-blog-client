import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import withAuth from "@/hoc/withAuth";
import { Editor } from "slate-simple-editor";
import { useCreateBlog } from "actions/blogs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const BlogEditor = ({ user, loading: loadingUser }) => {
  const router = useRouter();
  const [
    handler,
    { error, data, loading: loadingCreateBlog },
  ] = useCreateBlog();

  const handleCreateBlog = async (blog) => {
    const result = await handler(blog);
    router.push("/blogs/editor/[id]", `/blogs/editor/${result._id}`);
  };
  if (error) {
    toast.error(error);
  }
  return (
    <BaseLayout user={user} loading={loadingUser}>
      <BasePage title="Blog - Minh Hiep Le">
        <Editor loading={loadingCreateBlog} onSave={handleCreateBlog} />
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(BlogEditor)("admin");
