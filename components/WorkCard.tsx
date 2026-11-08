"use client";

import { useRef, type PointerEvent } from "react";
import type { Work } from "@/data/profile";
import Reveal from "./Reveal";

export default function WorkCard({ item }: { item: Work }) {
  const frame = useRef(0);
  // Pointer moves fire faster than frames: read the layout once per frame.
  const spotlight = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };

  return (
    <Reveal as="article" className="card" onPointerMove={spotlight}>
      <span className="num">
        {item.num} — {item.tag}
      </span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="metric">
        {item.metrics.map(([value, label]) => (
          <div key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
