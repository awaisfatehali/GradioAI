// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { server } from "../server";
// import { toast } from "react-toastify";
// import { getAllGradAssignment } from "../redux/actions/assignment";
// import { MdDelete } from "react-icons/md";

// const AssignmentList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { allData } = useSelector((state) => state.assignments);
//   const { id } = useParams();
//   //   console.log(id);
//   //   console.log(allData);

//   const releventClassData =
//     allData && allData.filter((item) => item.class.classId === id);
//   console.log(releventClassData);

//   // Sort newest first
//   const sortedAssignments = [...(releventClassData || [])].sort(
//     (a, b) => new Date(b.gradedAt) - new Date(a.gradedAt)
//   );

//   // Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Dummy delete handler
//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `${server}/assignment/del-assignment/${id}`,
//         {
//           withCredentials: true,
//         }
//       );

//       toast.success(res.data.message);
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <div
//         className="min-h-screen w-full py-4 px-4 sm:px-6 md:px-10"
//         style={{ background: "#3A0094" }}
//       >
//         <h1 className="text-center text-2xl sm:text-4xl font-bold text-white mb-2">
//           {releventClassData[0]?.class?.className} Class Assignments
//         </h1>

//         <div
//           className=" min-h-[70vh] max-w-5xl mx-auto rounded-[4px] p-4 sm:p-8 bg-[#DDF6FF] overflow-x-auto"
//           style={{ maxHeight: "70vh", marginTop: "20px", marginBottom: "20px" }}
//         >
//           {/* No Items */}
//           {(!allData || allData.length === 0) && (
//             <p className="text-center text-xl font-semibold text-purple-800">
//               No items yet
//             </p>
//           )}

//           {/* Items Table */}
//           {allData && allData.length > 0 && (
//             <table className="sm:w-full min-w-[700px] border-collapse">
//               <thead className="sticky top-0 bg-[#DDF6FF]">
//                 <tr className="border-b border-purple-300 text-[10px] xs:text-xs sm:text-sm md:text-base text-purple-800">
//                   <th className="py-1 px-1 text-left">Assignment</th>
//                   <th className="py-1 px-1 text-center">Grade</th>
//                   <th className="py-1 px-1 text-center">Graded At</th>
//                   <th className="py-1 px-1 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {sortedAssignments.map((item) => (
//                   <tr
//                     key={item._id}
//                     className="border-b border-purple-300 text-purple-900 text-[10px] xs:text-xs sm:text-sm md:text-base"
//                   >
//                     <td className="py-1 px-1 font-semibold text-left">
//                       {item.originalFilename}
//                     </td>
//                     <td className="py-1 px-1 text-center">{item.grade}</td>
//                     <td className="py-1 px-1 text-center">
//                       {new Date(item.gradedAt).toLocaleDateString()}
//                     </td>
//                     <td className="py-1 px-1 text-center">
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="px-2 py-1 bg-red-600 text-white rounded text-[10px] xs:text-xs sm:text-sm hover:bg-red-700 transition"
//                       >
//                         <MdDelete/>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AssignmentList;
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Backend_url } from "../server";
import { toast } from "react-toastify";
import { getAllGradAssignment } from "../redux/actions/assignment";
import { MdDelete } from "react-icons/md";
// 🚨 New Icon for CSV Download
import { IoIosCloudDownload } from "react-icons/io";
 

// NO NEED TO IMPORT jsPDF, html2canvas, or jspdf-autotable anymore

const AssignmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allData } = useSelector((state) => state.assignments);
  const { id } = useParams();

  const releventClassData =
    allData && allData.filter((item) => item.class.classId === id);

  // Sort newest first
  const sortedAssignments = [...(releventClassData || [])].sort(
    (a, b) => new Date(b.gradedAt) - new Date(a.gradedAt)
  );

  const className = releventClassData[0]?.class?.className || "Unknown Class";

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler for assignment deletion
  const handleDelete = async (assignmentId) => {
    try {
      const res = await axios.delete(
        `${Backend_url}/assignment/del-assignment/${assignmentId}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 🚨 New CSV Download Handler
  const downloadCsv = () => {
    if (!sortedAssignments || sortedAssignments.length === 0) {
      toast.error("No data to export.");
      return;
    }

    // Define table headers
    const headers = ["Assignment", "Grade", "Graded At"];
    
    // Map data to CSV rows
    const csvRows = sortedAssignments.map(item => [
      // Clean up string data for CSV (e.g., handle commas)
      `"${item.originalFilename.replace(/"/g, '""')}"`, 
      item.grade,
      new Date(item.gradedAt).toLocaleDateString(),
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${className.replace(/\s/g, '_')}_Assignments.csv`);
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV Downloaded Successfully!");
  };


  return (
    <>
      <NavBar />
      <div
        className="min-h-screen w-full py-4 px-4 sm:px-6 md:px-10"
        style={{ background: "#3A0094" }}
      >
        <h1 className="text-center text-2xl sm:text-4xl font-bold text-white mb-2">
          {className} Class Assignments
        </h1>


        <div
          className=" min-h-[70vh] max-w-5xl mx-auto rounded-[4px] p-4 sm:p-8 bg-[#DDF6FF] overflow-x-auto flex justify-between items-center flex-col"
          style={{ maxHeight: "70vh", marginTop: "20px", marginBottom: "20px" }}
        >
          
          {/* No Items */}
          {(!releventClassData || releventClassData.length === 0) && (
            <p className="text-center text-xl font-semibold text-purple-800">
              No items yet
            </p>
          )}

          {/* Items Table */}
          {releventClassData && releventClassData.length > 0 && (
            <table className="sm:w-full min-w-[700px] border-collapse">
              <thead className="sticky top-0 bg-[#DDF6FF]">
                {/* FIX for Hydration Error: All <th> tags are on the same line as <tr> */}
                <tr className="border-b border-purple-300 text-[10px] xs:text-xs sm:text-sm md:text-base text-purple-800">
                  <th className="py-1 px-1 text-left">Assignment</th><th className="py-1 px-1 text-center">Grade</th><th className="py-1 px-1 text-center">Graded At</th><th className="py-1 px-1 text-center exclude-from-pdf">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedAssignments.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-purple-300 text-purple-900 text-[10px] xs:text-xs sm:text-sm md:text-base"
                  >
                    {/* FIX for Hydration Error: All <td> tags are on the same line as <tr> */}
                    <td className="py-1 px-1 font-semibold text-left">
                      {item.originalFilename}
                    </td><td className="py-1 px-1 text-center">{item.grade}</td><td className="py-1 px-1 text-center">
                      {new Date(item.gradedAt).toLocaleDateString()}
                    </td><td className="py-1 px-1 text-center exclude-from-pdf">
                      <button
                        onClick={() => handleDelete(item._id)}
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
          {releventClassData && releventClassData.length > 0 && (
          <div className="flex justify-end w-full mb-4">
            <button
              onClick={downloadCsv}
              className="bg-[#450693] text-white px-4 py-4 rounded-[50%] font-semibold hover:scale-105 transition ">
              <IoIosCloudDownload className="text-xl" />
            </button>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AssignmentList;