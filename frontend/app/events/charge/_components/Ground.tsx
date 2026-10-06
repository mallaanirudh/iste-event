import { CONTACTS, GROUND, RULES } from "../_data/content";
import { floorProps } from "../_lib/tokens";
import { Leaderboard, type Board } from "./Leaderboard";
import { Ticket, type RegistrationWindow } from "./Ticket";
import c from "../charge.module.css";
import s from "./ground.module.css";

/** Floor 3: the ground floor. House rules and points of contact first, then the live leaderboard, then registration. */
export function Ground({
  boards,
  registration,
  preEvent,
}: {
  boards: Board[];
  registration: RegistrationWindow;
  preEvent: boolean;
}) {
  return (
    <section {...floorProps("ground", "leaderboard-title")} className={`${c.floor} ${s.ground}`}>
      <div className={`${c.wrap} ${s.strip}`}>
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
      <div className={c.wrap}>
        <Leaderboard boards={boards} preEvent={preEvent} />
      </div>

      <div id="register" className={`${c.wrap} ${s.ticketBlock}`} aria-labelledby="register-title" role="region">
        <div className={s.ticketHead}>
          <h2 id="register-title" className={s.title} data-title="">
            {GROUND.title}
          </h2>
          <p className={s.lede}>{GROUND.lede}</p>
        </div>
        <Ticket variant="inline" registration={registration} />
      </div>
    </section>
  );
}
