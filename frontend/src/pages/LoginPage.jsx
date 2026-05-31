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

  return (
    <div className="h-full w-full flex justify-between font-poppins md:flex-row bg-[#450693] text-white min-h-screen">
      <div className="w-1/2 hidden lg:flex flex-row  justify-center items-center">
        <div className="p-5 pl-20">
          <h1 className="inline-block mb-1 typing-text text-4xl font-bold text-white overflow-hidden whitespace-nowrap border-r-4 border-white pr-2">
            Welcome Back!
          </h1>
          <p className="text-md font-semibold pt-5">
            Log in to your account and access your AI-powered grading dashboard.
            Easily track and evaluate assignments, save time, and get accurate
            results instantly.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <LogIn />
      </div>
    </div>
  );
};

export default LoginPage;
