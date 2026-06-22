import { useState, useEffect, useRef } from "react";
import {
  FolderGit,
  Briefcase,
  Mail,
  FileText,
  ChevronDown,
  Globe,
  Mic,
  Film,
  Sparkles,
  Users,
  Code,
  BookOpen,
  Star,
  Map,
  Compass,
  FlaskConical,
  Trophy,
  MessageSquare,
  CloudSun,
  Award,
  Lightbulb,
  HeartHandshake,
  Cpu,
  Rocket,
  GitBranch,
} from "lucide-react";
import { HeroScrapbookLayer, PageScrapLayer, RoomDoodles } from "./ScrapbookFloats";
import "../styles/scrapbook.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400;500&family=Caveat:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --parchment:   #F5EFE0;
      --parchment-2: #EDE4CC;
      --brown:       #4A3728;
      --brown-light: #7A5C45;
      --ink:         #2C1810;
      --rose:        #C4896F;
      --gold:        #C9A84C;
      --sage:        #7A8C6E;
      --cream-card:  #FAF6ED;
      --divider:     rgba(74,55,40,0.18);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--parchment);
      color: var(--brown);
      font-family: 'EB Garamond', serif;
      font-size: 18px;
      line-height: 1.7;
    }

    h1, h2, h3, h4 {
      font-family: 'Playfair Display', serif;
      color: var(--ink);
    }

    .mono { font-family: 'DM Mono', monospace; }

    /* Noise texture overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1000;
      opacity: 0.6;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--parchment-2); }
    ::-webkit-scrollbar-thumb { background: var(--brown-light); border-radius: 4px; }

    /* Selection */
    ::selection { background: var(--gold); color: var(--ink); }

    /* Museum divider rope */
    .rope-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 40px 0;
    }
    .rope-divider::before,
    .rope-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: repeating-linear-gradient(90deg, var(--brown-light) 0, var(--brown-light) 4px, transparent 4px, transparent 8px);
      opacity: 0.4;
    }
    .rope-icon { color: var(--gold); font-size: 14px; }

    /* Exhibit number badge */
    .exhibit-badge {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--rose);
      background: rgba(196,137,111,0.1);
      border: 1px solid rgba(196,137,111,0.3);
      border-radius: 3px;
      padding: 2px 8px;
    }

    /* Museum room header */
    .room-header {
      text-align: center;
      padding: 60px 20px 40px;
      position: relative;
    }
    .room-header::before {
      content: attr(data-room);
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
      display: block;
      margin-bottom: 10px;
    }

    /* Floating artifact keyframes */
    @keyframes floatA {
      0%, 100% { transform: translateY(0) rotate(-3deg); }
      50% { transform: translateY(-18px) rotate(3deg); }
    }
    @keyframes floatB {
      0%, 100% { transform: translateY(0) rotate(5deg); }
      50% { transform: translateY(-12px) rotate(-2deg); }
    }
    @keyframes floatC {
      0%, 100% { transform: translateY(-6px) rotate(1deg); }
      50% { transform: translateY(10px) rotate(-4deg); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes tickerScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .float-a { animation: floatA 6s ease-in-out infinite; }
    .float-b { animation: floatB 7s ease-in-out infinite 1s; }
    .float-c { animation: floatC 5s ease-in-out infinite 2s; }

    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    .stagger-1 { transition-delay: 0.1s; }
    .stagger-2 { transition-delay: 0.2s; }
    .stagger-3 { transition-delay: 0.3s; }
    .stagger-4 { transition-delay: 0.4s; }
    .stagger-5 { transition-delay: 0.5s; }
    .stagger-6 { transition-delay: 0.6s; }

    /* Nav */
    .museum-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 500;
      background: rgba(245,239,224,0.88);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--divider);
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      transition: all 0.3s;
    }
    .nav-brand {
      font-family: 'Playfair Display', serif;
      font-size: 15px;
      color: var(--ink);
      letter-spacing: 0.02em;
    }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--brown-light);
      text-decoration: none;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--rose); }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .museum-nav { padding: 0 20px; }
    }

    /* Hero */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 100px 24px 60px;
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }
    .hero-arch {
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 600px;
      height: 400px;
      border: 1px solid rgba(74,55,40,0.08);
      border-radius: 0 0 300px 300px;
      border-top: none;
      pointer-events: none;
    }
    .hero-arch-2 {
      width: 800px;
      height: 500px;
      border-color: rgba(74,55,40,0.05);
    }
    .museum-title {
      font-size: clamp(36px, 6vw, 78px);
      font-weight: 900;
      line-height: 1.08;
      letter-spacing: -0.02em;
      color: var(--ink);
      max-width: 900px;
      margin-bottom: 24px;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .museum-title .highlight {
      font-style: italic;
      color: var(--rose);
    }
    .hero-subtitle {
      font-size: clamp(16px, 2vw, 20px);
      color: var(--brown);
      max-width: 560px;
      margin-bottom: 48px;
      font-style: italic;
    }
    .enter-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--ink);
      color: var(--parchment);
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 16px 36px;
      border-radius: 2px;
      cursor: pointer;
      border: none;
      transition: background 0.25s, transform 0.25s;
      text-decoration: none;
    }
    .enter-btn:hover {
      background: var(--brown);
      transform: translateY(-2px);
    }
    .floating-artifacts {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .artifact {
      position: absolute;
      opacity: 0.22;
    }
    .scroll-hint {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .scroll-hint span {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--brown-light);
      opacity: 0.7;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(6px); }
    }
    .scroll-hint svg { animation: bounce 2s ease-in-out infinite; color: var(--brown-light); opacity: 0.6; }

    /* Ticker */
    .ticker {
      background: var(--ink);
      color: var(--parchment);
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      letter-spacing: 0.12em;
      padding: 10px 0;
      overflow: hidden;
      white-space: nowrap;
    }
    .ticker-inner {
      display: inline-flex;
      animation: tickerScroll 28s linear infinite;
    }
    .ticker-item { padding: 0 32px; opacity: 0.8; }
    .ticker-dot { color: var(--gold); margin-right: 32px; }

    /* Section wrapper */
    .section {
      padding: 80px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* About plaque */
    .plaque-outer {
      border: 2px solid var(--brown);
      border-radius: 4px;
      padding: 4px;
      max-width: 680px;
      margin: 0 auto;
    }
    .plaque-inner {
      border: 1px solid var(--brown);
      border-radius: 3px;
      padding: 48px 56px;
      position: relative;
      background: var(--cream-card);
    }
    .plaque-corner {
      position: absolute;
      width: 16px; height: 16px;
      background: var(--brown);
      border-radius: 50%;
    }
    .plaque-corner.tl { top: 12px; left: 12px; }
    .plaque-corner.tr { top: 12px; right: 12px; }
    .plaque-corner.bl { bottom: 12px; left: 12px; }
    .plaque-corner.br { bottom: 12px; right: 12px; }
    .plaque-title {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 24px;
      text-align: center;
    }
    .plaque-name {
      font-size: clamp(28px, 4vw, 42px);
      text-align: center;
      margin-bottom: 8px;
    }
    .plaque-tagline {
      text-align: center;
      color: var(--brown-light);
      font-style: italic;
      margin-bottom: 32px;
    }
    .plaque-fields { display: flex; flex-direction: column; gap: 12px; }
    .plaque-field {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 12px;
      border-bottom: 1px dashed rgba(74,55,40,0.15);
      padding-bottom: 12px;
    }
    .field-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold);
    }
    .field-value { color: var(--brown); }

    @media (max-width: 600px) {
      .plaque-inner { padding: 32px 24px; }
      .plaque-field { grid-template-columns: 1fr; gap: 2px; }
    }

    /* Wing cards */
    .wing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }
    .wing-card {
      background: var(--cream-card);
      border: 1px solid var(--divider);
      border-radius: 4px;
      padding: 32px 28px;
      position: relative;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .wing-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(44,24,16,0.1);
    }
    .wing-card-num {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      color: var(--rose);
      letter-spacing: 0.15em;
      margin-bottom: 14px;
    }
    .wing-card-icon {
      width: 44px; height: 44px;
      background: rgba(201,168,76,0.12);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      color: var(--gold);
    }
    .wing-card-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .wing-card-desc { color: var(--brown-light); font-size: 15px; line-height: 1.6; }

    /* Timeline */
    .timeline {
      position: relative;
      max-width: 700px;
      margin: 48px auto 0;
      padding: 0 24px;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, var(--brown-light) 10%, var(--brown-light) 90%, transparent);
      transform: translateX(-50%);
      opacity: 0.3;
    }
    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 40px;
      position: relative;
    }
    .timeline-item:nth-child(even) { flex-direction: row-reverse; }
    .timeline-dot {
      flex-shrink: 0;
      width: 14px; height: 14px;
      border-radius: 50%;
      background: var(--gold);
      border: 3px solid var(--parchment);
      box-shadow: 0 0 0 1px var(--gold);
      position: relative;
      z-index: 2;
      margin-top: 6px;
    }
    .timeline-content {
      flex: 1;
      background: var(--cream-card);
      border: 1px solid var(--divider);
      border-radius: 4px;
      padding: 20px 24px;
    }
    .timeline-item:nth-child(even) .timeline-content { text-align: right; }
    .timeline-year {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--gold);
      letter-spacing: 0.12em;
      margin-bottom: 4px;
    }
    .timeline-label { font-size: 17px; font-weight: 600; color: var(--ink); }
    .timeline-note { font-size: 14px; color: var(--brown-light); font-style: italic; margin-top: 4px; }

    @media (max-width: 640px) {
      .timeline::before { left: 14px; }
      .timeline-item, .timeline-item:nth-child(even) { flex-direction: row; }
      .timeline-item:nth-child(even) .timeline-content { text-align: left; }
    }

    /* Future exhibits */
    .future-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }
    .future-card {
      border: 2px dashed rgba(74,55,40,0.2);
      border-radius: 4px;
      padding: 32px 24px;
      text-align: center;
      position: relative;
      transition: border-color 0.25s, transform 0.25s;
      cursor: default;
    }
    .future-card:hover {
      border-color: var(--rose);
      transform: translateY(-3px);
    }
    .coming-soon {
      position: absolute;
      top: -10px; left: 50%; transform: translateX(-50%);
      background: var(--parchment);
      padding: 0 10px;
      font-family: 'DM Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--rose);
      white-space: nowrap;
    }
    .future-icon {
      width: 48px; height: 48px;
      background: rgba(196,137,111,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      color: var(--rose);
    }
    .future-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .future-desc { color: var(--brown-light); font-size: 15px; }

    /* Gift shop */
    .gift-shop-section {
      background: var(--ink);
      color: var(--parchment);
      padding: 80px 24px;
      text-align: center;
    }
    .gift-intro-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 12px;
      opacity: 0.8;
    }
    .gift-title {
      font-size: clamp(36px, 5vw, 64px);
      color: var(--parchment);
      margin-bottom: 16px;
    }
    .gift-subtitle {
      color: rgba(245,239,224,0.6);
      font-style: italic;
      max-width: 500px;
      margin: 0 auto 48px;
      font-size: 18px;
    }
    .gift-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    .souvenir {
      background: rgba(245,239,224,0.06);
      border: 1px solid rgba(245,239,224,0.15);
      border-radius: 4px;
      padding: 28px 32px;
      text-align: center;
      min-width: 180px;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.25s, transform 0.25s, border-color 0.25s;
      position: relative;
      overflow: hidden;
    }
    .souvenir::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.25s;
    }
    .souvenir:hover {
      background: rgba(245,239,224,0.1);
      border-color: var(--gold);
      transform: translateY(-4px);
    }
    .souvenir:hover::after { opacity: 1; }
    .souvenir-icon {
      width: 48px; height: 48px;
      background: rgba(201,168,76,0.12);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 14px;
      color: var(--gold);
    }
    .souvenir-label {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(245,239,224,0.5);
      margin-bottom: 6px;
    }
    .souvenir-name {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: var(--parchment);
    }

    /* Footer */
    .museum-footer {
      background: var(--ink);
      border-top: 1px solid rgba(245,239,224,0.08);
      padding: 32px 24px;
      text-align: center;
    }
    .footer-text {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.1em;
      color: rgba(245,239,224,0.35);
    }
    .footer-name {
      color: var(--gold);
      font-style: italic;
      font-family: 'Playfair Display', serif;
      font-size: 13px;
      font-weight: 400;
    }

    /* Room divider */
    .room-divider {
      text-align: center;
      padding: 40px 0 0;
      position: relative;
    }
    .room-divider::before {
      content: '';
      display: block;
      height: 1px;
      background: var(--divider);
      margin-bottom: 32px;
    }
    .room-number {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.2em;
      color: var(--gold);
      text-transform: uppercase;
    }

    /* Animated bg circles */
    .bg-circle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(196,137,111,0.06) 0%, transparent 70%);
      pointer-events: none;
    }
  `}</style>
);

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    const items = el.querySelectorAll(".reveal");
    items.forEach((i) => observer.observe(i));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "A-001",
    title: "Collaborative Study App",
    year: "2024",
    icon: BookOpen,
    purpose: "A real-time collaborative platform for students to study together, share notes, and quiz each other remotely.",
    tech: ["React", "Firebase", "WebSockets", "Tailwind CSS"],
    observation: "Students who used shared note-taking reported finishing revision 40% faster than solo studying.",
    status: "active",
    pattern: "radial-gradient(var(--parchment-2) 1px, transparent 1px)",
    patternSize: "20px 20px",
    color: "#7A8C6E",
  },
  {
    id: "A-002",
    title: "Unsent Messages",
    year: "2023",
    icon: MessageSquare,
    purpose: "A cathartic web app where users write messages they never intend to send — processing emotions through words.",
    tech: ["Next.js", "MongoDB", "Framer Motion", "Node.js"],
    observation: "The most-used feature was the 'burn' animation — users needed to feel the message disappear.",
    status: "complete",
    pattern: "linear-gradient(45deg, var(--parchment-2) 25%, transparent 25%)",
    patternSize: "10px 10px",
    color: "#C4896F",
  },
  {
    id: "A-003",
    title: "Imposter Game",
    year: "2023",
    icon: FlaskConical,
    purpose: "A multiplayer social deduction game inspired by Among Us — built from scratch with custom game logic.",
    tech: ["React", "Socket.io", "Express", "Zustand"],
    observation: "Peak simultaneous players: 47. Server crashed twice. Both times were considered features.",
    status: "complete",
    pattern: "repeating-linear-gradient(0deg, var(--parchment-2) 0, var(--parchment-2) 1px, transparent 1px, transparent 20px)",
    patternSize: "auto",
    color: "#C9A84C",
  },
  {
    id: "A-004",
    title: "Weather Forecast Predictor",
    year: "2024",
    icon: CloudSun,
    purpose: "ML-powered weather prediction app that blends API data with local historical patterns for hyper-local forecasts.",
    tech: ["Python", "scikit-learn", "React", "OpenWeather API"],
    observation: "Accuracy improved 18% over the raw API by weighting micro-climate data from nearby stations.",
    status: "active",
    pattern: "radial-gradient(ellipse 40% 40% at 50% 50%, var(--parchment-2) 0%, transparent 100%)",
    patternSize: "auto",
    color: "#7A8C6E",
  },
  {
    id: "A-005",
    title: "Certificate Generator",
    year: "2024",
    icon: Award,
    purpose: "Bulk certificate generation tool for FOSS Club events — handles custom templates, signatures, and email dispatch.",
    tech: ["Python", "Pillow", "Flask", "SMTP", "Pandas"],
    observation: "Generated and dispatched 300+ certificates in under 8 minutes for a single hackathon.",
    status: "complete",
    pattern: "repeating-linear-gradient(90deg, var(--parchment-2) 0, var(--parchment-2) 1px, transparent 1px, transparent 32px)",
    patternSize: "auto",
    color: "#C4896F",
  },
];

const COMMUNITY = [
  { num: "W-001", icon: GitBranch, title: "FOSS Club Secretary", desc: "Leading open source initiatives, managing the club's operations, and nurturing a community of curious builders at college." },
  { num: "W-002", icon: Users, title: "Event Organizer", desc: "Conceptualized and ran workshops, hackathons, and tech talks — transforming abstract ideas into tangible experiences." },
  { num: "W-003", icon: Mic, title: "Workshop Conductor", desc: "Facilitated hands-on sessions on Git, Linux, and web development for students stepping into the open source world." },
  { num: "W-004", icon: Code, title: "Open Source Enthusiast", desc: "Believes software built in the open is software built for everyone — actively contributing to and evangelizing FOSS." },
];

const DIPLOMACY = [
  { num: "D-001", icon: Globe, title: "MUN Participant", desc: "Represented diverse global perspectives in Model United Nations sessions — debating resolutions with diplomacy and rigor." },
  { num: "D-002", icon: Mic, title: "Public Speaker", desc: "Comfortable commanding a room — whether it's a 20-person workshop or a 200-person conference hall." },
  { num: "D-003", icon: BookOpen, title: "Debater", desc: "Sharpened arguments in competitive debates, learning that the best positions are built on the strongest opposing views." },
];

const CREATIVE = [
  { num: "C-001", icon: Film, title: "Short Film Winner", desc: "Won a college-level short film competition — proof that storytelling is just another form of problem solving." },
  { num: "C-002", icon: Star, title: "Storyteller", desc: "Believes every project has a story. Writing, filmmaking, and documentation are all just different rendering engines for ideas." },
  { num: "C-003", icon: Sparkles, title: "Creative Projects", desc: "From illustrated zines to interactive fiction experiments — curiosity never stays in one lane." },
];

const TIMELINE = [
  { year: "2020", label: "First Line of Code", note: "A 'Hello World' that changed the trajectory entirely.", side: "left" },
  { year: "2021", label: "Built First Real Project", note: "Messy, overwrought, and completely wonderful.", side: "right" },
  { year: "2022", label: "Joined FOSS Club", note: "Discovered open source and never looked back.", side: "left" },
  { year: "2023", label: "Technical Lead", note: "Led the club's first major hackathon from concept to completion.", side: "right" },
  { year: "2023", label: "Short Film Win", note: "Proved that code isn't the only language worth learning.", side: "left" },
  { year: "2024", label: "Secretary, FOSS Club", note: "From member to steward — building community at scale.", side: "right" },
  { year: "2025", label: "Current Projects", note: "Five experiments running in parallel, as it should be.", side: "left" },
  { year: "2025 →", label: "Future Adventures", note: "Actively seeking opportunities to build what matters.", side: "right" },
];

const FUTURE = [
  { icon: Cpu, title: "AI-Powered Tools", desc: "Building assistants that actually understand context — not just autocomplete on steroids." },
  { icon: HeartHandshake, title: "Community Platform", desc: "A space for FOSS contributors to find collaborators and mentors in their own cities." },
  { icon: Rocket, title: "Startup Ambitions", desc: "One problem, one team, one product. The details are still being debugged." },
  { icon: GitBranch, title: "Open Source Sprints", desc: "Regular contributions to meaningful projects — putting code where the values are." },
  { icon: Lightbulb, title: "Research Experiments", desc: "Exploring the intersection of technology and human behavior. Slowly. Carefully." },
  { icon: Globe, title: "Global Tech Community", desc: "Connecting builders across geographies through shared curiosity and shared code." },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function RopeDivider({ label = "✦" }) {
  return (
    <div className="rope-divider">
      <span className="rope-icon">{label}</span>
    </div>
  );
}

function RoomHeader({ label, title, subtitle, doodleLeft, doodleRight }) {
  return (
    <div className="room-header" data-room={label}>
      <RoomDoodles left={doodleLeft} right={doodleRight} />
      <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginBottom: "12px" }}>{title}</h2>
      {subtitle && <p style={{ color: "var(--brown-light)", fontStyle: "italic", maxWidth: "560px", margin: "0 auto", fontSize: "17px" }}>{subtitle}</p>}
    </div>
  );
}

// ─── Physical Folder Gallery ──────────────────────────────────────────────────
function ProjectFolderStack({ projects }) {
  const [order, setOrder] = useState(projects.map((_, i) => i));

  const FOLDER_COLORS = [
    { bg: "#6B7F5A", tabBg: "#56673F", text: "#EEF2E8", tabText: "#D4E0C4" },
    { bg: "#2C2118", tabBg: "#1A1410", text: "#E8D5B8", tabText: "#C4A87A" },
    { bg: "#E8C8D0", tabBg: "#D4A0AE", text: "#3A2028", tabText: "#5A2838" },
    { bg: "#C8D8E8", tabBg: "#A0B8CC", text: "#1A2A38", tabText: "#1A3050" },
    { bg: "#E8D8B0", tabBg: "#D4BC80", text: "#3A2A10", tabText: "#5A4010" },
  ];

  const TAB_LEFTS = [0, 100, 200, 300, 400];

  function bringForward(pi) {
    setOrder(prev => {
      const next = prev.filter(i => i !== pi);
      return [pi, ...next];
    });
  }

  const topIdx = order[0];

  return (
    <div style={{ padding: "0 0 20px" }}>
      {/* Folder stack */}
      <div style={{ position: "relative", height: 520 }}>
        {[...order].reverse().map((pi, revRank) => {
          const rank = order.length - 1 - revRank;
          const p = projects[pi];
          const c = FOLDER_COLORS[pi];
          const isTop = rank === 0;
          const tops = [460, 410, 360, 310, 260];
          const top = tops[rank];

          return (
            <div
              key={pi}
              onClick={() => !isTop && bringForward(pi)}
              style={{
                position: "absolute",
                left: 0, right: 0,
                top,
                zIndex: order.length - rank,
                cursor: isTop ? "default" : "pointer",
                transition: "top 0.38s cubic-bezier(0.34,1.3,0.64,1)",
              }}
            >
              {/* Tab */}
              <div style={{
                position: "absolute",
                top: 0, left: TAB_LEFTS[pi],
                width: 96, height: 34,
                borderRadius: "8px 8px 0 0",
                background: c.tabBg,
                color: c.tabText,
                transform: "translateY(-100%)",
                display: "flex",
                alignItems: "center",
                paddingLeft: 14,
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                fontWeight: isTop ? 600 : 400,
              }}>{p.id}</div>

              {/* Body */}
              <div style={{
                borderRadius: "0 14px 14px 14px",
                background: c.bg,
                height: isTop ? 420 : 60,
                transition: "height 0.38s cubic-bezier(0.34,1.3,0.64,1)",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Texture lines */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px)",
                  borderRadius: "0 14px 14px 14px",
                  pointerEvents: "none",
                }} />

                {isTop && (
                  <>
                    {/* Status stamp */}
                    <div style={{
                      position: "absolute", top: 20, right: 24,
                      fontFamily: "'DM Mono', monospace", fontSize: 9,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      padding: "4px 10px", borderRadius: 3,
                      border: `1.5px solid ${c.text}`,
                      color: c.text, opacity: 0.55,
                      transform: "rotate(2deg)",
                    }}>
                      {p.status === "active" ? "Active" : "Complete"}
                    </div>

                    {/* Content */}
                    <div style={{
                      position: "absolute", inset: 0,
                      padding: "28px 36px 28px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "flex-end",
                      color: c.text,
                    }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", opacity: 0.5, marginBottom: 6 }}>
                        {p.id} · {p.year}
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 16 }}>
                        {p.title.split(" ")[0]}
                        <span style={{ display: "block", fontStyle: "italic", fontSize: 26, fontWeight: 700 }}>
                          {p.title.split(" ").slice(1).join(" ")}
                        </span>
                      </div>
                      <div style={{ borderTop: `1px solid ${c.text}1A`, paddingTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, display: "block", marginBottom: 3 }}>Purpose</span>
                          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, fontStyle: "italic", opacity: 0.85, lineHeight: 1.5 }}>{p.purpose}</span>
                        </div>
                        <div>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, display: "block", marginBottom: 3 }}>Observation</span>
                          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, fontStyle: "italic", opacity: 0.85, lineHeight: 1.5 }}>{p.observation}</span>
                        </div>
                        <div style={{ gridColumn: "span 2", display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                          {p.tech.map(t => (
                            <span key={t} style={{
                              fontFamily: "'DM Mono', monospace", fontSize: 9,
                              padding: "2px 8px", borderRadius: 3,
                              border: `1px solid ${c.text}40`,
                              color: c.text, letterSpacing: "0.06em",
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nav dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
        {projects.map((p, pi) => (
          <button
            key={pi}
            onClick={() => bringForward(pi)}
            style={{
              width: 8, height: 8, borderRadius: "50%",
              background: FOLDER_COLORS[pi].bg,
              border: "none", cursor: "pointer", padding: 0,
              transform: order[0] === pi ? "scale(1.4)" : "scale(1)",
              opacity: order[0] === pi ? 1 : 0.4,
              transition: "transform 0.2s, opacity 0.2s",
            }}
            aria-label={`View ${p.title}`}
          />
        ))}
      </div>
      <div style={{ textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--brown-light)", marginTop: 10, opacity: 0.6 }}>
        click a folder behind to pull it forward
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MuseumPortfolio() {
  const [navScrolled, setNavScrolled] = useState(false);
  const sectionRef = useReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scrapbook-page">
      <FontLoader />
      <PageScrapLayer />

      {/* ── NAVIGATION ────────────────────────────────────────────────────── */}
      <nav className="museum-nav" style={{ boxShadow: navScrolled ? "0 2px 16px rgba(44,24,16,0.08)" : "none" }}>
        <span className="nav-brand">The Museum of Curious Things</span>
        <ul className="nav-links">
          {[["#about", "About"], ["#gallery", "Gallery"], ["#community", "Community"], ["#timeline", "Timeline"], ["#gift-shop", "Gift Shop"]].map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* ── TICKER ─────────────────────────────────────────────────────────── */}
      <div className="ticker" style={{ marginTop: "56px" }}>
        <div className="ticker-inner">
          {Array(4).fill(["Final Year IT Student", "FOSS Club Secretary", "Community Builder", "MUN Participant", "Short Film Winner", "Open Source Advocate", "Builder of Curious Things"]).flat().map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot">✦</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-arch" />
        <div className="hero-arch hero-arch-2" />

        <HeroScrapbookLayer />

        <div className="bg-circle" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

        <div className="hero-content-wrap">
          <div style={{ marginBottom: "20px", animation: "fadeSlideUp 0.8s ease forwards" }}>
            <span className="exhibit-badge">Est. 2020 · Admission: Free</span>
          </div>

          <h1 className="museum-title" style={{ animation: "fadeSlideUp 0.9s ease 0.1s both" }}>
            The Museum of<br /><span className="highlight">Curious Things</span><br />Built by Uttara
          </h1>

          <p className="hero-subtitle" style={{ animation: "fadeSlideUp 0.9s ease 0.25s both" }}>
            A collection of projects, experiments, leadership adventures, and creative side quests — pinned, taped, and scattered like a favorite scrapbook.
          </p>

          <a href="#about" className="enter-btn" style={{ animation: "fadeSlideUp 0.9s ease 0.4s both" }}>
            <Map size={16} />
            Enter the Museum
          </a>

          <div className="scroll-hint" style={{ animation: "fadeSlideUp 1s ease 0.7s both" }}>
            <span>Scroll to explore</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </section>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div ref={sectionRef}>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <section id="about" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="room-divider"><span className="room-number">Room I · Curiosity Profile</span></div>
          <RoomHeader label="Room I · About Exhibit" title="A Portrait of the Builder" subtitle="Every museum needs an origin story. This is hers." doodleLeft="← start here" doodleRight="her story ✿" />
          <RopeDivider />
          <div className="reveal stagger-1">
            <div className="plaque-outer">
              <span className="plaque-scrap-note plaque-scrap-note--tl">peek inside!</span>
              <span className="plaque-scrap-note plaque-scrap-note--br">keeper of curios ♡</span>
              <span className="washi-tape washi-tape--gold" style={{ top: -10, left: '20%', width: 64, transform: 'rotate(-3deg)' }} />
              <span className="washi-tape washi-tape--pink" style={{ top: -8, right: '18%', width: 56, transform: 'rotate(4deg)' }} />
              <div className="plaque-inner">
                <div className="plaque-corner tl" /><div className="plaque-corner tr" />
                <div className="plaque-corner bl" /><div className="plaque-corner br" />
                <div className="plaque-title">Exhibit Plaque · Specimen No. U-001</div>
                <h2 className="plaque-name">Uttara Praveen</h2>
                <p className="plaque-tagline">Builder of Things · Keeper of Curiosities</p>
                <div style={{ height: 1, background: "var(--divider)", margin: "24px 0" }} />
                <div className="plaque-fields">
                  {[
                    ["Occupation", "Builder of Things"],
                    ["Specialization", "Turning half-baked ideas into real projects"],
                    ["Current Status", "Final-year IT student"],
                    ["Active Role", "Secretary, FOSS Club"],
                    ["Side Quests", "MUN, Short Films, Community Building"],
                    ["Current Quest", "Seeking opportunities in technology"],
                    ["Known Habitats", "Open source repos, club meetings, hackathon halls"],
                    ["Distinguishing Feature", "Will turn any interesting problem into a side project"],
                  ].map(([label, val]) => (
                    <div key={label} className="plaque-field">
                      <span className="field-label">{label}</span>
                      <span className="field-value">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────────────────── */}
        <section id="gallery" style={{ padding: "80px 24px", background: "var(--parchment-2)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="room-divider"><span className="room-number">Room II · Main Gallery</span></div>
            <RoomHeader
              label="Room II · Main Gallery"
              title="The Project Archive"
              subtitle="Five artifacts recovered from late-night coding sessions. Open a folder to examine."
              doodleLeft="tap the folders!"
              doodleRight="exhibit files →"
            />
            <RopeDivider />
            
            {/* The old polaroid grid has been replaced by the Project Folder Stack */}
            <ProjectFolderStack projects={PROJECTS} />

          </div>
        </section>

        {/* ── COMMUNITY WING ───────────────────────────────────────────────── */}
        <section id="community" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="room-divider"><span className="room-number">Room III · Community Wing</span></div>
          <RoomHeader label="Room III · Community Wing" title="The Community Wing" subtitle="Building things alone is fine. Building community is better." doodleLeft="people > projects" doodleRight="✦ FOSS forever" />
          <RopeDivider />
          <div className="wing-grid">
            {COMMUNITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.num} className={`wing-card reveal stagger-${i + 1}`}>
                  <div className="wing-card-num">{item.num}</div>
                  <div className="wing-card-icon"><Icon size={22} /></div>
                  <h3 className="wing-card-title">{item.title}</h3>
                  <p className="wing-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── DIPLOMACY WING ───────────────────────────────────────────────── */}
        <section style={{ padding: "80px 24px", background: "var(--parchment-2)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="room-divider"><span className="room-number">Room IV · Diplomacy Wing</span></div>
            <RoomHeader label="Room IV · Diplomacy Wing" title="The Diplomacy Wing" subtitle="Words as instruments. Arguments as architecture." />
            <RopeDivider />
            <div className="wing-grid">
              {DIPLOMACY.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.num} className={`wing-card reveal stagger-${i + 1}`}>
                    <div className="wing-card-num">{item.num}</div>
                    <div className="wing-card-icon" style={{ background: "rgba(196,137,111,0.1)", color: "var(--rose)" }}><Icon size={22} /></div>
                    <h3 className="wing-card-title">{item.title}</h3>
                    <p className="wing-card-desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CREATIVE ARTS WING ───────────────────────────────────────────── */}
        <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="room-divider"><span className="room-number">Room V · Creative Arts Wing</span></div>
          <RoomHeader label="Room V · Creative Arts Wing" title="The Creative Arts Wing" subtitle="Because the best engineers are also storytellers." />
          <RopeDivider />
          <div className="wing-grid">
            {CREATIVE.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.num} className={`wing-card reveal stagger-${i + 1}`}>
                  <div className="wing-card-num">{item.num}</div>
                  <div className="wing-card-icon" style={{ background: "rgba(122,140,110,0.12)", color: "var(--sage)" }}><Icon size={22} /></div>
                  <h3 className="wing-card-title">{item.title}</h3>
                  <p className="wing-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TIMELINE CORRIDOR ────────────────────────────────────────────── */}
        <section id="timeline" style={{ padding: "80px 24px", background: "var(--parchment-2)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="room-divider"><span className="room-number">The Timeline Corridor</span></div>
            <RoomHeader label="The Timeline Corridor" title="The Corridor of Time" subtitle="A sequential exhibition of events, in approximate chronological order." />
            <RopeDivider />
            <div className="timeline reveal">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`timeline-item stagger-${Math.min(i + 1, 6)}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-label">{item.label}</div>
                    <div className="timeline-note">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUTURE EXHIBITS ──────────────────────────────────────────────── */}
        <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="room-divider"><span className="room-number">Wing VI · Future Exhibits</span></div>
          <RoomHeader label="Wing VI · Future Exhibits" title="Future Exhibits" subtitle="Currently under construction. Expect the unexpected." />
          <RopeDivider />
          <div className="future-grid">
            {FUTURE.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`future-card reveal stagger-${Math.min(i + 1, 6)}`}>
                  <span className="coming-soon">Coming Soon</span>
                  <div className="future-icon"><Icon size={22} /></div>
                  <h3 className="future-title">{item.title}</h3>
                  <p className="future-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── GIFT SHOP ────────────────────────────────────────────────────── */}
        <section id="gift-shop" className="gift-shop-section">
          <div className="gift-intro-label reveal">The Gift Shop · Final Stop</div>
          <h2 className="gift-title reveal stagger-1">The Gift Shop</h2>
          <p className="gift-subtitle reveal stagger-2">
            Thank you for visiting the museum. Please take a souvenir on your way out.
          </p>
          <div className="gift-grid">
            {[
              { icon: FileText, label: "Souvenir No. 1", name: "Résumé", href: "#", color: "#C9A84C" },
              { icon: FolderGit, label: "Souvenir No. 2", name: "GitHub", href: "https://github.com/", color: "#C4896F" },
              { icon: Briefcase, label: "Souvenir No. 3", name: "LinkedIn", href: "https://linkedin.com/", color: "#7A8C6E" },
              { icon: Mail, label: "Souvenir No. 4", name: "Email", href: "mailto:uttara@example.com", color: "#C9A84C" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a key={i} className={`souvenir reveal stagger-${i + 1}`} href={s.href} target="_blank" rel="noopener noreferrer">
                  <div className="souvenir-icon" style={{ background: `${s.color}18`, color: s.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="souvenir-label">{s.label}</div>
                  <div className="souvenir-name">{s.name}</div>
                </a>
              );
            })}
          </div>
          <div style={{ marginTop: "56px", opacity: 0.35, fontSize: "13px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
            ✦ Please don't feed the exhibits ✦
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="museum-footer">
          <p className="footer-text">
            Curated with curiosity by{" "}
            <span className="footer-name">Uttara Praveen</span>
            {" "}·{" "}
            © {new Date().getFullYear()}
            {" "}·{" "}
            All artifacts handcrafted
          </p>
        </footer>

      </div>
    </div>
  );
}