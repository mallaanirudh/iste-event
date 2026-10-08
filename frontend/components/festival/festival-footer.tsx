import { ArrowUp, ArrowUpRight, Camera, Globe2, Ticket } from "lucide-react";
import { CarnivalArt } from "./carnival-art";
import { REGISTRATION_URL } from "@/data/registration";

function LinkedinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="4.5" cy="4.5" r="2" />
      <path d="M3 8h3v13H3Zm6 0h3v1.8C13 8.3 14.3 8 16 8c3.5 0 5 2.1 5 5.5V21h-3v-7c0-2-.6-3-2.3-3-1.8 0-3.7 1-3.7 3v7H9Z" />
    </svg>
  );
}

export function FestivalFooter({ onDirectory }: { onDirectory: () => void }) {
  return (
    <footer className="festival-footer-refined">
      <div className="festival-footer-skyline" aria-hidden="true">
        <CarnivalArt silhouette />
      </div>
      <div className="festival-footer-main">
        <h2 className="festival-heading">
          Bring your curiosity.{" "}
          <span className="text-[#ffd700]">Stay for the carnival.</span>
        </h2>
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="festival-button inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border-2 border-[#160b26] bg-[#ffd700] px-6 py-3 text-sm font-extrabold text-[#241037] shadow-[4px_4px_0_#140a24]"
        >
          <Ticket size={18} aria-hidden="true" /> Your Golden Ticket{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <div className="festival-footer-socials" aria-label="ISTE links">
          <a
            href="https://www.instagram.com/iste_nitk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Camera size={16} aria-hidden="true" /> Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/istenitk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon /> LinkedIn
          </a>
          <a href="#chambers">
            <Globe2 size={16} aria-hidden="true" /> ISTE NITK
          </a>
        </div>
      </div>
      <div className="festival-footer-bottom">
        <p>© 2026 ISTE. Let the festivities begin.</p>
        <button
          type="button"
          className="festival-text-button"
          onClick={onDirectory}
          aria-haspopup="dialog"
        >
          Chamber directory <ArrowUpRight size={14} aria-hidden="true" />
        </button>
        <a href="#home" className="festival-text-button">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
