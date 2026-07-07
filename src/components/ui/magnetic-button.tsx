"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Wraps any button/link and makes it drift slightly toward the cursor on hover. */
export function MagneticButton({ children, className, strength = 18 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
    setOffset({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
