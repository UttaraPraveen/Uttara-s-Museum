import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Code, BookOpen, FolderGit } from "lucide-react";

// ─── Project File Folders ─────────────────────────────────────────────────────
export default function ProjectFileFolders({ projects }) {
  const [activeFolder, setActiveFolder] = useState(0);
  const [activeFile, setActiveFile] = useState(0);

  const FILES = [
    { name: "overview.md", icon: FileText, label: "Project Overview" },
    { name: "tech_stack.json", icon: Code, label: "Tech Stack" },
    { name: "observations.txt", icon: BookOpen, label: "Field Notes" },
  ];

  const p = projects[activeFolder];

  function switchFolder(i) {
    if (i === activeFolder) return;
    setActiveFolder(i);
    setActiveFile(0);
  }

  const statusColor = p.status === "active" ? "var(--sage)" : "var(--rose)";

  return (
    <div style={{ fontFamily: "'EB Garamond', serif" }}>
      {/* Folder Tabs */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 0,
        paddingLeft: 4,
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            onClick={() => switchFolder(i)}
            style={{
              padding: "10px 18px 14px",
              cursor: "pointer",
              borderRadius: "10px 10px 0 0",
              border: `1.5px solid ${i === activeFolder ? "rgba(74,55,40,0.32)" : "var(--divider)"}`,
              borderBottom: "none",
              borderTop: `3px solid ${i === activeFolder ? proj.color : "transparent"}`,
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              background: i === activeFolder ? "var(--cream-card)" : "rgba(250,246,237,0.6)",
              color: i === activeFolder ? "var(--ink)" : "var(--brown-light)",
              fontWeight: i === activeFolder ? 600 : 400,
              marginRight: -1,
              zIndex: i === activeFolder ? 10 : 1,
              position: "relative",
              top: i === activeFolder ? -6 : 0,
              transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
              minWidth: 110,
              textAlign: "center",
              boxShadow: i === activeFolder ? "0 -3px 12px rgba(44,24,16,0.07)" : "none",
              outline: "none",
            }}
            onMouseEnter={e => { if (i !== activeFolder) e.currentTarget.style.top = "-4px"; }}
            onMouseLeave={e => { if (i !== activeFolder) e.currentTarget.style.top = "0px"; }}
          >
            <span style={{
              display: "inline-block",
              width: 6, height: 6,
              borderRadius: "50%",
              background: proj.color,
              marginRight: 7,
              verticalAlign: "middle",
              marginBottom: 1,
            }} />
            {proj.title.split(" ").slice(0, 2).join(" ")}
            <span style={{
              display: "block",
              fontSize: 9,
              opacity: 0.45,
              marginTop: 2,
              letterSpacing: "0.15em",
            }}>{proj.id}</span>
          </button>
        ))}
      </div>

      {/* Folder Body */}
      <div style={{
        background: "var(--cream-card)",
        border: "1.5px solid rgba(74,55,40,0.28)",
        borderRadius: "0 12px 12px 12px",
        minHeight: 380,
        display: "flex",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 28px rgba(44,24,16,0.1)",
      }}>

        {/* Bottom accent bar */}
        <motion.div
          key={`accent-${activeFolder}`}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${p.color}, var(--rose), var(--gold))`,
            borderRadius: "0 0 12px 12px",
          }}
          initial={{ opacity: 0.1, scaleX: 0.4 }}
          animate={{ opacity: 0.25, scaleX: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Sidebar */}
        <div style={{
          width: 210,
          flexShrink: 0,
          borderRight: "1px dashed rgba(74,55,40,0.18)",
          padding: "20px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          background: "rgba(245,239,224,0.45)",
        }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            paddingBottom: 8,
            borderBottom: "1px solid var(--divider)",
            marginBottom: 4,
          }}>
            <FolderGit size={12} style={{ verticalAlign: "middle", marginRight: 5 }} />
            Files ({FILES.length})
          </div>

          {FILES.map((f, fi) => {
            const FIcon = f.icon;
            const isSelected = fi === activeFile;
            return (
              <div
                key={fi}
                onClick={() => setActiveFile(fi)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  border: `1px solid ${isSelected ? "rgba(201,168,76,0.35)" : "transparent"}`,
                  background: isSelected ? "rgba(201,168,76,0.1)" : "transparent",
                  transition: "all 0.15s ease",
                  transform: isSelected ? "translateX(2px)" : "none",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(196,137,111,0.07)"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
              >
                <FIcon size={15} color={isSelected ? "var(--gold)" : "var(--brown-light)"} />
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: isSelected ? "var(--ink)" : "var(--brown)",
                  flex: 1,
                  lineHeight: 1.3,
                }}>{f.name}</span>
              </div>
            );
          })}

          {/* Folder meta */}
          <div style={{ flex: 1 }} />
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.1em",
            color: "var(--gold)",
            paddingTop: 12,
            borderTop: "1px dashed var(--divider)",
            lineHeight: 1.8,
            opacity: 0.8,
          }}>
            <div>📅 {p.year}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{
                display: "inline-block", width: 6, height: 6,
                borderRadius: "50%", background: statusColor,
              }} />
              {p.status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Document content */}
        <div style={{ flex: 1, padding: "28px 30px", overflowY: "auto", maxHeight: 380 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFolder}-${activeFile}`}
              initial={{ opacity: 0, y: 14, rotate: 0.4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -8, rotate: -0.4 }}
              transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
              style={{
                background: "white",
                border: "1px solid rgba(74,55,40,0.1)",
                borderRadius: 4,
                padding: "28px 28px 32px",
                position: "relative",
                boxShadow: "0 1px 4px rgba(44,24,16,0.05), 0 4px 16px rgba(44,24,16,0.07)",
              }}
            >
              {/* Hole punches */}
              {[28, 64, 100].map(top => (
                <div key={top} style={{
                  position: "absolute", left: 10, top,
                  width: 13, height: 13, borderRadius: "50%",
                  background: "var(--parchment-2)",
                  border: "1px solid rgba(74,55,40,0.12)",
                }} />
              ))}

              {/* Paperclip */}
              <div style={{
                position: "absolute", top: -8, left: 34,
                color: "var(--gold)", fontSize: 20,
                transform: "rotate(-30deg)", opacity: 0.55,
                fontFamily: "sans-serif",
              }}>📎</div>

              {/* Status stamp */}
              <div style={{
                position: "absolute", top: 20, right: 20,
                fontFamily: "'DM Mono', monospace",
                fontSize: 9, letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "5px 10px",
                borderRadius: 3,
                border: `1.5px solid ${statusColor}`,
                color: statusColor,
                background: `${statusColor}12`,
                transform: "rotate(3deg)",
              }}>
                {p.status === "active" ? "Active" : "Complete"}
              </div>

              {/* Doc header */}
              <div style={{ paddingLeft: 22 }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  letterSpacing: "0.18em", color: "var(--rose)", marginBottom: 4,
                }}>{p.id} · {FILES[activeFile].name}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 700, color: "var(--ink)",
                  marginBottom: 2, lineHeight: 1.2,
                }}>{p.title}</h3>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 11,
                  color: "var(--brown-light)", marginBottom: 20,
                }}>{p.year}</div>

                <div style={{
                  height: 1, margin: "16px 0",
                  background: "repeating-linear-gradient(90deg, var(--divider) 0, var(--divider) 4px, transparent 4px, transparent 10px)",
                }} />

                {activeFile === 0 && (
                  <>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Project Overview</div>
                    <p style={{ fontSize: 15, color: "var(--brown)", lineHeight: 1.7, marginBottom: 16 }}>{p.purpose}</p>
                    <div style={{ height: 1, margin: "16px 0", background: "repeating-linear-gradient(90deg, var(--divider) 0, var(--divider) 4px, transparent 4px, transparent 10px)" }} />
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Exhibit ID</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--rose)" }}>{p.id}</div>
                  </>
                )}
                {activeFile === 1 && (
                  <>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Tech Stack</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {p.tech.map(t => (
                        <span key={t} style={{
                          fontFamily: "'DM Mono', monospace", fontSize: 10,
                          padding: "3px 9px",
                          background: "rgba(74,55,40,0.07)",
                          border: "1px solid rgba(74,55,40,0.15)",
                          borderRadius: 3, color: "var(--brown-light)",
                        }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ height: 1, margin: "16px 0", background: "repeating-linear-gradient(90deg, var(--divider) 0, var(--divider) 4px, transparent 4px, transparent 10px)" }} />
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Stack Count</div>
                    <div style={{ fontSize: 15, color: "var(--brown)" }}>{p.tech.length} technologies</div>
                  </>
                )}
                {activeFile === 2 && (
                  <>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Field Observation</div>
                    <div style={{
                      background: "rgba(201,168,76,0.07)",
                      borderLeft: "3px solid var(--gold)",
                      padding: "12px 16px",
                      borderRadius: "0 4px 4px 0",
                      fontStyle: "italic", fontSize: 14,
                      color: "var(--brown-light)", lineHeight: 1.7,
                      marginBottom: 16,
                    }}>"{p.observation}"</div>
                    <div style={{ height: 1, margin: "16px 0", background: "repeating-linear-gradient(90deg, var(--divider) 0, var(--divider) 4px, transparent 4px, transparent 10px)" }} />
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Logged</div>
                    <div style={{ fontSize: 14, color: "var(--brown-light)" }}>{p.year} · FOSS Club Archives</div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}