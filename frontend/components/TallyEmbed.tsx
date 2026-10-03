"use client";

import Script from "next/script";
import { useCallback, useRef, type ReactNode } from "react";

/**
 * Inline Tally form embed (https://developers.tally.so/widgets/embeds).
 *
 * Usage:
 *   <TallyEmbed
 *     formId={process.env.NEXT_PUBLIC_TALLY_FORM_ID}
 *     title="Register for Square One"
 *     fallback={<p>Registration opens soon.</p>}
 *   />
 *
 * If `formId` is missing or not a plausible Tally ID, the iframe is never
 * rendered — `fallback` is shown instead, so the page owns that look.
 */

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

const TALLY_SCRIPT_SRC = "https://tally.so/widgets/embed.js";
// Tally form IDs are short alphanumerics (e.g. "mRoDv3"). Anything else is rejected
// before it can reach a URL.
const TALLY_ID_RE = /^[A-Za-z0-9]{3,16}$/;
const EMBED_PARAMS = "alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export function isValidTallyFormId(id: unknown): id is string {
  return typeof id === "string" && TALLY_ID_RE.test(id);
}

export function tallyEmbedUrl(formId: string): string {
  if (!isValidTallyFormId(formId)) throw new Error("Invalid Tally form ID");
  return `https://tally.so/embed/${formId}?${EMBED_PARAMS}`;
}

type TallyEmbedProps = {
  /** Tally form ID — typically process.env.NEXT_PUBLIC_TALLY_FORM_ID. */
  formId: string | undefined;
  /** Accessible name for the iframe (required by WCAG for frames). */
  title: string;
  className?: string;
  /** Rendered instead of the iframe when formId is missing/invalid. */
  fallback?: ReactNode;
  /** Reserved height in px before Tally resizes the frame (prevents layout shift). */
  minHeight?: number;
};

export default function TallyEmbed({
  formId,
  title,
  className,
  fallback = null,
  minHeight = 480,
}: TallyEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const id = formId?.trim();
  const valid = isValidTallyFormId(id);
  const src = valid ? tallyEmbedUrl(id) : "";

  // Script blocked or failed: load the form directly (no auto-height, but usable).
  const loadDirect = useCallback(() => {
    const frame = frameRef.current;
    if (frame && !frame.getAttribute("src") && src) frame.src = src;
  }, [src]);

  // onReady fires after first load AND on every remount (client-side navigation),
  // unlike onLoad which fires only once per page lifetime.
  const initEmbeds = useCallback(() => {
    if (typeof window.Tally?.loadEmbeds === "function") window.Tally.loadEmbeds();
    else loadDirect();
  }, [loadDirect]);

  if (!valid) return <>{fallback}</>;

  return (
    <div className={className} style={{ minHeight }}>
      <iframe
        ref={frameRef}
        data-tally-src={src}
        loading="lazy"
        width="100%"
        height={minHeight}
        title={title}
        style={{ border: 0, display: "block", width: "100%", minHeight }}
      />
      <Script src={TALLY_SCRIPT_SRC} strategy="lazyOnload" onReady={initEmbeds} onError={loadDirect} />
    </div>
  );
}
