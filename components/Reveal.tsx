"use client";

import { useEffect, useRef, type ElementType, type PointerEventHandler, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  onPointerMove?: PointerEventHandler<HTMLElement>;
};

/** Fades/slides content in once it scrolls into view. Stays visible without JS/IntersectionObserver. */
export default function Reveal({ as: Tag = "div", className = "", children, onPointerMove }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-rv", "");
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()} onPointerMove={onPointerMove}>
      {children}
    </Tag>
  );
}
