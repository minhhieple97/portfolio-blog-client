import React from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import { withAuth } from "@/utils/auth0";
const OnlyAdminSsr = (props) => {
  return (
    <BaseLayout user={props.user} loading={false}>
      <BasePage>
        <h1>Hello I am secret page - Hello {props.user.name}</h1>
      </BasePage>
    </BaseLayout>
  );
};
const getTitle = () => {
  return new Promise((res) => {
    setTimeout(res, 5000, { title: "My new title" });
  });
};
export const getServerSideProps = withAuth(async () => {
  const title = await getTitle();
  return title;
})("admin");
export default OnlyAdminSsr;
