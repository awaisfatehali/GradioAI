import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Dashboard from "../components/DashBoard.jsx";

const DashBoardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh" }}>
      <NavBar active={2} />
      <Dashboard />
    </div>
  );
};

export default DashBoardPage;