import React from "react";
import { useGetUser } from "@/actions/user";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { Col, Row } from "reactstrap";
export default function Cv() {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage title="My Experiences - Minh Hiep Le">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <iframe
              style={{ width: "100%", height: "800px" }}
              src="/[LE-MINH-HIEP]-CV.pdf"
            ></iframe>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}
