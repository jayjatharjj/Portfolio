"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  ["/#work", "Experience"],
  ["/#stack", "Stack"],
  ["/#proof", "Certifications"],
  ["/#freelance", "Freelance"],
  ["/#projects", "Projects"],
  ["/blogs", "Blog"],
] as const;

export default function SiteNav() {
  // Below 900px the links collapse into a menu that drops down under the bar.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav aria-label="Main">
      <div className="wrap nav">
        <Link className="logo" href="/#top" onClick={close}>
          <i>{profile.initials}</i> {profile.short}
        </Link>
        <div className={open ? "links open" : "links"} id="site-links">
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={close}>
              {label}
            </Link>
          ))}
          <Link className="menu-cta" href="/#contact" onClick={close}>
            Let&apos;s talk →
          </Link>
        </div>
        <div className="nav-actions">
          <Link className="btn primary nav-cta" href="/#contact">
            Let&apos;s talk →
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="site-links"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
