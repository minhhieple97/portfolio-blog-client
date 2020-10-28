import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolio";
import { formatDate } from "helpers";
const Portfolio = ({ portfolio }) => {
  const router = useRouter();
  const { data: user, loading: loadingUser } = useGetUser();
  return (
    <BaseLayout navClass="transparent" user={user} loading={loadingUser}>
      <BasePage
        noWrapper
        indexPage
        title={`${portfolio.title} - Minh Hiep Le  `}
        metaDescription={portfolio.description}
      >
        <div className="portfolio-detail">
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              <h1 className="cover-heading">{portfolio.title}</h1>
              <p className="lead dates">
                {formatDate(portfolio.startDate)} -{" "}
                {formatDate(portfolio.endDate) || "Present"}
              </p>
              <p className="lead info mb-0">
                {portfolio.jobTitle} | {portfolio.company} |{" "}
                {portfolio.location}
              </p>
              <p className="lead">{portfolio.description}</p>
              <p className="lead">
                <a
                  href={portfolio.companyWebsite}
                  target="_"
                  className="btn btn-lg btn-secondary"
                >
                  Visit Company
                </a>
              </p>
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};
export async function getStaticPaths() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  // Get the paths we want pre-render based on portfolio ID
  const paths = portfolios.map((portfolio) => ({
    params: { id: portfolio._id },
  }));
  // fallback : flase means that "not found pages" will be resolved
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: { portfolio }, revalidate: 60 };
}
export default Portfolio;
