import { agenda, eventFacts } from "../content";
import { css } from "./css";

/** Agenda styled as a manila case file. */
export default function CaseFile() {
  return (
    <section className="casefile" id="agenda" aria-labelledby="h-agenda">
      <div className="folder">
        <span className="tab">CASE FILE № 221-B</span>
        <div className="body">
          <span className="stamp" aria-hidden="true">CONFIDENTIAL</span>
          <h2 id="h-agenda">The Agenda</h2>
          <p className="sub">Order of proceedings for the day of the investigation.</p>

          <div className="facts" id="details">
            {eventFacts.map((f) => (
              <div className="fact" key={f.label}><b>{f.label}</b>{f.value}</div>
            ))}
          </div>

          <ol className="timeline">
            {agenda.map((item, i) => (
              <li key={item.time} style={css({ "--i": i })}>
                <span className="time">{item.time}</span>
                <span className="what"><b>{item.title}</b><span>{item.detail}</span></span>
              </li>
            ))}
          </ol>
          <p className="fine">* Timings are provisional and subject to change by order of the Commissioner.</p>
        </div>
      </div>
    </section>
  );
}
