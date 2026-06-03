import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../server";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --bg:      #0f0f0f;
      --surface: #141414;
      --raised:  #1a1a1a;
      --border:  #242424;
      --gold:    #c9a84c;
      --gold-dim:#6b5520;
      --text:    #ede8df;
      --muted:   #4a4540;
    }

    @keyframes suPageIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes suCardIn  {
      from { opacity:0; transform: translateY(24px) scale(.98); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }
    @keyframes suShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes suLineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    .su-root {
      min-height: 100vh;
      display: flex;
      background: var(--bg);
      font-family: 'Outfit', sans-serif;
      animation: suPageIn .4s ease both;
    }

    /* ── Right decorative panel ── */
    .su-panel {
      flex: 1;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      padding: 60px;
      border-left: 1px solid var(--border);
      position: relative; overflow: hidden;
      order: 2;
    }
    @media (max-width: 768px) { .su-panel { display: none; } }

    .su-panel::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle, rgba(201,168,76,.05) 1px, transparent 1px);
      background-size: 28px 28px;
    }
    .su-panel::after {
      content: '';
      position: absolute;
      width: 420px; height: 420px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .su-panel-inner { position: relative; z-index: 1; text-align: center; }

    .su-panel-wordmark {
      font-family: 'DM Serif Display', serif;
      font-size: 52px; letter-spacing: -2px; line-height: 1;
      background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: suShimmer 3.5s linear infinite;
    }
    .su-panel-tagline {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--muted); margin-top: 12px;
    }

    /* feature list */
    .su-features {
      margin-top: 56px;
      display: flex; flex-direction: column; gap: 16px;
      text-align: left;
    }
    .su-feature {
      display: flex; align-items: center; gap: 14px;
    }
    .su-feature-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--gold); flex-shrink: 0;
    }
    .su-feature-text {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted);
    }

    /* ── Left form panel ── */
    .su-form-panel {
      width: 480px; flex-shrink: 0; order: 1;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      padding: 60px 48px;
      background: var(--surface);
    }
    @media (max-width: 768px) {
      .su-form-panel { width: 100%; padding: 48px 24px; }
    }

    .su-form-wrap {
      width: 100%; max-width: 360px;
      animation: suCardIn .5s .1s ease both;
    }

    .su-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 12px;
      display: flex; align-items: center; gap: 10px;
    }
    .su-eyebrow::before {
      content: ''; display: block;
      width: 20px; height: 1px; background: var(--gold-dim);
    }

    .su-form-title {
      font-family: 'DM Serif Display', serif;
      font-size: 36px; color: var(--text);
      letter-spacing: -.5px; line-height: 1.1;
      margin-bottom: 8px;
    }
    .su-form-sub {
      font-size: 13px; color: var(--muted); margin-bottom: 36px;
      line-height: 1.6;
    }

    .su-field { margin-bottom: 18px; }
    .su-label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 8px;
    }
    .su-input-wrap { position: relative; }
    .su-input {
      width: 100%;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
      font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--text);
      transition: border-color .2s;
    }
    .su-input::placeholder { color: var(--muted); }
    .su-input:focus { outline: none; border-color: var(--gold); }
    .su-input-pr { padding-right: 44px; }

    .su-eye-btn {
      position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none;
      color: var(--muted); cursor: pointer;
      display: flex; align-items: center;
      transition: color .2s;
    }
    .su-eye-btn:hover { color: var(--text); }

    .su-row {
      display: flex; justify-content: flex-start;
      margin-bottom: 28px; margin-top: 4px;
    }
    .su-link {
      font-size: 12px; color: var(--muted);
      text-decoration: none; transition: color .2s;
    }
    .su-link span { color: var(--gold); font-weight: 600; }
    .su-link:hover { color: var(--text); }

    .su-submit {
      width: 100%;
      background: var(--gold); color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 14px;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
      letter-spacing: .3px; cursor: pointer;
      transition: opacity .2s, transform .15s;
    }
    .su-submit:hover { opacity: .87; transform: translateY(-1px); }
    .su-submit:active { transform: translateY(0); }

    /* divider */
    .su-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 28px 0;
    }

    /* terms note */
    .su-terms {
      font-size: 11px; color: var(--muted);
      text-align: center; line-height: 1.6;
    }
  `}</style>
);

const features = [
  "AI-powered assignment grading",
  "Configurable strictness levels",
  "Detailed feedback per submission",
  "Class management dashboard",
];

const SignUp = () => {
  const [email, SetEmail] = useState("");
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [visible, SetVisible] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${Backend_url}/user/create-user`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        toast.success(res.data.message);
        SetName(""); SetEmail(""); SetPassword("");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <>
      <Styles />
      <div className="su-root">

        {/* ── Left form panel ── */}
        <div className="su-form-panel">
          <div className="su-form-wrap">
            <div className="su-eyebrow">Get started</div>
            <h1 className="su-form-title">Create account</h1>
            <p className="su-form-sub">
              Join Gradio-AI and start grading smarter today.
            </p>

            <form onSubmit={HandleSubmit}>
              {/* Name */}
              <div className="su-field">
                <label className="su-label" htmlFor="name">Full Name</label>
                <input
                  className="su-input"
                  type="text" id="name" name="name"
                  placeholder="Awais Fateh Ali"
                  value={name}
                  onChange={(e) => SetName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="su-field">
                <label className="su-label" htmlFor="email">Email</label>
                <input
                  className="su-input"
                  type="email" id="email" name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="su-field">
                <label className="su-label" htmlFor="password">Password</label>
                <div className="su-input-wrap">
                  <input
                    className="su-input su-input-pr"
                    type={visible ? "text" : "password"}
                    id="password" name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="su-eye-btn"
                    onClick={() => SetVisible((v) => !v)}
                  >
                    {visible
                      ? <AiOutlineEye size={18} />
                      : <AiOutlineEyeInvisible size={18} />}
                  </button>
                </div>
              </div>

              {/* Already have account */}
              <div className="su-row">
                <Link to="/login" className="su-link">
                  Already have an account? <span>Sign In</span>
                </Link>
              </div>

              <button type="submit" className="su-submit">
                Create Account →
              </button>
            </form>

            <div className="su-divider" />
            <p className="su-terms">
              By signing up you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        {/* ── Right decorative panel ── */}
        <div className="su-panel">
          <div className="su-panel-inner">
            <div className="su-panel-wordmark">Gradio-AI</div>
            <p className="su-panel-tagline">AI-Powered Grading System</p>
            <div className="su-features">
              {features.map((f, i) => (
                <div key={i} className="su-feature">
                  <div className="su-feature-dot" />
                  <span className="su-feature-text">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default SignUp;




