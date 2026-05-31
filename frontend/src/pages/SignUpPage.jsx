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
      <div className="h-full w-full flex justify-between font-poppins md:flex-row bg-[#450693] text-white min-h-screen">
        <div className="w-full lg:w-1/2">
          <SignUp />
        </div>
        <div className="w-1/2 hidden lg:flex flex-row justify-center items-center">
          <div className="p-5 pl-20">
            <h1 className=" inline-block mb-1 typing-text1 text-4xl font-bold text-white overflow-hidden whitespace-nowrap border-r-4 border-white pr-2">
              Get Started!
            </h1>
            <p className="text-md font-semibold pt-5">
              Create your account to start using AI for assignment grading.
              Simplify evaluations, monitor progress, and make grading faster
              and smarter.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
