import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import { useGetUser } from "@/actions/user";
import BasePage from "@/components/BasePage";
import { Row } from "reactstrap";
import Masthead from "components/shared/Masthead";
import BlogApi from "lib/api/blog";
import BlogItem from "components/shared/BlogItem";
const Blogs = ({ blogs }) => {
  const { data, loading } = useGetUser();
  // const { data: dataBlogs, loading: loadingBlogs } = useGetBlogs();
  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={data}
      loading={loading}
    >
      <Masthead imagePath="/images/home-bg.jpg">
        <h1>Fresh Blogs</h1>
        <span className="subheading">Programming, travelling...</span>
      </Masthead>
      <BasePage className="blog-body">
        <Row>
          {blogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog}></BlogItem>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export async function getStaticProps() {
  try {
    const json = await new BlogApi().getAll();
    return {
      props: { blogs: json.data },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error.message);
    return { props: { blogs: [] },revalidate: 60 };
  }
}
export default Blogs;
