import React from "react";
import Login from "../Users/Forms/Login";

const AuthAdminRoute = ({ children }) => {
  // get User from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.userFound?.isAdmin ? true : false;
  if (!isAdmin)
    return (
      <h1>Access Denied! Admin previledge is not allowed for this account.</h1>
    );
  return <>{children}</>;
};

export default AuthAdminRoute;
