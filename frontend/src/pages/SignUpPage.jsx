import React, { useEffect } from "react";
import SignUp from "../components/SignUp.jsx";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
