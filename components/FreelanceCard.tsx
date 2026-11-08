"use client";

import { useRef, type PointerEvent } from "react";
import type { Client, FreelanceStatus } from "@/data/profile";
import Reveal from "./Reveal";

const chipClass: Record<FreelanceStatus, string> = {
  Live: "live",
  "In progress": "wip",
  "Awaiting client": "wait",
};

export default function FreelanceCard({ client }: { client: Client }) {
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
    <Reveal as="article" className="client" onPointerMove={spotlight}>
      <div className="top">
        <h3>{client.name}</h3>
        <span className={`status-chip ${chipClass[client.status]}`}>{client.status}</span>
      </div>
      <p>{client.text}</p>
      {client.url && (
        <a className="visit" href={client.url} target="_blank" rel="noopener noreferrer">
          Visit site <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </Reveal>
  );
}
