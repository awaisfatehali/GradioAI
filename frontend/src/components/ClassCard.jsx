import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Backend_url } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

const Styles = () => (
  <style>{`
    @keyframes clCardIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes clModalIn {
      from { opacity: 0; transform: scale(.96) translateY(8px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    /* ── Card ── */
    .cl-card {
      position: relative;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 22px 22px 18px;
      display: flex; flex-direction: column; gap: 14px;
      cursor: pointer;
      transition: border-color .2s, transform .2s, box-shadow .2s;
      animation: clCardIn .35s ease both;
      min-height: 160px;
    }
    .cl-card:hover {
      border-color: var(--gold-dim);
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0,0,0,.3);
    }
    /* gold top accent on hover */
    .cl-card::before {
      content: '';
      position: absolute; top: 0; left: 20px; right: 20px; height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      border-radius: 2px;
      opacity: 0; transition: opacity .25s;
    }
    .cl-card:hover::before { opacity: 1; }

    /* ── Delete btn ── */
    .cl-del-btn {
      position: absolute; top: 14px; right: 14px;
      width: 28px; height: 28px; border-radius: 8px;
      border: 1px solid var(--border);
      background: transparent; color: var(--muted);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background .2s, color .2s, border-color .2s;
    }
    .cl-del-btn:hover {
      background: rgba(192,57,43,.1);
      border-color: rgba(192,57,43,.35);
      color: #c0392b;
    }

    /* ── Icon + title ── */
    .cl-card-top {
      display: flex; align-items: center; gap: 14px;
      padding-right: 30px;
    }
    .cl-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: rgba(201,168,76,.08);
      border: 1px solid rgba(201,168,76,.15);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: background .2s, border-color .2s;
    }
    .cl-card:hover .cl-icon {
      background: rgba(201,168,76,.15);
      border-color: rgba(201,168,76,.3);
    }

    .cl-card-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 3px;
    }
    .cl-card-title {
      font-family: 'DM Serif Display', serif;
      font-size: 16px; color: var(--text);
      letter-spacing: -.2px; line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      max-width: 160px;
    }

    /* ── Divider ── */
    .cl-divider {
      height: 1px; background: var(--border);
    }

    /* ── Description ── */
    .cl-desc {
      font-family: 'Outfit', sans-serif;
      font-size: 12px; color: var(--muted);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── Footer ── */
    .cl-footer {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: auto;
    }
    .cl-footer-hint {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
      color: var(--muted); opacity: .5;
    }
    .cl-arrow-btn {
      width: 28px; height: 28px; border-radius: 8px;
      background: rgba(201,168,76,.08);
      border: 1px solid rgba(201,168,76,.15);
      display: flex; align-items: center; justify-content: center;
      transition: background .2s, border-color .2s;
      text-decoration: none;
    }
    .cl-card:hover .cl-arrow-btn {
      background: var(--gold);
      border-color: var(--gold);
    }
    .cl-card:hover .cl-arrow-icon { stroke: #0f0f0f; }
    .cl-arrow-icon { stroke: var(--gold); transition: stroke .2s; }

    /* ── Confirm modal overlay ── */
    .cl-overlay {
      position: fixed; inset: 0; z-index: 300;
      background: rgba(0,0,0,.75);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }
    .cl-confirm {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 32px 28px;
      width: 100%; max-width: 360px;
      display: flex; flex-direction: column; align-items: center; gap: 14px;
      animation: clModalIn .28s cubic-bezier(.22,.61,.36,1) both;
    }
    .cl-confirm-icon {
      width: 48px; height: 48px; border-radius: 12px;
      background: rgba(192,57,43,.1);
      border: 1px solid rgba(192,57,43,.2);
      display: flex; align-items: center; justify-content: center;
    }
    .cl-confirm-title {
      font-family: 'DM Serif Display', serif;
      font-size: 22px; color: var(--text); text-align: center;
    }
    .cl-confirm-desc {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted);
      text-align: center; line-height: 1.6;
    }
    .cl-confirm-desc strong { color: var(--gold); font-weight: 600; }
    .cl-confirm-actions {
      display: flex; gap: 10px; width: 100%; margin-top: 4px;
    }
    .cl-btn-cancel {
      flex: 1; padding: 10px;
      background: transparent;
      border: 1px solid var(--border); border-radius: 10px;
      font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--muted);
      cursor: pointer; transition: border-color .2s, color .2s;
    }
    .cl-btn-cancel:hover { border-color: var(--gold-dim); color: var(--text); }
    .cl-btn-delete {
      flex: 1; padding: 10px;
      background: rgba(192,57,43,.15);
      border: 1px solid rgba(192,57,43,.3); border-radius: 10px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
      color: #c0392b;
      cursor: pointer; transition: background .2s;
    }
    .cl-btn-delete:hover { background: rgba(192,57,43,.25); }
  `}</style>
);

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
      <Styles />

      {/* ── Confirm modal ── */}
      {showConfirm && (
        <div className="cl-overlay" onClick={() => setShowConfirm(false)}>
          <div className="cl-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="cl-confirm-icon">
              <svg width="20" height="20" fill="none" stroke="#c0392b" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </div>
            <h3 className="cl-confirm-title">Delete Class?</h3>
            <p className="cl-confirm-desc">
              This will permanently delete <strong>{title}</strong> and all its assignments. This cannot be undone.
            </p>
            <div className="cl-confirm-actions">
              <button className="cl-btn-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="cl-btn-delete" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Card ── */}
      <div className="cl-card" onClick={onClick}>
        {/* Delete btn */}
        <button
          className="cl-del-btn"
          onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
          title="Delete class"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Icon + title */}
        <div className="cl-card-top">
          <div className="cl-icon">
            <svg width="18" height="18" fill="none" stroke="#c9a84c" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p className="cl-card-label">Class</p>
            <h2 className="cl-card-title" title={title}>{title}</h2>
          </div>
        </div>

        <div className="cl-divider" />

        {/* Description */}
        <p className="cl-desc">{description}</p>

        {/* Footer */}
        <div className="cl-footer">
          <span className="cl-footer-hint">Open class</span>
          <Link
            to={`/classeview/${id}`}
            className="cl-arrow-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="13" height="13" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="cl-arrow-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClassCard;