import { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";

/**
 * Tracks pointer position relative to viewport center and exposes two
 * spring-smoothed motion values (x, y) other components can scale by
 * their own "depth" factor for a layered parallax effect.
 *
 * @param {number} strength - max pixel offset at the edge of the viewport
 */
export function useMouseParallax(strength = 20) {
  const x = useSpring(0, { stiffness: 60, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 60, damping: 18, mass: 0.4 });
  const frame = useRef(null);

  useEffect(() => {
    function handlePointerMove(e) {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const nx = (e.clientX - cx) / cx; // -1 .. 1
        const ny = (e.clientY - cy) / cy; // -1 .. 1
        x.set(nx * strength);
        y.set(ny * strength);
      });
    }

    function handlePointerLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [strength, x, y]);

  return { x, y };
}