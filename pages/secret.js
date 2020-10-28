import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import withAuth from "@/hoc/withAuth";
const Secret = ({ user, loading }) => {
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <h1>Hello I am secret page - Hello {user.name}</h1>
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(Secret)();
