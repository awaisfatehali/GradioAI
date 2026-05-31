import React, { useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllGradAssignment } from "../redux/actions/assignment.js";
import { getAllClasses } from "../redux/actions/class.js";

const HomePage = () => {
  const dispatch = useDispatch();

  // Get user from Redux
  const { user } = useSelector((state) => state.user);

  // Get assignments from Redux
  const { allData } = useSelector((state) => state.assignments); // make sure your store key matches
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?._id) {
      dispatch(getAllGradAssignment(user._id));
      dispatch(getAllClasses(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-[#450693] text-white font-poppins">
      <NavBar active={1} />
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-[#c9f7ff]">Gradio-AI</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            An AI-powered assignment grading system that helps teachers evaluate
            student work faster, smarter, and more accurately.
          </p>
          <Link to={"/signup"}>
            <button className="bg-white text-[#450693] px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Hero Image / Card */}
        <div className="mt-12 md:mt-0 bg-[#d8f6ff] p-10 rounded-[5px] shadow-2xl">
          <div className="bg-[#450693] p-12 rounded-3xl text-center shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">
              Smart Grading Dashboard
            </h2>
            <p className="text-sm text-gray-300">
              Powered by AI for accurate results
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#e6fbff] text-[#450693] py-20 px-6 md:px-20 rounded-t-[60px]">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Gradio-AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">AI Auto Grading</h3>
            <p className="text-gray-600">
              Instantly evaluate assignments using intelligent AI algorithms.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">Time Saving</h3>
            <p className="text-gray-600">
              Reduce manual checking time and focus more on teaching.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">Detailed Reports</h3>
            <p className="text-gray-600">
              Get accurate performance reports with smart insights.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
