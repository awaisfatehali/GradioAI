import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LogIn from "../components/LogIn";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <LogIn />;
};

export default LoginPage;
