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
      --danger-bg: rgba(192,57,43,.1);
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes rowIn {
      from { opacity: 0; transform: translateX(-8px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .hist-root {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }
    .hist-root::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: radial-gradient(circle, rgba(201,168,76,.04) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* ── Hero ── */
    .hist-hero {
      position: relative; z-index: 1;
      padding: 80px 80px 60px;
      border-bottom: 1px solid var(--border);
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    @media (max-width: 768px) { .hist-hero { padding: 60px 24px 40px; } }

    .hist-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold);
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 20px;
      animation: fadeUp .4s ease both;
    }
    .hist-eyebrow::before, .hist-eyebrow::after {
      content: ''; display: block;
      width: 24px; height: 1px; background: var(--gold-dim);
    }

    .hist-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(34px, 5vw, 62px);
      letter-spacing: -1.5px; line-height: 1.05;
      animation: fadeUp .4s .08s ease both;
    }
    .hist-title em {
      font-style: italic;
      background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }

    .hist-sub {
      margin-top: 16px;
      font-size: 14px; color: var(--muted); line-height: 1.7;
      animation: fadeUp .4s .16s ease both;
    }

    /* ── Summary chips ── */
    .hist-chips {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      margin-top: 32px;
      animation: fadeUp .4s .24s ease both;
    }
    .hist-chip {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 20px;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .hist-chip-num {
      font-family: 'DM Serif Display', serif;
      font-size: 26px; color: var(--text); line-height: 1;
    }
    .hist-chip-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--muted);
    }

    /* ── Table section ── */
    .hist-body {
      position: relative; z-index: 1;
      padding: 48px 80px 80px;
      max-width: 1200px; margin: 0 auto;
    }
    @media (max-width: 768px) { .hist-body { padding: 32px 16px 60px; } }

    .table-wrap {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      animation: fadeUp .5s .2s ease both;
    }

    .hist-table {
      width: 100%; border-collapse: collapse;
      min-width: 640px;
    }

    .hist-table thead tr {
      border-bottom: 1px solid var(--border);
    }
    .hist-table thead th {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted);
      padding: 16px 20px; text-align: left;
      font-weight: 500;
    }
    .hist-table thead th.center { text-align: center; }

    .hist-table tbody tr {
      border-bottom: 1px solid var(--border);
      transition: background .15s;
      animation: rowIn .3s ease both;
    }
    .hist-table tbody tr:last-child { border-bottom: none; }
    .hist-table tbody tr:hover { background: rgba(255,255,255,.02); }

    .hist-table td {
      padding: 16px 20px;
      font-size: 13px; color: var(--text);
      vertical-align: middle;
    }
    .hist-table td.center { text-align: center; }

    /* filename cell */
    .td-filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--gold);
      max-width: 220px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* grade pill */
    .grade-pill {
      display: inline-block;
      font-family: 'DM Serif Display', serif;
      font-size: 18px; color: var(--text);
      min-width: 48px; text-align: center;
    }
    .grade-pill.high { color: #c9a84c; }
    .grade-pill.mid  { color: #ede8df; }
    .grade-pill.low  { color: #c0392b; }

    /* strictness badge */
    .strict-badge {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
      padding: 3px 10px; border-radius: 20px;
      border: 1px solid var(--border);
      color: var(--muted);
    }
    .strict-badge.strict { border-color: rgba(192,57,43,.4); color: #c0392b; background: rgba(192,57,43,.07); }
    .strict-badge.medium { border-color: rgba(245,158,11,.3); color: #f59e0b; background: rgba(245,158,11,.07); }
    .strict-badge.chill  { border-color: rgba(76,175,125,.3); color: #4caf7d; background: rgba(76,175,125,.07); }

    /* date */
    .td-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--muted);
    }

    /* delete button */
    .del-btn {
      width: 32px; height: 32px;
      border-radius: 8px; border: 1px solid var(--border);
      background: transparent;
      color: var(--muted);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; margin: 0 auto;
      transition: background .2s, color .2s, border-color .2s;
    }
    .del-btn:hover {
      background: var(--danger-bg);
      border-color: rgba(192,57,43,.4);
      color: var(--danger);
    }

    /* ── Empty state ── */
    .hist-empty {
      padding: 80px 24px;
      text-align: center;
    }
    .hist-empty-glyph {
      font-family: 'DM Serif Display', serif;
      font-size: 64px; color: var(--border);
      margin-bottom: 16px; line-height: 1;
    }
    .hist-empty-title {
      font-family: 'DM Serif Display', serif;
      font-size: 24px; color: var(--muted);
      margin-bottom: 8px;
    }
    .hist-empty-sub {
      font-size: 13px; color: var(--muted); opacity: .6;
    }

    /* scrollable on mobile */
    .table-scroll { overflow-x: auto; }
  `}</style>
);

const HistoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allData } = useSelector((state) => state.assignments);

  const sortedAssignments = [...(allData || [])].sort(
    (a, b) => new Date(b.gradedAt) - new Date(a.gradedAt)
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleDelete = async (filename) => {
    try {
      const res = await axios.delete(
        `${Backend_url}/assignment/del-assignment/${filename}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setTimeout(() => { window.location.reload(); }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const avgGrade = sortedAssignments.length
    ? Math.round(sortedAssignments.reduce((s, a) => s + (a.grade || 0), 0) / sortedAssignments.length)
    : 0;

  const gradeClass = (g) => g >= 80 ? "high" : g >= 60 ? "mid" : "low";

  const strictClass = (s) => {
    if (!s) return "";
    const l = s.toLowerCase();
    if (l === "strict") return "strict";
    if (l === "medium") return "medium";
    if (l === "chill")  return "chill";
    return "";
  };

  return (
    <>
      <Styles />
      <div className="hist-root">
        <NavBar />

        {/* ── Hero ── */}
        <section className="hist-hero">
          <div className="hist-eyebrow">Records</div>
          <h1 className="hist-title">
            Assignment <em>History</em>
          </h1>
          <p className="hist-sub">All graded submissions, sorted by most recent.</p>

          {sortedAssignments.length > 0 && (
            <div className="hist-chips">
              <div className="hist-chip">
                <span className="hist-chip-num">{sortedAssignments.length}</span>
                <span className="hist-chip-label">Total</span>
              </div>
              <div className="hist-chip">
                <span className="hist-chip-num" style={{ color: "#c9a84c" }}>{avgGrade}</span>
                <span className="hist-chip-label">Avg Grade</span>
              </div>
              <div className="hist-chip">
                <span className="hist-chip-num">
                  {new Set(sortedAssignments.map(a => a.class?.className).filter(Boolean)).size}
                </span>
                <span className="hist-chip-label">Classes</span>
              </div>
            </div>
          )}
        </section>

        {/* ── Table ── */}
        <div className="hist-body">
          <div className="table-wrap">
            {(!allData || allData.length === 0) ? (
              <div className="hist-empty">
                <div className="hist-empty-glyph">∅</div>
                <p className="hist-empty-title">No submissions yet</p>
                <p className="hist-empty-sub">Graded assignments will appear here.</p>
              </div>
            ) : (
              <div className="table-scroll">
                <table className="hist-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Assignment</th>
                      <th>Class</th>
                      <th>Strictness</th>
                      <th className="center">Grade</th>
                      <th className="center">Date</th>
                      <th className="center">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAssignments.map((item, idx) => (
                      <tr key={item._id} style={{ animationDelay: `${idx * 0.04}s` }}>
                        <td>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </td>
                        <td>
                          <span className="td-filename" title={item.originalFilename}>
                            {item.originalFilename}
                          </span>
                        </td>
                        <td>{item.class?.className || "—"}</td>
                        <td>
                          <span className={`strict-badge ${strictClass(item.strictNess)}`}>
                            {item.strictNess || "N/A"}
                          </span>
                        </td>
                        <td className="center">
                          <span className={`grade-pill ${gradeClass(item.grade)}`}>
                            {item.grade}
                          </span>
                        </td>
                        <td className="center">
                          <span className="td-date">
                            {new Date(item.gradedAt).toLocaleDateString("en-GB", {
                              day: "2-digit", month: "short", year: "numeric"
                            })}
                          </span>
                        </td>
                        <td className="center">
                          <button
                            className="del-btn"
                            onClick={() => handleDelete(item.filename)}
                            title="Delete"
                          >
                            <MdDelete size={15} />
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

export default HistoryPage;