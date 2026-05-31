import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'


const AboutPage = () => {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="min-h-screen bg-[#450693] text-white font-poppins">
      <NavBar active={3}/>
      {/* Header Section */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-[#c9f7ff]">Gradio-AI</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-200">
          Gradio-AI is an intelligent assignment grading system designed to
          improve the way teachers evaluate student work by using the power of
          Artificial Intelligence.
        </p>
      </section>

      {/* About Content Section */}
      <section className="bg-[#e6fbff] text-[#450693] py-20 px-6 md:px-20 rounded-t-[1px]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold mb-5">My Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The goal of Gradio-AI is to make the grading process faster,
              accurate, and stress-free for teachers. This system helps
              educators save time and provide better feedback to students
              without manual effort.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Why I Built This?</h3>
            <p className="text-gray-700 leading-relaxed">
              I created this project to solve the problem of time-consuming
              manual checking of assignments. With AI automation, teachers can
              focus more on teaching and student development.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-[#450693] p-12 rounded-[10px] shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#c9f7ff]">
              Project Vision
            </h3>
            <p className="text-gray-300">
              To transform traditional grading into a smart, efficient, and
              AI-assisted digital experience.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="bg-[#450693] py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          About the Developer
        </h2>

        <div className="max-w-4xl mx-auto bg-[#450693] p-10 rounded-3xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <p className="text-gray-200 text-lg leading-relaxed text-center">
            I am a passionate developer who loves building modern web
            applications. I enjoy working with React, Tailwind CSS, and AI-based
            systems. Gradio-AI represents my vision of combining technology and
            education to create smart learning tools.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
      
    </div>
  );

}

export default AboutPage