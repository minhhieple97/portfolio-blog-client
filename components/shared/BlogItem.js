import Link from "next/link";
import { Col } from "reactstrap";
import React from "react";
import moment from "moment";
const BlogItem = ({ blog }) => {
  return (
    <Col key={blog._id} md="10" lg="8" className="mx-auto">
      <div>
        <div className="post-preview clickable">
          <Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
            <a>
              <h2 className="post-title">{blog.title}</h2>
              <h3 className="post-subtitle">{blog.subTitle}</h3>
            </a>
          </Link>
          <p className="post-meta">
            Posted by
            <a href="#"> {blog.author.name} </a>-{" "}
            {moment(blog.createdAt).format("LLLL")}
          </p>
        </div>
        <hr></hr>
      </div>
    </Col>
  );
};

export default BlogItem;
