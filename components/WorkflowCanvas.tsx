"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flow } from "@/data/profile";

const SVG_NS = "http://www.w3.org/2000/svg";

/** White text unless it falls under 4.5:1 on the node colour; then the dark ink the buttons use. */
function inkOn(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return 1.05 / (lum + 0.05) >= 4.5 ? "#fff" : "#1a0a07";
}

/** n8n-style canvas: nodes joined by animated bezier wires, laid out as a snake. */
export default function WorkflowCanvas() {
  const flowRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);

  const wire = useCallback(() => {
    const host = flowRef.current?.parentElement;
    const svg = svgRef.current;
    if (!host || !svg) return;
    const nodes = [...host.querySelectorAll<HTMLElement>(".node")];
    const h = host.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${h.width} ${h.height}`);

    const box = (n: HTMLElement) => {
      const r = n.getBoundingClientRect();
      return {
        l: r.left - h.left,
        r: r.right - h.left,
        t: r.top - h.top,
        b: r.bottom - h.top,
        cx: r.left + r.width / 2 - h.left,
        cy: r.top + r.height / 2 - h.top,
      };
    };

    const frag = document.createDocumentFragment();
    const add = (name: string, attrs: Record<string, string>) => {
      const el = document.createElementNS(SVG_NS, name);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      frag.appendChild(el);
    };
    const dots: [number, number][] = [];

    const R = 12; // corner radius for the row-wrap connector
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = box(nodes[i]);
      const b = box(nodes[i + 1]);
      let d: string;
      if (Math.abs(a.cy - b.cy) < 4) {
        // same row: horizontal bezier
        const fwd = b.cx > a.cx;
        const x1 = fwd ? a.r : a.l;
        const x2 = fwd ? b.l : b.r;
        const m = (x2 - x1) / 2;
        d = `M${x1},${a.cy} C${x1 + m},${a.cy} ${x2 - m},${b.cy} ${x2},${b.cy}`;
        dots.push([x1, a.cy], [x2, b.cy]);
      } else if (Math.abs(a.cx - b.cx) < 4) {
        // single column: straight vertical line
        d = `M${a.cx},${a.b} V${b.t}`;
        dots.push([a.cx, a.b], [b.cx, b.t]);
      } else {
        // row wrap: leave the right edge, loop through the gutters and the gap
        // between rows, enter the next row's left edge (rounded right angles only).
        const gr = (a.r + h.width) / 2;
        const gl = b.l / 2;
        const my = (a.b + b.t) / 2;
        d =
          `M${a.r},${a.cy} H${gr - R} Q${gr},${a.cy} ${gr},${a.cy + R} V${my - R} ` +
          `Q${gr},${my} ${gr - R},${my} H${gl + R} Q${gl},${my} ${gl},${my + R} ` +
          `V${b.cy - R} Q${gl},${b.cy} ${gl + R},${b.cy} H${b.l}`;
        dots.push([a.r, a.cy], [b.l, b.cy]);
      }
      add("path", { d });
      add("path", { d, class: "flowline" });
    }
    for (const [cx, cy] of dots) add("circle", { cx: String(cx), cy: String(cy), r: "5" });

    svg.replaceChildren(frag);
  }, []);

  useEffect(() => {
    wire();
    const ro = new ResizeObserver(wire);
    if (flowRef.current?.parentElement) ro.observe(flowRef.current.parentElement);
    document.fonts?.ready.then(wire);
    return () => ro.disconnect();
  }, [wire]);

  return (
    <div className={paused ? "canvas paused" : "canvas"} role="group" aria-label="My journey from school to Bajaj General Insurance">
      <div className="bar">
        <b />
        <b />
        <b />
        <em>my-story · workflow</em>
        <button className="run" type="button" onClick={() => setPaused((p) => !p)}>
          <span aria-hidden="true">{paused ? "❚❚ " : "● "}</span>
          {paused ? "Paused" : "Running"}
          <span className="sr-only"> — {paused ? "play" : "pause"} the animation</span>
        </button>
      </div>
      <svg id="wires" ref={svgRef} aria-hidden="true" />
      <div className="flow" ref={flowRef}>
        {flow.map((n, i) => (
          <div className="node" data-i={i} key={n.title}>
            <div className="ic" style={{ background: n.color, color: inkOn(n.color) }} aria-hidden="true">
              {n.icon}
            </div>
            <div>
              <strong className="nt">{n.title}</strong>
              <small>{n.sub}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
