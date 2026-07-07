"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Radial glow that trails the cursor within its nearest positioned ancestor. */
export function MouseGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="absolute h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15]"
        style={{
          left: springX,
          top: springY,
          background: "radial-gradient(circle, rgb(var(--primary)), transparent 70%)",
        }}
      />
    </div>
  );
}
