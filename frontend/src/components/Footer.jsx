import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2d0066] text-gray-300 px-8 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            
            
            <img src="/logo.png" alt="Logo" className="h-[50px] w-[50px]" />
            <h1 className="text-2xl font-bold text-white">Gradio-AI</h1>
          </div>

          <p className="leading-relaxed text-gray-400">
            Ai Powered Grading System
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
          <ul className="space-y-2">
            <Link to={"/"} ><li className="hover:text-white cursor-pointer">Home</li></Link>
            <li className="hover:text-white cursor-pointer">AI Detector</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <Link to={"/login"}><li className="hover:text-white cursor-pointer">Login</li></Link>
            <Link to={"signup"}><li className="hover:text-white cursor-pointer">Sign Up</li></Link>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <Link to={"/about"}><li className="hover:text-white cursor-pointer">About</li></Link>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Partnership */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Partnership</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">
              Affiliate Program
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12"></div>

      {/* Copyright */}
      <p className="text-center text-gray-500 mt-8">
       © 2025 Awais Fateh Ali. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
