import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import { Row, Col } from "reactstrap";
import withAuth from "@/hoc/withAuth";
import PortfolioForm from "@/components/PortfolioForm";
import { useCreatePortfolio } from "@/actions/portfolios";
import Redirect from "@/components/shared/Redirect";

const PortfolioNew = ({ user, loading: loadingUser }) => {
  const [
    handler,
    { error, data, loading: loadingCreatePortfolio },
  ] = useCreatePortfolio();
  const handleCreatePortfolio = (data) => {
    handler(data);
  };
  if (data) {
    return <Redirect to="/portfolios"></Redirect>;
  }
  return (
    <BaseLayout user={user} loading={loadingUser}>
      <BasePage header="Create Portfolio">
        <Row>
          <Col md="8">
            <PortfolioForm onSubmit={handleCreatePortfolio} />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(PortfolioNew)("admin");
