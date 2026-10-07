"use client";
import { useEffect } from "react";

const ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

export default function TallyEmbed() {
  useEffect(() => {
    const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
    if (w.Tally) { w.Tally.loadEmbeds(); return; }
    const src = "https://tally.so/widgets/embed.js";
    let s = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (!s) { s = document.createElement("script"); s.src = src; s.async = true; document.body.appendChild(s); }
    s.addEventListener("load", () => w.Tally?.loadEmbeds());
  }, []);

  if (!ID) return <p>Registration form is not configured yet.</p>;
  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${ID}?hideTitle=1&transparentBackground=1&dynamicHeight=1`}
      loading="lazy" width="100%" height="500" frameBorder={0} title="LABLOCK registration"
    />
  );
}