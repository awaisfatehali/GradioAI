import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Backend_url } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

const ClassCard = ({ title, description, id, onClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    const del = await axios.delete(`${Backend_url}/class/delete_class/${id}`, {
      withCredentials: true,
    });
    if (del?.data?.success) {
      toast.success("Class Deleted!");
    } else {
      toast.error("Error Occured!");
    }
    setShowConfirm(false);
  };

  return (
    <>
      {/* Confirmation Popup */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl p-7 shadow-xl flex flex-col items-center gap-4 w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#2d0066] text-center">
              Delete Class?
            </h3>
            <p className="text-sm text-[#450693]/60 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#450693]">{title}</span>? This
              will also delete all its assignments.
            </p>
            <div className="flex gap-3 w-full mt-1">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-xl border border-[#450693]/20 text-[#450693] font-semibold text-sm hover:bg-[#f4f0ff] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card — unchanged */}
      <div className="group relative bg-white border border-[#450693]/10 hover:border-[#450693]/35 hover:shadow-lg rounded-3xl p-7 flex flex-col gap-4 cursor-pointer transition-all duration-200 min-h-[160px] justify-center">
        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 hover:bg-[#450693] flex items-center justify-center transition-all duration-200"
        >
          <svg
            className="w-4 h-4 text-[#450693] hover:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>

        {/* Icon + Title row */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ede7ff] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#450693] transition-all duration-200">
            <svg
              className="w-6 h-6 text-[#450693] group-hover:text-white transition-all duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-[#450693]/45 uppercase tracking-widest mb-0.5">
              Class Name
            </p>
            <h2 className="text-base font-bold text-[#2d0066] truncate">
              {title}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#450693]/8" />

        {/* Description */}
        <p className="text-sm text-[#450693]/60 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-semibold text-[#450693]/40">
            Click to open
          </span>

          <div className="w-7 h-7 rounded-full bg-[#f4f0ff] group-hover:bg-[#450693] flex items-center justify-center transition-all duration-200">
            <Link to={`/classeview/${id}`}>
              <svg
                className="w-3.5 h-3.5 text-[#450693] group-hover:text-white transition-all duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;