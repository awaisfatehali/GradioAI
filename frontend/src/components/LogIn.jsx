import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    @keyframes liPageIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes liCardIn {
      from { opacity: 0; transform: translateY(24px) scale(.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes liShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    .li-root {
      min-height: 100vh;
      display: flex;
      background: var(--bg);
      font-family: 'Outfit', sans-serif;
      animation: liPageIn .4s ease both;
    }

    /* ── Left decorative panel ── */
    .li-panel {
      flex: 1;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      padding: 60px;
      border-right: 1px solid var(--border);
      position: relative; overflow: hidden;
    }
    @media (max-width: 768px) { .li-panel { display: none; } }

    /* dot grid */
    .li-panel::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle, rgba(201,168,76,.05) 1px, transparent 1px);
      background-size: 28px 28px;
    }
    /* glow */
    .li-panel::after {
      content: '';
      position: absolute;
      width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .li-panel-logo {
      position: relative; z-index: 1;
      text-align: center;
    }
    .li-panel-wordmark {
      font-family: 'DM Serif Display', serif;
      font-size: 52px; letter-spacing: -2px; line-height: 1;
      background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: liShimmer 3.5s linear infinite;
    }
    .li-panel-tagline {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--muted); margin-top: 12px;
    }

    .li-panel-stats {
      position: relative; z-index: 1;
      display: flex; gap: 40px; margin-top: 64px;
    }
    .li-stat { text-align: center; }
    .li-stat-num {
      font-family: 'DM Serif Display', serif;
      font-size: 32px; color: var(--text); line-height: 1;
    }
    .li-stat-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
      color: var(--muted); margin-top: 4px;
    }

    /* ── Right form panel ── */
    .li-form-panel {
      width: 480px; flex-shrink: 0;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      padding: 60px 48px;
      background: var(--surface);
    }
    @media (max-width: 768px) {
      .li-form-panel { width: 100%; padding: 48px 24px; }
    }

    .li-form-wrap {
      width: 100%; max-width: 360px;
      animation: liCardIn .5s .1s ease both;
    }

    /* eyebrow */
    .li-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 12px;
      display: flex; align-items: center; gap: 10px;
    }
    .li-eyebrow::before {
      content: ''; display: block;
      width: 20px; height: 1px; background: var(--gold-dim);
    }

    .li-form-title {
      font-family: 'DM Serif Display', serif;
      font-size: 36px; color: var(--text);
      letter-spacing: -.5px; line-height: 1.1;
      margin-bottom: 8px;
    }
    .li-form-sub {
      font-size: 13px; color: var(--muted); margin-bottom: 36px;
    }

    /* fields */
    .li-field { margin-bottom: 20px; }
    .li-label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 8px;
    }
    .li-input-wrap { position: relative; }
    .li-input {
      width: 100%;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
      font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--text);
      transition: border-color .2s;
    }
    .li-input::placeholder { color: var(--muted); }
    .li-input:focus { outline: none; border-color: var(--gold); }
    .li-input-pr { padding-right: 44px; }

    .li-eye-btn {
      position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none;
      color: var(--muted); cursor: pointer;
      display: flex; align-items: center;
      transition: color .2s;
    }
    .li-eye-btn:hover { color: var(--text); }

    /* row */
    .li-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 28px;
    }
    .li-link {
      font-size: 12px; color: var(--muted);
      text-decoration: none; transition: color .2s;
    }
    .li-link span { color: var(--gold); font-weight: 600; }
    .li-link:hover { color: var(--text); }
    .li-link-gold {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; color: var(--gold);
      text-decoration: none; letter-spacing: .5px;
      transition: opacity .2s;
    }
    .li-link-gold:hover { opacity: .75; }

    /* submit */
    .li-submit {
      width: 100%;
      background: var(--gold); color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 14px;
      font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
      letter-spacing: .3px; cursor: pointer;
      transition: opacity .2s, transform .15s;
    }
    .li-submit:hover { opacity: .87; transform: translateY(-1px); }
    .li-submit:active { transform: translateY(0); }

    /* forgot mode title */
    .li-forgot-label {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; color: var(--muted); line-height: 1.6;
      margin-bottom: 20px;
    }
  `}</style>
);

const LogIn = () => {
  const Navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [visible, SetVisible] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);

  const HandleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Backend_url}/user/request-reset-password`, { email });
      if (response?.data?.ssuccess) {
        toast.success(response?.data?.message || "Email Sent — Check Your Inbox!");
      }
    } catch (error) {
      toast.error(error || "Error Occurred!");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${Backend_url}/user/login-user`, { email, password }, { withCredentials: true })
      .then(() => {
        toast.success("Login Successful!");
        setTimeout(() => { Navigate("/"); window.location.reload(); }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Styles />
      <div className="li-root">

        {/* ── Left panel ── */}
        <div className="li-panel">
          <div className="li-panel-logo">
            <div className="li-panel-wordmark">Gradio-AI</div>
            <p className="li-panel-tagline">AI-Powered Grading System</p>
          </div>
          <div className="li-panel-stats">
            <div className="li-stat">
              <div className="li-stat-num">10×</div>
              <div className="li-stat-label">Faster</div>
            </div>
            <div className="li-stat">
              <div className="li-stat-num">AI</div>
              <div className="li-stat-label">Feedback</div>
            </div>
            <div className="li-stat">
              <div className="li-stat-num">100%</div>
              <div className="li-stat-label">Accurate</div>
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="li-form-panel">
          <div className="li-form-wrap">
            <div className="li-eyebrow">
              {forgetPass ? "Account Recovery" : "Welcome back"}
            </div>
            <h1 className="li-form-title">
              {forgetPass ? "Reset Password" : "Sign In"}
            </h1>
            <p className="li-form-sub">
              {forgetPass
                ? "Enter your email and we'll send a reset link."
                : "Continue to your Gradio-AI dashboard."}
            </p>

            <form onSubmit={forgetPass ? HandleForgetPassword : HandleSubmit}>
              {/* Email */}
              <div className="li-field">
                <label className="li-label" htmlFor="email">Email</label>
                <input
                  className="li-input"
                  type="email" id="email" name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password — hidden in forgot mode */}
              {!forgetPass && (
                <div className="li-field">
                  <label className="li-label" htmlFor="password">Password</label>
                  <div className="li-input-wrap">
                    <input
                      className="li-input li-input-pr"
                      type={visible ? "text" : "password"}
                      id="password" name="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => SetPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="li-eye-btn"
                      onClick={() => SetVisible((v) => !v)}
                    >
                      {visible
                        ? <AiOutlineEye size={18} />
                        : <AiOutlineEyeInvisible size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Row: signup link + forgot */}
              <div className="li-row">
                <Link to="/signup" className="li-link">
                  No account? <span>Sign Up</span>
                </Link>
                <span
                  className="li-link-gold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setForgetPass((f) => !f)}
                >
                  {forgetPass ? "← Back to Login" : "Forgot Password?"}
                </span>
              </div>

              <button type="submit" className="li-submit">
                {forgetPass ? "Send Reset Link" : "Sign In →"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default LogIn;