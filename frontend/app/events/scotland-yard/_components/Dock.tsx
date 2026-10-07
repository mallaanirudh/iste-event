/** Evidence-tag calls to action hanging from the embankment rail. */
export default function Dock() {
  return (
      <div className="dock">
        <span className="rail" aria-hidden="true"></span>
        <div className="tag-wrap">
          <span className="string" aria-hidden="true"></span>
          {/* Replace href with your registration form link */}
          <a className="tag blue" href="#details">
            <span className="kicker">EVIDENCE · ITEM 001</span>
            <span className="cta">Register Now</span>
            <span className="lines">ENLIST YOUR SQUAD →</span>
          </a>
        </div>
        <div className="tag-wrap">
          <span className="string" aria-hidden="true"></span>
          <a className="tag" href="#agenda">
            <span className="kicker">EVIDENCE · ITEM 002</span>
            <span className="cta">View Agenda</span>
            <span className="lines">OPEN THE CASE FILE ↓</span>
          </a>
        </div>
      </div>
  );
}
