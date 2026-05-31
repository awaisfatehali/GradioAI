import React, { useState } from "react";
import ClassCard from "./ClassCard";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Backend_url } from "../server";
import { getAllClasses } from "../redux/actions/class";
import { Link } from "react-router-dom";

const CreateClassPage = () => {
  const [classess, setClassess] = useState([]);
  const [classTitle, setClassTitle] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { classes } = useSelector((state) => state.classesdata);
  const dispatch = useDispatch();

  const handleCreateClass = async () => {
    if (!classTitle || !classDesc) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Replace with your backend URL
      const { data } = await axios.post(
        `${Backend_url}/class/create-class`,
        {
          className: classTitle,
          description: classDesc,
          teacherId: user?._id,
        },
        {
          withCredentials: true,
        },
      );

      // Add newly created class to state
      setClassess([data.class, ...classess]);
      toast.success("Class created successfully");

      // Reset form
      setClassTitle("");
      setClassDesc("");
      setIsModalOpen(false);
      dispatch(getAllClasses(user?._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  const handleClassClick = (classItem) => {
    toast.success(`Clicked on class: ${classItem}`);
  };

  return (
    <>
      <div className="min-h-screen bg-[#450693] px-6 sm:px-10">
        <h1 className="text-white text-xl sm:text-4xl font-bold text-left mb-2 sm:mb-10">
          Class Dashboard
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-3/10 bg-[#DDF6FF] rounded-[4px] p-2 sm:p-6 shadow-lg flex flex-col justify-start">
            <h2 className="text-[#450693] text-sm sm:text-2xl w-full font-bold sm:mb-4">
              Welcome!
            </h2>
            <p className="text-purple-900 text-sm md:text-lg mb-6">
              You can create a new class by clicking the button below. Manage
              all your classes and assignments efficiently from here.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#450693] text-white px-6 py-3 rounded-[4px] hover:bg-purple-900 transition self-start"
            >
              Create
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:w-7/10">
            <h2 className="text-white text-2xl font-bold mt-0 pt-0 mb-2 text-left lg:text-left">
              Availible Classes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {classes && classes.length === 0 && (
                <p className="text-center text-purple-200 col-span-full">
                  No classes created yet
                </p>
              )}
              {classes &&
                classes.map((cls) => (
                  <ClassCard
                    key={cls._id}
                    title={cls.className}
                    id={cls._id}
                    description={cls.description}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl p-6 w-full max-w-md z-10 shadow-lg">
            <h2 className="text-purple-900 text-xl font-bold mb-4 text-center">
              Create Class
            </h2>
            <input
              type="text"
              placeholder="Class Title"
              className="w-full p-3 rounded-lg mb-4 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black placeholder:text-gray-400"
              value={classTitle}
              onChange={(e) => setClassTitle(e.target.value)}
            />
            <textarea
              placeholder="Class Description"
              className="w-full p-3 rounded-lg mb-4 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black placeholder:text-gray-400"
              value={classDesc}
              onChange={(e) => setClassDesc(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-purple-600 text-purple-900 hover:bg-purple-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClass}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-purple-900 text-white hover:bg-purple-800 transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClassPage;
