import React, { useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllGradAssignment } from "../redux/actions/assignment.js";
import { getAllClasses } from "../redux/actions/class.js";

/* ─── Font + keyframe injection ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@500&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --bg:       #0f0f0f;
      --surface:  #141414;
      --raised:   #1a1a1a;
      --border:   #242424;
      --gold:     #c9a84c;
      --gold-dim: #6b5520;
      --amber:    #f59e0b;
      --text:     #ede8df;
      --muted:    #5a554e;
      --light-bg: #f5f0e8;
      --light-text:#1a1510;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes floatCard {
      0%, 100% { transform: translateY(0px) rotate(-1deg); }
      50%       { transform: translateY(-10px) rotate(-1deg); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes lineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .hp-root {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    /* ── Noise overlay ── */
    .hp-root::before {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 0; opacity: .4;
    }

    /* ── Hero ── */
    .hero {
      position: relative; z-index: 1;
      min-height: 92vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 60px;
      padding: 80px 80px 60px;
      border-bottom: 1px solid var(--border);
    }
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; padding: 60px 24px 40px; gap: 40px; }
    }

    /* Diagonal accent line */
    .hero::after {
      content: '';
      position: absolute;
      top: 0; right: 38%;
      width: 1px; height: 100%;
      background: linear-gradient(to bottom, transparent, var(--gold-dim), transparent);
      opacity: .5;
    }
    @media (max-width: 900px) { .hero::after { display: none; } }

    .hero-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold);
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 24px;
      animation: fadeUp .5s ease both;
    }
    .hero-eyebrow::before {
      content: '';
      display: block; width: 32px; height: 1px;
      background: var(--gold);
      transform-origin: left;
      animation: lineGrow .6s .3s ease both;
    }

    .hero-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(40px, 5.5vw, 72px);
      line-height: 1.05;
      letter-spacing: -1.5px;
      color: var(--text);
      margin-bottom: 8px;
      animation: fadeUp .5s .1s ease both;
    }
    .hero-title-accent {
      font-style: italic;
      background: linear-gradient(135deg, var(--gold) 0%, var(--amber) 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }

    .hero-desc {
      font-size: 16px; line-height: 1.7;
      color: var(--muted);
      max-width: 440px;
      margin: 24px 0 40px;
      animation: fadeUp .5s .2s ease both;
    }

    .hero-actions {
      display: flex; gap: 16px; flex-wrap: wrap;
      animation: fadeUp .5s .3s ease both;
    }
    .btn-hero-primary {
      background: var(--gold);
      color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 14px 32px;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
      letter-spacing: .5px; cursor: pointer;
      transition: opacity .2s, transform .15s;
      text-decoration: none; display: inline-block;
    }
    .btn-hero-primary:hover { opacity: .85; transform: translateY(-2px); }

    .btn-hero-ghost {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 10px;
      padding: 14px 28px;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500;
      cursor: pointer;
      transition: border-color .2s, color .2s;
      text-decoration: none; display: inline-block;
    }
    .btn-hero-ghost:hover { border-color: var(--gold-dim); color: var(--text); }

    /* ── Stats row ── */
    .hero-stats {
      display: flex; gap: 40px;
      margin-top: 56px;
      padding-top: 40px;
      border-top: 1px solid var(--border);
      animation: fadeUp .5s .4s ease both;
    }
    .stat-item { flex: 1; }
    .stat-num {
      font-family: 'DM Serif Display', serif;
      font-size: 36px; color: var(--text);
      line-height: 1;
    }
    .stat-label {
      font-size: 11px; text-transform: uppercase;
      letter-spacing: 1.5px; color: var(--muted);
      margin-top: 4px;
    }

    /* ── Hero visual ── */
    .hero-visual {
      position: relative;
      animation: fadeIn .7s .2s ease both;
    }
    .hero-card-wrap {
      position: relative;
      width: 100%; max-width: 420px;
      margin-left: auto;
    }
    .hero-card-main {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px;
      animation: floatCard 5s ease-in-out infinite;
      position: relative; z-index: 2;
    }
    .card-top-bar {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 22px;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #e05252; }
    .dot-y { background: #f59e0b; }
    .dot-g { background: #4caf7d; }
    .card-title {
      font-family: 'DM Serif Display', serif;
      font-size: 18px; margin-bottom: 6px;
    }
    .card-sub {
      font-size: 11px; color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 20px;
    }

    .grade-row {
      display: flex; justify-content: space-between; align-items: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px; padding: 12px 16px;
      margin-bottom: 10px;
    }
    .grade-name { font-size: 13px; color: var(--muted); }
    .grade-score {
      font-family: 'DM Serif Display', serif;
      font-size: 22px;
    }
    .grade-bar-wrap {
      flex: 1; margin: 0 14px;
      height: 3px; background: var(--border);
      border-radius: 2px; overflow: hidden;
    }
    .grade-bar-fill {
      height: 100%; border-radius: 2px;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold));
      animation: lineGrow .8s 1s ease both;
      transform-origin: left;
    }

    .card-badge {
      position: absolute; top: -14px; right: 20px;
      background: var(--gold);
      color: #0f0f0f;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 600;
      padding: 5px 12px; border-radius: 20px;
      letter-spacing: 1px;
    }

    /* shadow card behind */
    .hero-card-shadow {
      position: absolute;
      top: 16px; left: 16px;
      width: 100%; height: 100%;
      background: var(--gold-dim);
      border-radius: 20px;
      opacity: .25; z-index: 1;
    }

    /* ── Features section ── */
    .features-section {
      position: relative; z-index: 1;
      background: var(--light-bg);
      padding: 100px 80px;
      color: var(--light-text);
    }
    @media (max-width: 900px) { .features-section { padding: 60px 24px; } }

    /* curved top edge */
    .features-section::before {
      content: '';
      position: absolute; top: -1px; left: 0; right: 0;
      height: 80px;
      background: var(--bg);
      clip-path: ellipse(55% 100% at 50% 0%);
    }

    .features-header {
      text-align: center; margin-bottom: 72px;
    }
    .features-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold-dim); margin-bottom: 16px;
    }
    .features-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(32px, 4vw, 52px);
      letter-spacing: -1px;
      color: var(--light-text);
      line-height: 1.1;
    }
    .features-title em {
      font-style: italic; color: #6b5520;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
    }

    .feature-card {
      background: #fff;
      border: 1px solid #e8e0d0;
      border-radius: 20px;
      padding: 36px 30px;
      position: relative; overflow: hidden;
      transition: transform .2s, box-shadow .2s;
    }
    .feature-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(0,0,0,.08);
    }
    .feature-card::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold));
      transform: scaleX(0); transform-origin: left;
      transition: transform .3s ease;
    }
    .feature-card:hover::after { transform: scaleX(1); }

    .feature-num {
      font-family: 'DM Serif Display', serif;
      font-size: 52px;
      color: #e8e0d0;
      line-height: 1;
      position: absolute; top: 16px; right: 22px;
    }
    .feature-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: #f5f0e8;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .feature-name {
      font-family: 'DM Serif Display', serif;
      font-size: 22px; color: var(--light-text);
      margin-bottom: 10px;
    }
    .feature-desc {
      font-size: 14px; line-height: 1.7;
      color: #6b6055;
    }

    /* ── CTA band ── */
    .cta-band {
      position: relative; z-index: 1;
      background: var(--light-bg);
      padding: 0 80px 100px;
    }
    @media (max-width: 900px) { .cta-band { padding: 0 24px 60px; } }

    .cta-inner {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 60px;
      display: flex; justify-content: space-between; align-items: center;
      gap: 32px; flex-wrap: wrap;
    }
    .cta-text-block {}
    .cta-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(26px, 3.5vw, 44px);
      color: var(--text); line-height: 1.1;
      letter-spacing: -.5px;
    }
    .cta-sub {
      font-size: 14px; color: var(--muted); margin-top: 8px;
    }
  `}</style>
);

const features = [
  {
    icon: "⚡",
    name: "AI Auto Grading",
    desc: "Instantly evaluate assignments using intelligent AI algorithms that understand context, structure, and depth.",
  },
  {
    icon: "⏱",
    name: "Time Saving",
    desc: "Reduce manual checking time dramatically and reclaim hours each week to focus on actual teaching.",
  },
  {
    icon: "📊",
    name: "Detailed Reports",
    desc: "Get accurate performance reports enriched with smart insights, patterns, and actionable feedback.",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { allData } = useSelector((state) => state.assignments);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?._id) {
      dispatch(getAllGradAssignment(user._id));
      dispatch(getAllClasses(user._id));
    }
  }, [dispatch, user?._id]);

  const grades = [
    { name: "Assignment 01", score: 91, pct: 91 },
    { name: "Assignment 02", score: 76, pct: 76 },
    { name: "Assignment 03", score: 88, pct: 88 },
  ];

  return (
    <div className="hp-root">
      <Styles />
      <NavBar active={1} />

      {/* ── Hero ── */}
      <section className="hero">
        {/* Left */}
        <div>
          <div className="hero-eyebrow">AI-Powered Grading</div>

          <h1 className="hero-title">
            Grade smarter.<br />
            Teach <span className="hero-title-accent">better.</span>
          </h1>

          <p className="hero-desc">
            Gradio-AI evaluates student assignments instantly — with nuanced feedback,
            configurable strictness, and detailed class reports. Built for educators who
            value their time.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-hero-primary">Get Started →</Link>
            <Link to="/login" className="btn-hero-ghost">Sign In</Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">10×</div>
              <div className="stat-label">Faster Grading</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">AI</div>
              <div className="stat-label">Powered Insights</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-label">Configurable</div>
            </div>
          </div>
        </div>

        {/* Right — floating card */}
        <div className="hero-visual">
          <div className="hero-card-wrap">
            <div className="hero-card-shadow" />
            <div className="hero-card-main">
              <span className="card-badge">LIVE RESULTS</span>
              <div className="card-top-bar">
                <div className="dot dot-r" />
                <div className="dot dot-y" />
                <div className="dot dot-g" />
              </div>
              <p className="card-title">Smart Grading Dashboard</p>
              <p className="card-sub">gradio-ai / class-7b / batch-03</p>

              {grades.map((g, i) => (
                <div key={i} className="grade-row">
                  <span className="grade-name">{g.name}</span>
                  <div className="grade-bar-wrap">
                    <div className="grade-bar-fill" style={{ width: `${g.pct}%`, animationDelay: `${1 + i * .15}s` }} />
                  </div>
                  <span className="grade-score" style={{ color: g.score >= 85 ? "#c9a84c" : g.score >= 70 ? "#e8e1d4" : "#e05252" }}>
                    {g.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="features-header">
          <p className="features-eyebrow">Why Gradio-AI</p>
          <h2 className="features-title">
            Everything a teacher<br />
            <em>actually needs.</em>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-num">0{i + 1}</span>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-name">{f.name}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Band ── */}
      <div className="cta-band">
        <div className="cta-inner">
          <div className="cta-text-block">
            <h2 className="cta-title">Ready to reclaim<br />your time?</h2>
            <p className="cta-sub">Join educators already grading with AI.</p>
          </div>
          <Link to="/signup" className="btn-hero-primary" style={{ fontSize: 15, padding: "16px 40px" }}>
            Start Free →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;