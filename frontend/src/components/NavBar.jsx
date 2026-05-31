import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FaHistory } from "react-icons/fa";

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation(); 

  const links = [
    { name: "Home", path: "/", icon: <FaHome size={23} className="pr-1" /> },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard size={23} className="pr-1" />,
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory size={20} className="pr-1" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <CiCircleInfo size={23} className="pr-1" />,
    },
  ];

  return (
    <>
      <nav className="w-screen h-[60px] flex items-center justify-between px-4 md:px-16 bg-[#450693] text-white font-poppins fixed top-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-[50px] w-[50px]" />
          <h1 className="text-2xl font-bold hidden sm:flex">Gradio-AI</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex w-2/3 justify-evenly items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center hover:text-blue-400 ${
                location.pathname === link.path ? "text-blue-400 " : ""
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          {!isAuthenticated ? (
            <Link to="/signup">
              <button className="bg-white text-[#450693] px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                Get Started
              </button>
            </Link>
          ) : ""}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars size={25} />
          </button>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[60px]"></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#450693] text-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={25} />
          </button>
        </div>

        <ul className="flex flex-col mt-4 space-y-6 px-4">
          {links.map((link) => (
            <li key={link.path} onClick={() => setSidebarOpen(false)}>
              <Link
                to={link.path}
                className={`flex items-center hover:text-blue-400 ${
                  location.pathname === link.path
                    ? "text-blue-400 font-bold"
                    : ""
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            </li>
          ))}

          <li onClick={() => setSidebarOpen(false)}>
            {!isAuthenticated ? (
            <Link to="/signup">
              <button className="bg-white text-[#450693] px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                Get Started
              </button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <button className="bg-white text-[#450693] px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                Create Class
              </button>
            </Link>
          )}
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NavBar;
