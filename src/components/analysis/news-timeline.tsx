"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

export function NewsTimeline({ events }: { events: string[] }) {
  return (
    <div className="relative pl-2">
      <div className="absolute bottom-1 left-[1.15rem] top-1 w-px bg-gradient-to-b from-primary/50 via-accent/40 to-transparent" />
      <ul className="space-y-6">
        {events.map((event, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex gap-4 pl-2"
          >
            <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card text-primary">
              <Newspaper className="h-3 w-3" />
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">{event}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
