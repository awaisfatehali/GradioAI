import React, { useState, useRef } from "react";
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

/* ─── Google Fonts injected once ─── */
const FontInjector = () => {
  if (document.getElementById("gf-dash")) return null;
  const link = document.createElement("link");
  link.id = "gf-dash";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
  return null;
};

/* ─── Inline styles (CSS vars + keyframes) ─── */
const GlobalStyles = () => (
  <style>{`
    :root {
      --bg:       #0f0f0f;
      --surface:  #171717;
      --raised:   #1f1f1f;
      --border:   #2a2a2a;
      --gold:     #c9a84c;
      --gold-dim: #7a6030;
      --amber:    #f59e0b;
      --text:     #e8e1d4;
      --muted:    #6b6560;
      --danger:   #e05252;
      --success:  #4caf7d;
      --sidebar-w: 72px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(201,168,76,.4); }
      70%  { box-shadow: 0 0 0 10px rgba(201,168,76,0); }
      100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .fade-up { animation: fadeUp .45s ease both; }
    .fade-up-2 { animation: fadeUp .45s .1s ease both; }
    .fade-up-3 { animation: fadeUp .45s .2s ease both; }

    /* ── Sidebar ── */
    .sidebar {
      position: fixed; left: 0; top: 0; height: 100vh;
      width: var(--sidebar-w);
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column; align-items: center;
      padding: 28px 0; gap: 8px; z-index: 100;
    }
    .sidebar-logo {
      font-family: 'DM Serif Display', serif;
      font-size: 22px; color: var(--gold);
      letter-spacing: -1px;
      margin-bottom: 24px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
      user-select: none;
    }
    .nav-btn {
      width: 44px; height: 44px;
      border-radius: 12px;
      border: none;
      background: transparent;
      color: var(--muted);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background .2s, color .2s, transform .15s;
      position: relative;
    }
    .nav-btn:hover { background: var(--raised); color: var(--text); transform: scale(1.08); }
    .nav-btn.active {
      background: var(--gold);
      color: #0f0f0f;
      box-shadow: 0 0 0 0 rgba(201,168,76,.4);
      animation: pulse-ring 2.5s infinite;
    }
    .nav-btn .tooltip {
      position: absolute; left: calc(100% + 12px);
      background: var(--raised); color: var(--text);
      font-family: 'Outfit', sans-serif; font-size: 12px;
      padding: 4px 10px; border-radius: 6px;
      white-space: nowrap; pointer-events: none;
      opacity: 0; transform: translateX(-4px);
      transition: opacity .2s, transform .2s;
      border: 1px solid var(--border);
    }
    .nav-btn:hover .tooltip { opacity: 1; transform: translateX(0); }
    .nav-spacer { flex: 1; }

    /* ── Main ── */
    .main { margin-left: var(--sidebar-w); min-height: 100vh; padding: 40px 48px; }
    @media (max-width: 640px) { .main { padding: 24px 16px; } }

    /* ── Page header ── */
    .page-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(28px, 4vw, 42px);
      color: var(--text);
      letter-spacing: -0.5px;
      line-height: 1.1;
    }
    .page-sub {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted);
      margin-top: 4px;
    }
    .divider {
      width: 48px; height: 2px;
      background: linear-gradient(90deg, var(--gold), transparent);
      margin: 16px 0 32px;
    }

    /* ── Drop zone ── */
    .dropzone {
      border: 1.5px dashed var(--gold-dim);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: border-color .2s, background .2s;
      background: var(--surface);
    }
    .dropzone:hover {
      border-color: var(--gold);
      background: rgba(201,168,76,.04);
    }
    .dropzone-icon { color: var(--gold); margin-bottom: 12px; }
    .dropzone-text {
      font-family: 'Outfit', sans-serif;
      font-size: 14px; color: var(--muted);
    }

    /* ── File list ── */
    .file-item {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 18px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px;
      transition: border-color .2s;
    }
    .file-item:hover { border-color: var(--gold-dim); }
    .file-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; color: var(--text);
      word-break: break-all;
    }
    .file-actions { display: flex; gap: 8px; flex-shrink: 0; }
    .icon-btn {
      width: 32px; height: 32px;
      border-radius: 8px; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background .2s, color .2s;
    }
    .icon-btn-view { background: rgba(201,168,76,.12); color: var(--gold); }
    .icon-btn-view:hover { background: rgba(201,168,76,.25); }
    .icon-btn-del { background: rgba(224,82,82,.1); color: var(--danger); }
    .icon-btn-del:hover { background: rgba(224,82,82,.22); }

    /* ── Form elements ── */
    .form-label {
      font-family: 'Outfit', sans-serif;
      font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 1.2px;
      color: var(--muted); margin-bottom: 8px; display: block;
    }
    .form-textarea, .form-select {
      width: 100%; background: var(--surface);
      border: 1px solid var(--border); border-radius: 10px;
      padding: 12px 14px;
      font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--text);
      transition: border-color .2s;
      resize: vertical;
    }
    .form-textarea:focus, .form-select:focus {
      outline: none; border-color: var(--gold);
    }
    .form-select option { background: var(--surface); }

    /* ── Level toggle ── */
    .level-group {
      display: flex; border-radius: 10px; overflow: hidden;
      border: 1px solid var(--border); width: fit-content;
    }
    .level-btn {
      padding: 8px 20px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
      cursor: pointer; border: none;
      transition: background .2s, color .2s;
      background: var(--surface); color: var(--muted);
    }
    .level-btn.active { background: var(--gold); color: #0f0f0f; font-weight: 600; }
    .level-btn:not(.active):hover { background: var(--raised); color: var(--text); }

    /* ── Primary button ── */
    .btn-primary {
      background: var(--gold);
      color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 12px 28px;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
      letter-spacing: .5px;
      cursor: pointer;
      transition: opacity .2s, transform .15s;
    }
    .btn-primary:hover { opacity: .88; transform: translateY(-1px); }
    .btn-primary:disabled { opacity: .4; cursor: not-allowed; transform: none; }

    /* ── Result cards ── */
    .result-card {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 22px 24px;
      transition: border-color .2s;
    }
    .result-card:hover { border-color: var(--gold-dim); }
    .result-filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--gold); margin-bottom: 6px;
    }
    .result-grade {
      font-family: 'DM Serif Display', serif;
      font-size: 48px; color: var(--text);
      line-height: 1;
    }
    .result-grade span { font-size: 18px; color: var(--muted); }
    .result-feedback {
      font-family: 'Outfit', sans-serif;
      font-size: 14px; color: var(--muted);
      margin-top: 12px; line-height: 1.6;
    }

    /* ── Graded assignment cards ── */
    .graded-card {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 22px 24px;
      transition: border-color .2s, transform .15s;
    }
    .graded-card:hover { border-color: var(--gold-dim); transform: translateY(-2px); }
    .graded-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--muted);
    }
    .graded-class {
      font-family: 'Outfit', sans-serif; font-weight: 600;
      font-size: 16px; color: var(--text); margin-top: 8px;
    }
    .graded-file {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; color: var(--muted); margin-top: 4px;
    }
    .graded-score {
      font-family: 'DM Serif Display', serif;
      font-size: 36px; color: var(--gold); margin-top: 12px;
    }
    .graded-score span { font-size: 16px; color: var(--muted); }
    .graded-strict {
      display: inline-block;
      font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 1px;
      color: var(--amber);
      background: rgba(245,158,11,.1);
      border-radius: 6px; padding: 3px 10px; margin-top: 8px;
    }
    .graded-feedback {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted);
      margin-top: 10px; line-height: 1.6;
    }
    .btn-view {
      background: transparent;
      border: 1px solid var(--gold-dim);
      color: var(--gold);
      border-radius: 8px;
      padding: 6px 16px;
      font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
      cursor: pointer; transition: background .2s;
    }
    .btn-view:hover { background: rgba(201,168,76,.12); }

    /* ── Modal ── */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.8);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      z-index: 200; padding: 16px;
    }
    .modal-inner {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      width: 100%; max-width: 800px;
      height: 80vh;
      display: flex; flex-direction: column;
      overflow: hidden;
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 22px;
      border-bottom: 1px solid var(--border);
    }
    .modal-title {
      font-family: 'DM Serif Display', serif;
      font-size: 18px; color: var(--text);
    }

    /* ── Loading overlay ── */
    .loading-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.85);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; flex-direction: column; gap: 20px;
    }
    .loading-ring {
      width: 80px; height: 80px;
      border-radius: 50%;
      border: 2px solid var(--border);
      border-top-color: var(--gold);
      animation: spin-slow 1s linear infinite;
    }
    .loading-text {
      font-family: 'Outfit', sans-serif;
      font-size: 14px; color: var(--muted);
      letter-spacing: 2px; text-transform: uppercase;
    }

    /* ── Empty state ── */
    .empty-state {
      text-align: center; padding: 60px 20px;
      font-family: 'Outfit', sans-serif;
      color: var(--muted); font-size: 14px;
    }
    .empty-icon { font-size: 40px; margin-bottom: 16px; opacity: .3; }

    /* ── Grid dot bg ── */
    .dot-bg {
      background-image: radial-gradient(circle, rgba(201,168,76,.06) 1px, transparent 1px);
      background-size: 28px 28px;
    }
  `}</style>
);

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

  const handleRemoveFile = (index) =>
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  const handleFiles = (files) => {
    if (files.length > 0)
      setAssignments((prev) => [...prev, ...Array.from(files)]);
  };
  const handleFileChange = (e) => handleFiles(e.target.files);
  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e) => e.preventDefault();
  const handleOpenFile = (file) => setFilePreview(URL.createObjectURL(file));
  const handleClosePreview = () => setFilePreview(null);

  const handleSubmitGrades = async () => {
    if (assignments.length === 0) return toast.error("Upload at least one assignment.");
    if (!gradingCriteria.trim()) return toast.error("Enter grading criteria.");
    if (!selectClass) return toast.error("Select a class.");
    setLoading(true); setResults([]);
    const formData = new FormData();
    formData.append("teacherId", user._id);
    formData.append("criteria", gradingCriteria);
    formData.append("level", selected);
    formData.append("className", selectClass);
    const selectedClassObj = classes?.find((item) => item.className === selectClass);
    formData.append("classId", selectedClassObj?._id || "");
    assignments.forEach((file) => formData.append("files", file));
    try {
      const response = await axios.post(`${Backend_url}/assignment/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(response.data?.data || []);
      toast.success("Grading Complete!");
      setAssignments([]); setGradingCriteria(""); setSelected("Strict"); setSelectClass("");
      dispatch(getAllGradAssignment(user._id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: "classes", icon: <SiGoogleclassroom size={18} />, label: "Classes" },
    { id: "upload", icon: <FaUpload size={16} />, label: "Upload" },
    { id: "graded", icon: <FaCheckCircle size={16} />, label: "Graded" },
  ];

  return (
    <>
      <FontInjector />
      <GlobalStyles />

      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", fontFamily: "'Outfit', sans-serif" }}>

        {/* ── Sidebar ── */}
        <nav className="sidebar">
          <div className="sidebar-logo">GR</div>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              <span className="tooltip">{item.label}</span>
            </button>
          ))}

          <div className="nav-spacer" />

          <button
            className={`nav-btn ${activePage === "profile" ? "active" : ""}`}
            onClick={() => setActivePage("profile")}
          >
            <FaUser size={16} />
            <span className="tooltip">Profile</span>
          </button>
        </nav>

        {/* ── Main ── */}
        <main className="main dot-bg" style={{ flex: 1 }}>

          {/* ── UPLOAD PAGE ── */}
          {activePage === "upload" && (
            <div className="fade-up" style={{ maxWidth: 720 }}>
              <h1 className="page-title">Upload Assignments</h1>
              <p className="page-sub">Drag in PDFs and let AI handle the rest.</p>
              <div className="divider" />

              {/* Dropzone */}
              <div
                className="dropzone fade-up-2"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
              >
                <IoIosAddCircle size={36} className="dropzone-icon" />
                <p className="dropzone-text">Click to browse or drag & drop PDF files</p>
              </div>
              <input type="file" accept="application/pdf" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

              {/* File list */}
              {assignments.length > 0 && (
                <div className="fade-up-3" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {assignments.map((file, idx) => (
                    <div key={idx} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <div className="file-actions">
                        <button className="icon-btn icon-btn-view" onClick={() => handleOpenFile(file)} title="Preview">
                          <MdViewInAr size={15} />
                        </button>
                        <button className="icon-btn icon-btn-del" onClick={() => handleRemoveFile(idx)} title="Remove">
                          <IoIosCloseCircleOutline size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Form controls — only shown after files added */}
              {assignments.length > 0 && (
                <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Grading criteria */}
                  <div>
                    <label className="form-label">Grading Criteria</label>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      placeholder="Describe what you're grading for — clarity, structure, depth…"
                      value={gradingCriteria}
                      onChange={(e) => setGradingCriteria(e.target.value)}
                    />
                  </div>

                  {/* Class selector */}
                  <div>
                    <label className="form-label">Select Class</label>
                    {classes && classes.length !== 0 ? (
                      <select className="form-select" value={selectClass} onChange={(e) => setSelectClass(e.target.value)}>
                        <option value="">— Choose a class —</option>
                        {classes.map((cls) => (
                          <option key={cls._id} value={cls.className}>{cls.className}</option>
                        ))}
                      </select>
                    ) : (
                      <p style={{ color: "var(--danger)", fontFamily: "'Outfit', sans-serif", fontSize: 13 }}>
                        No classes found. Create a class first.
                      </p>
                    )}
                  </div>

                  {/* Strictness */}
                  <div>
                    <label className="form-label">Strictness Level</label>
                    <div className="level-group">
                      {levels.map((level) => (
                        <button key={level} className={`level-btn ${selected === level ? "active" : ""}`} onClick={() => setSelected(level)}>
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="btn-primary" onClick={handleSubmitGrades} disabled={loading}>
                      {loading ? "Grading…" : "Run Grading →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <h2 className="page-title" style={{ fontSize: 28 }}>Results</h2>
                  <div className="divider" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {results.map((item, index) => (
                      <div key={index} className="result-card fade-up">
                        <p className="result-filename">{item.originalFilename}</p>
                        <div className="result-grade">
                          {item.grade}<span>/100</span>
                        </div>
                        <p className="result-feedback">{item.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── CLASSES PAGE ── */}
          {activePage === "classes" && (
            <div className="fade-up">
              <h1 className="page-title">Classes</h1>
              <div className="divider" />
              <CreateClassPage />
            </div>
          )}

          {/* ── GRADED PAGE ── */}
          {activePage === "graded" && (
            <div className="fade-up">
              <h1 className="page-title">Graded Assignments</h1>
              <p className="page-sub">All submissions reviewed by AI.</p>
              <div className="divider" />

              {!allData || allData.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✦</div>
                  No graded assignments yet.
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                  {allData.map((res, i) => (
                    <div key={i} className="graded-card fade-up">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span className="graded-date">{new Date(res.gradedAt).toLocaleDateString()}</span>
                        <Link to={`/assignment/${res._id}`}>
                          <button className="btn-view">View →</button>
                        </Link>
                      </div>
                      <p className="graded-class">{res.class.className}</p>
                      <p className="graded-file">{res.originalFilename}</p>
                      <div className="graded-score">{res.grade}<span>/100</span></div>
                      {res.strictNess && <span className="graded-strict">{res.strictNess}</span>}
                      <p className="graded-feedback">{res.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE PAGE ── */}
          {activePage === "profile" && (
            <div className="fade-up">
              <h1 className="page-title">My Profile</h1>
              <div className="divider" />
              <ProfilePage />
            </div>
          )}
        </main>

        {/* ── PDF Preview Modal ── */}
        {filePreview && (
          <div className="modal-overlay" onClick={handleClosePreview}>
            <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <span className="modal-title">Preview</span>
                <button
                  className="icon-btn icon-btn-del"
                  onClick={handleClosePreview}
                  style={{ width: 36, height: 36 }}
                >
                  <MdCancel size={18} />
                </button>
              </div>
              <iframe src={filePreview} style={{ flex: 1, border: "none" }} />
            </div>
          </div>
        )}

        {/* ── Loading Overlay ── */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-ring" />
            <p className="loading-text">AI is grading…</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;