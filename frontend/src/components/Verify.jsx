import React from "react";
import { IoCloudDoneSharp } from "react-icons/io5";
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
      --success: #4caf7d;
    }

    @keyframes vFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes vCardIn {
      from { opacity: 0; transform: translateY(28px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes vPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(76,175,125,.35); }
      50%       { box-shadow: 0 0 0 14px rgba(76,175,125,0); }
    }
    @keyframes vCheckIn {
      from { transform: scale(0) rotate(-20deg); opacity: 0; }
      to   { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes vShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    .v-root {
      min-height: 100vh;
      background: var(--bg);
      font-family: 'Outfit', sans-serif;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      position: relative;
      animation: vFadeIn .4s ease both;
    }

    /* dot grid */
    .v-root::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle, rgba(201,168,76,.04) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* success glow */
    .v-root::after {
      content: '';
      position: fixed;
      width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(76,175,125,.05) 0%, transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .v-card {
      position: relative; z-index: 1;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 52px 44px;
      width: 100%; max-width: 420px;
      text-align: center;
      animation: vCardIn .5s .1s ease both;
      overflow: hidden;
    }

    /* green top accent */
    .v-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--success), transparent);
    }

    .v-icon-wrap {
      width: 72px; height: 72px; border-radius: 50%;
      background: rgba(76,175,125,.1);
      border: 1px solid rgba(76,175,125,.25);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 28px;
      animation: vPulse 2.5s ease-in-out infinite;
    }
    .v-icon-wrap svg {
      animation: vCheckIn .5s .5s cubic-bezier(.34,1.56,.64,1) both;
    }

    .v-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--success); opacity: .8;
      margin-bottom: 12px;
    }

    .v-title {
      font-family: 'DM Serif Display', serif;
      font-size: 34px; color: var(--text);
      letter-spacing: -.5px; line-height: 1.1;
      margin-bottom: 16px;
    }
    .v-title em {
      font-style: italic;
      background: linear-gradient(135deg, var(--gold) 0%, #f59e0b 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: vShimmer 3s linear infinite;
    }

    .v-desc {
      font-size: 14px; color: var(--muted);
      line-height: 1.7; margin-bottom: 36px;
      max-width: 300px; margin-left: auto; margin-right: auto;
    }

    .v-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin-bottom: 28px;
    }

    .v-btn {
      display: inline-block;
      background: var(--gold); color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 12px 28px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
      text-decoration: none; letter-spacing: .3px;
      transition: opacity .2s, transform .15s;
    }
    .v-btn:hover { opacity: .86; transform: translateY(-1px); }

    .v-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 1px;
      color: var(--success); opacity: .3;
      margin-top: 24px;
    }
  `}</style>
);

const Verify = () => {
  return (
    <>
      <Styles />
      <div className="v-root">
        <div className="v-card">

          <div className="v-icon-wrap">
            <IoCloudDoneSharp size={30} color="#4caf7d" />
          </div>

          <p className="v-eyebrow">Success</p>
          <h1 className="v-title">Verification <em>Complete</em></h1>
          <p className="v-desc">
            Your account has been successfully verified. You can now log in and
            start grading assignments with AI.
          </p>

          <div className="v-divider" />

          <Link to="/login" className="v-btn">Go to Sign In →</Link>

          <p className="v-code">VERIFICATION_SUCCESS</p>
        </div>
      </div>
    </>
  );
};

export default Verify;