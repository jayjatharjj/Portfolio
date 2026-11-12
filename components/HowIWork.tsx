"use client";

import { useId, useState, type ReactNode } from "react";

/** On mobile, the "How I work" label toggles the steps (closed by default); desktop always shows them. */
export default function HowIWork({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <h3 className="flabel">
        <span className="process-label">How I work</span>
        <button
          type="button"
          className="process-toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          How I work
        </button>
      </h3>
      <div id={id} className={open ? "process-body open" : "process-body"}>
        {children}
      </div>
    </>
  );
}
