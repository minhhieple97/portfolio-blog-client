import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import { Row, Col, Button } from "reactstrap";
import Masthead from "components/shared/Masthead";
import PortButtonDropdown from "components/shared/Dropdown";
import withAuth from "hoc/withAuth";
import { useGetUserBlogs, useUpdateBlog } from "actions/blogs";
import { toast } from "react-toastify";
const Dashboard = ({ user, loading }) => {
  const [
    handler,
    { error, data: dataUpdateBlog, loading: loadingUpdateBlog },
  ] = useUpdateBlog();
  const {
    error: errorGetUserBlogs,
    data: dataGetUserBlogs,
    loading: loadingGetUserBlogs,
    mutate,
  } = useGetUserBlogs();
  const createOption = (status) => {
    return status === "draft"
      ? { view: "Publish Story", value: "published" }
      : { view: "Make a draft", value: "draft" };
  };
  const handleUpdateStatusBlog = async (id, status) => {
    try {
      await handler(id, status);
      mutate();
    } catch (error) {
      console.log(error);
      toast.error("Sorry something went wrong!");
    }
  };
  const createOptions = (blog) => {
    const option = createOption(blog.status);
    return [
      {
        key: `${blog._id}-published`,
        text: option.view,
        handlers: {
          onClick: () => {
            handleUpdateStatusBlog(blog._id, { status: option.value });
          },
        },
      },
      {
        key: `${blog._id}-delete`,
        text: "Delete",
        handlers: {
          onClick: () => {
            handleUpdateStatusBlog(blog._id, { status: "deleted" });
          },
        },
      },
    ];
  };
  const renderBlogs = (blogs, status) => (
    <ul className="user-blogs-list">
      {blogs
        .filter((blog) => blog.status === status)
        .map((blog) => (
          <li key={blog._id}>
            <Link href="/blogs/editor/[id]" as={`/blogs/editor/${blog._id}`}>
              <a>{blog.title}</a>
            </Link>
            <PortButtonDropdown
              items={createOptions(blog)}
            ></PortButtonDropdown>
          </li>
        ))}
    </ul>
  );
  return (
    <BaseLayout navClass="transparent" user={user} loading={loading}>
      <Masthead imagePath="/images/home-bg.jpg">
        <span className="subheading">
          Let's write some nice blog today{" "}
          <Link href="/blogs/editor">
            <Button color="primary">Create a new Blog</Button>
          </Link>
        </span>
      </Masthead>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Published Blogs </h2>
            {dataGetUserBlogs && renderBlogs(dataGetUserBlogs, "published")}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Draft Blogs </h2>
            {dataGetUserBlogs && renderBlogs(dataGetUserBlogs, "draft")}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
// export const getServerSideProps = withAuth(async ({ req, res }) => {
//   try {
//     const { accessToken } = await auth0.getSession(req);
//     const json = await new BlogApi(accessToken).getByUser();
//     return { blogs: json.data };
//   } catch (error) {
//     console.log(error.message);
//     return { props: {} };
//   }
// })("admin");

export default withAuth(Dashboard)("admin");
