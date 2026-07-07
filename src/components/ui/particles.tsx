"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["rgb(var(--primary))", "rgb(var(--accent))", "rgb(var(--secondary))"];

/** A handful of softly glowing dots that drift and fade — purely decorative. */
export function Particles({ count = 18 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Random values are generated only after mount, so the server-rendered
  // markup (which skips this) never has to match a randomized client pass.
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 100),
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        color: COLORS[i % COLORS.length],
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 8px 1px ${p.color}`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: -60 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
