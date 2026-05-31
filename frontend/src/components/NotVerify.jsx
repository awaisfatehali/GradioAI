import React, { useEffect } from "react";
import { BiSolidError } from "react-icons/bi";


const NotVerify = () => {
    
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c8f0ff] font-poppins">
      <div className="bg-[#450693] text-white p-10 rounded-xl shadow-2xl text-center max-w-md w-full">
        <BiSolidError  
        size={70} 
          className="w-24 mx-auto mb-6 text-red-400"
        />

        <h1 className="text-3xl font-bold mb-4">Verification Failed!</h1>
        <p className="text-lg mb-6">
          Something Went Wrong Try Again Later!</p>
      </div>
    </div>
  );
};

export default NotVerify;
