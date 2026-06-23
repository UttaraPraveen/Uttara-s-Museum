import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  FlaskConical,
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
import { RoomThreshold } from "./RoomThreshold";
import ProjectFileFolders from "./ProjectFileFolders";
import "../styles/scrapbook.css";

// ─── Reveal hook (for in-room staggered children) ─────────────────────────
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

// ─── Data ───────────────────────────────────────────────────────────────────
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
  { year: "2020", label: "First Line of Code", note: "A 'Hello World' that changed the trajectory entirely." },
  { year: "2021", label: "Built First Real Project", note: "Messy, overwrought, and completely wonderful." },
  { year: "2022", label: "Joined FOSS Club", note: "Discovered open source and never looked back." },
  { year: "2023", label: "Technical Lead", note: "Led the club's first major hackathon from concept to completion." },
  { year: "2023", label: "Short Film Win", note: "Proved that code isn't the only language worth learning." },
  { year: "2024", label: "Secretary, FOSS Club", note: "From member to steward — building community at scale." },
  { year: "2025", label: "Current Projects", note: "Five experiments running in parallel, as it should be." },
  { year: "2025 →", label: "Future Adventures", note: "Actively seeking opportunities to build what matters." },
];

const FUTURE = [
  { icon: Cpu, title: "AI-Powered Tools", desc: "Building assistants that actually understand context — not just autocomplete on steroids." },
  { icon: HeartHandshake, title: "Community Platform", desc: "A space for FOSS contributors to find collaborators and mentors in their own cities." },
  { icon: Rocket, title: "Startup Ambitions", desc: "One problem, one team, one product. The details are still being debugged." },
  { icon: GitBranch, title: "Open Source Sprints", desc: "Regular contributions to meaningful projects — putting code where the values are." },
  { icon: Lightbulb, title: "Research Experiments", desc: "Exploring the intersection of technology and human behavior. Slowly. Carefully." },
  { icon: Globe, title: "Global Tech Community", desc: "Connecting builders across geographies through shared curiosity and shared code." },
];

// ─── Sub-components ─────────────────────────────────────────────────────────
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
      {subtitle && (
        <p style={{ color: "var(--brown-light)", fontStyle: "italic", maxWidth: "560px", margin: "0 auto", fontSize: "17px" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
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
      <PageScrapLayer />

      {/* ── NAVIGATION ─────────────────────────────────────────────────── */}
      <nav className="museum-nav" style={{ boxShadow: navScrolled ? "0 2px 16px rgba(44,24,16,0.08)" : "none" }}>
        <span className="nav-brand">The Museum of Curious Things</span>
        <ul className="nav-links">
          {[["#about", "About"], ["#gallery", "Gallery"], ["#community", "Community"], ["#timeline", "Timeline"], ["#gift-shop", "Gift Shop"]].map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* ── TICKER ─────────────────────────────────────────────────────── */}
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

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-arch" />
        <div className="hero-arch hero-arch-2" />
        <HeroScrapbookLayer />
        <div className="bg-circle" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

        <div className="hero-content-wrap">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "20px" }}
          >
            <span className="exhibit-badge">Est. 2020 · Admission: Free</span>
          </motion.div>

          <motion.h1
            className="museum-title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            The Museum of<br /><span className="highlight">Curious Things</span><br />Built by Uttara
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          >
            A collection of projects, experiments, leadership adventures, and creative side quests — pinned, taped, and scattered like a favorite scrapbook.
          </motion.p>

          <motion.a
            href="#about"
            className="enter-btn"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
          >
            <Map size={16} />
            Enter the Museum
          </motion.a>

          <motion.div
            className="scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <span>Scroll to explore</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT — each room wrapped in a doorway transition ────────── */}
      <div ref={sectionRef}>

        {/* ── ROOM I · ABOUT ─────────────────────────────────────────── */}
        <RoomThreshold roomNumber="I" roomName="Curiosity Profile" accent="var(--gold)">
          <section id="about" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
            <RoomHeader
              label="Room I · About Exhibit"
              title="A Portrait of the Builder"
              subtitle="Every museum needs an origin story. This is hers."
              doodleLeft="← start here"
              doodleRight="her story ✿"
            />
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
        </RoomThreshold>

        {/* ── ROOM II · GALLERY ──────────────────────────────────────── */}
        <RoomThreshold roomNumber="II" roomName="Main Gallery" accent="var(--rose)">
          <section id="gallery" style={{ padding: "80px 24px", background: "var(--parchment-2)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <RoomHeader
                label="Room II · Main Gallery"
                title="The Project Archive"
                subtitle="Five artifacts recovered from late-night coding sessions. Open a folder to examine."
                doodleLeft="tap the folders!"
                doodleRight="exhibit files →"
              />
              <RopeDivider />
              <ProjectFileFolders projects={PROJECTS} />
            </div>
          </section>
        </RoomThreshold>

        {/* ── ROOM III · COMMUNITY WING ──────────────────────────────── */}
        <RoomThreshold roomNumber="III" roomName="Community Wing" accent="var(--gold)">
          <section id="community" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
            <RoomHeader
              label="Room III · Community Wing"
              title="The Community Wing"
              subtitle="Building things alone is fine. Building community is better."
              doodleLeft="people > projects"
              doodleRight="✦ FOSS forever"
            />
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
        </RoomThreshold>

        {/* ── ROOM IV · DIPLOMACY WING ───────────────────────────────── */}
        <RoomThreshold roomNumber="IV" roomName="Diplomacy Wing" accent="var(--rose)">
          <section style={{ padding: "80px 24px", background: "var(--parchment-2)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
        </RoomThreshold>

        {/* ── ROOM V · CREATIVE ARTS WING ────────────────────────────── */}
        <RoomThreshold roomNumber="V" roomName="Creative Arts Wing" accent="var(--sage)">
          <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
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
        </RoomThreshold>

        {/* ── TIMELINE CORRIDOR ───────────────────────────────────────── */}
        <RoomThreshold roomNumber="—" roomName="The Timeline Corridor" accent="var(--gold)">
          <section id="timeline" style={{ padding: "80px 24px", background: "var(--parchment-2)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
        </RoomThreshold>

        {/* ── WING VI · FUTURE EXHIBITS ───────────────────────────────── */}
        <RoomThreshold roomNumber="VI" roomName="Future Exhibits" accent="var(--rose)">
          <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
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
        </RoomThreshold>

        {/* ── GIFT SHOP ───────────────────────────────────────────────── */}
        <RoomThreshold roomNumber="—" roomName="The Gift Shop" accent="var(--gold)">
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
        </RoomThreshold>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
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