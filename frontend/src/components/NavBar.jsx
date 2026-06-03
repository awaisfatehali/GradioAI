import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FaHistory } from "react-icons/fa";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@500&family=Outfit:wght@400;500;600;700&display=swap');

    :root {
      --nav-bg:     #0f0f0f;
      --nav-border: #1e1e1e;
      --gold:       #c9a84c;
      --gold-dim:   #6b5520;
      --text:       #ede8df;
      --muted:      #5a554e;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideLeft {
      from { transform: translateX(-100%); }
      to   { transform: translateX(0); }
    }
    @keyframes fadeOverlay {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      height: 60px;
      background: rgba(15,15,15,.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--nav-border);
      display: flex; align-items: center;
      padding: 0 40px;
      justify-content: space-between;
      animation: slideDown .4s ease both;
      font-family: 'Outfit', sans-serif;
    }
    @media (max-width: 640px) { .navbar { padding: 0 16px; } }

    /* Logo */
    .nav-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .nav-logo img {
      height: 32px; width: 32px;
      border-radius: 8px;
      border: 1px solid var(--nav-border);
    }
    .nav-logo-text {
      font-family: 'DM Serif Display', serif;
      font-size: 20px;
      color: var(--text);
      letter-spacing: -.3px;
    }
    .nav-logo-text span {
      color: var(--gold);
      font-style: italic;
    }

    /* Desktop links */
    .nav-links {
      display: flex; align-items: center; gap: 4px;
      list-style: none;
    }
    @media (max-width: 768px) { .nav-links { display: none; } }

    .nav-link {
      position: relative;
      display: flex; align-items: center; gap: 6px;
      padding: 6px 14px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 13px; font-weight: 500;
      color: var(--muted);
      transition: color .2s, background .2s;
      white-space: nowrap;
    }
    .nav-link:hover { color: var(--text); background: rgba(255,255,255,.04); }
    .nav-link.active {
      color: var(--gold);
    }
    /* active indicator dot */
    .nav-link.active::after {
      content: '';
      position: absolute; bottom: 2px; left: 50%;
      transform: translateX(-50%);
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--gold);
    }

    /* CTA button */
    .nav-cta {
      background: var(--gold);
      color: #0f0f0f;
      border: none; border-radius: 8px;
      padding: 8px 20px;
      font-family: 'Outfit', sans-serif;
      font-size: 13px; font-weight: 700;
      letter-spacing: .3px;
      cursor: pointer;
      text-decoration: none;
      transition: opacity .2s, transform .15s;
      white-space: nowrap;
      display: inline-block;
    }
    .nav-cta:hover { opacity: .85; transform: translateY(-1px); }

    /* Hamburger */
    .nav-hamburger {
      display: none;
      background: none; border: none;
      color: var(--muted); cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      transition: color .2s, background .2s;
    }
    .nav-hamburger:hover { color: var(--text); background: rgba(255,255,255,.06); }
    @media (max-width: 768px) { .nav-hamburger { display: flex; align-items: center; } }

    /* Spacer */
    .nav-spacer { height: 60px; }

    /* ── Mobile Drawer ── */
    .drawer-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.7);
      backdrop-filter: blur(4px);
      z-index: 200;
      animation: fadeOverlay .25s ease both;
    }
    .drawer {
      position: fixed; top: 0; left: 0;
      height: 100vh; width: 280px;
      background: #111;
      border-right: 1px solid var(--nav-border);
      z-index: 201;
      display: flex; flex-direction: column;
      animation: slideLeft .3s cubic-bezier(.22,.61,.36,1) both;
    }
    .drawer-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 20px;
      border-bottom: 1px solid var(--nav-border);
    }
    .drawer-logo {
      font-family: 'DM Serif Display', serif;
      font-size: 18px; color: var(--text);
    }
    .drawer-logo span { color: var(--gold); font-style: italic; }
    .drawer-close {
      background: rgba(255,255,255,.05);
      border: 1px solid var(--nav-border);
      color: var(--muted); cursor: pointer;
      width: 32px; height: 32px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      transition: color .2s, background .2s;
    }
    .drawer-close:hover { color: var(--text); background: rgba(255,255,255,.1); }

    .drawer-nav {
      flex: 1; padding: 24px 16px;
      display: flex; flex-direction: column; gap: 4px;
      list-style: none;
    }
    .drawer-link {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      text-decoration: none;
      font-family: 'Outfit', sans-serif;
      font-size: 14px; font-weight: 500;
      color: var(--muted);
      transition: color .2s, background .2s;
    }
    .drawer-link:hover { color: var(--text); background: rgba(255,255,255,.04); }
    .drawer-link.active {
      color: var(--gold);
      background: rgba(201,168,76,.08);
    }
    .drawer-link-icon { opacity: .7; }
    .drawer-link.active .drawer-link-icon { opacity: 1; }

    .drawer-footer {
      padding: 20px;
      border-top: 1px solid var(--nav-border);
    }
    .drawer-cta {
      display: block; text-align: center;
      background: var(--gold);
      color: #0f0f0f;
      border: none; border-radius: 10px;
      padding: 12px;
      font-family: 'Outfit', sans-serif;
      font-size: 14px; font-weight: 700;
      text-decoration: none;
      transition: opacity .2s;
      width: 100%;
    }
    .drawer-cta:hover { opacity: .85; }

    .eyebrow-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold);
      background: rgba(201,168,76,.1);
      border-radius: 4px; padding: 2px 7px;
      margin-left: 4px;
    }
  `}</style>
);

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  // close drawer on route change
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);
  // lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const links = [
    { name: "Home",      path: "/",          icon: <FaHome size={14} /> },
    { name: "Dashboard", path: "/dashboard",  icon: <MdDashboard size={14} />, badge: "App" },
    { name: "History",   path: "/history",    icon: <FaHistory size={13} /> },
    { name: "About",     path: "/about",      icon: <CiCircleInfo size={14} /> },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <Styles />

      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Gradio-AI logo" />
          <span className="nav-logo-text">Gradio<span>-AI</span></span>
        </Link>

        {/* Desktop */}
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.icon}
                {link.name}
                {link.badge && <span className="eyebrow-tag">{link.badge}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {!isAuthenticated && (
            <Link to="/signup" className="nav-cta" style={{ display: "none" }}
              ref={(el) => { if (el) el.style.display = "inline-block"; }}
            >
              Get Started →
            </Link>
          )}
          {/* hide cta on mobile via wrapper */}
          {/* <span style={{ display: "flex" }} className="hide-mobile">
            {!isAuthenticated && (
              <Link to="/signup" className="nav-cta">Get Started →</Link>
            )}
          </span> */}

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <FaBars size={18} />
          </button>
        </div>
      </nav>

      <div className="nav-spacer" />

      {/* ── Mobile Drawer ── */}
      {sidebarOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setSidebarOpen(false)} />
          <aside className="drawer">
            <div className="drawer-header">
              <span className="drawer-logo">Gradio<span>-AI</span></span>
              <button className="drawer-close" onClick={() => setSidebarOpen(false)}>
                <FaTimes size={14} />
              </button>
            </div>

            <ul className="drawer-nav">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`drawer-link ${isActive(link.path) ? "active" : ""}`}
                  >
                    <span className="drawer-link-icon">{link.icon}</span>
                    {link.name}
                    {link.badge && <span className="eyebrow-tag">{link.badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="drawer-footer">
              {!isAuthenticated ? (
                <Link to="/signup" className="drawer-cta">Get Started →</Link>
              ) : (
                <Link to="/dashboard" className="drawer-cta">Go to Dashboard →</Link>
              )}
            </div>
          </aside>
        </>
      )}

      <style>{`
        @media (min-width: 769px) { .hide-mobile { display: flex !important; } }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
      `}</style>
    </>
  );
};

export default NavBar;