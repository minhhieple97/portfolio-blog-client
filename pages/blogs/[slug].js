import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import { useGetUser } from "@/actions/user";
import BlogApi from "lib/api/blog";
import { Col, Row } from "reactstrap";
import { SlateView } from "slate-simple-editor";
import Avatar from "components/shared/Avatar";
const BlogDetail = ({ blog, author }) => {
  const { data: user, loading } = useGetUser();
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage
        metaDescription={blog.subTitle}
        className="slate-container"
        title={`${blog.title} - Minh Hiep Le`}
      >
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Avatar
              title={author.name}
              image={author.picture}
              date={blog.createdAt}
            />
            <hr />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export async function getStaticPaths() {
  const { data } = await new BlogApi().getAll();
  const paths = data.map((blog) => ({ params: { slug: blog.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const {
    data: { blog, author },
  } = await new BlogApi().getBySlug(params.slug);
  return { props: { blog, author }, revalidate: 60 };
}
export default BlogDetail;
