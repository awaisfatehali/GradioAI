import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --bg:      #0f0f0f;
      --surface: #141414;
      --raised:  #1a1a1a;
      --border:  #222;
      --gold:    #c9a84c;
      --gold-dim:#6b5520;
      --amber:   #f59e0b;
      --text:    #ede8df;
      --muted:   #4a4540;
      --light-bg:#f5f0e8;
      --lt:      #1a1510;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes lineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    .about-root {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    /* grid-dot texture */
    .about-root::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: radial-gradient(circle, rgba(201,168,76,.045) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* ─── Hero ─── */
    .about-hero {
      position: relative; z-index: 1;
      padding: 100px 80px 80px;
      border-bottom: 1px solid var(--border);
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    @media (max-width: 768px) { .about-hero { padding: 72px 24px 56px; } }

    .about-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold);
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 24px;
      animation: fadeUp .5s ease both;
    }
    .about-eyebrow::before, .about-eyebrow::after {
      content: ''; display: block;
      width: 28px; height: 1px; background: var(--gold-dim);
    }

    .about-hero-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(38px, 6vw, 72px);
      letter-spacing: -1.5px; line-height: 1.05;
      color: var(--text);
      max-width: 700px;
      animation: fadeUp .5s .08s ease both;
    }
    .about-hero-title em {
      font-style: italic;
      background: linear-gradient(135deg, var(--gold) 0%, var(--amber) 50%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }

    .about-hero-desc {
      margin-top: 24px;
      font-size: 15px; line-height: 1.8; color: var(--muted);
      max-width: 580px;
      animation: fadeUp .5s .16s ease both;
    }

    /* ─── Mission section (light bg) ─── */
    .about-mission {
      position: relative; z-index: 1;
      background: var(--light-bg);
      padding: 100px 80px;
      color: var(--lt);
    }
    @media (max-width: 768px) { .about-mission { padding: 60px 24px; } }

    .about-mission::before {
      content: '';
      position: absolute; top: -1px; left: 0; right: 0; height: 72px;
      background: var(--bg);
      clip-path: ellipse(55% 100% at 50% 0%);
    }

    .mission-grid {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 64px; align-items: start;
    }
    @media (max-width: 800px) { .mission-grid { grid-template-columns: 1fr; gap: 40px; } }

    .mission-left {}
    .mission-section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--gold-dim); margin-bottom: 18px;
    }
    .mission-heading {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(28px, 3.5vw, 44px);
      color: var(--lt); letter-spacing: -.5px; line-height: 1.1;
      margin-bottom: 20px;
    }
    .mission-text {
      font-size: 14px; line-height: 1.8; color: #5a5248;
      margin-bottom: 32px;
    }

    .mission-divider {
      width: 40px; height: 2px;
      background: linear-gradient(90deg, var(--gold-dim), transparent);
      transform-origin: left;
      animation: lineGrow .8s .4s ease both;
      margin-bottom: 28px;
    }

    .mission-h3 {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(20px, 2.5vw, 28px);
      color: var(--lt); letter-spacing: -.3px;
      margin-bottom: 14px;
    }

    /* Vision card */
    .vision-card {
      background: #fff;
      border: 1px solid #e8e0d0;
      border-radius: 20px;
      padding: 40px 36px;
      position: relative; overflow: hidden;
    }
    .vision-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold));
    }
    .vision-card-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold-dim); margin-bottom: 16px;
    }
    .vision-card-title {
      font-family: 'DM Serif Display', serif;
      font-size: 28px; color: var(--lt);
      letter-spacing: -.3px; margin-bottom: 16px;
    }
    .vision-card-text {
      font-size: 14px; line-height: 1.8; color: #6b6055;
    }
    .vision-stat-row {
      display: flex; gap: 24px; margin-top: 32px;
      padding-top: 28px; border-top: 1px solid #e8e0d0;
    }
    .vision-stat {}
    .vision-stat-num {
      font-family: 'DM Serif Display', serif;
      font-size: 32px; color: var(--lt); line-height: 1;
    }
    .vision-stat-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
      color: #9a9088; margin-top: 4px;
    }

    /* ─── Developer section ─── */
    .about-dev {
      position: relative; z-index: 1;
      background: var(--light-bg);
      padding: 0 80px 100px;
    }
    @media (max-width: 768px) { .about-dev { padding: 0 24px 60px; } }

    .dev-inner {
      max-width: 1100px; margin: 0 auto;
      background: var(--raised);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 56px 60px;
      display: grid; grid-template-columns: auto 1fr;
      gap: 48px; align-items: center;
    }
    @media (max-width: 700px) {
      .dev-inner { grid-template-columns: 1fr; padding: 36px 28px; gap: 28px; }
    }

    .dev-avatar {
      width: 100px; height: 100px;
      border-radius: 50%;
      background: var(--surface);
      border: 2px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Serif Display', serif;
      font-size: 36px; color: var(--gold);
      flex-shrink: 0;
      position: relative;
    }
    .dev-avatar::after {
      content: '';
      position: absolute; inset: -6px;
      border-radius: 50%;
      border: 1px solid var(--gold-dim);
      opacity: .4;
    }

    .dev-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 10px;
    }
    .dev-name {
      font-family: 'DM Serif Display', serif;
      font-size: 28px; color: var(--text);
      letter-spacing: -.3px; margin-bottom: 16px;
    }
    .dev-bio {
      font-size: 14px; line-height: 1.8; color: var(--muted);
      max-width: 560px;
    }

    .dev-tags {
      display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px;
    }
    .dev-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 1px;
      color: var(--gold-dim);
      background: rgba(201,168,76,.07);
      border: 1px solid rgba(201,168,76,.15);
      border-radius: 20px; padding: 4px 12px;
    }
  `}</style>
);

const AboutPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="about-root">
      <Styles />
      <NavBar active={3} />

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-eyebrow">Our Story</div>
        <h1 className="about-hero-title">
          Built for educators.<br />Powered by <em>AI.</em>
        </h1>
        <p className="about-hero-desc">
          Gradio-AI is an intelligent assignment grading system designed to transform
          the way teachers evaluate student work — faster, smarter, and with zero burnout.
        </p>
      </section>

      {/* ── Mission ── */}
      <section className="about-mission">
        <div className="mission-grid">

          {/* Left */}
          <div className="mission-left">
            <p className="mission-section-label">Purpose</p>
            <h2 className="mission-heading">Our Mission</h2>
            <p className="mission-text">
              The goal of Gradio-AI is to make the grading process faster, accurate,
              and stress-free for teachers. This system helps educators save time and
              provide better feedback to students without manual effort.
            </p>

            <div className="mission-divider" />

            <h3 className="mission-h3">Why I Built This</h3>
            <p className="mission-text" style={{ marginBottom: 0 }}>
              I created this project to solve the problem of time-consuming manual checking
              of assignments. With AI automation, teachers can focus more on teaching and
              student development — where it actually matters.
            </p>
          </div>

          {/* Right — Vision card */}
          <div className="vision-card">
            <p className="vision-card-label">Vision</p>
            <h3 className="vision-card-title">Project Vision</h3>
            <p className="vision-card-text">
              To transform traditional grading into a smart, efficient, and AI-assisted
              digital experience — where every student gets meaningful feedback and every
              teacher gets their time back.
            </p>
            <div className="vision-stat-row">
              <div className="vision-stat">
                <div className="vision-stat-num">10×</div>
                <div className="vision-stat-label">Faster</div>
              </div>
              <div className="vision-stat">
                <div className="vision-stat-num">AI</div>
                <div className="vision-stat-label">Feedback</div>
              </div>
              <div className="vision-stat">
                <div className="vision-stat-num">0</div>
                <div className="vision-stat-label">Manual effort</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Developer ── */}
      <section className="about-dev">
        <div className="dev-inner">
          <div className="dev-avatar">A</div>
          <div>
            <p className="dev-label">The Developer</p>
            <h2 className="dev-name">Awais Fateh Ali</h2>
            <p className="dev-bio">
              A passionate developer who loves building modern web applications at the
              intersection of technology and education. Gradio-AI represents a vision
              of using React, Node.js, and AI to create smart learning tools that actually
              make a difference in classrooms.
            </p>
            <div className="dev-tags">
              {["React", "Node.js", "AI/ML", "Tailwind CSS", "MongoDB", "FastAPI"].map(t => (
                <span key={t} className="dev-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage; 