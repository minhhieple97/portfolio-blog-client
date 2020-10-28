import React from "react";
import { Container } from "reactstrap";
import Head from "next/head";
import { useRouter } from "next/router";
export default function BasePage(props) {
  const {
    noWrapper,
    indexPage,
    className = "",
    canonicalPath,
    children,
    header,
    metaDescription = "My name is Filip Jerga and I am an experienced software engineer and freelance developer.",
    title = "Minh Hiep Le - Portfolio",
  } = props;
  const pageType = indexPage ? "index-page" : "base-page";
  const router = useRouter();
  const Wrapper = noWrapper ? React.Fragment : Container;
  const canonical = canonicalPath
    ? canonicalPath
    : `${process.env.BASE_URL}${router.asPath}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={title} />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:locale" content="vi_VN" key="og:locale" />
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.BASE_URL}${router.asPath}`}
        />
        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:description"
          content={metaDescription}
          key="og:description"
        />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/images/section-1.png`}
          key="og:image"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="canonical" href={canonical}></link>
      </Head>
      <div className={`${pageType} ${className}`}>
        <Wrapper>
          {header && <PageHeader header={header}></PageHeader>}
          {children}
        </Wrapper>
      </div>
    </>
  );
}

const PageHeader = ({ header }) => (
  <div className="page-header">
    <h1 className="page-header-title">{header}</h1>
  </div>
);
