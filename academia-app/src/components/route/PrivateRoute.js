import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ authorize }) => {
  const auth = useSelector((state) => state.auth);
  const { isLogin, payload } = auth;
  const role =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const checkRoute = [...authorize].some((x) => x === role);
  // console.log({ isLogin, checkRoute, payload, authorize });
  return isLogin && checkRoute ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
