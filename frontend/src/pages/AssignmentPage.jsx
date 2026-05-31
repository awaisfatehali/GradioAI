import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SingleAssignment from "../components/SingleAssignment";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AssignmentPage = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const {id} = useParams();
  
  return (
    <>
      <NavBar />
      <SingleAssignment id={id} />
      <Footer />
    </>
  );
};

export default AssignmentPage;
