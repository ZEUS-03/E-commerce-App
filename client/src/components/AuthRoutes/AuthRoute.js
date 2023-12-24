import React from "react";
import Login from "../Users/Forms/Login";

const AuthRoute = ({ children }) => {
  // get User from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isUserLoggedIn = userInfo?.token ? true : false;
  if (!isUserLoggedIn) return <Login />;
  return <>{children}</>;
};

export default AuthRoute;
