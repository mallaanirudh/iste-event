"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapInitializer() {
  useEffect(() => {
    // 1. Global GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

    // 2. Smooth Scrolling Context (Pure CSS Fallback)
    // Applying to documentElement ensures anchor links glide smoothly
    document.documentElement.style.scrollBehavior = "smooth";

    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return null;
}
