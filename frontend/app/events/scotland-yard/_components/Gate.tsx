import TallyEmbed from "@/components/TallyEmbed";
import Floor from "./Floor";

export type GateFact = { k: string; v: string };

/** Ground floor: the golden-ticket registration and the street outside. */
export default function Gate({ facts }: { facts: GateFact[] }) {
  return (
    <>
      <Floor id="gate" label="G" name="Front Gate" wall="#eab3a0" className="gate" labelledBy="h-gate">
        <div className="gate-grid">
          <div>
            <p className="kicker" data-pop>Enlist your squad</p>
            <h2 id="h-gate" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>Claim a <em>golden ticket</em></h2>
            <p className="lede" data-pop style={{ "--d": 2 } as React.CSSProperties}>
              One ticket gets your squad through the factory gates and into the chase. Registration runs through the Mega Event form.
            </p>
            <div className="facts" data-pop style={{ "--d": 3 } as React.CSSProperties}>
              {facts.map((f) => <div className="fact" key={f.k}><b>{f.k}</b><span>{f.v}</span></div>)}
            </div>
          </div>
          <div className="ticket" data-pop style={{ "--d": 2 } as React.CSSProperties}>
            <span className="serial">GOLDEN TICKET · SCOTLAND YARD 2026</span>
            <h3>Admit one squad</h3>
            <TallyEmbed
              formId={process.env.NEXT_PUBLIC_TALLY_FORM_ID}
              title="Register for Scotland Yard"
              className="form"
              minHeight={420}
              fallback={
                <div className="soon">
                  <strong>The registration form opens here soon.</strong>
                  <p style={{ margin: "6px 0 0" }}>Check back shortly, or ask the ISTE desk for the link.</p>
                </div>
              }
            />
          </div>
        </div>
      </Floor>
      <footer className="street">
        <p><strong>ISTE · Scotland Yard 2026</strong>, part of the Mega Event at the Grand Confectionery</p>
        <p className="credit">Website designed and made by <b>Ishaan Roy</b></p>
      </footer>
    </>
  );
}
