import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Backend_url } from "../server";
import { toast } from "react-toastify";
import { getAllGradAssignment } from "../redux/actions/assignment";
import { MdDelete } from "react-icons/md";


const HistoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allData } = useSelector((state) => state.assignments);

  // Sort newest first
  const sortedAssignments = [...(allData || [])].sort(
    (a, b) => new Date(b.gradedAt) - new Date(a.gradedAt)
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Delete handler
  const handleDelete = async (filename) => {
    try {
      const res = await axios.delete(`${Backend_url}/assignment/del-assignment/${filename}`, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="min-h-screen w-full py-4 px-4 sm:px-6 md:px-10"
        style={{ background: "#3A0094" }}
      >
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-2">
          Assignment History
        </h1>

        <div
          className="min-h-[70vh] max-w-5xl mx-auto rounded-[4px] p-2 sm:p-4 bg-[#DDF6FF] overflow-x-auto"
          style={{ maxHeight: "70vh", marginTop: "20px", marginBottom: "20px" }}
        >
          {/* No Items */}
          {(!allData || allData.length === 0) && (
            <p className="text-center text-xl font-semibold text-purple-800">
              No items yet
            </p>
          )}

          {/* Items Table */}
          {allData && allData.length > 0 && (
            <table className="sm:w-full min-w-[700px] border-collapse">
              <thead className="sticky top-0 bg-[#DDF6FF]">
                <tr className="border-b border-purple-300 text-[10px] xs:text-xs sm:text-sm md:text-base text-purple-800">
                  <th className="py-1 px-1 text-left">Assignment</th>
                  <th className="py-1 px-1 text-left">Strictness</th>
                  <th className="py-1 px-1 text-left">Class Name</th>
                  <th className="py-1 px-1 text-center">Grade</th>
                  <th className="py-1 px-1 text-center">Graded At</th>
                </tr>
              </thead>

              <tbody>
                {sortedAssignments.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-purple-300 text-purple-900 text-[10px] xs:text-xs sm:text-sm md:text-base"
                  >
                    <td className="py-1 px-1 font-semibold text-left">{item.originalFilename}</td>
                    <td className="py-1 px-1 text-center">{item.strictNess || "N/A"}</td>
                    <td className="py-1 px-1 text-left">{item.class?.className || "N/A"}</td>
                    <td className="py-1 px-1 text-center">{item.grade}</td>
                    <td className="py-1 px-1 text-center">
                      {new Date(item.gradedAt).toLocaleDateString()}
                    </td>
                    <td className="py-1 px-1 text-center">
                      <button
                        onClick={() => handleDelete(item.filename)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-[10px] xs:text-xs sm:text-sm hover:bg-red-700 transition"
                      >
                        <MdDelete/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
