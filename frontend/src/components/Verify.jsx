import React from "react";
import { IoCloudDoneSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c8f0ff] font-poppins">
      <div className="bg-[#450693] text-white p-10 rounded-xl shadow-2xl text-center max-w-md w-full">
        <IoCloudDoneSharp size={70} className="w-24 mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-4">Verification Complete!</h1>
        <p className="text-lg mb-6">
          Your account has been successfully verified. You can now log in and
          start using AI for assignment grading.
        </p>
        <div className="bg-[#ffffff] text-[#450693] font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition">
          <Link to={"/login"}>Go to Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
