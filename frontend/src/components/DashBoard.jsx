import React, { useState, useRef, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaUpload, FaUser, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ProfilePage from "../pages/ProfilePage";
import { Link } from "react-router-dom";
import { MdViewInAr } from "react-icons/md";
import { Hourglass } from "react-loader-spinner";
import { getAllGradAssignment } from "../redux/actions/assignment";
import CreateClassPage from "./CreateClassPage";
import { SiGoogleclassroom } from "react-icons/si";
import { Backend_url } from "../server";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Strict");
  const levels = ["Chill", "Medium", "Strict"];

  const [activePage, setActivePage] = useState("classes");

  const [assignments, setAssignments] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [gradingCriteria, setGradingCriteria] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { user } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const { allData } = useSelector((state) => state.assignments);
  const { classes } = useSelector((state) => state.classesdata);

  const handleRemoveFile = (index) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFiles = (files) => {
    if (files.length > 0)
      setAssignments((prev) => [...prev, ...Array.from(files)]);
  };

  const handleFileChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleOpenFile = (file) => setFilePreview(URL.createObjectURL(file));
  const handleClosePreview = () => setFilePreview(null);

  const handleSubmitGrades = async () => {
    if (assignments.length === 0)
      return toast.error("Upload at least one assignment.");
    if (!gradingCriteria.trim()) return toast.error("Enter grading criteria.");
    if (!selectClass) return toast.error("Select a class.");

    setLoading(true);
    setResults([]);

    const formData = new FormData();
    formData.append("teacherId", user._id);
    formData.append("criteria", gradingCriteria);
    formData.append("level", selected);

    formData.append("className", selectClass);

    const selectedClassObj = classes?.find(
      (item) => item.className === selectClass
    );

    formData.append("classId", selectedClassObj?._id || "");

    assignments.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        `${Backend_url}/assignment/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResults(response.data?.data || []);
      toast.success("Grading Complete!");
      setAssignments([]);
      setGradingCriteria("");
      setSelected("Strict");
      setSelectClass("");
      dispatch(getAllGradAssignment(user._id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#450693] text-white">
      {/* --------- COMPACT SIDEBAR --------- */}
      <div className="w-10 sm:w-20 bg-[#2d0066] flex flex-col items-center py-6 space-y-10 shadow-xl fixed h-screen">
        <button
          onClick={() => setActivePage("classes")}
          className={`p-3 rounded-r-2xl sm:rounded-[10px] transition hover:bg-white/20 ${
            activePage === "classes" && "bg-white text-black"
          }`}
        >
          <SiGoogleclassroom size={22} />
        </button>

        <button
          onClick={() => setActivePage("upload")}
          className={`p-3 rounded-r-2xl sm:rounded-[10px] transition hover:bg-white/20 ${
            activePage === "upload" && "bg-white text-black"
          }`}
        >
          <FaUpload size={22} />
        </button>

        <button
          onClick={() => setActivePage("graded")}
          className={`p-3 rounded-r-2xl sm:rounded-[10px] hover:bg-white/20 ${
            activePage === "graded" && "bg-white text-black"
          }`}
        >
          <FaCheckCircle size={22} />
        </button>

        <div className="flex flex-col items-center space-y-8 mt-0">
          <button
            onClick={() => setActivePage("profile")}
            className={`p-3 rounded-r-2xl sm:rounded-[10px] transition hover:bg-white/20 ${
              activePage === "profile" && "bg-white text-black"
            }`}
          >
            <FaUser size={22} />
          </button>
        </div>
      </div>

      {/* --------- MAIN CONTENT --------- */}
      <div className="flex-1 p-6 md:p-10 ml-10">
        {/* -------- UPLOAD ASSIGNMENTS -------- */}
        {activePage === "upload" && (
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Upload Assignments
            </h1>

            <div className="bg-[#e6fbff] w-full md:w-[70%] m-auto text-[#4b0082] p-6 md:p-8 rounded-[10px] shadow-xl">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
                className="w-full p-6 md:p-8 mb-6 border-2 border-[#450693]  
                text-center cursor-pointer hover:bg-white/10 transition"
              >
                <IoIosAddCircle size={50} className="mx-auto text-[#450693]" />
                <p className="mt-2 text-[#450693]">Click or drag files here</p>
              </div>

              <input
                type="file"
                accept="application/pdf"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Uploaded Files */}
              {assignments.length === 0 ? (
                <p className="text-gray-600">No assignments uploaded yet.</p>
              ) : (
                <ul className="space-y-3">
                  {assignments.map((file, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center gap-4"
                    >
                      <span className="text-[#450693] font-semibold break-all">
                        {file.name}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenFile(file)}
                          className="bg-[#450693] text-white px-2 py-2 rounded-[50%] hover:bg-[#2d0066]"
                        >
                          <MdViewInAr />
                        </button>

                        <button
                          onClick={() => handleRemoveFile(idx)}
                          className="text-black hover:text-red-500"
                        >
                          <IoIosCloseCircleOutline size={25} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {assignments.length > 0 && (
                <div className="mt-6 relative">
                  <label className="font-semibold text-[#450693]">
                    Grading Criteria
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-md mt-2"
                    value={gradingCriteria}
                    onChange={(e) => setGradingCriteria(e.target.value)}
                  />

                  <label className="font-semibold text-[#450693]">
                    Select Class
                  </label>

                  {classes && classes.length !== 0 ? (
                    <select
                      className="w-full p-3 border rounded-md mt-2"
                      value={selectClass}
                      onChange={(e) => setSelectClass(e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls._id} value={cls.className}>
                          {cls.className}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h1 className="text-red-600 font-semibold mt-2">
                      Please create a class first
                    </h1>
                  )}

                  <h1 className="font-semibold mt-4">
                    Select Level of Strictness
                  </h1>
                  <div className="flex rounded-[4px] overflow-hidden border w-fit mt-2">
                    {levels.map((level, index) => (
                      <div
                        key={index}
                        onClick={() => setSelected(level)}
                        className={`px-5 py-2 cursor-pointer text-sm 
                          transition-all duration-200
                          ${
                            selected === level
                              ? "bg-[#450693] text-white"
                              : "bg-gray-100 text-black"
                          }
                        `}
                      >
                        {level}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubmitGrades}
                    disabled={loading}
                    className="bg-[#450693] text-white px-5 py-3 font-[24px] rounded-xl font-semibold hover:scale-105 transition sm:absolute bottom-0 right-0 border shadow-2xl mt-3"
                  >
                    {loading ? "AI is Grading..." : "GRADE"}
                  </button>
                </div>
              )}

              {/* ---------- AI GRADING RESULTS ---------- */}
              {results.length > 0 && (
                <div className="mt-8 bg-white p-6 rounded-2xl shadow text-black">
                  <h2 className="text-2xl font-bold text-center text-[#450693] mb-4">
                    AI Grading Results
                  </h2>

                  <div className="space-y-5">
                    {results.map((item, index) => (
                      <div
                        key={index}
                        className="border border-[#450693] rounded-xl p-4"
                      >
                        <p className="font-semibold text-[#450693]">
                          File: {item.originalFilename}
                        </p>

                        <p className="text-lg font-bold">
                          Grade: {item.grade}/100
                        </p>

                        <p className="mt-2">
                          <span className="font-semibold text-[#450693]">
                            Feedback:
                          </span>{" "}
                          {item.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === "classes" && <CreateClassPage />}

        {/* -------- GRADED ASSIGNMENTS -------- */}
        {activePage === "graded" && (
          <div className="text-white sm:ml-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Graded Assignments
            </h1>

            {allData && allData.length === 0 ? (
              <p>No graded assignments yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {allData.map((res, i) => (
                  <div
                    key={i}
                    className="bg-[#DDF6FF] p-5 rounded-xl text-black shadow"
                  >
                    <div className="flex justify-between items-center">
                      <p>{`Dated: ${new Date(
                        res.gradedAt
                      ).toLocaleDateString()}`}</p>
                      <Link to={`/assignment/${res._id}`}>
                        <button className="bg-[#450693] text-white px-3 py-1 rounded-xl font-semibold hover:scale-105 transition">
                          View
                        </button>
                      </Link>
                    </div>
                    <h2 className="font-bold text-lg">
                      ClassName : {res.class.className}
                    </h2>
                    <h2 className="font-bold text-lg">
                      {res.originalFilename}
                    </h2>
                    <p className="text-xl font-bold text-[#450693]">
                      {res.grade}/100
                    </p>
                    <p className="text-md font-semibold text-[#450693]">
                      Strictness : {res.strictNess || "N/A"}
                    </p>
                    <p className="mt-2">{res.feedback}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------- PROFILE -------- */}
        {activePage === "profile" && (
          <div className="w-full sm:ml-10 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">My Profile</h1>
            <ProfilePage />
          </div>
        )}
      </div>

      {/* --------- PDF PREVIEW MODAL --------- */}
      {filePreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow w-full max-w-3xl h-[75%] md:h-[80%] flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={handleClosePreview}
                className="bg-[#450693] text-white px-4 py-2 rounded-xl"
              >
                <MdCancel size={25} />
              </button>
            </div>
            <iframe
              src={filePreview}
              className="flex-1 mt-4 w-full rounded-xl"
            ></iframe>
          </div>
        </div>
      )}

      {/* ---------- FULL SCREEN LOADING OVERLAY ---------- */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
          <div className="p-6 bg-transparent text-black w-[150px] h-[150px] shadow-[10px_10px_5px_5px_rgba(109,40,217)] rounded-[90px] flex justify-center items-center flex-col space-y-4">
            <Hourglass
              visible={true}
              height="40"
              width="40"
              ariaLabel="hourglass-loading"
              colors={["white", "white"]}
            />
            <h3 className="text-[white] font-semibold">Please Wait!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
