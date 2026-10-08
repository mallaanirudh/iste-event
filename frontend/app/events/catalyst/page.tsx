import type { Metadata } from "next";
import Maze from "./_components/Maze";
import styles from "./cata.module.css";

export const metadata: Metadata = {
  title: "ISTE · Catalyst · LABLOCK",
  description:
    "LABLOCK: Escape the Lab. A Chemical Engineering escape room by ISTE Catalyst, 16 October 2026.",
};

export default function CatalystPage() {
  return (
    <div id="catalyst-top" className={styles.eventShell}>
      <Maze />
    </div>
  );
}
