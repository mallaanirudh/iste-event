import { css } from "./css";

/** Brass and steel plumbing running up the outside of the building. */
export default function Pipes() {
  return (
    <>
    {/* outside plumbing */}
      <div className="pipe l" aria-hidden="true"></div>
      <div className="pipe r" aria-hidden="true"></div>
      <div className="stub l" style={css({top: "330px"})} aria-hidden="true"></div>
      <div className="stub l" style={css({top: "640px"})} aria-hidden="true"></div>
      <div className="stub r" style={css({top: "470px"})} aria-hidden="true"></div>
      <div className="stub r" style={css({top: "880px"})} aria-hidden="true"></div>
      <div className="gauge l" style={css({top: "410px"})} aria-hidden="true"><svg viewBox="0 0 38 38"><circle cx="19" cy="19" r="17" fill="#f6ead0" stroke="#b5893a" strokeWidth="3"/><path d="M8 24 A12 12 0 1 1 30 24" fill="none" stroke="#2b1d12" strokeWidth="1" strokeDasharray="1 2.4"/><path d="M27 21 A9 9 0 0 0 28 16" stroke="#b8472a" strokeWidth="2" fill="none"/><line className="needle" x1="19" y1="19" x2="19" y2="7" stroke="#2b1d12" strokeWidth="1.6" strokeLinecap="round"/><circle cx="19" cy="19" r="2" fill="#2b1d12"/></svg></div>
      <div className="gauge r" style={css({top: "700px"})} aria-hidden="true"><svg viewBox="0 0 38 38"><circle cx="19" cy="19" r="17" fill="#f6ead0" stroke="#8e9196" strokeWidth="3"/><path d="M8 24 A12 12 0 1 1 30 24" fill="none" stroke="#2b1d12" strokeWidth="1" strokeDasharray="1 2.4"/><line className="needle" x1="19" y1="19" x2="19" y2="7" stroke="#b8472a" strokeWidth="1.6" strokeLinecap="round" style={css({animationDelay: "-1.3s"})}/><circle cx="19" cy="19" r="2" fill="#2b1d12"/></svg></div>
      <div className="valve l" style={css({top: "960px"})} aria-hidden="true"><svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="14" fill="none" stroke="#b8472a" strokeWidth="4"/><path d="M17 3 V31 M3 17 H31" stroke="#b8472a" strokeWidth="3"/><circle cx="17" cy="17" r="4" fill="#4a2e17"/></svg></div>
      <div className="valve r" style={css({top: "260px"})} aria-hidden="true"><svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="14" fill="none" stroke="#1f3a68" strokeWidth="4"/><path d="M17 3 V31 M3 17 H31" stroke="#1f3a68" strokeWidth="3"/><circle cx="17" cy="17" r="4" fill="#4a2e17"/></svg></div>
    </>
  );
}
