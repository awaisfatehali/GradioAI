import React from "react";
import { BiSolidError } from "react-icons/bi";
import { Link } from "react-router-dom";

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
      --danger:  #c0392b;
    }

    @keyframes nvFadeIn  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes nvCardIn  {
      from { opacity: 0; transform: translateY(28px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes nvPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(192,57,43,.35); }
      50%       { box-shadow: 0 0 0 14px rgba(192,57,43,0); }
    }
    @keyframes nvShake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-4px); }
      40%       { transform: translateX(4px); }
      60%       { transform: translateX(-3px); }
      80%       { transform: translateX(3px); }
    }

    .nv-root {
      min-height: 100vh;
      background: var(--bg);
      font-family: 'Outfit', sans-serif;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      position: relative;
      animation: nvFadeIn .4s ease both;
    }

    /* dot grid */
    .nv-root::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle, rgba(201,168,76,.04) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* danger glow */
    .nv-root::after {
      content: '';
      position: fixed;
      width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(192,57,43,.06) 0%, transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .nv-card {
      position: relative; z-index: 1;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 52px 44px;
      width: 100%; max-width: 420px;
      text-align: center;
      animation: nvCardIn .5s .1s ease both;
      overflow: hidden;
    }

    /* red top accent */
    .nv-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--danger), transparent);
    }

    /* icon ring */
    .nv-icon-wrap {
      width: 72px; height: 72px; border-radius: 50%;
      background: rgba(192,57,43,.1);
      border: 1px solid rgba(192,57,43,.25);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 28px;
      animation: nvPulse 2.5s ease-in-out infinite, nvShake .5s .6s ease both;
    }

    .nv-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--danger); opacity: .8;
      margin-bottom: 12px;
    }

    .nv-title {
      font-family: 'DM Serif Display', serif;
      font-size: 34px; color: var(--text);
      letter-spacing: -.5px; line-height: 1.1;
      margin-bottom: 16px;
    }

    .nv-desc {
      font-size: 14px; color: var(--muted);
      line-height: 1.7; margin-bottom: 36px;
      max-width: 300px; margin-left: auto; margin-right: auto;
    }

    .nv-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin-bottom: 28px;
    }

    .nv-btn {
      display: inline-block;
      background: var(--raised);
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 10px; padding: 11px 24px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
      text-decoration: none;
      transition: border-color .2s, color .2s;
    }
    .nv-btn:hover { border-color: var(--gold-dim); color: var(--text); }

    .nv-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 1px;
      color: var(--muted); opacity: .4;
      margin-top: 24px;
    }
  `}</style>
);

const NotVerify = () => {
  return (
    <>
      <Styles />
      <div className="nv-root">
        <div className="nv-card">

          <div className="nv-icon-wrap">
            <BiSolidError size={30} color="#c0392b" />
          </div>

          <p className="nv-eyebrow">Error</p>
          <h1 className="nv-title">Verification Failed</h1>
          <p className="nv-desc">
            Something went wrong during verification. The link may have expired or already been used.
          </p>

          <div className="nv-divider" />

          <Link to="/" className="nv-btn">← Back to Home</Link>

          <p className="nv-code">ERR_VERIFICATION_FAILED</p>
        </div>
      </div>
    </>
  );
};

export default NotVerify;