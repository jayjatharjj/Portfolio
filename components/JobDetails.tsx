"use client";

import { useId, useState, type ReactNode } from "react";

/** On mobile, hides a job's bullet points behind a toggle; desktop always shows them. */
export default function JobDetails({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div id={id} className={open ? "job-body open" : "job-body"}>
      {children}
      <button
        type="button"
        className="job-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Hide details" : "Show details"}
      </button>
    </div>
  );
}
