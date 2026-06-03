import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Backend_url } from "../server.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Styles = () => (
  <style>{`
    @keyframes pfFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .pf-root {
      width: 100%;
      padding: 8px 0;
      font-family: 'Outfit', sans-serif;
    }

    .pf-card {
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px;
      width: 100%; max-width: 400px;
      position: relative;
      animation: pfFadeUp .4s ease both;
    }

    /* ── Header ── */
    .pf-header {
      display: flex; justify-content: space-between;
      align-items: flex-start; margin-bottom: 24px;
    }
    .pf-title-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 6px;
    }
    .pf-title {
      font-family: 'DM Serif Display', serif;
      font-size: 24px; color: var(--text);
      letter-spacing: -.3px; line-height: 1.1;
    }

    /* avatar */
    .pf-avatar {
      width: 48px; height: 48px; border-radius: 50%;
      background: rgba(201,168,76,.1);
      border: 1px solid rgba(201,168,76,.2);
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Serif Display', serif;
      font-size: 20px; color: var(--gold);
      flex-shrink: 0;
    }

    /* ── Divider ── */
    .pf-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin-bottom: 22px;
    }

    /* ── Fields ── */
    .pf-field { margin-bottom: 16px; }
    .pf-label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--muted); margin-bottom: 7px;
    }
    .pf-input {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 13px;
      font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--text);
      transition: border-color .2s;
    }
    .pf-input::placeholder { color: var(--muted); }
    .pf-input:focus { outline: none; border-color: var(--gold); }
    .pf-input:disabled {
      opacity: .4; cursor: not-allowed;
      color: var(--muted);
    }

    /* ── Actions ── */
    .pf-actions {
      display: flex; gap: 10px; margin-top: 22px;
    }
    .pf-btn-update {
      flex: 1;
      background: var(--gold); color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 11px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
      cursor: pointer; transition: opacity .2s, transform .15s;
    }
    .pf-btn-update:hover { opacity: .86; transform: translateY(-1px); }

    .pf-btn-logout {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 10px; padding: 11px 18px;
      font-family: 'Outfit', sans-serif; font-size: 13px;
      cursor: pointer; transition: border-color .2s, color .2s, background .2s;
      white-space: nowrap;
    }
    .pf-btn-logout:hover {
      border-color: rgba(192,57,43,.4);
      color: #c0392b;
      background: rgba(192,57,43,.07);
    }
  `}</style>
);

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle update logic here
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${Backend_url}/user/logout`, { withCredentials: true });
      toast.success("Logout successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <>
      <Styles />
      <section className="pf-root">
        <div className="pf-card">

          {/* Header */}
          <div className="pf-header">
            <div>
              <p className="pf-title-label">Account</p>
              <h2 className="pf-title">Profile Settings</h2>
            </div>
            <div className="pf-avatar">{initials}</div>
          </div>

          <div className="pf-divider" />

          {message && (
            <div style={{
              background: "rgba(201,168,76,.1)", border: "1px solid rgba(201,168,76,.2)",
              borderRadius: 8, padding: "8px 12px", marginBottom: 16,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "var(--gold)", textAlign: "center"
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email — disabled */}
            <div className="pf-field">
              <label className="pf-label">Email</label>
              <input
                className="pf-input"
                type="text"
                value={user?.email || ""}
                disabled
              />
            </div>

            {/* Name */}
            <div className="pf-field">
              <label className="pf-label">Display Name</label>
              <input
                className="pf-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user?.name}
                required
              />
            </div>

            {/* New password */}
            <div className="pf-field">
              <label className="pf-label">New Password</label>
              <input
                className="pf-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
              />
            </div>

            {/* Confirm password */}
            <div className="pf-field">
              <label className="pf-label">Confirm Password</label>
              <input
                className="pf-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>

            <div className="pf-actions">
              <button type="submit" className="pf-btn-update">
                Save Changes
              </button>
              <button type="button" className="pf-btn-logout" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </form>

        </div>
      </section>
    </>
  );
};

export default ProfilePage;
