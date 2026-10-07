"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (motionPreference.matches) return;
    const reveal = () => element.classList.remove("festival-reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    element.classList.add("festival-reveal-pending");
    observer.observe(element);
    const onPreferenceChange = () => {
      if (motionPreference.matches) {
        reveal();
        observer.disconnect();
      }
    };
    motionPreference.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", onPreferenceChange);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`festival-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
