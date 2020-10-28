import React, { useState } from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolio";
import PortfolioCard from "@/components/PortfolioCard";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import { isAuthorizeUser } from "../../utils/auth0";
import { useDeletePortfolio } from "@/actions/portfolios";
import { deletePortfolio } from "../../actions/portfolios";
const Portfolios = ({ portfolios: initialPortfolios }) => {
  const { data: user, loading: loadingUser } = useGetUser();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [
    handler,
    { error, data: dataDeletePortfolio, loading },
  ] = useDeletePortfolio();
  const handleDeletePortfolio = async (id, e) => {
    e.stopPropagation();
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );
    if (isConfirm) {
      await handler(id);
      const newPortfolios = portfolios.filter((e) => e._id !== id);
      setPortfolios(newPortfolios);
    }
  };
  const router = useRouter();
  return (
    <BaseLayout user={user} loading={loadingUser}>
      <BasePage
        className="portfolio-page"
        header="Portfolios"
        title="Newest Portfolio - Minh Hiep Le"
      >
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              key={portfolio._id}
              md="4"
              onClick={() => {
                router.push("/portfolios/[id]", `/portfolios/${portfolio._id}`);
              }}
            >
              <PortfolioCard portfolio={portfolio}>
                {user && isAuthorizeUser(user, "admin") && (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          "/portfolios/[id]/edit",
                          `/portfolios/${portfolio._id}/edit`
                        );
                      }}
                      className="mr-2"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={handleDeletePortfolio.bind(null, portfolio._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </PortfolioCard>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
// This function is called during the build time
// Improved performance of page
// Nó sẽ tạo trang tĩnh với dữ liệu động.
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  return {
    props: {
      portfolios: json.data,
      revalidate: 1,
    },
  };
}
export default Portfolios;
