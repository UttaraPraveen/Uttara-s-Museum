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
    <ProjectFileFolders projects={PROJECTS} />
  </div>
</section>