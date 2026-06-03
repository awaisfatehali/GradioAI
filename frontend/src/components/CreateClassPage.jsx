import React, { useState } from "react";
import ClassCard from "./ClassCard";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Backend_url } from "../server";
import { getAllClasses } from "../redux/actions/class";
import { Link } from "react-router-dom";

const Styles = () => (
  <style>{`
    @keyframes ccFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes ccModalIn {
      from { opacity: 0; transform: scale(.96) translateY(12px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .cc-root { width: 100%; }

    /* ── Header ── */
    .cc-header {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: 32px;
      animation: ccFadeUp .4s ease both;
    }
    .cc-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(26px, 3.5vw, 40px);
      color: var(--text); letter-spacing: -.5px; line-height: 1.1;
    }
    .cc-title span {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 8px; font-weight: 500;
    }

    /* ── Create button ── */
    .cc-create-btn {
      background: var(--gold);
      color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 10px 24px;
      font-family: 'Outfit', sans-serif;
      font-size: 13px; font-weight: 700; letter-spacing: .3px;
      cursor: pointer;
      transition: opacity .2s, transform .15s;
      white-space: nowrap; flex-shrink: 0;
    }
    .cc-create-btn:hover { opacity: .85; transform: translateY(-1px); }

    /* ── Welcome banner ── */
    .cc-banner {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 32px;
      display: flex; justify-content: space-between; align-items: center;
      gap: 20px; flex-wrap: wrap;
      animation: ccFadeUp .4s .08s ease both;
      position: relative; overflow: hidden;
    }
    .cc-banner::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-dim));
    }
    .cc-banner-text {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted); line-height: 1.7;
      max-width: 520px;
    }

    /* ── Section label ── */
    .cc-section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 16px;
      animation: ccFadeUp .4s .12s ease both;
    }

    /* ── Grid ── */
    .cc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
      animation: ccFadeUp .4s .16s ease both;
    }

    /* ── Empty state ── */
    .cc-empty {
      grid-column: 1 / -1;
      padding: 60px 20px; text-align: center;
      background: var(--raised);
      border: 1px dashed var(--border);
      border-radius: 16px;
    }
    .cc-empty-glyph {
      font-family: 'DM Serif Display', serif;
      font-size: 48px; color: var(--border); line-height: 1;
      margin-bottom: 12px;
    }
    .cc-empty-text {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted);
    }

    /* ── Modal overlay ── */
    .cc-overlay {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,.75);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }

    /* ── Modal card ── */
    .cc-modal {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 36px 32px;
      width: 100%; max-width: 440px;
      position: relative; z-index: 201;
      animation: ccModalIn .3s cubic-bezier(.22,.61,.36,1) both;
    }
    .cc-modal-title {
      font-family: 'DM Serif Display', serif;
      font-size: 26px; color: var(--text);
      letter-spacing: -.3px; margin-bottom: 24px;
    }
    .cc-modal-title span {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 6px; font-weight: 500;
    }

    .cc-field { margin-bottom: 18px; }
    .cc-label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 8px;
    }
    .cc-input, .cc-textarea {
      width: 100%;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
      font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--text);
      transition: border-color .2s;
      resize: vertical;
    }
    .cc-input::placeholder, .cc-textarea::placeholder { color: var(--muted); }
    .cc-input:focus, .cc-textarea:focus {
      outline: none; border-color: var(--gold);
    }

    .cc-modal-actions {
      display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px;
    }
    .cc-btn-cancel {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 10px; padding: 10px 20px;
      font-family: 'Outfit', sans-serif; font-size: 13px;
      cursor: pointer; transition: border-color .2s, color .2s;
    }
    .cc-btn-cancel:hover { border-color: var(--gold-dim); color: var(--text); }
    .cc-btn-submit {
      background: var(--gold); color: #0f0f0f;
      border: none; border-radius: 10px; padding: 10px 24px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
      cursor: pointer; transition: opacity .2s;
    }
    .cc-btn-submit:hover { opacity: .85; }
    .cc-btn-submit:disabled { opacity: .4; cursor: not-allowed; }
  `}</style>
);

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
      const { data } = await axios.post(
        `${Backend_url}/class/create-class`,
        { className: classTitle, description: classDesc, teacherId: user?._id },
        { withCredentials: true }
      );
      setClassess([data.class, ...classess]);
      toast.success("Class created successfully");
      setClassTitle(""); setClassDesc(""); setIsModalOpen(false);
      dispatch(getAllClasses(user?._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Styles />
      <div className="cc-root">

        {/* ── Header ── */}
        <div className="cc-header">
          <div>
            <h1 className="cc-title">
              <span>Workspace</span>
              Class Dashboard
            </h1>
          </div>
          <button className="cc-create-btn" onClick={() => setIsModalOpen(true)}>
            + New Class
          </button>
        </div>

        {/* ── Welcome banner ── */}
        <div className="cc-banner">
          <p className="cc-banner-text">
            Create and manage your classes here. Each class holds its own assignments,
            grading history, and student performance records.
          </p>
          <button className="cc-create-btn" onClick={() => setIsModalOpen(true)}>
            Create Class →
          </button>
        </div>

        {/* ── Classes grid ── */}
        <p className="cc-section-label">
          Available Classes — {classes?.length || 0}
        </p>
        <div className="cc-grid">
          {(!classes || classes.length === 0) ? (
            <div className="cc-empty">
              <div className="cc-empty-glyph">∅</div>
              <p className="cc-empty-text">No classes yet. Create your first one.</p>
            </div>
          ) : (
            classes.map((cls) => (
              <ClassCard
                key={cls._id}
                title={cls.className}
                id={cls._id}
                description={cls.description}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div className="cc-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cc-modal-title">
              <span>New Class</span>
              Create a Class
            </h2>

            <div className="cc-field">
              <label className="cc-label">Class Title</label>
              <input
                className="cc-input"
                type="text"
                placeholder="e.g. Computer Science 101"
                value={classTitle}
                onChange={(e) => setClassTitle(e.target.value)}
              />
            </div>

            <div className="cc-field">
              <label className="cc-label">Description</label>
              <textarea
                className="cc-textarea"
                rows={4}
                placeholder="What is this class about?"
                value={classDesc}
                onChange={(e) => setClassDesc(e.target.value)}
              />
            </div>

            <div className="cc-modal-actions">
              <button className="cc-btn-cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="cc-btn-submit"
                onClick={handleCreateClass}
                disabled={loading}
              >
                {loading ? "Creating…" : "Create Class"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateClassPage;