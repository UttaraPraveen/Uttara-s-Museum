import { motion } from "framer-motion";
import { useRoomTransition } from "../hooks/useRoomTransition";

/**
 * Wraps a museum "room" (section) so that scrolling into it triggers a
 * doorway-opening transition: two curtain panels wipe apart from the
 * center, and the room's content rises + sharpens into focus behind them.
 *
 * Usage:
 *   <RoomThreshold roomNumber="II" roomName="Main Gallery">
 *     ...section content...
 *   </RoomThreshold>
 */
export function RoomThreshold({ roomNumber, roomName, children, accent = "var(--gold)" }) {
  const { ref, contentStyle, wipeStyle } = useRoomTransition();

  return (
    <div ref={ref} className="room-threshold">
      {/* Doorway curtain — two panels that wipe outward from center */}
      <div className="room-threshold__doorway" aria-hidden="true">
        <motion.div
          className="room-threshold__panel room-threshold__panel--left"
          style={{ scaleX: wipeStyle.scaleX, opacity: wipeStyle.opacity }}
        />
        <motion.div
          className="room-threshold__panel room-threshold__panel--right"
          style={{ scaleX: wipeStyle.scaleX, opacity: wipeStyle.opacity }}
        />
        <motion.div
          className="room-threshold__seam"
          style={{ opacity: wipeStyle.opacity }}
        >
          <span className="room-threshold__seam-label" style={{ color: accent }}>
            Room {roomNumber}
          </span>
          <span className="room-threshold__seam-name">{roomName}</span>
        </motion.div>
      </div>

      {/* Content rises + comes into focus as the doorway opens */}
      <motion.div className="room-threshold__content" style={contentStyle}>
        {children}
      </motion.div>
    </div>
  );
}