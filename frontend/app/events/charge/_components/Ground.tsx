import { CONTACTS, GROUND, RULES, WORKBENCH } from "../_data/content";
import { floorProps } from "../_lib/tokens";
import { Part } from "./Part";
import { Workbench } from "./Workbench";
import c from "../charge.module.css";
import s from "./ground.module.css";

/** Floor 3: the ground floor. The workbench puzzle, then house rules and points of contact. */
export function Ground() {
  return (
    <section {...floorProps("ground", "workbench-title")} className={`${c.floor} ${s.ground}`}>
      <div id="workbench" className={`${c.wrap} ${s.workbench}`}>
        <div className={s.head}>
          <p className={s.kicker}>{WORKBENCH.kicker}</p>
          <h2 id="workbench-title" className={s.title} data-title="">
            {WORKBENCH.title}
          </h2>
          <p className={s.lede}>{WORKBENCH.lede}</p>
        </div>
        <Workbench />
      </div>

      <div id="contacts" className={`${c.wrap} ${s.strip}`}>
        <div className={s.rules}>
          <h2 className={s.stripTitle}>{GROUND.rulesTitle}</h2>
          <ul className={s.ruleList}>
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className={s.organisers}>
          <h2 className={s.stripTitle}>{GROUND.contactsTitle}</h2>
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

      <Part id="transistor" className={s.partTransistor} />
    </section>
  );
}
