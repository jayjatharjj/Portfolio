"use client";

import { useEffect, useRef } from "react";
import { stats, type Stat } from "@/data/profile";
import Reveal from "./Reveal";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLElement>(null);
  const final = stat.text ?? `${stat.n ?? 0}${stat.suffix ?? ""}`;

  // Server markup already holds the final number, so it stays correct without JS.
  // The count-up only rewrites the DOM text once the tile scrolls into view.
  useEffect(() => {
    const el = ref.current;
    const target = stat.n;
    if (!el || target === undefined) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    el.textContent = `0${stat.suffix ?? ""}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 900);
          el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${stat.suffix ?? ""}`;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat.n, stat.suffix]);

  return (
    <>
      <b ref={ref} aria-hidden="true">
        {final}
      </b>
      <span className="sr-only">{final}</span>
    </>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <Reveal className="stat" key={s.label}>
          <Counter stat={s} />
          <span>{s.label}</span>
        </Reveal>
      ))}
    </div>
  );
}
