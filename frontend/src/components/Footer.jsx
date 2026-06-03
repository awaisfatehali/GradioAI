import React from "react";
import { Link } from "react-router-dom";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@500&family=Outfit:wght@300;400;500;600&display=swap');

    .footer {
      background: #0a0a0a;
      border-top: 1px solid #1a1a1a;
      font-family: 'Outfit', sans-serif;
      padding: 72px 80px 40px;
      position: relative;
      overflow: hidden;
    }
    @media (max-width: 768px) { .footer { padding: 48px 24px 32px; } }

    /* subtle gold grid lines in bg */
    .footer::before {
      content: '';
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }

    .footer-inner {
      max-width: 1200px; margin: 0 auto;
      position: relative; z-index: 1;
    }

    /* ── Top row ── */
    .footer-top {
      display: grid;
      grid-template-columns: 1.8fr 1fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 64px;
    }
    @media (max-width: 900px) {
      .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
    }
    @media (max-width: 500px) {
      .footer-top { grid-template-columns: 1fr; gap: 32px; }
    }

    /* Brand col */
    .footer-brand {}
    .footer-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; margin-bottom: 20px;
    }
    .footer-logo img {
      height: 34px; width: 34px;
      border-radius: 8px;
      border: 1px solid #222;
    }
    .footer-logo-text {
      font-family: 'DM Serif Display', serif;
      font-size: 20px; color: #ede8df;
      letter-spacing: -.3px;
    }
    .footer-logo-text span { color: #c9a84c; font-style: italic; }

    .footer-tagline {
      font-size: 13px; line-height: 1.7;
      color: #3d3830; /* very muted */
      max-width: 240px;
    }
    .footer-tagline strong {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: #c9a84c; margin-bottom: 8px; font-weight: 500;
    }

    /* Link cols */
    .footer-col-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
      color: #3d3830;
      margin-bottom: 20px;
    }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul a,
    .footer-col ul li {
      font-size: 13px; color: #4a4540;
      text-decoration: none; cursor: pointer;
      transition: color .2s;
      display: block;
    }
    .footer-col ul a:hover,
    .footer-col ul li:hover { color: #c9a84c; }

    /* ── Divider ── */
    .footer-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #1e1e1e 20%, #1e1e1e 80%, transparent);
      margin-bottom: 32px;
    }

    /* ── Bottom row ── */
    .footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 12px;
    }
    .footer-copy {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: #2a2520;
      letter-spacing: .5px;
    }
    .footer-copy span { color: #c9a84c; }

    .footer-badge {
      display: flex; align-items: center; gap: 8px;
      background: #111;
      border: 1px solid #1e1e1e;
      border-radius: 20px;
      padding: 6px 14px;
    }
    .footer-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #4caf7d;
      box-shadow: 0 0 6px #4caf7d;
    }
    .footer-badge-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; color: #3d3830; letter-spacing: 1px;
    }
  `}</style>
);

const Footer = () => {
  return (
    <footer className="footer">
      <Styles />
      <div className="footer-inner">

        {/* ── Top grid ── */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="Gradio-AI logo" />
              <span className="footer-logo-text">Gradio<span>-AI</span></span>
            </Link>
            <p className="footer-tagline">
              <strong>AI-Powered Grading</strong>
              Evaluate student assignments faster, smarter, and more accurately — built for educators who value their time.
            </p>
          </div>

          {/* Product */}
          <div className="footer-col">
            <p className="footer-col-title">Product</p>
            <ul>
              <Link to="/"><li>Home</li></Link>
              <li>AI Detector</li>
              <li>Pricing</li>
              <Link to="/login"><li>Login</li></Link>
              <Link to="/signup"><li>Sign Up</li></Link>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <ul>
              <Link to="/about"><li>About</li></Link>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms &amp; Conditions</li>
            </ul>
          </div>

          {/* Partnership */}
          <div className="footer-col">
            <p className="footer-col-title">Partnership</p>
            <ul>
              <li>Affiliate Program</li>
            </ul>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 <span>Awais Fateh Ali</span>. All rights reserved.
          </p>
          <div className="footer-badge">
            <div className="footer-badge-dot" />
            <span className="footer-badge-text">All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;