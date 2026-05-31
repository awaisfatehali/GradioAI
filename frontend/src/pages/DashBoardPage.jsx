import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Dashboard from "../components/DashBoard.jsx"

const DashBoardPage = () => {
    useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <NavBar active={2} />
      <Dashboard/>
    </div>
  );
};

export default DashBoardPage;
