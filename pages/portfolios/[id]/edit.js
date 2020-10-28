import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";
import { useGetPortfolio } from "@/actions/portfolios";
import { Col, Row } from "reactstrap";
import PortfolioForm from "@/components/PortfolioForm";
import { useUpdatePortfolio } from "@/actions/portfolios";
import { toast } from "react-toastify";
const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const { data: dataPortfolio } = useGetPortfolio(router.query.id);
  const [
    handler,
    { error, data: dataUpdatePortfolio, loading },
  ] = useUpdatePortfolio();
  const handleUpdatePortfolio = async (portfolio) => {
    await handler(router.query.id, portfolio);
    toast.success("Portfolio has been updated", { autoClose: 2000 });
  };
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage header="Portfolio Edit" title="Edit Portfolio">
        <Row>
          {dataPortfolio && (
            <Col md="8">
              <PortfolioForm
                initialData={dataPortfolio}
                onSubmit={handleUpdatePortfolio}
              />
            </Col>
          )}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(PortfolioEdit)("admin");
