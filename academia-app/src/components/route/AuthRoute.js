import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = (props) => {
  const { isLogin } = useSelector((state) => state.auth);

  return isLogin ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default AuthRoute;
