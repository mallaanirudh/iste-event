'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#00FF4115] py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="text-[#00FF41] opacity-40">
          &gt; ISTE_CRYPT // SQUARE_1 // TRUST_NO_LINK
        </div>
        <div className="text-[#00FF41] opacity-30 text-center">
          &copy; {new Date().getFullYear()} ISTE Crypt Syndicate. All transmissions monitored.
        </div>
        <div className="text-[#00FF41] opacity-40 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF41] pulse-dot inline-block" />
          SIGNAL: ACTIVE
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="font-mono text-[10px] text-[#00FF41] opacity-20">
          /* This page is a briefing document, not the CTF platform. Trust nothing. Question everything. */
        </p>
      </div>
    </footer>
  );
}
