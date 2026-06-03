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
import { IoIosCloudDownload } from "react-icons/io";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --bg:      #0f0f0f;
      --surface: #141414;
      --raised:  #181818;
      --border:  #222;
      --gold:    #c9a84c;
      --gold-dim:#6b5520;
      --text:    #ede8df;
      --muted:   #4a4540;
      --danger:  #c0392b;
    }

    @keyframes alFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes alShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes alRowIn {
      from { opacity: 0; transform: translateX(-8px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .al-root {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
    }
    .al-root::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: radial-gradient(circle, rgba(201,168,76,.04) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* ── Hero ── */
    .al-hero {
      position: relative; z-index: 1;
      padding: 72px 80px 56px;
      border-bottom: 1px solid var(--border);
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    @media (max-width: 768px) { .al-hero { padding: 56px 24px 40px; } }

    .al-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold);
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 16px;
      animation: alFadeUp .4s ease both;
    }
    .al-eyebrow::before, .al-eyebrow::after {
      content: ''; display: block;
      width: 24px; height: 1px; background: var(--gold-dim);
    }

    .al-hero-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(28px, 4.5vw, 56px);
      letter-spacing: -1px; line-height: 1.1;
      animation: alFadeUp .4s .08s ease both;
    }
    .al-hero-title em {
      font-style: italic;
      background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: alShimmer 3s linear infinite;
    }

    /* ── Summary chips ── */
    .al-chips {
      display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
      margin-top: 28px;
      animation: alFadeUp .4s .16s ease both;
    }
    .al-chip {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 10px 18px;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .al-chip-num {
      font-family: 'DM Serif Display', serif;
      font-size: 24px; color: var(--text); line-height: 1;
    }
    .al-chip-num.gold { color: var(--gold); }
    .al-chip-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--muted);
    }

    /* ── Body ── */
    .al-body {
      position: relative; z-index: 1;
      padding: 40px 80px 80px;
      max-width: 1200px; margin: 0 auto;
    }
    @media (max-width: 768px) { .al-body { padding: 28px 16px 60px; } }

    /* toolbar */
    .al-toolbar {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 16px;
      animation: alFadeUp .4s .2s ease both;
    }
    .al-section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--muted);
    }
    .al-csv-btn {
      display: flex; align-items: center; gap: 8px;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 10px; padding: 8px 16px;
      font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500;
      cursor: pointer; transition: border-color .2s, color .2s, background .2s;
    }
    .al-csv-btn:hover {
      border-color: var(--gold-dim);
      color: var(--gold);
      background: rgba(201,168,76,.05);
    }

    /* table wrap */
    .al-table-wrap {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px; overflow: hidden;
      animation: alFadeUp .5s .24s ease both;
    }
    .al-scroll { overflow-x: auto; }

    .al-table {
      width: 100%; border-collapse: collapse;
      min-width: 560px;
    }
    .al-table thead tr { border-bottom: 1px solid var(--border); }
    .al-table thead th {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); padding: 16px 20px;
      text-align: left; font-weight: 500;
    }
    .al-table thead th.center { text-align: center; }

    .al-table tbody tr {
      border-bottom: 1px solid var(--border);
      transition: background .15s;
      animation: alRowIn .3s ease both;
    }
    .al-table tbody tr:last-child { border-bottom: none; }
    .al-table tbody tr:hover { background: rgba(255,255,255,.02); }

    .al-table td {
      padding: 15px 20px;
      font-size: 13px; color: var(--text);
      vertical-align: middle;
    }
    .al-table td.center { text-align: center; }

    .td-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--muted);
    }
    .td-filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--gold);
      max-width: 260px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .td-grade {
      font-family: 'DM Serif Display', serif;
      font-size: 20px;
    }
    .td-grade.high { color: #c9a84c; }
    .td-grade.mid  { color: #ede8df; }
    .td-grade.low  { color: #c0392b; }
    .td-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--muted);
    }

    .al-del-btn {
      width: 30px; height: 30px; border-radius: 8px;
      border: 1px solid var(--border);
      background: transparent; color: var(--muted);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; margin: 0 auto;
      transition: background .2s, color .2s, border-color .2s;
    }
    .al-del-btn:hover {
      background: rgba(192,57,43,.1);
      border-color: rgba(192,57,43,.35);
      color: var(--danger);
    }

    /* empty */
    .al-empty {
      padding: 72px 24px; text-align: center;
    }
    .al-empty-glyph {
      font-family: 'DM Serif Display', serif;
      font-size: 52px; color: var(--border); line-height: 1; margin-bottom: 14px;
    }
    .al-empty-text {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted);
    }
  `}</style>
);

const AssignmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allData } = useSelector((state) => state.assignments);
  const { id } = useParams();

  const releventClassData =
    allData && allData.filter((item) => item.class.classId === id);

  const sortedAssignments = [...(releventClassData || [])].sort(
    (a, b) => new Date(b.gradedAt) - new Date(a.gradedAt)
  );

  const className = releventClassData?.[0]?.class?.className || "Unknown Class";

  const avgGrade = sortedAssignments.length
    ? Math.round(sortedAssignments.reduce((s, a) => s + (a.grade || 0), 0) / sortedAssignments.length)
    : 0;

  const gradeClass = (g) => g >= 80 ? "high" : g >= 60 ? "mid" : "low";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleDelete = async (assignmentId) => {
    try {
      const res = await axios.delete(
        `${Backend_url}/assignment/del-assignment/${assignmentId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setTimeout(() => { window.location.reload(); }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const downloadCsv = () => {
    if (!sortedAssignments || sortedAssignments.length === 0) {
      toast.error("No data to export.");
      return;
    }
    const headers = ["Assignment", "Grade", "Graded At"];
    const csvRows = sortedAssignments.map((item) => [
      `"${item.originalFilename.replace(/"/g, '""')}"`,
      item.grade,
      new Date(item.gradedAt).toLocaleDateString(),
    ]);
    const csvContent = [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${className.replace(/\s/g, "_")}_Assignments.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Downloaded!");
  };

  return (
    <>
      <Styles />
      <div className="al-root">
        <NavBar />

        {/* ── Hero ── */}
        <section className="al-hero">
          <div className="al-eyebrow">Class View</div>
          <h1 className="al-hero-title">
            <em>{className}</em><br />Assignments
          </h1>

          {sortedAssignments.length > 0 && (
            <div className="al-chips">
              <div className="al-chip">
                <span className="al-chip-num">{sortedAssignments.length}</span>
                <span className="al-chip-label">Total</span>
              </div>
              <div className="al-chip">
                <span className={`al-chip-num ${avgGrade >= 80 ? "gold" : ""}`}>{avgGrade}</span>
                <span className="al-chip-label">Avg Grade</span>
              </div>
              <div className="al-chip">
                <span className="al-chip-num">
                  {sortedAssignments.filter((a) => a.grade >= 80).length}
                </span>
                <span className="al-chip-label">Passed</span>
              </div>
            </div>
          )}
        </section>

        {/* ── Table ── */}
        <div className="al-body">
          {sortedAssignments.length > 0 && (
            <div className="al-toolbar">
              <span className="al-section-label">
                Submissions — {sortedAssignments.length}
              </span>
              <button className="al-csv-btn" onClick={downloadCsv}>
                <IoIosCloudDownload size={15} />
                Export CSV
              </button>
            </div>
          )}

          <div className="al-table-wrap">
            {(!releventClassData || releventClassData.length === 0) ? (
              <div className="al-empty">
                <div className="al-empty-glyph">∅</div>
                <p className="al-empty-text">No assignments in this class yet.</p>
              </div>
            ) : (
              <div className="al-scroll">
                <table className="al-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Assignment</th>
                      <th className="center">Grade</th>
                      <th className="center">Date</th>
                      <th className="center">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAssignments.map((item, idx) => (
                      <tr key={item._id} style={{ animationDelay: `${idx * 0.04}s` }}>
                        <td>
                          <span className="td-num">{String(idx + 1).padStart(2, "0")}</span>
                        </td>
                        <td>
                          <span className="td-filename" title={item.originalFilename}>
                            {item.originalFilename}
                          </span>
                        </td>
                        <td className="center">
                          <span className={`td-grade ${gradeClass(item.grade)}`}>
                            {item.grade}
                          </span>
                        </td>
                        <td className="center">
                          <span className="td-date">
                            {new Date(item.gradedAt).toLocaleDateString("en-GB", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="center">
                          <button
                            className="al-del-btn"
                            onClick={() => handleDelete(item._id)}
                            title="Delete"
                          >
                            <MdDelete size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AssignmentList;