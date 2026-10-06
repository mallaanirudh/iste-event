import Image from "next/image";
import { EVENT } from "../_data/content";
import c from "../charge.module.css";
import s from "./footer.module.css";

/** A slim footer under the tower: logos, the one-line credit, back to top. */
export function Footer() {
  return (
    <footer className={s.footer} style={{ background: "#1A110E", color: "#F3EADB" }}>
      <div className={`${c.wrap} ${s.inner}`}>
        <div className={s.logos}>
          <span className={s.plaque}>
            <Image
              src="/events/square1_charge/iste-nitk-transparent.png"
              alt="ISTE NITK"
              width={359}
              height={320}
              sizes="64px"
              className={s.iste}
            />
          </span>
          <Image
            src="/events/square1_charge/nitk-plaque.png"
            alt="National Institute of Technology Karnataka, Surathkal"
            width={183}
            height={179}
            sizes="62px"
            className={s.crest}
          />
        </div>
        <p className={s.text}>
          Charge is the electronics SIG of ISTE NITK Surathkal. {EVENT.name} is part of {EVENT.megaEvent}.
        </p>
        {/* A "Square One home" link to EVENT.homeHref goes here once the homepage ships. */}
        <a href="#top" className={`${c.textLink} ${s.top}`}>
          Back to top
        </a>
      </div>
    </footer>
  );
}
