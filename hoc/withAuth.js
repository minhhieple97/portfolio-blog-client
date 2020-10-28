import { useGetUser } from "@/actions/user";
import Redirect from "@/components/shared/Redirect";
import React from "react";
import { isAuthorizeUser } from "@/utils/auth0";
const withAuth = (Component) => (role) => (props) => {
  const { data, loading } = useGetUser();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <Redirect to="/api/v1/login"></Redirect>;
  } else {
    if (!isAuthorizeUser(data, role) && role)
      return <Redirect to="/api/v1/login"></Redirect>;
    return <Component user={data} loading={loading} {...props} />;
  }
};
export default withAuth;


