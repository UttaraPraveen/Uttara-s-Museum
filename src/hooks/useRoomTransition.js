import { useRef } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Drives the "walking into a new room" scroll transition.
 *
 * As a room's threshold (the doorway/divider above it) crosses the
 * viewport, we animate:
 *  - doorway wipe: a vertical curtain that "opens" as you arrive
 *  - content rise: the room's content lifts + sharpens into focus
 *  - depth fade: the previous room recedes slightly (handled by caller
 *    reading `progress` if needed)
 *
 * Returns refs/style values to spread onto the room wrapper.
 */
export function useRoomTransition({ start = "top 85%", end = "top 35%" } = {}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 30%"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const opacity = useTransform(smooth, [0, 1], [0, 1]);
  const y = useTransform(smooth, [0, 1], [56, 0]);
  const scale = useTransform(smooth, [0, 1], [0.975, 1]);
  const blur = useTransform(smooth, [0, 1], [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // Doorway wipe: two panels slide apart as the room arrives
  const wipeScaleX = useTransform(smooth, [0, 0.65], [1, 0]);
  const wipeOpacity = useTransform(smooth, [0.45, 0.7], [1, 0]);

  return {
    ref,
    progress: smooth,
    contentStyle: { opacity, y, scale, filter },
    wipeStyle: { scaleX: wipeScaleX, opacity: wipeOpacity },
  };
}