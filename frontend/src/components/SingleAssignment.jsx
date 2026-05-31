import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleAssignment = ({ id }) => {
  const { allData, loading } = useSelector((state) => state.assignments);
  const [d, setD] = useState(null);
  console.log(allData);

  // load single assignment safely
  useEffect(() => {
    if (allData.length > 0) {
      const found = allData.find((item) => item._id === id);
      setD(found || {});
    }
  }, [allData, id]);
  const [preview, setPreview] = useState(false);

  const handlePreview = () => {
    setPreview(true);
  };

  return (
    <div className="min-h-screen bg-[#450693] text-white font-poppins p-6 md:p-20">
      <h1 className="text-4xl font-bold mb-8">Assignment Details</h1>

      <div className="bg-[#fff] text-[#450693] p-8 rounded-sm shadow-xl max-w-3xl mx-auto">
        <p className="mb-2">
          <strong>Graded At: </strong>
          {d && new Date(d.gradedAt).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <strong>File Name: </strong> {d && d.originalFilename}
        </p>
        <p className="mb-2">
          <strong>Score: </strong> {d && d.grade}/100
        </p>
        <p className="mb-2">
          <strong>Criteria for Grading: </strong>
          {d && d.criteria}
        </p>

        <p className="mb-4">
          <strong>AI Feedback: </strong> {d && d.feedback}
        </p>

        <button
          onClick={handlePreview}
          className="bg-[#450693] text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          View Assignment
        </button>

        {preview && (
          <div className="mt-6">
            <iframe
              src={assignment.fileUrl}
              title="Assignment Preview"
              width="100%"
              height="600px"
              className="rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleAssignment;
