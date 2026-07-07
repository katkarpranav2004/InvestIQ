"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

/** Counts up from 0 to `value` once scrolled into view, then settles. */
export function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 100px 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 20 });
  // Mirrored into state (rather than only mutating the DOM node directly) so the
  // displayed number survives unrelated re-renders instead of snapping back to 0.
  const [display, setDisplay] = useState(() => `${prefix}${(0).toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
    });
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
