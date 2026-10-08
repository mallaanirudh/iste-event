import { ArrowUpRight } from "lucide-react";
import { REGISTRATION_URL } from "@/data/registration";
import styles from "../cata.module.css";

export default function RegistrationTicket() {
  return (
    <div className={styles.registrationPanel}>
      <p>Enter your team details on the FeISTEval registration website.</p>
      <a
        href={REGISTRATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.registrationLink}
      >
        Open Registration <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}
