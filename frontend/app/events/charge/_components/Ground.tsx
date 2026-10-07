import { CONTACTS, GROUND, RULES } from "../_data/content";
import { floorProps } from "../_lib/tokens";
import { Countdown } from "./Briefing";
import c from "../charge.module.css";
import s from "./ground.module.css";

/** Floor 3: the ground floor. A closing countdown to doors open, then house rules and points of contact. */
export function Ground() {
  return (
    <section {...floorProps("ground", "ground-title")} className={`${c.floor} ${s.ground}`}>
      <div className={`${c.wrap} ${s.closing}`}>
        <p className={s.kicker} data-reveal="">
          {GROUND.kicker}
        </p>
        <h2 id="ground-title" className={s.title} data-title="">
          {GROUND.title}
        </h2>
        <div className={s.count} data-reveal="">
          <p className={s.countLabel}>{GROUND.countLabel}</p>
          <Countdown big />
        </div>
      </div>

      <div id="contacts" className={`${c.wrap} ${s.panels}`}>
        <div className={s.panel} data-reveal="">
          <h3 className={s.panelTitle}>{GROUND.rulesTitle}</h3>
          <ul className={s.ruleList}>
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className={s.panel} data-reveal="">
          <h3 className={s.panelTitle}>{GROUND.contactsTitle}</h3>
          <ul className={s.contacts}>
            {CONTACTS.map((p) => (
              <li key={p.tel}>
                <span className={s.names}>{p.name}</span>
                <a className={s.phone} href={`tel:${p.tel}`}>
                  {p.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
