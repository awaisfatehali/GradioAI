import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
      --amber:   #f59e0b;
      --text:    #ede8df;
      --muted:   #4a4540;
    }

    @keyframes saFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes saShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes saBarGrow {
      from { width: 0; }
      to   { width: var(--bar-w); }
    }

    .sa-page {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
    }

    /* ── Hero band — matches HistoryPage / AssignmentList ── */
    .sa-hero {
      position: relative; z-index: 1;
      padding: 72px 80px 56px;
      border-bottom: 1px solid var(--border);
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    @media (max-width: 768px) { .sa-hero { padding: 56px 24px 40px; } }

    .sa-hero::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background-image: radial-gradient(circle, rgba(201,168,76,.045) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    .sa-hero-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold);
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 16px;
      position: relative; z-index: 1;
      animation: saFadeUp .4s ease both;
    }
    .sa-hero-eyebrow::before, .sa-hero-eyebrow::after {
      content: ''; display: block;
      width: 24px; height: 1px; background: var(--gold-dim);
    }
    .sa-hero-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(32px, 5vw, 60px);
      letter-spacing: -1px; line-height: 1.05;
      position: relative; z-index: 1;
      animation: saFadeUp .4s .08s ease both;
    }
    .sa-hero-title em {
      font-style: italic;
      background: linear-gradient(135deg, var(--gold) 0%, var(--amber) 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: saShimmer 3s linear infinite;
    }
    .sa-hero-file {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--muted);
      margin-top: 12px;
      position: relative; z-index: 1;
      animation: saFadeUp .4s .14s ease both;
      max-width: 560px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .sa-root {
      padding: 48px 80px 80px;
      position: relative;
    }
    @media (max-width: 768px) { .sa-root { padding: 32px 20px 60px; } }

    .sa-inner {
      position: relative; z-index: 1;
      max-width: 760px; margin: 0 auto;
    }

    /* ── Page header ── */
    .sa-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold);
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 14px;
      animation: saFadeUp .4s ease both;
    }
    .sa-eyebrow::before {
      content: ''; display: block;
      width: 20px; height: 1px; background: var(--gold-dim);
    }
    .sa-page-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(28px, 4vw, 48px);
      letter-spacing: -1px; line-height: 1.05;
      margin-bottom: 6px;
      animation: saFadeUp .4s .06s ease both;
    }
    .sa-filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--muted);
      margin-bottom: 32px;
      animation: saFadeUp .4s .1s ease both;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* ── Score card ── */
    .sa-score-card {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px 32px;
      margin-bottom: 20px;
      display: flex; align-items: center; gap: 32px;
      flex-wrap: wrap;
      animation: saFadeUp .4s .14s ease both;
      position: relative; overflow: hidden;
    }
    .sa-score-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
    }
    .sa-score-num {
      font-family: 'DM Serif Display', serif;
      font-size: 72px; line-height: 1;
      flex-shrink: 0;
    }
    .sa-score-num.high { color: var(--gold); }
    .sa-score-num.mid  { color: var(--text); }
    .sa-score-num.low  { color: #c0392b; }
    .sa-score-denom {
      font-family: 'DM Serif Display', serif;
      font-size: 24px; color: var(--muted);
    }
    .sa-score-right { flex: 1; min-width: 180px; }
    .sa-score-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 12px;
    }
    .sa-bar-track {
      height: 4px; background: var(--border);
      border-radius: 4px; overflow: hidden; margin-bottom: 16px;
    }
    .sa-bar-fill {
      height: 100%; border-radius: 4px;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold));
      animation: saBarGrow .8s .6s ease both;
    }
    .sa-meta-row {
      display: flex; gap: 24px; flex-wrap: wrap;
    }
    .sa-meta-item {}
    .sa-meta-key {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 3px;
    }
    .sa-meta-val {
      font-size: 13px; color: var(--text);
    }

    /* ── Info cards ── */
    .sa-cards {
      display: flex; flex-direction: column; gap: 16px;
      margin-bottom: 24px;
    }
    .sa-card {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 22px 24px;
      animation: saFadeUp .4s ease both;
    }
    .sa-card-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 10px;
    }
    .sa-card-text {
      font-size: 14px; color: var(--muted);
      line-height: 1.75;
    }

    /* ── Preview button ── */
    .sa-preview-btn {
      background: var(--gold); color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 13px 28px;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
      cursor: pointer; transition: opacity .2s, transform .15s;
      animation: saFadeUp .4s .3s ease both;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .sa-preview-btn:hover { opacity: .86; transform: translateY(-1px); }

    /* ── iframe wrap ── */
    .sa-iframe-wrap {
      margin-top: 24px;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      animation: saFadeUp .4s ease both;
    }
    .sa-iframe-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
    }
    .sa-iframe-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--muted);
    }
    .sa-iframe-close {
      background: transparent; border: 1px solid var(--border);
      color: var(--muted); border-radius: 8px;
      width: 28px; height: 28px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 14px;
      transition: color .2s, border-color .2s;
    }
    .sa-iframe-close:hover { color: var(--text); border-color: var(--muted); }

    /* skeleton */
    .sa-skeleton {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 40px 32px;
      animation: saFadeUp .4s ease both;
    }
    .sk-line {
      height: 12px; border-radius: 6px;
      background: linear-gradient(90deg, var(--border) 25%, #2a2a2a 50%, var(--border) 75%);
      background-size: 200% auto;
      animation: saShimmer 1.5s linear infinite;
      margin-bottom: 16px;
    }
  `}</style>
);

const SingleAssignment = ({ id }) => {
  const { allData, loading } = useSelector((state) => state.assignments);
  const [d, setD] = useState(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (allData.length > 0) {
      const found = allData.find((item) => item._id === id);
      setD(found || {});
    }
  }, [allData, id]);

  const grade = d?.grade || 0;
  const gradeClass = grade >= 80 ? "high" : grade >= 60 ? "mid" : "low";

  return (
    <>
      <Styles />
      <div className="sa-page">
        <NavBar />

        {/* ── Hero ── */}
        <section className="sa-hero">
          <div className="sa-hero-eyebrow">Grading Report</div>
          <h1 className="sa-hero-title">
            Assignment <em>Details</em>
          </h1>
          {d?.originalFilename && (
            <p className="sa-hero-file">{d.originalFilename}</p>
          )}
        </section>

        <div className="sa-root">
        <div className="sa-inner">

          {/* Loading skeleton */}
          {!d && (
            <div className="sa-skeleton">
              <div className="sk-line" style={{ width: "40%", height: 18 }} />
              <div className="sk-line" style={{ width: "70%" }} />
              <div className="sk-line" style={{ width: "55%" }} />
              <div className="sk-line" style={{ width: "90%", marginTop: 24 }} />
              <div className="sk-line" style={{ width: "80%" }} />
            </div>
          )}

          {d && Object.keys(d).length > 0 && (
            <>

              {/* Score card */}
              <div className="sa-score-card">
                <div>
                  <span className={`sa-score-num ${gradeClass}`}>{grade}</span>
                  <span className="sa-score-denom">/100</span>
                </div>
                <div className="sa-score-right">
                  <p className="sa-score-label">Performance</p>
                  <div className="sa-bar-track">
                    <div
                      className="sa-bar-fill"
                      style={{ "--bar-w": `${grade}%`, width: `${grade}%` }}
                    />
                  </div>
                  <div className="sa-meta-row">
                    <div className="sa-meta-item">
                      <p className="sa-meta-key">Graded At</p>
                      <p className="sa-meta-val">
                        {new Date(d.gradedAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </p>
                    </div>
                    {d.strictNess && (
                      <div className="sa-meta-item">
                        <p className="sa-meta-key">Strictness</p>
                        <p className="sa-meta-val">{d.strictNess}</p>
                      </div>
                    )}
                    {d.class?.className && (
                      <div className="sa-meta-item">
                        <p className="sa-meta-key">Class</p>
                        <p className="sa-meta-val">{d.class.className}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Criteria + Feedback cards */}
              <div className="sa-cards">
                {d.criteria && (
                  <div className="sa-card" style={{ animationDelay: ".18s" }}>
                    <p className="sa-card-label">Grading Criteria</p>
                    <p className="sa-card-text">{d.criteria}</p>
                  </div>
                )}
                {d.feedback && (
                  <div className="sa-card" style={{ animationDelay: ".22s" }}>
                    <p className="sa-card-label">AI Feedback</p>
                    <p className="sa-card-text">{d.feedback}</p>
                  </div>
                )}
              </div>

              {/* Preview toggle */}
              {!preview ? (
                <button className="sa-preview-btn" onClick={() => setPreview(true)}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                  View Assignment
                </button>
              ) : (
                <div className="sa-iframe-wrap">
                  <div className="sa-iframe-bar">
                    <span className="sa-iframe-title">Assignment Preview</span>
                    <button className="sa-iframe-close" onClick={() => setPreview(false)}>✕</button>
                  </div>
                  <iframe
                    src={d.fileUrl}
                    title="Assignment Preview"
                    width="100%"
                    height="620px"
                    style={{ display: "block", border: "none" }}
                  />
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {d && Object.keys(d).length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, color: "var(--border)", lineHeight: 1, marginBottom: 14 }}>∅</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "var(--muted)" }}>Assignment not found.</p>
            </div>
          )}

        </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SingleAssignment;