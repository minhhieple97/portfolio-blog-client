import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import withAuth from "@/hoc/withAuth";
import { Editor } from "slate-simple-editor";
import { useGetBlog, useUpdateBlog } from "actions/blogs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const BlogUpdate = ({ user, loading: loadingUser }) => {
  const router = useRouter();
  const { data: dataGetBlogById, loading: loadingGetBlogById } = useGetBlog(
    router.query.id
  );
  const [
    handler,
    { error, data: dataUpdateBlog, loading: loadingUpdateBlog },
  ] = useUpdateBlog();
  const handleUpdateBlog = async (data) => {
    await handler(router.query.id, data);
    toast.success("Blog has been updated!");
  };
  if (error) {
    toast.error(error);
  }
  return (
    <BaseLayout user={user} loading={loadingUser}>
      <BasePage>
        {!loadingGetBlogById &&
          (dataGetBlogById && dataGetBlogById.content ? (
            <Editor
              header="Update your Blog..."
              loading={loadingUpdateBlog}
              initialContent={dataGetBlogById.content}
              onSave={handleUpdateBlog}
            />
          ) : (
            <h2>What are you looking for -_-?</h2>
          ))}
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(BlogUpdate)("admin");
